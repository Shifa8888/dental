// Script to generate 500+ dental products
import { Product } from '../types';

export const categories = [
  'Diagnostic Instruments',
  'Surgical Instruments', 
  'Restorative Materials',
  'Orthodontic Supplies',
  'Hygiene & Prevention',
  'Endodontic Tools',
  'Prosthodontic Materials',
  'Infection Control',
];

export const brands = [
  'DentPro',
  'OralMax',
  'SmileCraft',
  'PrecisionDent',
  'ClearBrite',
  'EndoTech',
  'ProGuard',
  'FlexiDent',
];

// Product name components for generation
const productComponents = {
  'Diagnostic Instruments': {
    subcategories: ['Mirrors', 'Explorers', 'Probes', 'Loupes', 'X-Ray Sensors', 'Cameras', 'Illuminators', 'Retractors'],
    names: [
      'Dental Mirror', 'Explorer Set', 'Periodontal Probe', 'Surgical Loupes', 'Digital X-Ray Sensor',
      'Intraoral Camera', 'Fiber Optic Illuminator', 'Mouth Retractor', 'Cheek Retractor', 'Diagnostic Kit',
      'Examination Mirror', 'Twisted Explorer', 'Williams Probe', 'Galilean Loupes', 'CMOS Sensor',
      'HD Camera System', 'LED Illuminator', 'Adjustable Retractor', 'Pediatric Mirror', 'Nabers Probe'
    ],
    priceRange: [15, 600],
    emojis: ['🪞', '🔍', '📏', '🔬', '📡', '📷', '💡', '🦷']
  },
  'Surgical Instruments': {
    subcategories: ['Forceps', 'Elevators', 'Scalpels', 'Sutures', 'Bone Files', 'Retractors', 'Scissors', 'Drills'],
    names: [
      'Extraction Forceps', 'Periosteal Elevator', 'Surgical Scalpel', 'Absorbable Suture', 'Bone File',
      'Tissue Retractor', 'Surgical Scissors', 'Surgical Drill', 'Needle Holder', 'Hemostat',
      'Root Tip Forceps', 'Curved Elevator', 'Blade Handle', 'Non-Absorbable Suture', 'Diamond File',
      'Self-Retaining Retractor', 'Metzenbaum Scissors', 'Implant Drill', 'Tissue Forceps', 'Kelly Clamp'
    ],
    priceRange: [25, 800],
    emojis: ['🔧', '🔨', '🔪', '🧵', '🦴', '🪝', '✂️', '⚙️']
  },
  'Restorative Materials': {
    subcategories: ['Composites', 'Curing Lights', 'Handpieces', 'Cements', 'Amalgams', 'Bonds', 'Etchants', 'Polishing'],
    names: [
      'Composite Resin', 'LED Curing Light', 'High-Speed Handpiece', 'Glass Ionomer Cement', 'Dental Amalgam',
      'Dental Bond', 'Phosphoric Acid Etchant', 'Polishing Discs', 'Flowable Composite', 'Cordless Curing Light',
      'Low-Speed Handpiece', 'Resin Cement', 'Capsule Amalgam', 'Self-Etch Bond', 'Gel Etchant',
      'Diamond Polisher', 'Bulk Fill Composite', 'Blue Curing Light', 'Electric Handpiece', 'Temporary Cement'
    ],
    priceRange: [20, 700],
    emojis: ['🎨', '💡', '⚙️', '🧪', '⚫', '🔗', '🧴', '✨']
  },
  'Orthodontic Supplies': {
    subcategories: ['Brackets', 'Wires', 'Elastics', 'Pliers', 'Retainers', 'Aligners', 'Bonding', 'Separators'],
    names: [
      'Ceramic Bracket', 'Arch Wire', 'Elastic Chain', 'Orthodontic Pliers', 'Hawley Retainer',
      'Clear Aligner', 'Orthodontic Bond', 'Separating Ring', 'Metal Bracket', 'NiTi Wire',
      'Ligature Tie', 'Distal End Cutter', 'Essix Retainer', 'Invisible Aligner', 'Etching Gel',
      'Power Chain', 'Self-Ligating Bracket', 'TMA Wire', 'Elastic Module', 'Bracket Remover'
    ],
    priceRange: [12, 450],
    emojis: ['🦷', '🔗', '⭕', '🔧', '😁', '👄', '🧴', '🔘']
  },
  'Hygiene & Prevention': {
    subcategories: ['Scalers', 'Prophy Paste', 'Fluoride', 'Air Polishers', 'Ultrasonics', 'Polishers', 'Sealants', 'Trays'],
    names: [
      'Ultrasonic Scaler', 'Prophy Paste', 'Fluoride Varnish', 'Air Polishing Unit', 'Piezo Scaler',
      'Rubber Cup', 'Dental Sealant', 'Prophy Tray', 'Hand Scaler', 'Polishing Paste',
      'Fluoride Gel', 'Airflow System', 'Magnetostrictive Scaler', 'Prophy Angle', 'Pit Fissure Sealant',
      'Disposable Tray', 'Gracey Curette', 'Whitening Paste', 'Topical Fluoride', 'Sonic Scaler'
    ],
    priceRange: [18, 500],
    emojis: ['⚡', '✨', '🧴', '💨', '🌊', '🎯', '🛡️', '🫧']
  },
  'Endodontic Tools': {
    subcategories: ['Files', 'Apex Locators', 'Irrigators', 'Gutta Percha', 'Obturators', 'Spreaders', 'Reamers', 'Sealers'],
    names: [
      'Rotary File', 'Apex Locator', 'Endo Irrigator', 'Gutta Percha Points', 'Thermal Obturator',
      'Finger Spreader', 'Endo Reamer', 'Root Canal Sealer', 'Hand File', 'Digital Apex Locator',
      'Ultrasonic Irrigator', 'Absorbent Points', 'Carrier-Based Obturator', 'Plugger', 'Pathfinder File',
      'Bioceramic Sealer', 'K-File', 'Apex Finder', 'Syringe Irrigator', 'Master Cone'
    ],
    priceRange: [30, 550],
    emojis: ['📐', '📱', '💧', '🔴', '🔥', '📍', '🔄', '🧪']
  },
  'Prosthodontic Materials': {
    subcategories: ['Impression Trays', 'Temporary Materials', 'Denture Materials', 'Ceramics', 'Alloys', 'Waxes', 'Investments', 'Articulators'],
    names: [
      'Impression Tray', 'Temporary Crown', 'Denture Base', 'Dental Ceramic', 'Cobalt Chrome Alloy',
      'Modeling Wax', 'Investment Material', 'Dental Articulator', 'Custom Tray', 'Bridge Material',
      'Flexible Denture', 'Zirconia Block', 'Gold Alloy', 'Inlay Wax', 'Gypsum Investment',
      'Semi-Adjustable Articulator', 'Stock Tray', 'Provisional Material', 'Partial Denture', 'Feldspathic Ceramic',
      'Base Metal Alloy', 'Boxing Wax', 'Phosphate Investment', 'Fully Adjustable Articulator'
    ],
    priceRange: [22, 900],
    emojis: ['🫧', '👑', '🦷', '💎', '⚙️', '🕯️', '🏗️', '📐']
  },
  'Infection Control': {
    subcategories: ['Sterilization', 'Autoclaves', 'Barriers', 'Disinfectants', 'PPE', 'Waste Management', 'Surface Protection', 'Instrument Care'],
    names: [
      'Sterilization Pouch', 'Tabletop Autoclave', 'Surface Barrier', 'Surface Disinfectant', 'Nitrile Gloves',
      'Biohazard Bag', 'Chairside Cover', 'Instrument Lubricant', 'Sterilization Wrap', 'Steam Autoclave',
      'Headrest Cover', 'Tuberculocidal Disinfectant', 'Face Mask', 'Sharps Container', 'Light Handle Cover',
      'Ultrasonic Cleaner', 'Autoclave Tape', 'Cavicide Wipes', 'Protective Eyewear', 'Instrument Cassette'
    ],
    priceRange: [10, 1500],
    emojis: ['🛡️', '🏭', '🧤', '🧼', '😷', '🗑️', '🪑', '🔧']
  }
};

