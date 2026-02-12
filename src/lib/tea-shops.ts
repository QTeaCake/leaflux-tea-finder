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
  // Indiana
  {
    id: 'ts-in-01',
    name: "The Spice & Tea Exchange of Fort Wayne",
    address: "405 E Jefferson Blvd, Fort Wayne, IN 46802",
    location: { lat: 41.0772, lng: -85.1352 },
    offerings: ['loose leaf', 'teaware'],
    ethical: false,
    contact: {
      phone: "(260) 444-5991",
      website: "https://www.spiceandtea.com/fort-wayne"
    }
  },
  {
    id: 'ts-in-02',
    name: "Circle City Cuppa",
    address: "49 W Maryland St, Indianapolis, IN 46204",
    location: { lat: 39.7661, lng: -86.1593 },
    offerings: ['loose leaf', 'classes'],
    ethical: false,
    contact: {
      phone: "(317) 555-5678",
      website: "https://www.circlecitycuppa.com"
    }
  },
  // Illinois
  {
    id: 'ts-il-01',
    name: "Windy City Tea Emporium",
    address: "835 N Michigan Ave, Chicago, IL 60611",
    location: { lat: 41.8974, lng: -87.6241 },
    offerings: ['loose leaf', 'teaware', 'classes'],
    ethical: true,
    contact: {
      phone: "(312) 555-9012",
      website: "https://www.windycitytea.com"
    }
  },
  {
    id: 'ts-il-02',
    name: "Lincoln's Tea Leaves",
    address: "400 E Monroe St, Springfield, IL 62701",
    location: { lat: 39.7990, lng: -89.6438 },
    offerings: ['loose leaf'],
    ethical: true,
    contact: {
      phone: "(217) 555-3456",
      website: "https://www.lincolnstea.com"
    }
  },
    {
    id: 'ts-il-03',
    name: "The Loop Leaf",
    address: "20 W Jackson Blvd, Chicago, IL 60604",
    location: { lat: 41.8780, lng: -87.6292 },
    offerings: ['teaware', 'classes'],
    ethical: false,
    contact: {
      phone: "(312) 555-2233",
      website: "https://www.theloopleaf.com"
    }
  },
  // Ohio
  {
    id: 'ts-oh-01',
    name: "Buckeye Brews",
    address: "187 S High St, Columbus, OH 43215",
    location: { lat: 39.9592, lng: -83.0010 },
    offerings: ['loose leaf', 'teaware', 'classes'],
    ethical: true,
    contact: {
      phone: "(614) 555-7890",
      website: "https://www.buckeyebrews.com"
    }
  },
  {
    id: 'ts-oh-02',
    name: "Rock & Roll Teas",
    address: "1100 E 9th St, Cleveland, OH 44114",
    location: { lat: 41.5085, lng: -81.6912 },
    offerings: ['loose leaf', 'teaware'],
    ethical: false,
    contact: {
      phone: "(216) 555-1122",
      website: "https://www.rockandrollteas.com"
    }
  },
  {
    id: 'ts-oh-03',
    name: "Queen City Oolong",
    address: "1420 Vine St, Cincinnati, OH 45202",
    location: { lat: 39.1098, lng: -84.5165 },
    offerings: ['loose leaf', 'classes'],
    ethical: true,
    contact: {
      phone: "(513) 555-4455",
      website: "https://www.queencityoolong.com"
    }
  }
];
