// src/constants/taxonomy.amazon.ts
export interface AmazonSubcat {
  name: string;
  slug: string;
}
export interface AmazonTopcat {
  name: string;
  slug: string;
  icon: 'home'|'electronics'|'fashion'|'book'|'gamepad'|'music'|'heart'|'dumbbell'|'package'|'user'|'camera'|'mic'|'search'|'bell'|'cart'|'sparkles';
  imageUrl?: string; // optional hero image for the tile (if you want to use artwork later)
  subcategories: AmazonSubcat[];
}

/**
 * Amazon-style top categories (curated) with representative subcategories.
 * You can extend these freely; the UI renders ALL categories and ALL subcategories.
 */
export const AMAZON_TOPCATS: AmazonTopcat[] = [
  {
    name: 'Fashion & Beauty',
    slug: 'fashion-beauty',
    icon: 'fashion',
    subcategories: [
      { name: "Women's Clothing", slug: 'womens-clothing' },
      { name: "Men's Clothing", slug: 'mens-clothing' },
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Handbags & Accessories', slug: 'bags-accessories' },
      { name: 'Jewelry', slug: 'jewelry' },
      { name: 'Watches', slug: 'watches' },
      { name: 'Makeup', slug: 'makeup' },
      { name: 'Skincare', slug: 'skincare' },
      { name: 'Haircare', slug: 'haircare' },
      { name: 'Fragrance', slug: 'fragrance' },
      { name: 'Personal Care', slug: 'personal-care' },
    ],
  },
  {
    name: 'Home, Garden & Tools',
    slug: 'home-garden-tools',
    icon: 'home',
    subcategories: [
      { name: 'Furniture', slug: 'furniture' },
      { name: 'Home Decor', slug: 'home-decor' },
      { name: 'Bedding & Bath', slug: 'bedding-bath' },
      { name: 'Kitchen & Dining', slug: 'kitchen-dining' },
      { name: 'Small Appliances', slug: 'small-appliances' },
      { name: 'Large Appliances', slug: 'large-appliances' },
      { name: 'Storage & Organization', slug: 'storage-organization' },
      { name: 'Garden & Outdoor', slug: 'garden-outdoor' },
      { name: 'Tools & Hardware', slug: 'tools-hardware' },
      { name: 'Cleaning Supplies', slug: 'cleaning-supplies' },
      { name: 'Lighting', slug: 'lighting' },
    ],
  },
  {
    name: 'Devices & Electronics',
    slug: 'devices-electronics',
    icon: 'electronics',
    subcategories: [
      { name: 'Phones & Tablets', slug: 'phones-tablets' },
      { name: 'Laptops & Computers', slug: 'laptops-computers' },
      { name: 'PC Components', slug: 'pc-components' },
      { name: 'Monitors & Accessories', slug: 'monitors-accessories' },
      { name: 'Cameras', slug: 'cameras' },
      { name: 'TV & Home Theater', slug: 'tv-home-theater' },
      { name: 'Headphones & Audio', slug: 'headphones-audio' },
      { name: 'Wearables', slug: 'wearables' },
      { name: 'Smart Home', slug: 'smart-home' },
      { name: 'Drones & Action Cams', slug: 'drones-action' },
      { name: 'Car Electronics', slug: 'car-electronics' },
    ],
  },
  {
    name: 'Music, Video & Gaming',
    slug: 'music-video-gaming',
    icon: 'gamepad',
    subcategories: [
      { name: 'Consoles', slug: 'consoles' },
      { name: 'Games', slug: 'games' },
      { name: 'Controllers & Accessories', slug: 'gaming-accessories' },
      { name: 'PC Gaming', slug: 'pc-gaming' },
      { name: 'Headsets & Audio', slug: 'gaming-audio' },
      { name: 'Movies & TV', slug: 'movies-tv' },
      { name: 'Music', slug: 'music' },
      { name: 'Collectibles', slug: 'collectibles' },
    ],
  },
  {
    name: 'Books & Reading',
    slug: 'books-reading',
    icon: 'book',
    subcategories: [
      { name: 'New Releases', slug: 'new-releases' },
      { name: 'Best Sellers', slug: 'best-sellers' },
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Nonfiction', slug: 'nonfiction' },
      { name: "Children's Books", slug: 'children' },
      { name: 'Comics & Manga', slug: 'comics-manga' },
      { name: 'Textbooks', slug: 'textbooks' },
      { name: 'eBooks', slug: 'ebooks' },
      { name: 'Magazines', slug: 'magazines' },
    ],
  },
  {
    name: 'Toys, Kids & Baby',
    slug: 'toys-kids-baby',
    icon: 'package',
    subcategories: [
      { name: 'Toys & Games', slug: 'toys-games' },
      { name: 'STEM & Learning', slug: 'stem-learning' },
      { name: 'Outdoor Play', slug: 'outdoor-play' },
      { name: 'Baby Essentials', slug: 'baby-essentials' },
      { name: 'Nursery', slug: 'nursery' },
      { name: 'Kids Clothing', slug: 'kids-clothing' },
    ],
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    icon: 'package',
    subcategories: [
      { name: 'Car Care', slug: 'car-care' },
      { name: 'Parts & Accessories', slug: 'auto-parts-accessories' },
      { name: 'Tires & Wheels', slug: 'tires-wheels' },
      { name: 'Motorcycle & Powersports', slug: 'powersports' },
      { name: 'Tools & Equipment', slug: 'auto-tools-equipment' },
    ],
  },
  {
    name: 'Office & Professional',
    slug: 'office-professional',
    icon: 'user',
    subcategories: [
      { name: 'Office Supplies', slug: 'office-supplies' },
      { name: 'School Supplies', slug: 'school-supplies' },
      { name: 'Business Equipment', slug: 'business-equipment' },
      { name: '3D Printers & Supplies', slug: '3d-print' },
      { name: 'Lab & Industrial', slug: 'industrial' },
    ],
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    icon: 'dumbbell',
    subcategories: [
      { name: 'Exercise & Fitness', slug: 'exercise-fitness' },
      { name: 'Team Sports', slug: 'team-sports' },
      { name: 'Outdoor Recreation', slug: 'outdoor-recreation' },
      { name: 'Cycling', slug: 'cycling' },
      { name: 'Water Sports', slug: 'water-sports' },
      { name: 'Winter Sports', slug: 'winter-sports' },
      { name: 'Camping & Hiking', slug: 'camping-hiking' },
      { name: 'Hunting & Fishing', slug: 'hunting-fishing' },
    ],
  },
  {
    name: 'Groceries & Stores',
    slug: 'groceries-stores',
    icon: 'package',
    subcategories: [
      { name: 'Snacks', slug: 'snacks' },
      { name: 'Beverages', slug: 'beverages' },
      { name: 'Pantry', slug: 'pantry' },
      { name: 'Breakfast', slug: 'breakfast' },
      { name: 'Household Essentials', slug: 'household-essentials' },
    ],
  },
  {
    name: 'Pets',
    slug: 'pets',
    icon: 'heart',
    subcategories: [
      { name: 'Dog Supplies', slug: 'dog' },
      { name: 'Cat Supplies', slug: 'cat' },
      { name: 'Aquatic', slug: 'aquatic' },
      { name: 'Bird', slug: 'bird' },
      { name: 'Small Animals', slug: 'small-animals' },
    ],
  },
  {
    name: 'Medical Care & Pharmacy',
    slug: 'medical-pharmacy',
    icon: 'heart',
    subcategories: [
      { name: 'OTC Medicine', slug: 'otc' },
      { name: 'Vitamins & Supplements', slug: 'vitamins' },
      { name: 'Diagnostics & Health Devices', slug: 'health-devices' },
      { name: 'First Aid', slug: 'first-aid' },
      { name: 'Personal Health', slug: 'personal-health' },
    ],
  },
  {
    name: 'Gifting & Registry',
    slug: 'gifting-registry',
    icon: 'heart',
    subcategories: [
      { name: 'Gift Cards', slug: 'gift-cards' },
      { name: 'Gift Ideas', slug: 'gift-ideas' },
      { name: 'Wedding Registry', slug: 'wedding-registry' },
      { name: 'Baby Registry', slug: 'baby-registry' },
    ],
  },
  {
    name: 'Deals & Savings',
    slug: 'deals-savings',
    icon: 'bell',
    subcategories: [
      { name: 'Today’s Deals', slug: 'todays-deals' },
      { name: 'Lightning Deals', slug: 'lightning-deals' },
      { name: 'Coupons', slug: 'coupons' },
      { name: 'Outlet', slug: 'outlet' },
    ],
  },
  {
    name: 'Prime',
    slug: 'prime',
    icon: 'cart',
    subcategories: [
      { name: 'Membership', slug: 'prime-membership' },
      { name: 'Prime Video', slug: 'prime-video' },
      { name: 'Prime Music', slug: 'prime-music' },
      { name: 'Prime Reading', slug: 'prime-reading' },
    ],
  },
  {
    name: 'Delivery Services',
    slug: 'delivery-services',
    icon: 'package',
    subcategories: [
      { name: 'Shipping', slug: 'shipping' },
      { name: 'Returns', slug: 'returns' },
      { name: 'Pickup Locations', slug: 'pickups' },
    ],
  },
  {
    name: 'Sustainability',
    slug: 'sustainability',
    icon: 'heart',
    subcategories: [
      { name: 'Climate Pledge Friendly', slug: 'climate-pledge' },
      { name: 'Recycling', slug: 'recycling' },
      { name: 'Certified Products', slug: 'certified' },
    ],
  },
  {
    name: 'Your Stuff',
    slug: 'your-stuff',
    icon: 'package',
    subcategories: [
      { name: 'Orders', slug: 'orders' },
      { name: 'Lists', slug: 'lists' },
      { name: 'Reorder', slug: 'reorder' },
    ],
  },
  {
    name: 'Inspiration',
    slug: 'inspiration',
    icon: 'sparkles', // will fall back to 'bell' in icon map below if not present
    subcategories: [
      { name: 'Ideas', slug: 'ideas' },
      { name: 'Editorial Picks', slug: 'editorial-picks' },
    ],
  },
];

