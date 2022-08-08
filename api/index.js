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
          _id: signatory._id.toString(),
          researchAssistants: signatory.researchAssistants,
        }));

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

router.get('/form/new', async (req, res) => {
  try {
    const species = await Specie.find({});
    const genotypes = await Genotype.find({});
    const vectorSelections = await VectorSelection.find({});
    const tdnaSelections = await TdnaSelection.find({});
    const agroStrains = await AgroStrain.find({});
    const forms = await Form.find({});
    const nestedConstructs = forms.map((form) => form.constructs);
    const flatConstructs = nestedConstructs.flat();
    const previousConstructNames = flatConstructs.map(
      (construct) => construct.constructName
    );

    res.send({
      status: 200,
      species,
      genotypes,
      vectorSelections,
      tdnaSelections,
      agroStrains,
      previousConstructNames,
    });
  } catch (error) {
    res.send({ status: 500, error: error });
    console.error(error);
  }
});

router.post('/form/new', async (req, res) => {
  try {
    const {
      date,
      username,
      creatorIsAdmin,
      creatorIsGroupLeader,
      signatoryObj,
      species,
      genotype,
      constructs,
      notes,
    } = req.body;

    let status =
      creatorIsGroupLeader || creatorIsAdmin ? 'approved' : 'pending approval';

    const signatoryId = signatoryObj._id;
    const signatoryObjectId = mongoose.Types.ObjectId(signatoryId);

    // calculate new TRF ID
    const forms = await Form.find({});
    const trfIds = forms.map((f) => f.trfId);
    var counter = 1;
    var newTrfIdStr = 'TRF' + counter;
    function recurseCheck(trfIdToCheck, counter) {
      if (trfIds.includes(trfIdToCheck)) {
        counter++;
        trfIdToCheck = 'TRF' + counter;
        return recurseCheck(trfIdToCheck, counter);
      } else {
        return trfIdToCheck;
      }
    }
    newTrfIdStr = recurseCheck(newTrfIdStr, counter);

    const newFormEntry = await Form.create({
      date: date,
      username: username,
      creatorIsAdmin: creatorIsAdmin,
      creatorIsGroupLeader: creatorIsGroupLeader,
      signatoryId: signatoryObjectId,
      species: species,
      genotype: genotype,
      constructs: constructs,
      notes: notes,
      status: status,
      trfId: newTrfIdStr,
    });

    const allGenotypes = await Genotype.find({});
    const allGenotypeNames = allGenotypes.map((genotype) =>
      genotype.name.toLowerCase()
    );
    if (!allGenotypeNames.includes(genotype.toLowerCase())) {
      await Genotype.create({
        name: genotype,
        archived: false,
      });
    }

    if (!newFormEntry._id /* error */) {
      res.send({ status: 'error', error: newFormEntry.error });
      console.error(newFormEntry.error);
    } else {
      if (status === 'pending approval') {
        // send Email to group leader and CC research assistant
        const emailResults = await sendEmail('approval', {
          signatoryObj,
          trfId: newTrfIdStr,
        });
      }

      res.send({ status: 200, trfId: newTrfIdStr });
    }
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/delete', async (req, res) => {
  try {
    const { trfId, signatoryObj, username } = req.body;
    const result = await Form.updateOne(
      { trfId: trfId },
      {
        $set: {
          status: 'deleted',
        },
      }
    );

    if (result.ok) {
      // send Email to group leader and user and admin
      // const emailResults = await sendEmail('deletion', { trfId, signatoryObj, username });

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/approve', async (req, res) => {
  try {
    const { trfId } = req.body;
    const result = await Form.updateOne(
      { trfId: trfId },
      {
        $set: {
          status: 'approved',
        },
      }
    );

    if (result.ok) {
      // probably should email admin to update them, but they didnt ask for this feature

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/deny', async (req, res) => {
  try {
    const { trfId } = req.body;
    const result = await Form.updateOne(
      { trfId: trfId },
      {
        $set: {
          status: 'denied',
        },
      }
    );

    if (result.ok) {
      // probably should email admin/user to update them, but they didnt ask for this feature

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/inprogress', async (req, res) => {
  try {
    const { trfId, constructs } = req.body;
    const newConstructs = constructs.map((construct) => ({
      ...construct,
      shortName: construct.shortName || null,
    }));
    const result = await Form.updateOne(
      { trfId: trfId },
      {
        $set: {
          status: 'in progress',
          // overwrite previous constructs with new shortnames
          constructs: newConstructs,
        },
      }
    );

    if (result.ok) {
      // could email user but they didnt ask for this feature

      // send Email to admin (though unnecessary it was requested)
      // const emailResults = await sendEmail('in progress', { ...req.body });

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
    // TODO correct status code and test
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/form/completed', async (req, res) => {
  try {
    const { trfId, completedMsg, username } = req.body;
    const result = await Form.updateOne(
      { trfId: trfId },
      {
        $set: {
          status: 'completed',
        },
      }
    );

    if (result.ok) {
      // send Email to admin (though unnecessary it was requested)
      // const emailResults = await sendEmail('completed', { ...req.body });

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
    // TODO correct status code and test
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

// lazy way to do this
const mongoNames = [
  'Specie',
  'Genotype',
  'VectorSelection',
  'TdnaSelection',
  'AgroStrain',
  'Admin',
];
const mongoCollections = [
  Specie,
  Genotype,
  VectorSelection,
  TdnaSelection,
  AgroStrain,
  Admin,
];

router.post('/admin/active', async (req, res) => {
  const { mongoName, _id, fieldToChange, newFieldValue } = req.body;

  let index = mongoNames.indexOf(mongoName);
  const result = await mongoCollections[index].updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    {
      $set: {
        [fieldToChange]: newFieldValue,
      },
    }
  );

  if (result.ok) {
    res.send({ status: 200 });
  } else {
    throw new Error('Error updating form status in DB');
  }
});

router.post('/admin/group', async (req, res) => {
  try {
    const { group } = req.body;
    const { _id, name, researchAssistants, ldapGroups } = group;

    const result = await Group.updateOne(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          // no username rewrite for now
          name,
          researchAssistants,
          ldapGroups,
        },
      }
    );

    if (result.ok) {
      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status in DB');
    }
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.post('/admin/additional', async (req, res) => {
  try {
    const { mongoName, newFieldValue } = req.body;

    let index = mongoNames.indexOf(mongoName);
    const result = await mongoCollections[index].create({
      name: newFieldValue,
      archived: false,
    });

    if (result.ok) {
      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status in DB');
    }
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.get('/constructs', async (req, res) => {
  try {
    const forms = await Form.find({});
    const formsWithNestedConstructs = forms.map((form) => ({
      constructs: form.constructs,
      species: form.species,
      genotype: form.genotype,
      trfId: form.trfId,
    }));

    var flatConstructs = [];

    formsWithNestedConstructs.forEach((form) => {
      form.constructs.forEach((c) => {
        flatConstructs.push({
          longName: c.constructName,
          shortName: c.shortName || null,
          binaryVectorBackbone: c.binaryVectorBackbone,
          tdnaSelection: c.tdnaSelection,
          species: form.species,
          genotype: form.genotype,
          trfId: form.trfId,
        });
      });
    });

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

    const ldapGroups = await Group.find({});

    const formsWithSignatories = forms.map((form) => {
      const theSigObj = ldapGroups.find((group) => {
        const result = group._id.toString() === form.signatoryId.toString();
        return result;
      });
      return {
        creatorIsGroupLeader: form.creatorIsGroupLeader,
        notes: form.notes,
        status: form.status,
        _id: form._id,
        date: form.date,
        username: form.username,
        creatorIsAdmin: form.creatorIsAdmin,
        species: form.species,
        genotype: form.genotype,
        constructs: form.constructs,
        trfId: form.trfId,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
        signatoryObj: theSigObj,
      };
    });

    res.send({
      status: 200,
      forms: formsWithSignatories,
      ldapGroups,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.get('/form', async (req, res) => {
  try {
    const trfId = req.originalUrl.split('=')[1];

    const forms = await Form.find({});

    const theForm = forms.find((form) => form.trfId === trfId);
    const groupId = mongoose.Types.ObjectId(theForm.signatoryId);
    const signObj = await Group.findById(groupId);

    res.send({
      status: 200,
      creatorIsGroupLeader: theForm.creatorIsGroupLeader,
      notes: theForm.notes,
      status: theForm.status,
      _id: theForm._id,
      date: theForm.date,
      username: theForm.username,
      creatorIsAdmin: theForm.creatorIsAdmin,
      signatoryObj: signObj,
      species: theForm.species,
      genotype: theForm.genotype,
      constructs: theForm.constructs,
      trfId: theForm.trfId,
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
