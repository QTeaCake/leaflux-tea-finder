export type TeaType = 'white' | 'green' | 'yellow' | 'oolong' | 'black' | 'puerh' | 'dark' | 'herbal' | 'matcha' | 'jasmine' | 'earl grey' | 'chai' | 'rooibos' | 'chamomile' | 'mint' | 'mate';

export type Offering = 'loose leaf' | 'teaware' | 'classes';

export type UserTag = string;

export type TeaShop = {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  offerings: Offering[];
  teaTypes: TeaType[];
  praise: number;
  userTags: UserTag[];
  ethical: boolean;
  contact: {
    phone: string;
    website: string;
  };
  distance?: number;
  isFeatured?: boolean;
};

export const teaShops: TeaShop[] = [
    {
    id: 'the-spice-shack-grabill',
    name: 'The Spice Shack',
    address: '11334 Page Rd, Grabill, IN 46741',
    location: {
      lat: 41.19440066348785,
      lng: -84.97670994071623,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['black', 'green', 'oolong', 'chai', 'herbal', 'mint', 'rooibos'],
    praise: 12,
    userTags: ['herbal', 'spices', 'spice-infused'],
    ethical: false,
    contact: {
      phone: '+12606159634',
      website: 'http://thespiceshack.org/',
    },
  },
  {
    id: 'red-bud-coffee-tea-shipshewana',
    name: 'Red Bud Coffee & Tea',
    address: '445 S Van Buren St, Shipshewana, IN 46565',
    location: {
      lat: 41.70470324624121,
      lng: -85.57101400451032,
    },
    offerings: ['loose leaf'],
    teaTypes: ['black', 'green', 'oolong', 'herbal', 'mint', 'chamomile'],
    praise: 8,
    userTags: ['seasonal'],
    ethical: true,
    contact: {
      phone: '+15749031033',
      website: 'https://redbudtea.us/contact-us/',
    },
  },
  {
    id: 'charanis-teas-corunna',
    name: "Charani's Teas",
    address: '2141 Co Rd 9, Corunna, IN 46730',
    location: {
      lat: 41.46639925278878,
      lng: -85.13615200946663,
    },
    offerings: ['loose leaf'],
    teaTypes: ['black', 'green', 'oolong', 'white', 'chamomile', 'mint', 'rooibos', 'herbal'],
    praise: 5,
    userTags: ['berry burst', 'raspberry lemonade', 'rose congou', 'gin berry'],
    ethical: false,
    contact: {
      phone: '+17406066265',
      website: 'https://charanis-teas.square.site/',
    },
  },
  {
    id: 'nelsons-tea-indianapolis',
    name: "Nelson's Tea",
    address: '8709 Castle Park Dr, Indianapolis, IN 46256',
    location: {
      lat: 39.94065874006753,
      lng: -86.0213365246702,
    },
    offerings: ['loose leaf'],
    teaTypes: ['black', 'green', 'oolong', 'white', 'dark', 'yellow', 'rooibos', 'chamomile', 'mint', 'mate', 'herbal'],
    praise: 22,
    userTags: ['chocolate-mint', 'pumpkin spice', 'orange cinnamon'],
    ethical: false,
    contact: {
      phone: '',
      website: 'https://www.nelsonstea.com/',
    },
  },
  {
    id: 'arbor-teas-ann-arbor',
    name: 'Arbor Teas',
    address: '1342 N Main St #1, Ann Arbor, MI 48104',
    location: {
      lat: 42.324394692347525,
      lng: -83.73788445216886,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['white', 'green', 'yellow', 'oolong', 'black', 'puerh', 'dark', 'herbal', 'matcha', 'rooibos', 'mint'],
    praise: 31,
    userTags: ['organic', 'online', 'vanilla-bean', 'citrus-ginger'],
    ethical: true,
    contact: {
      phone: '+17349947698',
      website: 'https://www.arborteas.com/',
    },
  },
  {
    id: 'blue-lantern-tea-greenville',
    name: 'Blue Lantern Tea',
    address: '106 N Broadway St, Greenville, OH 45331',
    location: {
      lat: 40.160302323757335,
      lng: -84.66766768959064,
    },
    offerings: ['loose leaf'],
    teaTypes: ['black', 'green', 'oolong', 'white', 'yellow', 'herbal'],
    praise: 42,
    userTags: ['naturally flavored', 'indian fire', 'seasonal'],
    ethical: false,
    contact: {
      phone: '+19374232862',
      website: 'https://www.bluelanterntea.com/menu/',
    },
    isFeatured: true,
  },
  {
    id: 'japan-house-urbana',
    name: 'Japan House, University of Illinois at Urbana-Champaign',
    address: '2000 S Lincoln Ave, Urbana, IL 61802',
    location: {
      lat: 40.16362462868195,
      lng: -88.21782742739538,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['green', 'matcha'],
    praise: 33,
    userTags: ['seasonal matcha'],
    ethical: false,
    contact: {
      phone: '+12172449934',
      website: 'http://japanhouse.illinois.edu/',
    },
  },
  {
    id: 'ms-bs-teas-clayton',
    name: "Ms B's Teas",
    address: '4883 Iowa St, Clayton, IN 46118',
    location: {
      lat: 39.76787545895561,
      lng: -86.50396029049867,
    },
    offerings: ['loose leaf'],
    teaTypes: ['green', 'oolong', 'white', 'mint', 'herbal'],
    praise: 4,
    userTags: [],
    ethical: false,
    contact: {
      phone: '+13175392507',
      website: 'http://www.msbsteas.com/menu',
    },
  },
  {
    id: 'wonderful-matcha-la-grange',
    name: 'Wonderful Matcha',
    address: '4 W Burlington Ave, La Grange, IL 60525',
    location: {
      lat: 41.87503565442297,
      lng: -87.88376538176318,
    },
    offerings: ['teaware'],
    teaTypes: ['matcha', 'green'],
    praise: 17,
    userTags: ['fruit matcha', 'spice matcha'],
    ethical: false,
    contact: {
      phone: '+17089379225',
      website: 'http://wonderfulmatcha.com/',
    },
  },
  {
    id: 'sweeteas-tea-coffee-nashville',
    name: 'Sweetea’s Tea and Coffee Shop',
    address: '225 Vanburen St, Nashville, IN 47448',
    location: {
      lat: 39.36817158949532,
      lng: -86.20066129127208,
    },
    offerings: [],
    teaTypes: ['black', 'green', 'oolong', 'white', 'rooibos', 'chamomile', 'mint', 'herbal'],
    praise: 5,
    userTags: ['fruit-infused', 'dessert-style'],
    ethical: false,
    contact: {
      phone: '',
      website: 'http://www.sweeteasbrowncounty.com/',
    },
  },
  {
    id: 'todd-holland-tea-merchants-forest-park',
    name: 'Todd & Holland Tea Merchants',
    address: '7311 Madison St, Forest Park, IL 60130',
    location: {
      lat: 41.879831845618554,
      lng: -87.80739415212089,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['black', 'green', 'oolong', 'white', 'dark', 'jasmine', 'earl grey', 'chai', 'rooibos', 'chamomile', 'mint', 'mate', 'herbal'],
    praise: 25,
    userTags: ['fruit-flavored'],
    ethical: false,
    contact: {
      phone: '+18007478327',
      website: 'http://www.todd-holland.com/',
    },
  },
  {
    id: 'chicago-teahouse-chicago',
    name: 'Chicago Teahouse',
    address: '1160 N State St, Chicago, IL 60610',
    location: {
      lat: 41.90392644958205,
      lng: -87.62866952513536,
    },
    offerings: ['loose leaf'],
    teaTypes: ['black', 'green', 'oolong', 'white', 'dark', 'earl grey', 'chai', 'chamomile', 'herbal'],
    praise: 28,
    userTags: ['seasonal', 'turmeric-ginger'],
    ethical: true,
    contact: {
      phone: '+13129320639',
      website: 'https://chicagoteahouse.com/',
    },
  },
  {
    id: 'adagio-teas-naperville',
    name: 'Adagio Teas Naperville',
    address: '27 W Jefferson Ave, Naperville, IL 60540',
    location: {
      lat: 41.78854784599449,
      lng: -88.14711647299453,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['black', 'green', 'oolong', 'white', 'herbal', 'earl grey', 'chamomile', 'mint', 'rooibos'],
    praise: 35,
    userTags: ['chocolate-flavored', 'mango', 'strawberry', 'vanilla'],
    ethical: false,
    contact: {
      phone: '+16304282556',
      website: 'http://www.adagio.com/stores/il_naperville.html',
    },
  },
  {
    id: 'perrys-place-cedar-springs',
    name: "Perry's Place LLC FOR HERBS, TEAS, AND MORE...",
    address: '90 N Main St NE B, Cedar Springs, MI 49319',
    location: {
      lat: 43.225496985162955,
      lng: -85.55090572883574,
    },
    offerings: [],
    teaTypes: ['herbal', 'mint'],
    praise: 7,
    userTags: ['bulk herbs', 'orange spice'],
    ethical: false,
    contact: {
      phone: '+16164390890',
      website: 'http://www.perrysplacellc.com/',
    },
  },
  {
    id: 'happy-earth-tea-rochester',
    name: 'Happy Earth Tea',
    address: '696 South Ave, Rochester, NY 14620',
    location: {
      lat: 43.141856497327275,
      lng: -77.60423847823543,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "oolong", "white", "herbal"],
    praise: 0,
    userTags: ["wellness", "organic"],
    ethical: false,
    contact: {
      phone: '+15857307754',
      website: 'https://happyearthtea.com/pages/leaf_menu',
    },
  },
  {
    id: 'divinitea-clifton-park',
    name: 'Divinitea',
    address: '1604 US-9, Clifton Park, NY 12065',
    location: {
      lat: 42.87134614652297,
      lng: -73.74854584381805,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "white", "oolong", "chai", "herbal"],
    praise: 0,
    userTags: ["flavored"],
    ethical: true,
    contact: {
      phone: '+15183470689',
      website: 'https://www.divinitea.com/',
    },
  },
  {
    id: 'good-life-tea-canandaigua',
    name: 'Good Life Tea Inc.',
    address: '181 S Main St, Canandaigua, NY 14424',
    location: {
      lat: 42.88822339806163,
      lng: -77.27932275150626,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "white", "oolong", "herbal"],
    praise: 0,
    userTags: ["fruit-infused blends"],
    ethical: true,
    contact: {
      phone: '+15853370838',
      website: 'http://www.goodlifetea.com/',
    },
  },
  {
    id: 'hastings-tea-coffee-white-plains',
    name: 'Hastings Tea & Coffee',
    address: '235 Main St, White Plains, NY 10601',
    location: {
      lat: 41.033202072016344,
      lng: -73.76603216931439,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "white", "oolong", "puerh", "rooibos", "matcha", "herbal"],
    praise: 0,
    userTags: [],
    ethical: false,
    contact: {
      phone: '+19144281000',
      website: 'http://www.hastingstea.com/',
    },
  },
  {
    id: 'loka-leaf-tea-lounge-cazenovia',
    name: 'Loka Leaf Tea Lounge',
    address: '76 Albany St, Cazenovia, NY 13035',
    location: {
      lat: 42.93009349831156,
      lng: -75.85323983068562,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "oolong", "white", "matcha", "herbal"],
    praise: 0,
    userTags: [],
    ethical: true,
    contact: {
      phone: '+13158154441',
      website: 'https://loka-leaf-tea-lounge.com-place.com/',
    },
  },
  {
    id: 'sensibiliteas-glens-falls',
    name: 'SensibiliTeas',
    address: '71 Lawrence St #106, Glens Falls, NY 12801',
    location: {
      lat: 43.316554915566904,
      lng: -73.6354081118823,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "white", "oolong", "herbal"],
    praise: 0,
    userTags: ["tisanes"],
    ethical: true,
    contact: {
      phone: '+15185021450',
      website: 'https://mysensibiliteas.com/',
    },
  },
  {
    id: 'cup-of-communitea-williamsville',
    name: 'Cup of Communitea',
    address: '5416 Main St, Williamsville, NY 14221',
    location: {
      lat: 42.967305428791676,
      lng: -78.75369639260052,
    },
    offerings: ["loose leaf", "teaware", "classes"],
    teaTypes: ["black", "green", "oolong", "white", "rooibos", "herbal", "matcha"],
    praise: 0,
    userTags: [],
    ethical: true,
    contact: {
      phone: '+17166888022',
      website: 'http://www.cupofcommunitea.com/',
    },
  },
  {
    id: 'tealightful-rochester',
    name: 'Tealightful',
    address: 'Online with pop-up events, 146 Halstead St Suite 117, Rochester, NY 14610',
    location: {
      lat: 43.14631822715879,
      lng: -77.54975152937914,
    },
    offerings: ["loose leaf", "teaware"],
    teaTypes: ["black", "green", "oolong", "white", "rooibos", "herbal"],
    praise: 0,
    userTags: ["fruit-herb blends"],
    ethical: true,
    contact: {
      phone: '+15854369019',
      website: 'http://www.tealightfultasters.com/',
    },
  }
];
