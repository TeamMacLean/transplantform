// TODO get from database

export const getSpecies = () => [
  { name: 'bird', archived: false },
  { name: 'mammal', archived: false },
  { name: 'reptile', archived: false },
  { name: 'amphibian', archived: false },
  { name: 'insect', archived: false },
  { name: 'fish', archived: true },
  { name: 'crustacean', archived: true },
];

export const getGenotypes = () => [
  { name: 'Angular', archived: true },
  { name: 'Angular 2', archived: true },
  { name: 'Aurelia', archived: true },
  { name: 'Backbone', archived: true },
  { name: 'Ember', archived: true },
  { name: 'jQuery', archived: true },
  { name: 'Meteor', archived: true },
  { name: 'Node.js', archived: true },
  { name: 'Polymer', archived: false },
  { name: 'React', archived: false },
  { name: 'RxJS', archived: false },
  { name: 'Vue.js', archived: false },
];

export const getVectorSelections = () => [
  { name: 'Star Trek', archived: false },
  { name: 'Star Wars: The Force Awakens', archived: false },
  { name: 'Star Wars: The Last Jedi', archived: false },
  { name: 'Angel Heart', archived: true },
  { name: 'Save the Last Dance', archived: true },
];

export const getTdnaSelections = () => [
  { name: 'Reece Topley', archived: false },
  { name: 'Dawid Malan', archived: false },
  { name: 'Adil Rashid', archived: false },
  { name: 'Moeen Ali', archived: true },
  { name: 'Jonny Bairstow', archived: true },
];
export const getAgroStrains = () => [
  { name: 'Shane Warne', archived: true },
  { name: 'Glen Maxwell', archived: true },
  { name: 'Matthew Hayden', archived: false },
  { name: 'Justin Langer', archived: false },
];

export const getPreviousConstructNames = () => ['Daisy', 'Gary'];

export const getConstructsFromAllForms = () => {
  // TODO this gets from one form, not multiple
  const form = getFormDataFromId('TRF10');

  const { constructs, species, genotype, trfId } = form;

  return constructs.map((c) => {
    return {
      longName: c.constructName,
      shortName: c.shortName,
      binaryVectorBackbone: c.binaryVectorBackbone,
      tdnaSelection: c.tdnaSelection,
      species,
      genotype,
      trfId,
    };
  });
};

// TODO check authorization
export const getFormDataFromId = (id) => ({
  trfId: id,
  date: '28-07-2022',
  username: 'deeks',
  creatorIsAdmin: true,
  creatorIsGroupLeaderFor: null,
  signatoryObj: {
    name: 'Jonathan Jones (TSL)',
    username: 'jjones',
    researchAssistants: ['jenny'],
  },
  species: 'mammal',
  genotype: 'Geo',
  constructs: [
    {
      constructName: 'Daisy',
      binaryVectorBackbone: 'jiojoij',
      vectorSelection: 'Star Wars: The Force Awakens',
      tdnaSelection: 'Dawid Malan',
      agroStrain: 'Glen Maxwell',
      shortName: '',
    },
    {
      constructName: 'Gary',
      binaryVectorBackbone: 'King',
      vectorSelection: 'Star Trek',
      tdnaSelection: 'Reece Topley',
      agroStrain: 'Shane Warne',
      shortName: '',
    },
  ],
  notes: 'joijioj',
  status: 'unapproved',
});
