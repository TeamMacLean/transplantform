import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';

try {
  mongoose.connect('mongodb://localhost:27017/fridge', {useNewUrlParser: true});
} catch (err) {
  console.error(err);
}
const Schema = mongoose.Schema;

// const Fridge = mongoose.model('Fridge', {name: String});
// const Master = mongoose.model('Master', {name: String});
// const Well = mongoose.model('Well', {name: String});


const Plate = mongoose.model(
  'Plate',
  {
    a1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    a12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    b1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    b12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    c1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    c12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    d1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    d12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    e1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    e12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    f1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    f12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    g1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    g12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},

    h1: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h2: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h3: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h4: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h5: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h6: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h7: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h8: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h9: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h10: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h11: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
    h12: {name: {type: String, default: 'UNKNOWN', required: true}, val: {type: Number, default: 900, required: true}},
  }
);

const Stock = mongoose.model('Stock', {
  plate: {
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true,
  }
});

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
  Stock.findOne({})
    .populate('plate')
    .then(stock => {
      if (stock) {
        // console.log('sending', stock);
        res.status(200).json({stock: stock})
      } else {
        res.status(500).json({error: new Error('no stock found')})
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
});

router.post('/stock', (req, res) => {

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
            return res.status(500).json({error: err})
          })


      })
      .catch(err => {
        return res.status(500).json({error: err})
      })
  } else {
    return res.status(500).json({error: new Error('stock not found')})
  }

});


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
        console.error(err);
        res.status(401).json({message: 'Bad credentials'})
      });
  } else {
    res.status(401).json({message: 'Bad credentials'})
  }
});


router.get('/logout', (req, res) => {
  res.redirect('/')
});
router.post('/logout', (req, res) => {
  res.redirect('/')
});

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
