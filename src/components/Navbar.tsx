import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/checkout', label: 'Checkout' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-amber-900/5'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white text-lg">🦷</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent leading-tight">
                BuyDental
              </span>
              <span className="text-[9px] text-amber-600/60 tracking-widest uppercase -mt-0.5 hidden sm:block">
                Professional Supplies
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === link.to
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-gray-600 hover:text-amber-800 hover:bg-amber-50/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/products"
              className="p-2 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all hidden md:flex"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button className="p-2 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all hidden md:flex">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs font-bold rounded-full flex items-center justify-center animate-[bounce_0.5s_ease-in-out]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-amber-700 md:hidden rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-amber-100',
          mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                location.pathname === link.to
                  ? 'text-amber-800 bg-amber-50'
                  : 'text-gray-600 hover:text-amber-800 hover:bg-amber-50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
