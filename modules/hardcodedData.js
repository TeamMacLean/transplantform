// TODO get from database

const groups = [
  {
    name: 'Jonathan Jones',
    username: 'jjones',
    researchAssistants: ['alam'],
    ldapGroups: [
      'CN=TSL-Data-Jonathan-Jones,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_23_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
    ],
  },
  {
    name: 'Matthew Moscou',
    username: 'mmoscou',
    researchAssistants: ['pinzon'],
    ldapGroups: [
      'CN=TSL-Data-Matthew-Moscou,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_MM_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
    ],
  },
  {
    name: 'Peter van Esse',
    username: 'vanessep',
    researchAssistants: ['grootens', 'milnesl'],
    ldapGroups: [
      'CN=TSL-Data-2Blades,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_2BL1_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_2BL1_Modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_SL2Blades_Modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_2BL1_Modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_kw_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk],',
    ],
  },
  {
    name: 'Sophien Kamoun',
    username: 'skamoun',
    researchAssistants: ['winj'],
    ldapGroups: [
      'CN=TSL-Data-Sophien-Kamoun,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=slproj_SK_Modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
      'CN=RG-Sophien-Kamoun,OU=RGs,OU=NBIGroups,DC=nbi,DC=ac,DC=uk]',
    ],
  },
  {
    name: 'Wenbo Ma',
    username: 'maw',
    researchAssistants: ['natkinso'],
    ldapGroups: [
      'CN=slproj_wm_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
    ],
  },
  {
    name: 'Cyril Zipfel',
    username: 'zipfelc',
    researchAssistants: ['rhodesj'],
    ldapGroups: [
      'CN=TSL-Data-Cyril-Zipfel,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
    ],
  },
  {
    name: 'Nick Talbot',
    username: 'ntalbot',
    researchAssistants: ['ryderl'],
    ldapGroups: [
      'CN=slproj_NT_modify,OU=TSLGroups,OU=NBIGroups,DC=nbi,DC=ac,DC=uk',
    ],
  },
];

const admins = ['smokerm', 'deeks', 'pikej', 'wawryk'];

const tdnaSelections = [
  'Kanamycin',
  'Hygromycin',
  'Kanamycin/Hygromycin',
  'Phosphinothricin',
  'Fast-Red',
  'Chlorsulfuron',
];

const vectorSelections = [
  'Kanamycin',
  'Spectinomycin',
  'Kanamycin/Hygromycin',
  'Tetracycline',
  'Hygromycin',
];

const species = [
  'Arabidopsis thaliana',
  'Brachypodium distachyon',
  'Brassica juncea',
  'Brassica oleracea',
  'Camelina sativa',
  'Glycine max',
  'Hordeum vulgare',
  'Lotus japonicus',
  'Medicago truncatula',
  'Mirabilis jalapa',
  'Nicotiana benthamiana',
  'Nicotiana tabacum',
  'Oryza sativa',
  'Solanum lycopersicum',
  'Solanum tuberosum',
];

const agroStrains = [
  'AGL1',
  'AGL1 + pSoup',
  'GV3101 pMP90',
  'LBA4404',
  'EHA105',
];

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

export const getAdmins = () =>
  admins.map((a) => ({ name: a, archived: false }));

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
  creatorIsGroupLeader: false,
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
  status: 'pending approval',
});

export const getForms = () => [
  {
    trfId: 'TRF10',
    date: '28-07-2022',
    username: 'test',
    creatorIsAdmin: false,
    creatorIsGroupLeader: false,
    signatoryObj: {
      name: 'Nick Talbot (TSL)',
      username: 'talbotn',
      researchAssistants: ['agatha'],
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
    status: 'in progress',
  },
  {
    trfId: 'TRF11',
    date: '28-07-2022',
    username: 'deeks',
    creatorIsAdmin: true,
    creatorIsGroupLeader: false,
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
    status: 'pending approval',
  },
];
