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
  offeringVotes: { [key in Offering]?: number };
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
    offeringVotes: { 'loose leaf': 12 },
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
    offeringVotes: { 'loose leaf': 8 },
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
    offeringVotes: { 'loose leaf': 5 },
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
    offeringVotes: { 'loose leaf': 15 },
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
    offeringVotes: { 'loose leaf': 22 },
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
    offeringVotes: { 'loose leaf': 31 },
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
    offeringVotes: { 'loose leaf': 42, 'teaware': 28, 'classes': 19 },
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
    offeringVotes: { 'loose leaf': 18, 'teaware': 11 },
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
    offeringVotes: { 'loose leaf': 25, 'teaware': 21, 'classes': 33 },
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
    offeringVotes: { 'loose leaf': 4 },
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
    offeringVotes: { 'loose leaf': 9 },
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
    offeringVotes: { 'loose leaf': 14 },
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
    offeringVotes: { 'loose leaf': 17 },
    ethical: false,
    contact: {
      phone: '+17089379225',
      website: 'http://wonderfulmatcha.com/',
    },
  },
];
