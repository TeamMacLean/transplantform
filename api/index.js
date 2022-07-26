import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

// TODO strip this back to original state as it does not impact the server's hot reloading
import {Plate as ImportPlate, Master as ImportMaster, Stock as ImportStock, MasterPlate as ImportMasterPlate, ECNames as ImportECNames} from './models'
const { Plate } = mongoose.models.Plate || mongoose.model('Plate', ImportPlate);
const { Master } = mongoose.models.Master || mongoose.model('Master', ImportMaster);
const { Stock } = mongoose.models.Stock || mongoose.model('Stock', ImportStock);
const { MasterPlate } = mongoose.models.MasterPlate || mongoose.model('MasterPlate', ImportMasterPlate);
const { ECNames } = mongoose.models.ECNames || mongoose.model('ECNames', ImportECNames); 

try {
  mongoose.connect('mongodb://localhost:27017/transplantform', {
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

//AUTH

router.get('/user', (req, res) => {

  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {
    jwt.verify(authorizationHeader.split(' ')[1], JWT_SECRET, function (err, decoded) {

      if (err) {
        res.status(500).json({error: err})
      } else {
        //this.$store.dispatch('setUser', decoded);
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
        sign({username: user.username, name: user.displayName}) //cannot use user object as too big
          .then(token => {
            //this.$store.dispatch('setUser', decoded);
            res.status(200).json({token: token/*, user: user*/})
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
  //this.$store.dispatch('setUser', null);
  
  res.sendStatus(200)
});
router.post('/logout', (req, res) => {
  //this.$store.dispatch('setUser', null);
  res.sendStatus(200)
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
