/** Commands to put into mongosh to lazy set up database */
db.groups.insertMany([
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
]);
db.admins.insertMany([
  {
    name: 'deeks',
    archived: false,
  },
  {
    name: 'pikej',
    archived: false,
  },
  {
    name: 'smokerm',
    archived: false,
  },
  {
    name: 'wawryk',
    archived: false,
  },
]);
db.tdnaselections.insertMany([
  {
    name: 'Kanamycin',
    archived: false,
  },
  {
    name: 'Hygromycin',
    archived: false,
  },
  {
    name: 'Kanamycin/Hygromycin',
    archived: false,
  },
  {
    name: 'Phosphinothricin',
    archived: false,
  },
  {
    name: 'Fast-Red',
    archived: false,
  },
  {
    name: 'Chlorsulfuron',
    archived: false,
  },
]);
db.vectorselections.insertMany([
  {
    name: 'Kanamycin',
    archived: false,
  },
  {
    name: 'Spectinomycin',
    archived: false,
  },
  {
    name: 'Kanamycin/Hygromycin',
    archived: false,
  },
  {
    name: 'Tetracycline',
    archived: false,
  },
  {
    name: 'Hygromycin',
    archived: false,
  },
]);
db.species.insertMany([
  { name: 'Arabidopsis thaliana', archived: false },
  { name: 'Brachypodium distachyon', archived: false },
  { name: 'Brassica juncea', archived: false },
  { name: 'Brassica oleracea', archived: false },
  { name: 'Camelina sativa', archived: false },
  { name: 'Glycine max', archived: false },
  { name: 'Hordeum vulgare', archived: false },
  { name: 'Lotus japonicus', archived: false },
  { name: 'Medicago truncatula', archived: false },
  { name: 'Mirabilis jalapa', archived: false },
  { name: 'Nicotiana benthamiana', archived: false },
  { name: 'Nicotiana tabacum', archived: false },
  { name: 'Oryza sativa', archived: false },
  { name: 'Solanum lycopersicum', archived: false },
  { name: 'Solanum tuberosum', archived: false },
]);
db.agrostrains.insertMany([
  { name: 'AGL1', archived: false },
  { name: 'AGL1 + pSoup', archived: false },
  { name: 'GV3101 pMP90', archived: false },
  { name: 'LBA4404', archived: false },
  { name: 'EHA105', archived: false },
]);
/** NB no genotypes initially */
