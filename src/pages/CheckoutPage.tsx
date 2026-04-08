import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, Truck, Shield, ArrowLeft, Minus, Plus, Trash2, CheckCircle,
  MapPin, User, Mail, Phone, Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart, totalItems } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
    shippingMethod: 'standard',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const shippingCost = formData.shippingMethod === 'express' ? 14.99 : totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (nextStep: Step) => {
    setStep(nextStep);
    if (nextStep === 'confirmation') {
      clearCart();
    }
  };

  const steps = [
    { id: 'cart', label: 'Cart', num: 1 },
    { id: 'shipping', label: 'Shipping', num: 2 },
    { id: 'payment', label: 'Payment', num: 3 },
    { id: 'confirmation', label: 'Done', num: 4 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-20">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-3xl border border-amber-100 p-10 md:p-16 shadow-sm">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
            <p className="text-gray-500 mb-2">Thank you for your purchase!</p>
            <p className="text-gray-400 text-sm mb-8">
              Order #BD-{Math.random().toString(36).substring(2, 8).toUpperCase()} has been placed successfully.
              You'll receive a confirmation email shortly.
            </p>
            <div className="bg-amber-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Truck className="w-5 h-5 text-amber-700" />
                <span className="text-amber-800 font-medium">Estimated Delivery</span>
              </div>
              <p className="text-amber-700 text-lg font-semibold">
                {formData.shippingMethod === 'express' ? '1-2' : '3-5'} Business Days
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="px-8 py-3 border border-amber-200 text-gray-600 rounded-xl font-semibold hover:bg-amber-50 transition-all"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-20">
      <div className="bg-white border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      i < currentStepIndex
                        ? 'bg-amber-600 text-white'
                        : i === currentStepIndex
                        ? 'bg-amber-700 text-white ring-4 ring-amber-100'
                        : 'bg-gray-100 text-gray-400'
                    )}
                  >
                    {i < currentStepIndex ? '✓' : s.num}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium hidden sm:block',
                      i <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn('flex-1 h-0.5 mx-4', i < currentStepIndex ? 'bg-amber-600' : 'bg-gray-200')} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-amber-100">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6 text-sm">Add some products to proceed with checkout</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-xl font-medium hover:bg-amber-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 'cart' && (
                <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
                  <div className="p-6 border-b border-amber-100">
                    <h2 className="font-semibold text-gray-900">Shopping Cart ({totalItems} items)</h2>
                  </div>
                  <div className="divide-y divide-amber-50">
                    {items.map(item => (
                      <div key={item.product.id} className="p-6 flex gap-4 hover:bg-amber-50/30 transition-colors">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
                          {item.product.productImage ? (
                            <img src={item.product.productImage} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            item.product.image
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-medium text-gray-900 text-sm">{item.product.name}</h3>
                              <p className="text-xs text-gray-400 mt-0.5">{item.product.brand} • {item.product.category}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-lg border border-amber-200 flex items-center justify-center hover:border-amber-400 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg border border-amber-200 flex items-center justify-center hover:border-amber-400 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-xs text-gray-400">${item.product.price.toFixed(2)} each</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-amber-100 flex justify-between">
                    <Link to="/products" className="inline-flex items-center gap-2 text-sm text-amber-700 font-medium hover:text-amber-800">
                      <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Link>
                    <button
                      onClick={() => handleSubmit('shipping')}
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Proceed to Shipping
                    </button>
                  </div>
                </div>
              )}

              {step === 'shipping' && (
                <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
                  <div className="p-6 border-b border-amber-100 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-amber-700" />
                    <h2 className="font-semibold text-gray-900">Shipping Information</h2>
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" /> First Name
                        </label>
                        <input name="firstName" value={formData.firstName} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name</label>
                        <input name="lastName" value={formData.lastName} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" /> Email
                        </label>
                        <input name="email" type="email" value={formData.email} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" /> Phone
                        </label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="(555) 123-4567" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Address</label>
                      <input name="address" value={formData.address} onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="123 Main Street" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">City</label>
                        <input name="city" value={formData.city} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="San Francisco" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">State</label>
                        <input name="state" value={formData.state} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="CA" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">ZIP Code</label>
                        <input name="zip" value={formData.zip} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="94102" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-700" /> Shipping Method
                      </h3>
                      <div className="space-y-3">
                        <label className={cn(
                          'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                          formData.shippingMethod === 'standard' ? 'border-amber-500 bg-amber-50/50' : 'border-gray-200 hover:border-gray-300'
                        )}>
                          <div className="flex items-center gap-3">
                            <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === 'standard'} onChange={handleInputChange} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Standard Shipping</div>
                              <div className="text-xs text-gray-500">3-5 business days</div>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{totalPrice >= 100 ? 'Free' : '$9.99'}</span>
                        </label>
                        <label className={cn(
                          'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                          formData.shippingMethod === 'express' ? 'border-amber-500 bg-amber-50/50' : 'border-gray-200 hover:border-gray-300'
                        )}>
                          <div className="flex items-center gap-3">
                            <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === 'express'} onChange={handleInputChange} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Express Shipping</div>
                              <div className="text-xs text-gray-500">1-2 business days</div>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">$14.99</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-amber-100 flex justify-between">
                    <button onClick={() => setStep('cart')} className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-gray-700">
                      <ArrowLeft className="w-4 h-4" /> Back to Cart
                    </button>
                    <button
                      onClick={() => handleSubmit('payment')}
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
                  <div className="p-6 border-b border-amber-100 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-amber-700" />
                    <h2 className="font-semibold text-gray-900">Payment Information</h2>
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Your payment information is encrypted and secure</span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Card Number</label>
                      <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Cardholder Name</label>
                      <input name="cardName" value={formData.cardName} onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Expiry Date</label>
                        <input name="expiry" value={formData.expiry} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">CVV</label>
                        <input name="cvv" value={formData.cvv} onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" placeholder="123" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div className="flex gap-3">
                        {['💳 Visa', '💳 Mastercard', '💳 Amex'].map(card => (
                          <span key={card} className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded">{card}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-amber-100 flex justify-between">
                    <button onClick={() => setStep('shipping')} className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-gray-700">
                      <ArrowLeft className="w-4 h-4" /> Back to Shipping
                    </button>
                    <button
                      onClick={() => handleSubmit('confirmation')}
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" /> Place Order — ${grandTotal.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-amber-100">
                  <h3 className="font-semibold text-gray-900">Order Summary</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {items.slice(0, 3).map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
                          {item.product.productImage ? (
                            <img src={item.product.productImage} alt={item.product.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            item.product.image
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{item.product.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-xs font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <p className="text-xs text-gray-400 text-center">+ {items.length - 3} more items</p>
                    )}
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-amber-100">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shipping</span>
                      <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-gray-900 pt-3 border-t border-amber-100">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {totalPrice < 100 && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-xl">
                      <p className="text-xs text-amber-800">
                        Add <span className="font-semibold">${(100 - totalPrice).toFixed(2)}</span> more for free shipping!
                      </p>
                      <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, (totalPrice / 100) * 100)}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout powered by SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
