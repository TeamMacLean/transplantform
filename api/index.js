import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

import { getUserInfo } from '../modules/authUtilities';

// TODO strip this back to original state as it does not impact the server's hot reloading
import {Plate as ImportPlate} from './models'
const { Plate } = mongoose.models.Plate || mongoose.model('Plate', ImportPlate);

try {
  mongoose.connect('mongodb://localhost:27017/transplantform', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  });
} catch (err) {
  console.error(err);
}

const ObjectId = mongoose.Types.ObjectId;

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

        const userIsAdmin = !!(process.env.ADMINS.includes(req.body.username));

        // TODO turn async
        const userInfo = getUserInfo({
          username: req.body.username,
          isAdmin: userIsAdmin,
          memberOf: user.memberOf,
        });

        sign({
          username: req.body.username, 
          name: user.displayName, 
          isAdmin: userIsAdmin,
          isGroupLeaderForObj: userInfo.isGroupLeaderForObj,
          isResearchAssistantFor: userInfo.isResearchAssistantFor,
          signatories: userInfo.signatories, 
        }) //cannot use entire user object as too big
        .then(token => {
          res.status(200).json({token: token})
        }).catch(err => {
          res.status(500).json({error: err})
        })
      }).catch(err => {
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

router.post('/form/new', (req, res) => {

  // assume correct inputs (frontend should filter)

  // new form into MongoDB, get ID in response
  // IDs are TRF1, TRF2, etc.

  res.send({status: 200, id: '123'})
});

router.post('/search', async (req, res) => {
  const { query } = req.body; 

  //var stocks = await Stock.find({deleted: false}).populate('plate')

  res.send({
    debugging: {
      'mastersLength': 2,
    },
    results: 'matchedUniqueEcObjects',
  })
});

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
