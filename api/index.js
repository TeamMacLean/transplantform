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
  plate: {
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true

  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
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

  Stock.find({})
    .then(stocks => {
      const sorted = stocks.reduce((all, current) => {
        current.active ? all.stocksActive.push(current) : all.stocksRetired.push(current);
        return all;
      }, {stocksActive: [], stocksRetired: []});
      res.status(200).json(sorted)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })

});

router.get('/stock/:id', (req, res) => {
  Stock.findById(req.params.id)
    .populate('plate')
    .then(stock => {
      res.status(200).json({stock: stock})
    })
    .catch(err => {
      res.status(500).json({error: err})
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
      res.status(200).json({stock: stock})
    })
    .catch(err => {
      res.status(500).json({error: err})
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
      res.status(200).json({stock: stock})
    })
    .catch(err => {
      res.status(500).json({error: err})
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
      res.sendStatus(200);
    })
    .catch(err => {
      console.error('error', err);
      res.status(500).json({error: err})
    });

});

// router.post('/stock', (req, res) => {
//
//   const editedStock = req.body.stock;
//
//
//   if (editedStock) {
//
//     Stock.findById(editedStock._id)
//       .populate('plate')
//       .then(dbStock => {
//         Object.keys(editedStock.plate).forEach(function (key) {
//           if (key) {
//             if (dbStock.plate[key] && editedStock.plate[key]) {
//               if (key.indexOf('_') !== 0) {
//                 dbStock.plate[key] = editedStock.plate[key];
//               }
//             }
//           }
//         });
//
//         dbStock.plate
//           .save()
//           .then(savedPlate => {
//             return dbStock.save()
//           })
//           .then(savedStock => {
//             return res.status(200).json({stock: savedStock})
//           })
//           .catch(err => {
//             return res.status(500).json({error: err})
//           })
//
//
//       })
//       .catch(err => {
//         return res.status(500).json({error: err})
//       })
//   } else {
//     return res.status(500).json({error: new Error('stock not found')})
//   }
//
// });


router.get('/master', (req, res) => {

  Master.find({})
    .then(stocks => {

      const sorted = stocks.reduce((all, current) => {
        current.active ? all.mastersActive.push(current) : all.mastersRetired.push(current);
        return all;
      }, {mastersActive: [], mastersRetired: []});

      res.status(200).json(sorted)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })

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
