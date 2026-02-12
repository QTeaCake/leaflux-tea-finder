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
  // Illinois
  {
    id: 'ts-il-01',
    name: "Adagio Teas - Old Orchard",
    address: "4999 Old Orchard Shopping Center, Skokie, IL 60077",
    location: { lat: 42.0520, lng: -87.7470 },
    offerings: ['loose leaf', 'teaware'],
    ethical: false,
    contact: {
      phone: "(847) 983-8248",
      website: "https://www.adagio.com"
    }
  },
  // Ohio
  {
    id: 'ts-oh-01',
    name: "Churchill's Fine Teas",
    address: "122 W Elder St, Cincinnati, OH 45202",
    location: { lat: 39.1120, lng: -84.5190 },
    offerings: ['loose leaf', 'teaware', 'classes'],
    ethical: true,
    contact: {
      phone: "(513) 421-1400",
      website: "https://www.churchillsteas.com/"
    }
  }
];
