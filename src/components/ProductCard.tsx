import { useState } from 'react';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

interface Props {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: Props) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group bg-white rounded-2xl border border-amber-100/80 overflow-hidden hover:shadow-xl hover:shadow-amber-800/5 hover:border-amber-200 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Area */}
      <div className="relative bg-gradient-to-br from-amber-50/60 to-orange-50/40 p-6 pb-4 overflow-hidden">
        {product.productImage ? (
          <div className="h-36 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={product.productImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
            />
          </div>
        ) : (
          <div className="text-6xl text-center py-4 group-hover:scale-110 transition-transform duration-500">
            {product.image}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-semibold rounded-lg shadow-sm">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              'p-2 rounded-lg backdrop-blur-sm shadow-sm transition-colors',
              isLiked ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'
            )}
          >
            <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
          </button>
          <button
            onClick={() => onQuickView?.(product)}
            className="p-2 bg-white/90 rounded-lg text-gray-400 hover:text-amber-700 hover:bg-amber-50 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <div className="text-xs text-amber-700 font-medium mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-200 fill-gray-200'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300',
              isAdded
                ? 'bg-green-500 text-white scale-105'
                : product.inStock
                ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white hover:shadow-lg hover:shadow-amber-600/25 hover:scale-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
