import { Product } from '../types';
import { categories, brands, products as generatedProducts } from './generateProducts';

// Export the categories and brands from generateProducts
export { categories, brands };

// Use the generated 520 products
export const products = generatedProducts;
