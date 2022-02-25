import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

import {Plate, Master, Stock, MasterPlate, ECNames} from './models'
import calculateWellsForMasterPlate from './calculateWellsForMasterPlate';

try {
  mongoose.connect('mongodb://localhost:27017/fridge', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  });
} catch (err) {
  console.error(err);
}

const ObjectId = mongoose.Types.ObjectId;

const labels = [
  'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12',
  'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12',
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12',
  'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12',
  'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
  'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12',
];


const labelsChunked = _.chunk(labels, 12);


function getKeysForNewMaster(replicates) {

  const newOrder = [];
  for (let slim = 0; slim + replicates <= 12; slim += replicates) {
    for (let thicc = 0; thicc < 8; thicc++) {//because its 8 wide
      for (let offset = 0; offset < replicates; offset++) {
        newOrder.push(labelsChunked[thicc][slim + offset])
      }
    }
  }

  newOrder.splice(0, 2 * replicates); //make empty spaces
  return newOrder
}


String.prototype.toObjectId = function () {
  return new ObjectId(this.toString());
};


function sendError(error, res, code) {
  console.error(error);
  res.status(code || 500).json({error: error})
}

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next()
});

const JWT_SECRET = process.env.JWT_SECRET;

async function sign(user) {
  return jwt.sign(user, JWT_SECRET)
}


router.get('/stock', (req, res) => {

  Stock.find({deleted: false})
    .then(stocks => {
      const sorted = stocks.filter(s => !s.deleted).reduce((all, current) => {
        current.active ? all.stocksActive.push(current) : all.stocksRetired.push(current);
        return all;
      }, {stocksActive: [], stocksRetired: []});
      res.status(200).json(sorted)
    })
    .catch(err => {
      sendError(err, res)
    })

});

router.get('/stock/:id', (req, res) => {
  Stock.findById(req.params.id)
    .populate('plate')
    .then(stock => {
      res.status(200).json({stock: stock})
    })
    .catch(err => {
      sendError(err, res)
    })
});

router.post('/stock/:id/retire', (req, res) => {
  Stock.findById(req.params.id)
    .then(stock => {
      stock.active = false;
      return stock.save()
    })
    .then(stock => {
      return stock.populate('plate').execPopulate();
    })
    .then(stock => {
      res.status(200).json({active: stock.active})
    })
    .catch(err => {
      sendError(err, res)
    })
});
router.post('/stock/:id/activate', (req, res) => {
  Stock.findById(req.params.id)
    .then(stock => {
      stock.active = true;
      return stock.save()
    })
    .then(stock => {
      return stock.populate('plate').execPopulate();
    })
    .then(stock => {
      res.status(200).json({active: stock.active})
    })
    .catch(err => {
      sendError(err, res)
    })
});
router.post('/stock/:id/delete', (req, res) => {
  Stock.findById(req.params.id)
    .then(stock => {
      stock.deleted = true;
      return stock.save()
    })
    .then(stock => {
      return stock.populate('plate').execPopulate();
    })
    .then(stock => {
      res.status(200).json({active: stock.active})
    })
    .catch(err => {
      sendError(err, res)
    })
});
router.post('/stock/check/name', (req, res) => {
  const name = req.body.name;

  Stock.find({name})
    .then(stocks => {
      if (stocks && stocks.length) {
        res.send({ok: false/*, debugger: [stocks, 'stocks with that name found']*/});
      } else {
        res.send({ok: true})
      }

    })
    .catch(err => {
      sendError(err, res)
    })
});

function getAllPlates() {
  return Promise.all([
    Master.find({deleted: false}).populate('plates'),
    Stock.find({deleted: false}).populate('plate'),
  ])
    .then(two => {
      return new Promise((good, bad) => {

        const plates = [];
        two.map(one => {
          one.map(mors => {

            if (mors.plates) {
              mors.plates.map(plate => {
                plate.type = 'master';
                plates.push(plate);
              })
            }
            if (mors.plate) {
              mors.plate.type = 'stock';
              plates.push(mors.plate)
            }

          });
        });

        good(plates);

      })
    })
}


