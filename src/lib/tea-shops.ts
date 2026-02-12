export type TeaType = 'white' | 'green' | 'yellow' | 'oolong' | 'black' | 'puerh' | 'dark' | 'herbal' | 'matcha';

export type Offering = 'loose leaf' | 'teaware' | 'classes';

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
  userTags: string[];
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
    offerings: ['loose leaf'],
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
    teaTypes: ['black', 'green', 'herbal'],
    praise: 8,
    userTags: ['coffee', 'cozy'],
    ethical: false,
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
    teaTypes: ['black', 'herbal'],
    praise: 5,
    userTags: [],
    ethical: false,
    contact: {
      phone: '+17406066265',
      website: 'https://charanis-teas.square.site/',
    },
  },
  {
    id: 'natures-tea-company-indianapolis',
    name: "Nature's Tea Company",
    address: '6210 La Pas Trail, Indianapolis, IN 46268',
    location: {
      lat: 39.88167006426876,
      lng: -86.22733017756487,
    },
    offerings: ['loose leaf'],
    teaTypes: ['herbal', 'green'],
    praise: 15,
    userTags: ['natural', 'health'],
    ethical: false,
    contact: {
      phone: '+13176362961',
      website: 'https://www.naturesteacompany.com/',
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
    teaTypes: ['white', 'green', 'oolong', 'black', 'herbal'],
    praise: 22,
    userTags: ['subscription', 'local'],
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
    offerings: ['loose leaf'],
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
    offerings: ['loose leaf', 'teaware', 'classes'],
    teaTypes: ['white', 'green', 'oolong', 'black', 'puerh', 'dark'],
    praise: 42,
    userTags: ['gongfu', 'community'],
    ethical: false,
    contact: {
      phone: '+19374232862',
      website: 'https://www.bluelanterntea.com/menu/',
    },
    isFeatured: true,
  },
  {
    id: 'taian-chicago',
    name: 'TAIAN',
    address: '219 W Cermak Rd, Chicago, IL 60616',
    location: {
      lat: 41.92830363239487,
      lng: -87.64653838176316,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['green', 'oolong', 'puerh', 'black'],
    praise: 18,
    userTags: ['oolong', 'puerh'],
    ethical: false,
    contact: {
      phone: '+17738882918',
      website: 'https://www.taianchicago.com/',
    },
  },
  {
    id: 'japan-house-urbana',
    name: 'Japan House, University of Illinois at Urbana-Champaign',
    address: '2000 S Lincoln Ave, Urbana, IL 61802',
    location: {
      lat: 40.16362462868195,
      lng: -88.21782742739538,
    },
    offerings: ['loose leaf', 'teaware', 'classes'],
    teaTypes: ['green', 'matcha'],
    praise: 33,
    userTags: ['matcha', 'ceremony', 'culture'],
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
    teaTypes: ['herbal', 'black'],
    praise: 4,
    userTags: [],
    ethical: false,
    contact: {
      phone: '+13175392507',
      website: 'http://www.msbsteas.com/menu',
    },
  },
  {
    id: 'tiger-spirit-teahouse-erie',
    name: 'Tiger Spirit Teahouse',
    address: '2131 W 8th St, Erie, PA 16505',
    location: {
      lat: 42.158120297956444,
      lng: -80.15652325193659,
    },
    offerings: ['loose leaf'],
    teaTypes: ['green', 'oolong', 'herbal'],
    praise: 9,
    userTags: [],
    ethical: false,
    contact: {
      phone: '+18144800844',
      website: 'https://tiger-spirit-teahouse.square.site/',
    },
  },
  {
    id: 'chengdu-teahouse-lansing',
    name: 'Chengdu Teahouse',
    address: '100 E César E. Chávez Ave, Lansing, MI 48906',
    location: {
      lat: 42.77723985365868,
      lng: -84.53696385850519,
    },
    offerings: ['loose leaf'],
    teaTypes: ['oolong', 'black', 'green'],
    praise: 14,
    userTags: ['boba'],
    ethical: false,
    contact: {
      phone: '+19195250594',
      website: 'https://www.thechengduteahouse.com/',
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
    offerings: ['loose leaf'],
    teaTypes: ['matcha', 'green'],
    praise: 17,
    userTags: ['matcha', 'cafe'],
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
    offerings: ['loose leaf'],
    teaTypes: ['black', 'green', 'herbal'],
    praise: 5,
    userTags: ['coffee', 'cozy'],
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
    teaTypes: ['white', 'green', 'oolong', 'black', 'puerh', 'herbal'],
    praise: 25,
    userTags: ['specialty', 'merchants'],
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
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['white', 'green', 'oolong', 'black', 'puerh', 'herbal', 'matcha'],
    praise: 28,
    userTags: ['urban', 'traditional'],
    ethical: false,
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
    teaTypes: ['white', 'green', 'yellow', 'oolong', 'black', 'puerh', 'dark', 'herbal', 'matcha'],
    praise: 35,
    userTags: ['brand', 'variety'],
    ethical: false,
    contact: {
      phone: '+16304282556',
      website: 'http://www.adagio.com/stores/il_naperville.html',
    },
  },
  {
    id: 'spice-merchants-marquette',
    name: 'Spice Merchants',
    address: '106 W Washington St, Marquette, MI 49855',
    location: {
      lat: 46.54364348314,
      lng: -87.39294598280682,
    },
    offerings: ['loose leaf'],
    teaTypes: ['herbal', 'black', 'green'],
    praise: 10,
    userTags: ['spices', 'herbal'],
    ethical: false,
    contact: {
      phone: '+19062351887',
      website: 'https://www.spicemerchants.biz/marquette-spice-store',
    },
  },
  {
    id: 'traverse-city-spice-tea-merchants',
    name: 'Traverse City Spice & Tea Merchants',
    address: '145 E Front St, Traverse City, MI 49684',
    location: {
      lat: 44.792232766741385,
      lng: -85.63024867929938,
    },
    offerings: ['loose leaf'],
    teaTypes: ['herbal', 'black', 'green'],
    praise: 11,
    userTags: ['spices', 'herbal'],
    ethical: false,
    contact: {
      phone: '+12319477423',
      website: 'https://www.spicemerchants.biz/traverse-city-spice-store',
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
    offerings: ['loose leaf'],
    teaTypes: ['herbal'],
    praise: 7,
    userTags: ['herbs', 'wellness'],
    ethical: false,
    contact: {
      phone: '+16164390890',
      website: 'http://www.perrysplacellc.com/',
    },
  },
  {
    id: 'light-of-day-organic-farm-tea-shop-traverse-city',
    name: 'Light of Day Organic Farm & Tea Shop',
    address: '3502 E Traverse Hwy, Traverse City, MI 49684',
    location: {
      lat: 44.78262739370968,
      lng: -85.78435630485505,
    },
    offerings: ['loose leaf', 'teaware'],
    teaTypes: ['white', 'green', 'herbal', 'matcha'],
    praise: 29,
    userTags: ['organic', 'farm', 'biodynamic'],
    ethical: true,
    contact: {
      phone: '+12312287235',
      website: 'http://lightofdayorganics.com/',
    },
  },
  {
    id: 'goldfish-tea-royal-oak',
    name: 'Goldfish Tea',
    address: '417 S Washington Ave, Royal Oak, MI 48067',
    location: {
      lat: 42.5260368270291,
      lng: -83.14684354401398,
    },
    offerings: ['loose leaf', 'teaware', 'classes'],
    teaTypes: ['white', 'green', 'oolong', 'black', 'puerh', 'matcha'],
    praise: 20,
    userTags: ['modern', 'tasting room'],
    ethical: false,
    contact: {
      phone: '+12485415252',
      website: 'http://order.goldfishtea.com/',
    },
  },
  {
    id: 'global-infusion-grand-rapids',
    name: 'Global Infusion',
    address: '143 Diamond Ave SE, Grand Rapids, MI 49506',
    location: {
      lat: 42.96077150920917,
      lng: -85.6447551521209,
    },
    offerings: ['loose leaf'],
    teaTypes: ['herbal', 'black', 'green'],
    praise: 13,
    userTags: ['global', 'herbal'],
    ethical: false,
    contact: {
      phone: '+16167769720',
      website: 'https://www.globalinfusion.net/',
    },
  },
];
