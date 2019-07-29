import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

try {
  mongoose.connect('mongodb://localhost:27017/fridge', {useNewUrlParser: true});
} catch (err) {
  console.error(err);
}
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// const Fridge = mongoose.model('Fridge', {name: String});
// const Master = mongoose.model('Master', {name: String});
// const Well = mongoose.model('Well', {name: String});

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

const labelsFlatAlphabetical = [].concat.apply([], _.zip.apply(_, _.chunk(labels, 12)));

String.prototype.toObjectId = function () {
  return new ObjectId(this.toString());
};

const Plate = mongoose.model(
  'Plate',

  {
    a1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    b1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    c1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    d1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    e1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    f1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    g1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    h1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
  }
);

const Stock = mongoose.model('Stock', {
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  plate: {
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true

  },
  barcode: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  }
});

const Master = mongoose.model('Master', {
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  plates: [{
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true
  }],
  barcode: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  }
});


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

  Stock.find({})
    .then(stocks => {
      const sorted = stocks.reduce((all, current) => {
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

router.post('/stock/new', (req, res) => {

  const stock = req.body.stock;

  new Plate(stock.plate)
    .save()
    .then(savedPlate => {
      return new Stock({
        plate: savedPlate.id,
        barcode: stock.barcode,
        species: stock.species,
        name: stock.name
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
    sendError(new Error('stock not found'), res)
  }

});


//MASTER

router.post('/master/new', (req, res) => {


  const stockPlateFromPost = req.body.plate;
  const volumeToTransfer = req.body.volume;

  const replicates = req.body.replicates;
  const noOfPlates = req.body.noOfPlates;
  const layout = req.body.layout;

  const name = req.body.masterName;


  let sortingMethod = Array.prototype.sort;


  if (layout === 0) {
    sortingMethod = (a, b) => (a.fr > b.fr) ? 1 : ((b.fr > a.fr) ? -1 : 0);
  } else if (layout === 1) {
    sortingMethod = (a, b) => (a.fr > b.fr) ? -1 : ((b.fr > a.fr) ? 1 : 0);
  } else {
    //dont sort
  }
  stockPlateFromPost.items.sort(sortingMethod);

  const plateID = stockPlateFromPost.id.toObjectId();

  let stockFromDB = null;

  Stock.find({plate: plateID})
    .populate('plate')
    .then(foundStocks => {
      if (foundStocks && foundStocks.length) {

        stockFromDB = foundStocks[0];

        stockPlateFromPost.items.map(item => {
          if (stockFromDB.plate[item.well]) {
            stockFromDB.plate[item.well].volume -= volumeToTransfer * replicates * noOfPlates;
          }
        });

        return stockFromDB.plate.save();

      } else {
        sendError('Stock plate not found', res);
      }
    })
    .then(() => {
      return stockFromDB.save()
    })
    .then((savedStock) => {

      let newWells = {};

      const replicatedItems = [].concat.apply([], stockPlateFromPost.items.map(i => {
        let out = [];
        for (let ii = 0; ii < replicates; ii++) {
          out.push(i)
        }
        return out;
      }));

      const keys = labelsFlatAlphabetical.slice(2);

      replicatedItems.map((item, indx) => {
        newWells[keys[indx]] = {ec: item.ec, fr: item.ec, volume: volumeToTransfer}
      });


      const platePromises = [];
      for (let i = 0; i < noOfPlates; i++) {
        platePromises.push(new Plate(newWells).save())
      }

      Promise.all(platePromises)
        .then(savedPlates => {

          //ids
          const plateIds = savedPlates.map(sp => sp.id);

          return new Master({
            plates: plateIds,
            barcode: savedStock.barcode,
            species: savedStock.species,
            name: name,
            stock: savedStock.id
          }).save()
        })
        .then(savedMaster => {
          res.status(200).json({master: {id: savedMaster._id, _id: savedMaster._id}});
        })
        .catch(err => {
          console.error('error', err);
          sendError(err, res)
        });
    });


});


router.get('/master', (req, res) => {

  Master.find({})
    .then(masters => {
      const sorted = masters.reduce((all, current) => {
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
    .populate('plates')
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
      return master.populate('plate').execPopulate();
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
      return master.populate('plate').execPopulate();
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


  Plate.find({})
    .then(plates => {
      //get ecs
      plates.map(plate => {
        labels.map(l => {
          let ec = plate[l].ec;
          let fr = plate[l].fr;
          let volume = plate[l].volume;
          let plateID = plate._id;
          if (ec) {

            //exists
            let filtered = ecs.filter(e => e.ec === ec);
            let exists = filtered.length;

            //add if not
            if (!exists) {
              ecs.push({ec, volume: volume, frs: [{fr, volume, plateID}]});
            } else {
              //add frs
              filtered[0].volume += volume;
              filtered[0].frs.push({fr, volume, plateID})
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
    res.status(401).json({message: 'Bad credentials'})
  }
});

router.get('/logout', (req, res) => {
  // res.redirect('/')
  res.sendStatus(200)
});
router.post('/logout', (req, res) => {
  // res.redirect('/')
  res.sendStatus(200)
});

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
