import { useEffect, useState } from 'react';
import { X, Star, ShoppingCart, Heart, Package, Truck, Shield, Tag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: Props) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setIsAdded(false);
      setImageLoaded(false);
      setIsZoomed(false);
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      document.body.style.overflow = '';
      setAnimateIn(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setAnimateIn(false);
      setTimeout(onClose, 300);
    }
  };

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(onClose, 300);
  };

  const hasRealImage = !!product.productImage;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300',
        animateIn ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transition-all duration-500 ease-out',
          animateIn ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
        )}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl text-gray-500 hover:text-gray-800 transition-all duration-200 hover:rotate-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
          {/* Image Section */}
          <div className="md:w-1/2 relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-2">
            <div
              className={cn(
                'relative aspect-square flex items-center justify-center overflow-hidden rounded-2xl cursor-zoom-in transition-transform duration-500',
                isZoomed && 'cursor-zoom-out'
              )}
              onClick={() => hasRealImage && setIsZoomed(!isZoomed)}
            >
              {hasRealImage ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 animate-pulse rounded-2xl">
                      <div className="text-6xl opacity-30">{product.image}</div>
                    </div>
                  )}
                  <img
                    src={product.productImage}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    className={cn(
                      'w-full h-full object-cover rounded-2xl transition-all duration-700',
                      imageLoaded ? 'opacity-100' : 'opacity-0',
                      isZoomed ? 'scale-150' : 'scale-100 hover:scale-105'
                    )}
                  />
                </>
              ) : (
                <div className="text-[120px] md:text-[150px] select-none transition-transform duration-500 hover:scale-110">
                  {product.image}
                </div>
              )}

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-600/30 uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg shadow-red-500/30">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {hasRealImage && (
                <div className={cn(
                  'absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm transition-opacity duration-300',
                  isZoomed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}>
                  {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                </div>
              )}
            </div>

            {hasRealImage && (
              <div className="flex items-center justify-center gap-2 py-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-sm shadow-amber-500/50" />
                <div className="w-2 h-2 rounded-full bg-amber-300" />
                <div className="w-2 h-2 rounded-full bg-amber-300" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {product.brand}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5 transition-colors',
                      i < Math.floor(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200 fill-gray-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-lg border border-amber-100 capitalize"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className={cn(
                'w-2.5 h-2.5 rounded-full',
                product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              )} />
              <span className={cn(
                'text-sm font-medium',
                product.inStock ? 'text-green-600' : 'text-red-500'
              )}>
                {product.inStock ? 'In Stock — Ready to Ship' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border-2 border-amber-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-gray-600 hover:bg-amber-50 font-bold text-lg transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2.5 font-bold text-gray-900 min-w-[3rem] text-center border-x-2 border-amber-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-gray-600 hover:bg-amber-50 font-bold text-lg transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-base transition-all duration-300',
                  isAdded
                    ? 'bg-green-500 text-white scale-[1.02] shadow-lg shadow-green-500/30'
                    : product.inStock
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white hover:shadow-xl hover:shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                )}
              >
                <ShoppingCart className={cn('w-5 h-5', isAdded && 'animate-bounce')} />
                {isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'p-3.5 rounded-xl border-2 transition-all duration-200',
                  isLiked
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-amber-200 text-gray-400 hover:text-red-500 hover:border-red-200'
                )}
              >
                <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-amber-100">
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <div className="p-1.5 bg-amber-50 rounded-lg">
                  <Truck className="w-4 h-4 text-amber-700" />
                </div>
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>2-year warranty</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <div className="p-1.5 bg-orange-50 rounded-lg">
                  <Package className="w-4 h-4 text-orange-600" />
                </div>
                <span>Easy 30-day returns</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <div className="p-1.5 bg-green-50 rounded-lg">
                  <Tag className="w-4 h-4 text-green-600" />
                </div>
                <span>Best price guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