router.post('/stock/check/frs', (req, res) => {

  const toCheck = req.body.frs;
  const inUse = [];

  if (toCheck) {
    getAllPlates()
      .then(plates => {
        plates.map(plate => {
          labels.map(l => {
            toCheck.map(tc => {
              if (tc && tc.fr && plate[l] && plate[l].fr) {
                if (tc.fr === plate[l].fr) {
                  inUse.push(tc);
                }
              }
            })
          })
        });
        res.send({frs: inUse})
      })
      .catch(err => {
        sendError(err, res)
      })
  } else {
    sendError(new Error('no frs sent'), res)
  }

});

router.post('/stock/new', async (req, res) => {

  const stock = req.body.stock;

  new Plate(stock.plate)
    .save()
    .then(savedPlate => {
      return new Stock({
        barcode: stock.barcode,
        name: stock.name,
        optimisation: stock.optimisation,
        plate: savedPlate.id,
        species: stock.species,
        receptorType: stock.receptorType,
        type: stock.type,
      }).save()
    })
    .then(savedStock => {
      res.status(200).json({stock: savedStock});
    })
    .catch(err => {
      console.error('error', err);
      sendError(err, res)
    });

});

router.post('/stock/:id/save', (req, res) => {

  const editedStock = req.body.stock;


  if (editedStock) {

    Stock.findById(editedStock._id)
      .populate('plate')
      .then(dbStock => {
        Object.keys(editedStock.plate).forEach(function (key) {
          if (key) {
            if (dbStock.plate[key] && editedStock.plate[key]) {
              if (key.indexOf('_') !== 0) {
                dbStock.plate[key] = editedStock.plate[key];
              }
            }
          }
        });

        dbStock.plate
          .save()
          .then(savedPlate => {
            return dbStock.save()
          })
          .then(savedStock => {
            return res.status(200).json({stock: savedStock})
          })
          .catch(err => {
            sendError(err, res)
          })


      })
      .catch(err => {
        return res.status(500).json({error: err})
      })
  } else {
    sendError(new Error('stock not found; please try refreshing the web app?'), res)
  }

});

// MASTER
router.post('/master/new', (req, res) => {

  /* ******************************************************************************** **/

  // STRATEGY:
  // 1) PREAMBLE FOR CREATING MASTER
  // 2) UPDATE STOCK I USED
  // 3) CREATE MASTER

  /* ******************************************************************************** **/

  // 1) PREAMBLE FOR CREATING MASTER

  const stockPlateFromPost = req.body.plate;
  const stockPlateId = stockPlateFromPost.id.toObjectId();
  const volumePerNewMasterPlateWell = req.body.volume;
  const replicates = req.body.replicates || 3; // always 3
  const noOfPlates = req.body.noOfPlates;
  const name = req.body.masterName;
  const repsLayout = req.body.repsLayout || 'vertically';
  const masterLayout = parseInt(req.body.masterLayout);
  const noOfSelectedWells = req.body.noOfSelectedWells;
  
  let stockPlateItems = [];
  stockPlateFromPost.items.forEach(item => stockPlateItems.push(item));

  const getInt = (frOrEcStr) => parseInt(frOrEcStr.substring(2));

  if (masterLayout === 0){

    stockPlateItems = stockPlateItems.sort((a, b) =>
      getInt(a.fr) - getInt(b.fr)
    )
  } else if (masterLayout === 1){
    stockPlateItems = stockPlateItems.sort((a, b) =>
      getInt(b.fr) - getInt(a.fr)
    )

  } else if (masterLayout === 2){
    stockPlateItems = stockPlateItems.sort((a, b) =>
      getInt(b.ec) - getInt(a.ec)
    )
    
  } else if (masterLayout === 3){
    // no sort, as masterLayout option is to keep click order
    // stockPlateItems = stockPlateItems;
  } else {
    console.error('error getting sorting strategy')
  }

  if (!stockPlateItems || stockPlateItems === {}){
    console.error('big error stockplate sorting')
  }

  const wellsForMasterPlate = calculateWellsForMasterPlate(stockPlateItems, repsLayout, volumePerNewMasterPlateWell)

  /* ******************************************************************************** **/

  // 2) UPDATE THE CHANGES TO STOCK PLATE

  let stockFromDB = null;
  Stock.find({plate: stockPlateId})
  .populate('plate')
  .then(foundStocks => {
    if (foundStocks && foundStocks.length) {      
      stockFromDB = foundStocks[0];

      const volToTake = volumePerNewMasterPlateWell * replicates * noOfPlates;
      
      const frsTaken = Object.keys(stockPlateItems).map(index => {
        return stockPlateItems[index].fr;
      });

      labels.forEach(label => {
        if (frsTaken.includes(stockFromDB.plate[label].fr)) {          
          stockFromDB.plate[label].volume -= volToTake;
        }
      });

      return stockFromDB.plate.save();

    } else {
      sendError('Stock plate not found (try refreshing web app?)', res);
    }
  })
  .then(() => {
    return stockFromDB.save()
  })

  /* ******************************************************************************** **/

  // 3) CREATE MASTER

  .then((savedStock) => {

    const platePromises = [];
    for (let i = 0; i < noOfPlates; i++) {
      platePromises.push(new MasterPlate(wellsForMasterPlate).save())
    }
    Promise.all(platePromises)
      .then(savedMasterPlates => {
        
        const masterPlateIds = savedMasterPlates.map(sp => sp.id);

        var arrangeByTypeStr = 'Order Selected'
        if (masterLayout === 0){ arrangeByTypeStr = 'Numeric FR'}
        if (masterLayout === 1){ arrangeByTypeStr = 'Reverse-Numeric FR'}
        if (masterLayout === 2){ arrangeByTypeStr = 'Reverse-Numeric EC'}

        const masterInfo = {
          masterPlates: masterPlateIds,
          species: savedStock.species,
          name: name,
          volume: volumePerNewMasterPlateWell,
          stock: savedStock.id,
          numberOfWells: noOfSelectedWells,
          arrangementDirection: repsLayout,
          arrangeByType: arrangeByTypeStr,
          replicates: replicates,
        };
        return new Master(masterInfo).save()
      })
      .then(savedMaster => {

        res.status(200).json({
          master: {
            id: savedMaster._id, 
            _id: savedMaster._id
          }
        });

      })
      .catch(err => {
        console.error('error', err);
        sendError(err, res)
      })
    ;
  });
});

