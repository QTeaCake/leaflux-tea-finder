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

export const teaShops: TeaShop[] = [];
