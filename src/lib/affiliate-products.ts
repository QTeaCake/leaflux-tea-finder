/**
 * AFFILIATE PRODUCTS
 * ==================
 * To add a new product, copy one of the blocks below and paste it
 * at the end of the affiliateProducts array. Fill in your details.
 *
 * Fields:
 *   id          - unique slug, no spaces (e.g. 'harney-sons-hot-cinnamon')
 *   name        - product name shown on the card
 *   vendor      - brand or seller name
 *   description - short description (1-2 sentences)
 *   teaType     - one of the types below, used for filtering
 *   price       - display price as a string (e.g. '$14.99')
 *   imageUrl    - link to a product image (use the vendor's image URL)
 *   affiliateUrl - YOUR affiliate link — this is what earns you money
 *   featured    - set to true to highlight it at the top
 */

export type AffiliateTeaType =
  | 'black'
  | 'green'
  | 'oolong'
  | 'white'
  | 'puerh'
  | 'matcha'
  | 'herbal'
  | 'chai'
  | 'teaware'
  | 'sampler';

export type AffiliateProduct = {
  id: string;
  name: string;
  vendor: string;
  description: string;
  teaType: AffiliateTeaType;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
  featured?: boolean;
};

export const affiliateProducts: AffiliateProduct[] = [
  // ---------------------------------------------------------------
  // EXAMPLE — replace this with your real affiliate products
  // ---------------------------------------------------------------
  {
    id: 'example-oolong-sampler',
    name: 'Oolong Tea Sampler',
    vendor: 'Adagio Teas',
    description: 'A curated set of four classic oolongs — from light floral to rich roasted. Perfect for exploring the range.',
    teaType: 'oolong',
    price: '$18.00',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    affiliateUrl: '#', // replace with your affiliate link
    featured: true,
  },
  {
    id: 'example-puerh-cake',
    name: 'Aged Puerh Cake',
    vendor: 'Yunnan Sourcing',
    description: 'A classic shou puerh compressed into a traditional cake. Earthy, smooth, and great for daily brewing.',
    teaType: 'puerh',
    price: '$24.00',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    affiliateUrl: '#', // replace with your affiliate link
  },
  {
    id: 'example-matcha-ceremonial',
    name: 'Ceremonial Grade Matcha',
    vendor: 'Ippodo Tea',
    description: 'Stone-ground ceremonial matcha from Kyoto. Bright green, smooth, no bitterness.',
    teaType: 'matcha',
    price: '$32.00',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80',
    affiliateUrl: '#', // replace with your affiliate link
  },
];