router.get('/master', (req, res) => {

  Master.find({deleted: false})
    .populate('masterPlates') // TEMP
    .then(masters => {
      const sorted = masters.filter(m => !m.deleted).reduce((all, current) => {
        current.active ? all.mastersActive.push(current) : all.mastersRetired.push(current);
        return all;
      }, {mastersActive: [], mastersRetired: []});
      res.status(200).json(sorted)
    })
    .catch(err => {
      sendError(err, res)
    })

});

router.get('/master/:id', (req, res) => {

  Master.findById(req.params.id)
    .populate('masterPlates')
    .then(master => {
      res.status(200).json({master: master})
    })
    .catch(err => {
      sendError(err, res)
    })
});

router.post('/master/:id/retire', (req, res) => {
  Master.findById(req.params.id)
    .then(master => {
      master.active = false;
      return master.save()
    })
    .then(master => {
      return master.populate('plates').execPopulate();
    })
    .then(master => {
      res.status(200).json({active: master.active})
    })
    .catch(err => {
      sendError(err, res)
    })
});
router.post('/master/:id/activate', (req, res) => {
  Master.findById(req.params.id)
    .then(master => {
      master.active = true;
      return master.save()
    })
    .then(master => {
      return master.populate('plates').execPopulate();
    })
    .then(master => {
      res.status(200).json({active: master.active})
    })
    .catch(err => {
      sendError(err, res)
    })
});


router.post('/master/:id/delete', (req, res) => {
  Master.findById(req.params.id)
    .then(master => {
      master.deleted = true;
      return master.save()
    })
    .then(master => {
      return master.populate('plates').execPopulate();
    })
    .then(master => {
      res.status(200).json({active: master.active})
    })
    .catch(err => {
      sendError(err, res)
    })
});


