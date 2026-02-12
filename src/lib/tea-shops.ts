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
    id: 'ts001',
    name: "The Jade Leaf",
    address: "123 Serenity Lane, Los Angeles, CA 90012",
    location: { lat: 34.058, lng: -118.239 },
    offerings: ['loose leaf', 'teaware', 'classes'],
    ethical: true,
    contact: {
      phone: "(213) 555-1234",
      website: "https://www.thejadeleaf.com"
    }
  },
  {
    id: 'ts002',
    name: "Steeped Thoughts",
    address: "456 Wisdom Way, Santa Monica, CA 90401",
    location: { lat: 34.021, lng: -118.491 },
    offerings: ['loose leaf', 'classes'],
    ethical: false,
    contact: {
      phone: "(310) 555-5678",
      website: "https://www.steepedthoughts.com"
    }
  },
  {
    id: 'ts003',
    name: "Oolong Oasis",
    address: "789 Dragon St, Pasadena, CA 91101",
    location: { lat: 34.147, lng: -118.144 },
    offerings: ['loose leaf', 'teaware'],
    ethical: true,
    contact: {
      phone: "(626) 555-9012",
      website: "https://www.oolongoasis.com"
    }
  },
  {
    id: 'ts004',
    name: "The Tea Kettle",
    address: "101 Brewmaster Ave, Culver City, CA 90232",
    location: { lat: 34.021, lng: -118.396 },
    offerings: ['teaware', 'classes'],
    ethical: true,
    contact: {
      phone: "(310) 555-3456",
      website: "https://www.theteakettle.com"
    }
  },
  {
    id: 'ts005',
    name: "Golden Tipple Teas",
    address: "212 Tranquil Blvd, Beverly Hills, CA 90210",
    location: { lat: 34.073, lng: -118.400 },
    offerings: ['loose leaf'],
    ethical: false,
    contact: {
      phone: "(310) 555-7890",
      website: "https://www.goldentippleteas.com"
    }
  },
  {
    id: 'ts006',
    name: "Matcha Mecca",
    address: "333 Greenery Rd, Long Beach, CA 90802",
    location: { lat: 33.770, lng: -118.193 },
    offerings: ['loose leaf', 'teaware', 'classes'],
    ethical: true,
    contact: {
      phone: "(562) 555-1122",
      website: "https://www.matchamecca.com"
    }
  },
    {
    id: 'ts007',
    name: "Pu-erh Palace",
    address: "444 Fermentia Circle, Glendale, CA 91203",
    location: { lat: 34.142, lng: -118.255 },
    offerings: ['loose leaf'],
    ethical: true,
    contact: {
      phone: "(818) 555-3344",
      website: "https://www.puerhpalace.com"
    }
  },
  {
    id: 'ts008',
    name: "Aroma & Vessel",
    address: "555 Clay Court, Burbank, CA 91502",
    location: { lat: 34.180, lng: -118.309 },
    offerings: ['teaware'],
    ethical: false,
    contact: {
      phone: "(818) 555-5566",
      website: "https://www.aromavessel.com"
    }
  }
];
