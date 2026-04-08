import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300',
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
              {totalItems} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-amber-300" />
              </div>
              <p className="text-gray-500 font-medium mb-1">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">Add some dental products to get started!</p>
              <Link
                to="/products"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors group"
                >
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm flex-shrink-0 overflow-hidden">
                    {item.product.productImage ? (
                      <img src={item.product.productImage} alt={item.product.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      item.product.image
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate pr-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-amber-700 font-semibold mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-md bg-white border border-amber-200 flex items-center justify-center hover:border-amber-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md bg-white border border-amber-200 flex items-center justify-center hover:border-amber-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-amber-100 px-6 py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-amber-700 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-amber-100">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-center rounded-xl font-semibold hover:from-amber-700 hover:to-amber-900 transition-all shadow-lg shadow-amber-600/20"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