//FREC
router.get('/frec', (req, res) => {

  const ecs = [];


  getAllPlates()
    .then(plates => {
      //get ecs
      plates.map(plate => {
        labels.map(l => {

          let ec = plate[l].ec;
          let fr = plate[l].fr;
          let volume = plate[l].volume;
          let plateID = plate._id;


          if (ec) {


            let filtered = ecs.filter(e => e.ec === ec);

            if (filtered.length) {
              //merge from same plate


              let frsFiltered = filtered[0].frs.filter(f => f.plateID === plateID);
              if (frsFiltered.length) {
                frsFiltered[0].volume += volume;
              } else {
                filtered[0].volume += volume;
                filtered[0].frs.push({fr, volume, plateID})
              }

            } else {
              ecs.push({ec, volume: volume, frs: [{fr, volume, plateID}]});
            }


          }
        })
      });

      res.status(200).json({ecs: ecs})

    })
    .catch(err => {
      sendError(err, res)
    })

});

/** NOT CURRENTLY USED */
router.post('/frec/search', (req, res) => {

  const lookingFor = req.body.id;
  const results = [];

  // Promise.all([
  //   Master.find({deleted: false}).populate('plates'),
  //   Stock.find({deleted: false}).populate('plate'),
  // ])
  //   .then(mastersAndStocks => {
  //
  //     const plates = [];
  //     mastersAndStocks.map(morsGroup => {
  //       morsGroup.map(mors => {
  //
  //         if (mors.plates) {
  //           mors.plates.map(plate => {
  //             plate.type = 'master';
  //             plates.push(plate);
  //           })
  //         }
  //         if (mors.plate) {
  //           mors.plate.type = 'stock';
  //           plates.push(mors.plate)
  //         }
  //
  //       });
  //     });

  getAllPlates().then(plates => {

    plates.map(plate => {
      labels.map(l => {

        let ec = plate[l].ec;
        let fr = plate[l].fr;
        let volume = plate[l].volume;
        let plateID = plate._id;


        if (lookingFor.length && lookingFor.length > 2) {
          if (ec && lookingFor) {

            if (ec.toUpperCase().indexOf(lookingFor.toUpperCase()) > -1) {

              if (!results.filter(r => {
                return r.ec === ec && r.fr === fr && r.volume === volume && r.plateID === plateID
              }).length)

                results.push({ec, fr, volume, plateID})
            }
          }
        }
      })
    });
    res.status(200).json({results: results})
  })
    .catch(err => {
      sendError(err, res);
    })
});


//PLATE

router.get('/plate/:id', (req, res) => {

  let stock = null;
  let master = null;

  const plateId = req.params.id.toObjectId();

  Stock.find({plate: plateId})
    .then(stocks => {
      if (stocks && stocks.length) {
        stock = stocks[0];
      }
      return Master.find({plate: plateId})
    })
    .then(masters => {
      if (masters.length) {
        master = masters[0]
      }
      res.status(200).json({stock, master})
    })
    .catch(err => {
      sendError(err, res);
    })

});


router.post('/plate/:id/take', (req, res) => {

  const volume = req.body.volume | 0;
  Plate.findById(req.params.id)
    .then(plate => {

      labels.map(l => {
        let well = plate[l];
        if (well) {
          well.volume -= volume;
        }
      });

      return plate.save()


    })
    .then(savedPlate => {
      res.status(200).json({plate: savedPlate})
    })
    .catch(err => {
      sendError(err, res);
    })

});

// MASTER PLATE

router.get('/masterPlate/:id', (req, res) => {

  let master = null;

  const masterPlateId = req.params.id.toObjectId();

  Master.find({masterPlate: masterPlateId})
    .then(masters => {
      if (masters && masters.length) {
        master = masters[0];
      }
      res.status(200).json({master})
    })
    .catch(err => {
      sendError(err, res);
    })

});

router.post('/masterPlate/:id/take', (req, res) => {

  const volume = req.body.volume | 0;
  MasterPlate.findById(req.params.id)
    .then(masterPlate => {

      labels.map(l => {
        let well = masterPlate[l];
        if (
          well &&
          well.upper && 
          well.upper.volume    
        ) {
          well.upper.volume -= volume;
          well.lower.volume -= volume;
        }
      });

      return masterPlate.save()

    })
    .then(savedMasterPlate => {
      res.status(200).json({masterPlate: savedMasterPlate})
    })
    .catch(err => {
      sendError(err, res);
    })

});

//AUTH

