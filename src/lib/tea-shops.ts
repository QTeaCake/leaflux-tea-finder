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
];
