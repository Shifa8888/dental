export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  productImage?: string;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  featured: boolean;
  badge?: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  search: string;
  sort: string;
}
