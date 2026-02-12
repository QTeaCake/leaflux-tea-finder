export type TeaShop = {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  offerings: ('loose leaf' | 'teaware' | 'classes')[];
  ethical: boolean;
  contact: {
    phone: string;
    website: string;
  };
  distance?: number;
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
    ethical: false,
    contact: {
      phone: '+19374232862',
      website: 'https://www.bluelanterntea.com/menu/',
    },
  },
];
