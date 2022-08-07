import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

import sendEmail from '../modules/sendEmail';

import {
  Form,
  Group,
  Specie,
  Genotype,
  VectorSelection,
  TdnaSelection,
  AgroStrain,
  Admin,
} from './models';

try {
  mongoose.connect('mongodb://localhost:27017/transplantform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
} catch (err) {
  console.error(err);
}

// Replace update() with updateOne(), updateMany(), or replaceOne()
// Replace remove() with deleteOne() or deleteMany().
// Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection (no filter). In the latter case, use estimatedDocumentCount().

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
router.post('/login', async (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    ldap
      .authenticate(req.body.username, req.body.password)
      .then(async (user) => {
        //console.log('debug about to get admins');
        const adminDocs = await Admin.find({});
        //const admins = JSON.parse(JSON.stringify(adminsRes));

        const admins = adminDocs.map((admin) => admin.name);

        const userIsAdmin = admins.includes(req.body.username);
        //console.log('userIsAdmin', userIsAdmin);

        const allLdapGroups = await Group.find({});
        //console.log('debug find all groups', allLdapGroups);
        const isGroupLeaderForObj =
          allLdapGroups.find((group) => group.username === req.body.username) ||
          null;
        // console.log('debug just assigned group, now will assign RA');
        const isResearchAssistantForObj =
          allLdapGroups.find((group) => {
            group.researchAssistants.includes(req.body.username);
            const res = group.researchAssistants.includes(req.body.username);
            return res;
          }) || null;
        const isResearchAssistantFor = isResearchAssistantForObj
          ? isResearchAssistantForObj.name
          : null;

        var signatories = [];
        // console.log('debug about to sign signatory');
        if (userIsAdmin) {
          signatories = allLdapGroups;
          // console.log('userisadmin');
        } else if (isGroupLeaderForObj) {
          signatories = isGroupLeaderForObj;
          // console.log('debug is group leader');
        } else if (isResearchAssistantFor) {
          signatories = isResearchAssistantForObj;
          // console.log('debug is research assistant');
        } else {
          // console.log('about to loop through user.memberOf');

          user.memberOf.forEach((ldapGroupStr) => {
            allLdapGroups.forEach((ldapGroup) => {
              const alreadySignatoryUsernames = signatories.map(
                (signatory) => signatory.username
              );
              if (
                ldapGroup.ldapGroups.includes(ldapGroupStr) &&
                !alreadySignatoryUsernames.includes(ldapGroup.username)
              ) {
                signatories.push(ldapGroup);
              }
            });
          });
        }
        const abridgedSignatories = signatories.map((signatory) => ({
          name: signatory.name,
          username: signatory.username,
        }));
        // console.log('about to assign signObj');

        // console.log('username', req.body.username);
        // console.log('suerdisplayname', user.displayName);
        // console.log('isAdmin', userIsAdmin);
        // console.log('isGL', isGroupLeaderForObj);
        // console.log('isRA', isResearchAssistantFor);
        // console.log('signos', abridgedSignatories);

        const signObj = {
          username: req.body.username,
          name: user.displayName,
          isAdmin: userIsAdmin,
          isGroupLeaderForObj: isGroupLeaderForObj,
          isResearchAssistantFor: isResearchAssistantFor,
          signatories: abridgedSignatories,
        };
        // testing
        // const signObj = {
        //   username: 'test',
        //   name: 'Peter Edgar',
        //   isAdmin: false,
        //   isGroupLeaderForObj: {},
        //   isResearchAssistantFor: null,
        //   signatories: [{ username: 'talbotn', name: 'Nick Talbot' }],
        // };

        sign(signObj) //cannot use entire user object as too big
          .then((token) => {
            // console.log('signObj was SUCCESS:', signObj);
            res.status(200).json({ token: token });
          })
          .catch((err) => {
            // console.log(err, 'ERRORNEOUS');
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
    let status = 'pending approval';
    if (newFormEntry.isGroupLeaderFor || newFormEntry.isAdmin) {
      // update MongoDB with request approval
      status = 'approved';
    }

    // new form into MongoDB, get ID in response (frontend already validated)
    // const newFormEntry = await Form.create({
    //   ...req.body,
    //   status: status,
    // });
    const newFormEntry = { ...req.body /** NB STATUS */ };

    if (!newFormEntry.id /* error */) {
      // TODO correct status code and mongo error message format / test
      res.send({ status: 'error', error: newFormEntry.error });
      console.error(newFormEntry.error);
    } else {
      if (status === 'pending approval') {
        // send Email to group leader and CC research assistant
        // const emailResults = await sendEmail('approval', newFormEntry);
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

router.post('/form/delete', async (req, res) => {
  try {
    // /**const result = */await Form.findByIdAndUpdate(req.body.id, {
    //   $set: {
    //     status: 'deleted',
    //   },
    // });

    // send Email to group leader and user and admin
    // const emailResults = await sendEmail('deletion', { ...req.body });

    res.send({ status: 200 });
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/approve', async (req, res) => {
  try {
    // /**const result = */await Form.findByIdAndUpdate(req.body.id, {
    //   $set: {
    //     status: 'approved',
    //   },
    // });

    // probably should email admin to update them, but they didnt ask for this feature

    res.send({ status: 200 });
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/deny', async (req, res) => {
  try {
    // /**const result = */await Form.findByIdAndUpdate(req.body.id, {
    //   $set: {
    //     status: 'denied',
    //   },
    // });

    res.send({ status: 200 });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/inprogress', async (req, res) => {
  try {
    const { id, constructs } = req.body;

    // /**const result = */await Form.findByIdAndUpdate(id, {
    //   $set: {
    //     status: 'in progress',
    //     constructs: constructs,
    //   },
    // });

    // could email user but they didnt ask for this feature

    // send Email to admin (though unnecessary it was requested)
    // const emailResults = await sendEmail('in progress', { ...req.body });

    res.send({ status: 200 });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/completed', async (req, res) => {
  try {
    // /**const result = */await Form.findByIdAndUpdate(req.body.id, {
    //   $set: {
    //     status: 'completed',
    //   },
    // });
    // send Email to admin (though unnecessary it was requested)
    // const emailResults = await sendEmail('in progress', { ...req.body });

    res.send({ status: 200 });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

// get everything needed for admin page
router.get('/admin/', async (req, res) => {
  try {
    const admins = await Admin.find({});
    const species = await Specie.find({});
    const genotypes = await Genotype.find({});
    const vectorSelections = await VectorSelection.find({});
    const tdnaSelections = await TdnaSelection.find({});
    const agroStrains = await AgroStrain.find({});
    const groups = await Group.find({});

    // TODO ensure sorted by createdAt

    res.send({
      status: 200,
      admins,
      species,
      genotypes,
      vectorSelections,
      tdnaSelections,
      agroStrains,
      groups,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/admin/active', async (req, res) => {
  const { query } = req.body;
  res.send({ status: 200 });
});

router.post('/admin/group', async (req, res) => {
  const { query } = req.body;
  res.send({ status: 200 });
});

router.post('/admin/additional', async (req, res) => {
  const { query } = req.body;
  res.send({ status: 200 });
});

// TODO still untested
router.get('/constructs', async (req, res) => {
  try {
    const forms = await Form.find({});
    const nestedConstructs = forms.map((form) => form.constructs);
    const flatConstructs = nestedConstructs.flat();

    // TODO ensure sorted by createdAt

    res.send({
      status: 200,
      constructs: flatConstructs,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find({});
    // TODO ensure sorted by createdAt

    res.send({
      status: 200,
      forms,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

// Export the server middleware
export default {
  path: '/api',
  handler: router,
};
