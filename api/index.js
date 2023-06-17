import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ldap from './ldap';
import _ from 'lodash';

import getEmailOptions from '../modules/getEmailOptions';
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

const getUserFromReqHeaders = (req) => {
  if (!req || !req.headers) {
    return null;
  }
  const authVerificationStr =
    req.headers.authorization && req.headers.authorization.length
      ? req.headers.authorization.split(' ')[1]
      : null;
  const cookieVerificationStr =
    req.headers.cookie && req.headers.cookie.length
      ? req.headers.cookie.split('Bearer%20')[1]
      : null;

  const token = authVerificationStr || cookieVerificationStr || null;

  if (!token) {
    return null;
  }
  const user = jwt.verify(token, JWT_SECRET);
  return user;
};

router.get('/user', async (req, res) => {
  const user = getUserFromReqHeaders(req);

  if (!user) {
    return res.status(401).json({
      error: 'Unauthorised',
    });
  } else {
    return res.status(200).json({ user });
  }
});

// Add POST - /api/login
router.post('/login', async (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    ldap
      .authenticate(req.body.username, req.body.password)
      .then(async (user) => {
        let reqBodyUsername = req.body.username;
        let userMemberOf = user.memberOf;
        let userDisplayName = user.displayName;

        // This is where you alter the roles for testing
        if (
          (req.body.username === 'pikej' || req.body.username === 'deeks') &&
          req.body.radio
        ) {
          const radioValue = req.body.radio;
          if (radioValue === 'jjones') {
            reqBodyUsername = 'jjones';
            userMemberOf = [
              'CN=TSL-Data-Jonathan-Jones,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
              'CN=slproj_23_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
            ];
            userDisplayName = 'Jonathan Jones (FAKE)';
          }
          if (radioValue === 'alam') {
            reqBodyUsername = 'alam';
            userMemberOf = [
              'CN=TSL-Data-Jonathan-Jones,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
              'CN=slproj_23_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
            ];
            userDisplayName = 'Maheen Alam (FAKE)';
          }
          if (radioValue === 'heal') {
            reqBodyUsername = 'heal';
            userMemberOf = [
              'CN=TSL-Data-Jonathan-Jones,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
              'CN=slproj_23_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
            ];
            userDisplayName = 'Robert Heal (FAKE)';
          }
        }

        const adminDocs = await Admin.find({}).sort({ date: 'descending' });
        const admins = adminDocs
          .filter((admin) => !admin.archived)
          .map((admin) => admin.name);
        const userIsAdmin = admins.includes(reqBodyUsername);

        const allLdapGroups = await Group.find({}).sort({ date: 'descending' });
        const isGroupLeaderForObj =
          allLdapGroups.find((group) => group.username === reqBodyUsername) ||
          null;
        const isResearchAssistantForObj =
          allLdapGroups.find((group) => {
            group.researchAssistants.includes(reqBodyUsername);
            const res = group.researchAssistants.includes(reqBodyUsername);
            return res;
          }) || null;
        const isResearchAssistantFor = isResearchAssistantForObj
          ? isResearchAssistantForObj.name
          : null;

        let signatories = [];
        if (userIsAdmin) {
          signatories = allLdapGroups;
        } else if (isGroupLeaderForObj) {
          signatories = [isGroupLeaderForObj];
        } else if (isResearchAssistantFor) {
          signatories = [isResearchAssistantForObj];
        } else {
          userMemberOf.forEach((ldapGroupStr) => {
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

        // signObj cannot be too big
        const signObj = {
          username: reqBodyUsername,
          name: userDisplayName,
          isAdmin: userIsAdmin,
          isGroupLeaderForObj: isGroupLeaderForObj,
          isResearchAssistantFor: isResearchAssistantFor,
          signatories: abridgedSignatories,
        };

        sign(signObj)
          .then((token) => {
            res.status(200).json({ token: token });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(401).json({ message: 'Bad credentials: ' + err });
      });
  } else {
    res.status(401).json({ message: 'Incomplete credentials' });
  }
});

router.get('/logout', (req, res) => {
  res.sendStatus(200);
});
router.post('/logout', (req, res) => {
  res.sendStatus(200);
});

router.get('/form/new', async (req, res) => {
  try {
    const sessionUser = getUserFromReqHeaders(req);
    const { isAdmin } = sessionUser;

    const species = await Specie.find({}).sort({ date: 'descending' });
    const genotypes = await Genotype.find({}).sort({ date: 'descending' });
    const vectorSelections = await VectorSelection.find({}).sort({
      date: 'descending',
    });
    const tdnaSelections = await TdnaSelection.find({}).sort({
      date: 'descending',
    });
    const agroStrains = await AgroStrain.find({}).sort({ date: 'descending' });
    const forms = await Form.find({}).sort({ date: 'descending' });
    const nestedConstructs = forms.map((form) => form.constructs);
    const flatConstructs = nestedConstructs.flat();
    const previousConstructNames = flatConstructs.map(
      (construct) => construct.constructName
    );

    const { creatorIsAdmin } = req.body;

    const oldFormsFromUser = forms.filter((form) => {
      if (isAdmin) {
        return true; // all
      } else {
        return form.username === sessionUser.username;
      }
    }); // could map it too

    res.send({
      status: 200,
      species,
      genotypes,
      vectorSelections,
      tdnaSelections,
      agroStrains,
      previousConstructNames,
      sessionUser,
      oldFormsFromUser,
    });
  } catch (error) {
    res.send({ status: 500, error: error });
    console.error(error);
  }
});

router.post('/form/new', async (req, res) => {
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

  let theStatus =
    creatorIsGroupLeader || creatorIsAdmin ? 'approved' : 'pending approval';

  const signatoryId = signatoryObj._id;
  const signatoryObjectId = mongoose.Types.ObjectId(signatoryId);

  // calculate new TRF ID
  const forms = await Form.find({}).sort({ date: 'descending' });
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

  // console.log('about to create form', newTrfIdStr);
  //const newFormEntry =
  await Form.create({
    date: date,
    username: username,
    creatorIsAdmin: creatorIsAdmin,
    creatorIsGroupLeader: creatorIsGroupLeader,
    signatoryId: signatoryObjectId,
    species: species,
    genotype: genotype,
    constructs: constructs,
    notes: notes,
    status: theStatus,
    trfId: newTrfIdStr,
  }).catch((err) => {
    res.send({ status: 500, error: err });
    console.err(error);
  });
  // console.log('form created', newFormEntry);

  const allGenotypes = await Genotype.find({}).sort({ date: 'descending' });
  const allGenotypeNames = allGenotypes.length
    ? allGenotypes.map((genotype) => genotype.name.toLowerCase())
    : [];
  if (!allGenotypeNames.includes(genotype.toLowerCase())) {
    const res = await Genotype.create({
      name: genotype,
      archived: false,
    });
  }

  if (theStatus === 'pending approval') {
    // send Email to group leader and CC research assistant
    const emailOptions = getEmailOptions('approval', {
      signatoryObj,
      trfId: newTrfIdStr,
    });
    const emailResults = await sendEmail(emailOptions).catch((err) => {
      console.error('email failed', err);
      res.send({ status: 200, error: err });
    });
    // console.log('email sent', emailResults);
  } else {
    console.log('auto approved, no email sent');
  }

  res.send({ status: 200, trfId: newTrfIdStr });
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

      const emailOptions = getEmailOptions('deletion', {
        signatoryObj,
        trfId,
        username,
      });
      const emailResults = await sendEmail(emailOptions).catch((err) => {
        console.error('email failed', err);
        res.send({ status: 200, error: err });
      });
      // console.log('email sent', emailResults);

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
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
          // overwrite previous constructs with new shortNames
          constructs: newConstructs,
        },
      }
    );

    if (result.ok) {
      // could email user but they didnt ask for this feature

      // send Email to admin (though unnecessary it was requested)
      const emailOptions = getEmailOptions('in progress', {
        trfId,
      });
      const emailResults = await sendEmail(emailOptions).catch((err) => {
        console.error('email failed', err);
        res.send({ status: 200, error: err });
      });
      // console.log('email sent', emailResults);

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
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

      const emailOptions = getEmailOptions('completed', {
        trfId,
        username,
        completedMsg,
      });
      const emailResults = await sendEmail(emailOptions).catch((err) => {
        console.error('email failed', err);
        res.send({ status: 200, error: err });
      });
      // console.log('email sent', emailResults);

      res.send({ status: 200 });
    } else {
      throw new Error('Error updating form status');
    }
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

// get everything needed for admin page
router.get('/admin/', async (req, res) => {
  try {
    const sessionUser = getUserFromReqHeaders(req);

    const admins = await Admin.find({}).sort({ date: 'descending' });
    const species = await Specie.find({}).sort({ date: 'descending' });
    const genotypes = await Genotype.find({}).sort({ date: 'descending' });
    const vectorSelections = await VectorSelection.find({}).sort({
      date: 'descending',
    });
    const tdnaSelections = await TdnaSelection.find({}).sort({
      date: 'descending',
    });
    const agroStrains = await AgroStrain.find({}).sort({ date: 'descending' });
    const groups = await Group.find({}).sort({ date: 'descending' });

    res.send({
      status: 200,
      admins,
      species,
      genotypes,
      vectorSelections,
      tdnaSelections,
      agroStrains,
      groups,
      sessionUser,
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

// router.post('/email', async (req, res) => {
//   try {
//     const emailObj = getEmailOptions('test', {});
//     const emailResults = await sendEmail(emailObj);
//     console.log('emailRes', emailResults);

//     res.send({ status: 200, emailResults });
//   } catch (error) {
//     res.send({ status: 'error', error: error });
//     console.error(error);
//   }
// });

router.post('/admin/additional', async (req, res) => {
  try {
    const { mongoName, newFieldValue } = req.body;

    let index = mongoNames.indexOf(mongoName);
    const result = await mongoCollections[index].create({
      name: newFieldValue,
      archived: false,
    });

    res.send({ status: 200 });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.get('/constructs', async (req, res) => {
  try {
    const sessionUser = getUserFromReqHeaders(req);

    const forms = await Form.find({}).sort({ date: 'descending' });
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
          description: c.description || '',
          binaryVectorBackbone: c.binaryVectorBackbone,
          tdnaSelection: c.tdnaSelection,
          species: form.species,
          genotype: form.genotype,
          trfId: form.trfId,
        });
      });
    });

    res.send({
      status: 200,
      constructs: flatConstructs,
      sessionUser,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.get('/forms', async (req, res) => {
  try {
    const sessionUser = getUserFromReqHeaders(req);

    const forms = await Form.find({}).sort({ date: 'descending' });

    const ldapGroups = await Group.find({}).sort({ date: 'descending' });

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
      sessionUser,
    });
  } catch (error) {
    res.send({ status: 'error', error: error });
    console.error(error);
  }
});

router.get('/form', async (req, res) => {
  try {
    const sessionUser = getUserFromReqHeaders(req);

    const trfId = req.originalUrl.split('=')[1];

    const theForm = await Form.findOne({ trfId: trfId });
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
      sessionUser,
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