router.get('/user', (req, res) => {

  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {
    jwt.verify(authorizationHeader.split(' ')[1], JWT_SECRET, function (err, decoded) {

      if (err) {
        res.status(500).json({error: err})
      } else {
        res.status(200).json({user: decoded})
      }

    });

  } else {
    res.status(500).json({error: 'No Bearer header'})
  }
});


// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body && req.body.username && req.body.password) {

    ldap.authenticate(req.body.username, req.body.password)
      .then(user => {
        sign({username: user.username, name: user.displayName})
          .then(token => {
            res.status(200).json({token: token})
          })
          .catch(err => {
            res.status(500).json({error: err})
          })
      })
      .catch(err => {
        res.status(401).json({message: 'Bad credentials'})
      });
  } else {
    res.status(401).json({message: 'Incomplete credentials'})
  }
});

router.get('/logout', (req, res) => {
  res.sendStatus(200)
});
router.post('/logout', (req, res) => {
  res.sendStatus(200)
});

router.get('/ec-rc-names', async (req, res) => {

  var namedConstructs = await ECNames.find({})
  namedConstructs = (namedConstructs && namedConstructs.length) ? namedConstructs : [];
  const listOfMongoNumbers = namedConstructs.map(c => c.number)
  
  // find new EC names from masters AND plates
  var masters = await Master.find({deleted: false}).populate('masterPlates');

  var uniqueEcNumbers = []  

  masters.forEach(master => {

    master.masterPlates.forEach(plate => {
      labels.forEach(label => {
        if (plate[label] && plate[label].upper && plate[label].upper.ec){
          if (!uniqueEcNumbers.includes(plate[label].upper.ec)) {
            uniqueEcNumbers.push(plate[label].upper.ec)
          }
        }
        if (plate[label] && plate[label].lower && plate[label].lower.ec){
          if (!uniqueEcNumbers.includes(plate[label].lower.ec)) {
            uniqueEcNumbers.push(plate[label].lower.ec)
          }
        }
      })
    })
  })

  var stocks = await Stock.find({deleted: false}).populate('plate');

  var reachedLabelLoop = 0;
  var foundEc = 0;
  var cannotFindEc = 0;
  var mustPushEcNo = 0;
  var noPushAlreadyEcNo = 0;

  stocks.forEach(stock => {
    // var plate = stock.plate;
    labels.forEach((label, index) => {
      reachedLabelLoop++;
      if (stock.plate[label] && stock.plate[label] && stock.plate[label].ec){
        foundEc++;
        if (!uniqueEcNumbers.includes(stock.plate[label].ec)) {
          mustPushEcNo++
          uniqueEcNumbers.push(stock.plate[label].ec)
        } else {
          noPushAlreadyEcNo++
        }
      } else {
        cannotFindEc++
      }
    })
  })

  // superfluous
  const extraUniqueEcNumbers = [...new Set(uniqueEcNumbers.reduce((flat, val) => flat.concat(val), []))];

  // populate ACTIVE ec numbers with names from DB
  const foundEcNumbersWithAttachedNames = extraUniqueEcNumbers.map(ecNo => {
    // if name, provide it (safe javascript method)
    const foundName = 
      (namedConstructs.find(ecObj => ecObj.number === ecNo) && namedConstructs.find(ecObj => ecObj.number === ecNo).name)
      ? namedConstructs.find(ecObj => ecObj.number === ecNo).name 
      : null
    ;
    return {
      name: foundName,
      number: ecNo,
    }
  })

  // update DB with new EC numbers found in ACTIVE
  await Promise.all(extraUniqueEcNumbers.map(async (number) => {
    if (!listOfMongoNumbers.includes(number)) {
      await (await new ECNames({number, name: ''})).save();
    }
  }))  
  
  const updatedNamedConstructs = await ECNames.find({})
  
  res.send({
    namedConstructs: foundEcNumbersWithAttachedNames,
    debugging: [
      'stocks.length', stocks.length,
      'masters.length', masters.length,
      'first/only stock:', stocks[0].plate['a1'],
      'uniqueEcNumbers', uniqueEcNumbers, 
      'extraUniqueEcNumbers', extraUniqueEcNumbers,
      'foundEcNumbersWithAttachedNames', foundEcNumbersWithAttachedNames,
      'reachedLabelLoop', reachedLabelLoop,
      'foundEc', foundEc,
      'cannotFindEc', cannotFindEc,
      'mustPushEcNo', mustPushEcNo,
      'noPushAlreadyEcNo', noPushAlreadyEcNo,     
      
      //updatedNamedConstructs[0], 
      // { "_id": "616d56ef8ebf69829ca236ca", "number": "EC76076", "name": "jio", "__v": 0 }
      
      //foundEcNumbersWithAttachedNames[0],
      // { "name": { "_id": "616d56ef8ebf69829ca236ca", "number": "EC76076", "name": "jio", "__v": 0 }, "number": "EC76076" }
    ],
  })
});

