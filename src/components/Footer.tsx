import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🦷</span>
              </div>
              <span className="text-xl font-bold text-white">BuyDental</span>
            </Link>
            <p className="text-sm text-amber-200/50 leading-relaxed mb-5">
              Your trusted partner for professional dental tools, equipment, and supplies. Quality products for dental professionals worldwide.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'f', 'in', '📷'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-amber-900/50 hover:bg-amber-700 rounded-lg flex items-center justify-center text-sm transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'Products', 'About Us', 'Contact', 'Blog'].map(item => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : item === 'Products' ? '/products' : '/'}
                    className="text-sm text-amber-200/50 hover:text-amber-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {['Diagnostic Instruments', 'Surgical Tools', 'Restorative Materials', 'Orthodontic Supplies', 'Infection Control'].map(item => (
                <li key={item}>
                  <Link to="/products" className="text-sm text-amber-200/50 hover:text-amber-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-amber-200/50">123 Dental Drive, Suite 100, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-amber-200/50">1-800-BUY-DENT</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-amber-200/50">support@buydental.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-amber-200/40">
            © 2026 BuyDental. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(item => (
              <button key={item} className="text-xs text-amber-200/40 hover:text-amber-300 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
