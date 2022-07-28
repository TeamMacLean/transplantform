// TODO get from database

export const getSpecies = () => [
  'bird',
  'mammal',
  'reptile',
  'amphibian',
  'insect',
  'fish',
  'crustacean',
  'other',
];

export const getAutocompleteGenotypes = () => [
  'Angular',
  'Angular 2',
  'Aurelia',
  'Backbone',
  'Ember',
  'jQuery',
  'Meteor',
  'Node.js',
  'Polymer',
  'React',
  'RxJS',
  'Vue.js',
];

export const getPreviousConstructNames = () => ['Daisy', 'Gary'];

export const getVectorSelections = () => [
  'Star Trek',
  'Star Wars: The Force Awakens',
  'Star Wars: The Last Jedi',
];

export const getTdnaSelections = () => [
  'Reece Topley',
  'Dawid Malan',
  'Adil Rashid',
  'Moeen Ali',
  'Jonny Bairstow',
];
export const getAgroStrains = () => [
  'Shane Warne',
  'Glen Maxwell',
  'Matthew Hayden',
  'Justin Langer',
];

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
    researchAssistantUsername: 'jenny',
  },
  species: 'mammal',
  genotype: 'Geo',
  formConstructCards: [
    {
      constructName: 'iojioj',
      binaryVectorBackbone: 'jiojoij',
      vectorSelection: 'Star Wars: The Force Awakens',
      tdnaSelection: 'Dawid Malan',
      agroStrain: 'Glen Maxwell',
    },
  ],
  notes: 'joijioj',
  status: 'unapproved',
});