router.post('/ec-rc-names/new', async (req, res) => {

  const oldFields = req.body.initiallyFetchedNamedConstructs;
  
  // TODO refactor these stupid names:
    // {fetchedNumber [i.e. the EC 7-digit code], number [i.e. the new string name]}
  const changedFields = req.body.changedFields; 

  await Promise.all(changedFields.map(async (changedField) => {
    const targets = await ECNames.find(
      {number: changedField.fetchedNumber}
    )
    const target = targets[0]
    target.name = changedField.number
    await target.save()
  }));

  var namedConstructs = await ECNames.find({})
  namedConstructs = (namedConstructs && namedConstructs.length) ? namedConstructs : [];

  res.send({
    updatedNamedConstructs: namedConstructs,
  })
});

router.post('/search', async (req, res) => {
  const { query } = req.body; 

  // we need to search both stocks and masters
  
  // find all EC and FR codes and plateNames in stocks
  var stocks = await Stock.find({deleted: false}).populate('plate')

  var stockTargetObjs = [];

  stocks.forEach(stock => {
    labels.forEach(label => {
      if (stock.plate[label] && stock.plate[label] && stock.plate[label].ec){
        const currentEcNumbers = stockTargetObjs.map(obj => obj.ec)
        if (!currentEcNumbers.includes(stock.plate[label].ec)) {
          stockTargetObjs.push({
            ec: stock.plate[label].ec,
            fr: stock.plate[label].fr,
          })}
      }
    })
  })
  
  // find all EC and FR codes and plateNames in masters
  var masters = await Master.find({deleted: false}).populate('masterPlates');
  
  var duplicatedEcNumbersAndFrsFromPlates = [];  

  var plateCount = 0;
  var labelCount = 0;
  var ecInUpperCount = 0;
  var ecNotInUpperOrLowerCount = 0;
  var ecInLowerCount = 0;

  masters.forEach(master => {

    master.masterPlates.forEach(plate => {

      plateCount++

      labels.forEach(label => {
        labelCount++
      
        const plateLabel = plate[label]
      
        const plateLabelUpper = plateLabel && plateLabel.upper
        const plateLabelUpperEc = plateLabel && plateLabelUpper && plateLabelUpper.ec
        const plateLabelUpperEcBool = !!(plate[label] && plate[label].upper && plate[label].upper.ec);
      
        const plateLabelLower = plateLabel && plateLabel.lower
        const plateLabelLowerEc = plateLabel && plateLabelLower && plateLabelLower.ec
        const plateLabelLowerEcBool = !!(plate[label] && plate[label].lower && plate[label].lower.ec);
  
        if (plateLabelUpperEcBool){
          ecInUpperCount++
          duplicatedEcNumbersAndFrsFromPlates.push({
            ec: plateLabelUpperEc, 
            fr: plateLabelUpper.fr, 
            plateName: master.name,
            upperOrLower: 'upper',
            speciesName: master.species,
          })
        } 
        if (plateLabelLowerEcBool){
          ecInLowerCount++
          duplicatedEcNumbersAndFrsFromPlates.push({
            ec: plateLabelLowerEc, 
            fr: plateLabelLower.fr, 
            plateName: master.name,
            upperOrLower: 'lower',
            speciesName: master.species,
          })
        } 
        if (!plateLabelUpperEcBool && !plateLabelLowerEcBool) {
          ecNotInUpperOrLowerCount++;
        }
      });
    })
  })
  
  // MAKE UNIQUE
  let uniqueEcNumbersAndFrsFromPlatesAndStocks = [];
  // plates
  duplicatedEcNumbersAndFrsFromPlates.forEach(obj => {
    const ecNumbersJustAdded = uniqueEcNumbersAndFrsFromPlatesAndStocks.map(uniqueObj => uniqueObj.ec)
    if (!ecNumbersJustAdded.includes(obj.ec)){
      uniqueEcNumbersAndFrsFromPlatesAndStocks.push({
        ec: obj.ec,
        fr: obj.fr,
        upperOrLower: obj.upperOrLower,
        plates: [obj.plateName],
        species: [obj.speciesName]
      })
    } else {
      uniqueEcNumbersAndFrsFromPlatesAndStocks.forEach(plateObj => {
        if (plateObj.ec === obj.ec && !plateObj.plates.includes(obj.plateName)){
          plateObj.plates.push(obj.plateName)
          plateObj.species.push(obj.speciesName)
        }
      })
    }
  })
  // stocks
  stockTargetObjs.forEach(obj => {
    const ecNumbersJustAdded = uniqueEcNumbersAndFrsFromPlatesAndStocks.map(uniqueObj => uniqueObj.ec)
    if (!ecNumbersJustAdded.includes(obj.ec)){
      uniqueEcNumbersAndFrsFromPlatesAndStocks.push({
        ec: obj.ec,
        fr: obj.fr,
        upperOrLower: null,
        plates: [],
        species: [],
      })
    }
  })
  
  // ADD EC NAMES
  const mongoEcObjs = await ECNames.find({});

  const allUniqueEcsWithNamesAsObjects = uniqueEcNumbersAndFrsFromPlatesAndStocks.map(ecAndFrObj => {
    // default is blank
    let targetName = '';
    
    // see if name
    const targetMongoEcNames = mongoEcObjs.filter(mongoEcObj => {
      if (mongoEcObj.name && mongoEcObj.number === ecAndFrObj.ec){
        return mongoEcObj.name;
      }
    });
    if (targetMongoEcNames.length){
      targetName = targetMongoEcNames[0].name;
    }

    return {
      'name': targetName,
      'number': ecAndFrObj.ec,
      'frNumber': ecAndFrObj.fr,
      'plates': ecAndFrObj.plates,
      'species': ecAndFrObj.species,
    }
  })

  // apply filter
  const matchedUniqueEcObjects = allUniqueEcsWithNamesAsObjects.filter(ecObj => {
    const nameMatchBool = !!(ecObj.name && ecObj.name.length && ecObj.name.toLowerCase().includes(query.toLowerCase()));
    const numberMatchBool = !!(ecObj.number && ecObj.number.length && ecObj.number.toLowerCase().includes(query.toLowerCase()));
    const frMatchBool = !!(ecObj.frNumber && ecObj.frNumber.length && ecObj.frNumber.toLowerCase().includes(query.toLowerCase()));
    
    let platesMatchBool = !!(ecObj.plates && ecObj.plates.length && ecObj.plates.toString().toLowerCase().includes(query.toLowerCase()))
    let speciesMatchBool = !!(ecObj.species && ecObj.species.length && ecObj.species.toString().toLowerCase().includes(query.toLowerCase()))
    
    return (nameMatchBool || numberMatchBool || frMatchBool || platesMatchBool || speciesMatchBool);      
  });
    
  res.send({
    debugging: {
      'mastersLength': masters.length,
      'clay': 93,
      'allUniqueEcsWithNamesAsObjects': allUniqueEcsWithNamesAsObjects,
      'mongoEcObjs': mongoEcObjs,
      'stockTargetObjs': stockTargetObjs,
      'uniqueEcNumbersAndFrsFromPlatesAndStocks': uniqueEcNumbersAndFrsFromPlatesAndStocks,
      'duplicatedEcNumbersAndFrsFromPlates': duplicatedEcNumbersAndFrsFromPlates,
      'plateCount': plateCount,
      'labelCount': labelCount,
      'ecInUpperCount': ecInUpperCount,
      'ecNotInUpperOrLowerCount': ecNotInUpperOrLowerCount,
      'ecInLowerCount': ecInLowerCount,
      'firstPlate': masters[0].masterPlates[0],
    },
    results: matchedUniqueEcObjects,
  })
});

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