const badges = ['Best Seller', 'Top Rated', 'New', 'Popular', 'Sale', 'Premium', 'Pro Choice', 'Best Value', 'Limited', 'Hot Deal'];
const adjectives = ['Professional', 'Premium', 'Advanced', 'High-Quality', 'Ultra', 'Precision', 'Enhanced', 'Superior', 'Elite', 'Max'];
const descriptors = [
  'with ergonomic design', 'for optimal performance', 'with advanced technology', 'for professional use',
  'with superior quality', 'for enhanced precision', 'with improved durability', 'for maximum comfort',
  'with innovative features', 'for clinical excellence', 'with long-lasting results', 'for efficient workflow',
  'with anti-fatigue grip', 'for better visibility', 'with quick setup', 'for reliable results',
  'with smooth operation', 'for precise control', 'with extended battery', 'for versatile applications'
];

function getRandomElement(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrice(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function generateProduct(id: number): Product {
  const category = getRandomElement(categories);
  const categoryData = productComponents[category as keyof typeof productComponents];
  const subcategory = getRandomElement(categoryData.subcategories);
  const baseName = getRandomElement(categoryData.names);
  const emoji = getRandomElement(categoryData.emojis);
  const brand = getRandomElement(brands);
  const rating = Math.round((4 + Math.random()) * 10) / 10; // 4.0 to 5.0
  const reviews = Math.floor(Math.random() * 500) + 10;
  const inStock = Math.random() > 0.15; // 85% in stock
  const featured = Math.random() > 0.85; // 15% featured
  const hasBadge = Math.random() > 0.7;
  const hasOriginalPrice = Math.random() > 0.6;
  
  const price = getRandomPrice(categoryData.priceRange[0], categoryData.priceRange[1]);
  const originalPrice = hasOriginalPrice ? Math.round(price * (1.2 + Math.random() * 0.3) * 100) / 100 : undefined;
  
  const productName = Math.random() > 0.5 
    ? `${getRandomElement(adjectives)} ${baseName}` 
    : `${baseName} ${getRandomElement(descriptors)}`;
  
  const tag1 = baseName.toLowerCase().split(' ')[0];
  const tag2 = category.toLowerCase().split(' ')[0];
  const tag3 = subcategory.toLowerCase().split(' ')[0];
  
  return {
    id,
    name: productName,
    price,
    originalPrice,
    image: emoji,
    productImage: Math.random() > 0.7 ? `/images/product-${Math.floor(Math.random() * 20) + 1}.jpg` : undefined,
    category,
    subcategory,
    brand,
    rating,
    reviews,
    description: `${productName} - ${getRandomElement(descriptors)}. Ideal for ${category.toLowerCase()} applications. Manufactured by ${brand} with industry-leading quality standards.`,
    inStock,
    featured,
    badge: hasBadge ? getRandomElement(badges) : undefined,
    tags: [tag1, tag2, tag3]
  };
}

// Generate 520 products
export const products: Product[] = Array.from({ length: 520 }, (_, i) => generateProduct(i + 1));