// Keywords to help fuzzy filter products if you pass { category/subcategory } to ProductList
export const AMAZON_KEYWORDS: Record<string, string[]> = {
  'fashion-beauty': ['fashion','clothing','apparel','jewelry','watch','makeup','skincare','hair','fragrance','personal care','shoes','bag'],
  'home-garden-tools': ['home','kitchen','dining','appliance','furniture','decor','garden','outdoor','tool','hardware','lighting','bedding'],
  'devices-electronics': ['phone','mobile','tablet','laptop','computer','pc','monitor','camera','tv','audio','headphone','wearable','smart','console','gaming'],
  'music-video-gaming': ['game','console','controller','pc gaming','movie','tv show','blu-ray','music','vinyl','collectible'],
  'books-reading': ['book','ebook','kindle','novel','fiction','nonfiction','textbook','magazine','manga','comic'],
  'toys-kids-baby': ['toy','game','puzzle','lego','doll','baby','nursery','kids'],
  'automotive': ['auto','automotive','car','motorcycle','truck','tire','wheel','oil','car care'],
  'office-professional': ['office','school','printer','paper','pen','industrial','lab'],
  'sports-outdoors': ['sport','outdoor','fitness','exercise','yoga','camp','hike','bike','cycling','fishing','hunting','water','winter'],
  'groceries-stores': ['grocery','snack','beverage','pantry','household'],
  'pets': ['pet','dog','cat','bird','aquarium','small animal'],
  'medical-pharmacy': ['otc','vitamin','supplement','first aid','health device','personal health'],
  // the service/meta categories won’t filter products
};
