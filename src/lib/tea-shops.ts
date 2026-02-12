export type TeaType = 'white' | 'green' | 'yellow' | 'oolong' | 'black' | 'puerh' | 'dark' | 'herbal' | 'matcha';

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
    teaTypes: ['herbal', 'black'],
    praise: 12,
    userTags: ['herbal', 'spices'],
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
    teaTypes: [],
    praise: 8,
    userTags: [],
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
    teaTypes: [],
    praise: 5,
    userTags: [],
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
    teaTypes: ['black', 'herbal', 'white', 'dark'],
    praise: 22,
    userTags: [],
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
    teaTypes: ['white', 'green', 'yellow', 'oolong', 'black', 'puerh', 'dark', 'herbal', 'matcha'],
    praise: 31,
    userTags: ['organic', 'online'],
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
    teaTypes: ['oolong'],
    praise: 42,
    userTags: [],
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
    userTags: [],
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
    teaTypes: ['herbal'],
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
    teaTypes: ['black', 'green', 'herbal', 'matcha'],
    praise: 17,
    userTags: [],
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
    teaTypes: [],
    praise: 5,
    userTags: [],
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
    teaTypes: [],
    praise: 25,
    userTags: [],
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
    teaTypes: [],
    praise: 28,
    userTags: [],
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
    teaTypes: [],
    praise: 35,
    userTags: [],
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
    teaTypes: ['herbal'],
    praise: 7,
    userTags: [],
    ethical: false,
    contact: {
      phone: '+16164390890',
      website: 'http://www.perrysplacellc.com/',
    },
  }
];
