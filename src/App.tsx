import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-[#fffbf5] font-[Inter,sans-serif]">
          <Navbar />
          <CartSidebar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
