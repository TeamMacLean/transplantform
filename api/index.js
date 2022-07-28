import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

import { getUserInfo } from '../modules/authUtilities';
import sendEmail from '../modules/sendEmail';

// TODO strip this back to original state as it does not impact the server's hot reloading
import { Plate as ImportPlate } from './models';
const { Plate } = mongoose.models.Plate || mongoose.model('Plate', ImportPlate);

try {
  mongoose.connect('mongodb://localhost:27017/transplantform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} catch (err) {
  console.error(err);
}

const ObjectId = mongoose.Types.ObjectId;

String.prototype.toObjectId = function () {
  return new ObjectId(this.toString());
};

// TODO: remove or update all sendErrors
function sendError(error, res, code) {
  console.error(error);
  res.status(code || 500).json({ error: error });
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
  next();
});

const JWT_SECRET = process.env.JWT_SECRET;

async function sign(user) {
  return jwt.sign(user, JWT_SECRET);
}

//AUTH

router.get('/user', (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {
    jwt.verify(
      authorizationHeader.split(' ')[1],
      JWT_SECRET,
      function (err, decoded) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          //this.$store.dispatch('setUser', decoded);
          res.status(200).json({ user: decoded });
        }
      }
    );
  } else {
    res.status(500).json({ error: 'No Bearer header' });
  }
});

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    ldap
      .authenticate(req.body.username, req.body.password)
      .then((user) => {
        const userIsAdmin = !!process.env.ADMINS.includes(req.body.username);

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
          .then((token) => {
            res.status(200).json({ token: token });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(401).json({ message: 'Bad credentials' });
      });
  } else {
    res.status(401).json({ message: 'Incomplete credentials' });
  }
});

router.get('/logout', (req, res) => {
  //this.$store.dispatch('setUser', null);

  res.sendStatus(200);
});
router.post('/logout', (req, res) => {
  //this.$store.dispatch('setUser', null);
  res.sendStatus(200);
});

router.post('/form/new', async (req, res) => {
  try {
    // discover status of form
    let status = 'unapproved';
    if (newFormEntry.isGroupLeaderFor || newFormEntry.isAdmin) {
      // update MongoDB with request approval
      status = 'approved';
    }

    // new form into MongoDB, get ID in response (frontend already validated)
    // const newFormEntry = await Form.create({
    //   ...req.body,
    //   status: status,
    // });
    const newFormEntry = { ...req.body };

    if (!newFormEntry.id /* error */) {
      // TODO correct status code and mongo error message format / test
      res.send({ status: 'error', error: newFormEntry.error });
      console.error(newFormEntry.error);
    } else {
      if (status === 'unapproved') {
        // send Email to group leader and CC research assistant
        const emailResults = await sendEmail(newFormEntry);
        // TODO handle email error result
      }

      res.send({ status: 200, id: 'TRF12' });
    }
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/search', async (req, res) => {
  const { query } = req.body;

  //var stocks = await Stock.find({deleted: false}).populate('plate')

  res.send({
    debugging: {
      mastersLength: 2,
    },
    results: 'matchedUniqueEcObjects',
  });
});

// Export the server middleware
export default {
  path: '/api',
  handler: router,
};
