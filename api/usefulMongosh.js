db.groups.deleteMany({});
db.admins.deleteMany({});
db.tdnaselections.deleteMany({});
db.vectorselections.deleteMany({});
db.species.deleteMany({});
db.agrostrains.deleteMany({});

db.forms.update(
  { status: 'approved' },
  {
    $set: {
      status: 'pending approval',
      /** add object property this way: */
      constructs /**.shortName*/: 'Geoff',
    },
  }
  // if you want all rather than first results to update
  // {'multi': true}
);

// push into array
db.groups.update(
  { _id: ObjectId('5e0b6b3f25ddae1f53b62228') },
  { $push: { researchAssistants: 'pagem' } }
);

const admins = await Admin.find({}).sort({ date: 'descending' });
