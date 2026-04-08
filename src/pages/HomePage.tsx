import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, Clock, ChevronLeft, ChevronRight, Star, Zap, Users, HeartHandshake, Package, BadgeCheck, Quote } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { cn } from '../utils/cn';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const hero = useInView();
  const features = useInView();
  const cats = useInView();
  const featured = useInView();
  const carousel = useInView();
  const whyUs = useInView();
  const testimonials = useInView();
  const newsletter = useInView();
  const brands = useInView();
  const cta = useInView();

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselProducts = products.slice(0, 10);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    autoPlayRef.current = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % carouselProducts.length);
    }, 3000);
  }, [carouselProducts.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [startAutoPlay]);

  const handleCarouselPrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCarouselIndex(prev => (prev === 0 ? carouselProducts.length - 1 : prev - 1));
    startAutoPlay();
  };

  const handleCarouselNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCarouselIndex(prev => (prev + 1) % carouselProducts.length);
    startAutoPlay();
  };

  const categoryData = [
    { name: 'Diagnostic', icon: '🔍', color: 'from-amber-400 to-amber-600', count: 45 },
    { name: 'Surgical', icon: '🔧', color: 'from-orange-400 to-orange-600', count: 32 },
    { name: 'Restorative', icon: '🎨', color: 'from-yellow-400 to-yellow-600', count: 28 },
    { name: 'Orthodontic', icon: '🦷', color: 'from-amber-500 to-amber-700', count: 19 },
    { name: 'Hygiene', icon: '✨', color: 'from-lime-400 to-lime-600', count: 36 },
    { name: 'Endodontic', icon: '📐', color: 'from-orange-500 to-orange-700', count: 22 },
  ];

  const testimonialData = [
    { name: 'Dr. Sarah Chen', role: 'Orthodontist', text: 'BuyDental has been our go-to supplier for over 5 years. Quality products, fast shipping, and exceptional customer service.', rating: 5, avatar: '👩‍⚕️' },
    { name: 'Dr. Michael Rivera', role: 'General Dentist', text: 'The product range is impressive. I find everything I need at competitive prices. Highly recommend for any dental practice.', rating: 5, avatar: '👨‍⚕️' },
    { name: 'Dr. Emily Watson', role: 'Periodontist', text: 'Outstanding quality instruments and materials. Their sterilization products meet the highest standards.', rating: 5, avatar: '👩‍🔬' },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialData.length]);

  return (
    <div className="overflow-hidden">
      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section
        ref={hero.ref}
        className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-900 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={cn('transition-all duration-1000', hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-amber-300 text-sm font-medium">Trusted by 10,000+ Dental Professionals</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Premium Dental
                <br />
                <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  Tools & Supplies
                </span>
              </h1>
              <p className="text-lg text-amber-100/70 mb-8 max-w-lg leading-relaxed">
                Equip your practice with professional-grade dental instruments, materials, and equipment. Fast delivery, competitive prices, and exceptional quality guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 rounded-xl font-semibold hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-3.5 border border-amber-400/30 text-amber-300 rounded-xl font-semibold hover:bg-amber-500/10 transition-all"
                >
                  View Catalog
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-amber-700/30">
                {[
                  { value: '10K+', label: 'Products' },
                  { value: '50K+', label: 'Customers' },
                  { value: '99%', label: 'Satisfaction' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-amber-300/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className={cn('hidden lg:block transition-all duration-1000 delay-300', hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-amber-800/50 to-yellow-800/50 rounded-3xl border border-amber-600/20 p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { emoji: '🦷', label: 'Dental Tools', price: 'From $19.99' },
                      { emoji: '🔬', label: 'Loupes', price: 'From $449.99' },
                      { emoji: '⚡', label: 'Scalers', price: 'From $299.99' },
                      { emoji: '💡', label: 'Curing Lights', price: 'From $179.99' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</div>
                        <div className="text-white font-medium text-sm">{item.label}</div>
                        <div className="text-amber-300/70 text-xs mt-1">{item.price}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-xl flex items-center justify-center">
                        <Truck className="w-5 h-5 text-amber-950" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">Free Shipping</div>
                        <div className="text-amber-300/60 text-xs">On orders over $100</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80V30C240 60 480 0 720 30C960 60 1200 0 1440 30V80H0Z" fill="#fffbf5" /></svg>
        </div>
      </section>

      {/* ══════════════════ TRUST BAR ══════════════════ */}
      <section ref={features.ref} className="py-16 bg-[#fffbf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700', features.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100', color: 'bg-amber-50 text-amber-700' },
              { icon: Shield, title: 'Quality Guaranteed', desc: '100% authentic products', color: 'bg-orange-50 text-orange-700' },
              { icon: Clock, title: 'Fast Delivery', desc: '2-5 business days', color: 'bg-yellow-50 text-yellow-700' },
              { icon: Award, title: 'Best Prices', desc: 'Competitive pricing', color: 'bg-lime-50 text-lime-700' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors group">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform', f.color)}>
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PRODUCT CAROUSEL SECTION ══════════════════ */}
      <section ref={carousel.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('text-center mb-12 transition-all duration-700', carousel.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <span className="text-amber-700 text-sm font-semibold tracking-wider uppercase">Hot Deals</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Trending Products</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Swipe through our most popular dental products loved by professionals</p>
          </div>

          <div className={cn('relative transition-all duration-700 delay-200', carousel.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {/* Carousel Navigation Arrows */}
            <button
              onClick={handleCarouselPrev}
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg shadow-amber-200/50 flex items-center justify-center hover:bg-amber-50 hover:shadow-xl transition-all group border border-amber-100"
            >
              <ChevronLeft className="w-5 h-5 text-amber-700 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleCarouselNext}
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg shadow-amber-200/50 flex items-center justify-center hover:bg-amber-50 hover:shadow-xl transition-all group border border-amber-100"
            >
              <ChevronRight className="w-5 h-5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Carousel Track */}
            <div className="overflow-hidden rounded-2xl" ref={carouselRef}>
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * (100 / 3)}%)` }}
              >
                {carouselProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  >
                    <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 rounded-2xl border border-amber-100 p-5 hover:shadow-xl hover:shadow-amber-100 transition-all duration-500 group cursor-pointer"
                      onClick={() => setQuickViewProduct(product)}>
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        {product.productImage ? (
                          <img
                            src={product.productImage}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-48 bg-white rounded-xl flex items-center justify-center">
                            <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{product.image}</span>
                          </div>
                        )}
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-bold rounded-full shadow-lg">
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>
                      <div className="text-xs text-amber-600 font-medium mb-1">{product.category}</div>
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn('w-3.5 h-3.5', i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded-lg">View →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {carouselProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                    setCarouselIndex(i);
                    startAutoPlay();
                  }}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300',
                    i === carouselIndex ? 'bg-amber-600 w-8' : 'bg-amber-200 w-2.5 hover:bg-amber-300'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CATEGORIES ══════════════════ */}
      <section ref={cats.ref} className="py-20 bg-[#fffbf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('text-center mb-12 transition-all duration-700', cats.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <span className="text-amber-700 text-sm font-semibold tracking-wider uppercase">Browse by Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Shop by Specialty</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Find the right tools and materials for your specific dental specialty</p>
          </div>
          <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-700 delay-200', cats.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {categoryData.map((cat, i) => (
              <Link
                to="/products"
                key={i}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-amber-100 hover:border-amber-200"
              >
                <div className={cn('w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform', cat.color)}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{cat.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURED PRODUCTS ══════════════════ */}
      <section ref={featured.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4 transition-all duration-700', featured.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div>
              <span className="text-amber-700 text-sm font-semibold tracking-wider uppercase">Featured Products</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Best Sellers</h2>
              <p className="text-gray-500 mt-2">Top-rated products chosen by dental professionals</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 transition-colors group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200', featured.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section ref={whyUs.ref} className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('text-center mb-16 transition-all duration-700', whyUs.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <span className="text-amber-700 text-sm font-semibold tracking-wider uppercase">Why Choose BuyDental</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">The BuyDental Advantage</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">We're not just a supplier – we're your partner in providing the best dental care</p>
          </div>
          <div className={cn('grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200', whyUs.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {[
              { icon: BadgeCheck, title: 'FDA Approved Products', desc: 'All products meet strict quality standards and are FDA approved for dental use.', color: 'from-amber-500 to-amber-700' },
              { icon: Zap, title: 'Same-Day Dispatch', desc: 'Orders placed before 2 PM ship the same day. Get your supplies faster.', color: 'from-orange-500 to-orange-700' },
              { icon: HeartHandshake, title: 'Expert Support', desc: 'Our dental professionals are available 24/7 to help you choose the right products.', color: 'from-yellow-500 to-yellow-700' },
              { icon: Package, title: 'Easy Returns', desc: '30-day hassle-free returns on all products. No questions asked.', color: 'from-amber-600 to-amber-800' },
              { icon: Users, title: '50K+ Happy Clients', desc: 'Join thousands of dental professionals who trust BuyDental for their practice.', color: 'from-orange-600 to-orange-800' },
              { icon: Shield, title: 'Secure Payments', desc: 'Your transactions are protected with bank-level encryption and security.', color: 'from-yellow-600 to-yellow-800' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-amber-100 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-1 transition-all duration-500 group">
                <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 group-hover:scale-110 transition-transform', item.color)}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PROMOTIONAL BANNER ══════════════════ */}
      <section className="py-6 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Flash Sale — Up to 40% OFF</h3>
                <p className="text-amber-200/70 text-sm">Limited time offer on select dental instruments</p>
              </div>
            </div>
            <Link
              to="/products"
              className="px-6 py-2.5 bg-white text-amber-800 rounded-xl font-semibold hover:bg-amber-50 transition-colors text-sm flex-shrink-0"
            >
              Shop Sale →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section ref={testimonials.ref} className="py-20 bg-gradient-to-br from-amber-950 to-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={cn('text-center mb-12 transition-all duration-700', testimonials.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <span className="text-amber-300 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Trusted by Professionals</h2>
          </div>
          <div className={cn('max-w-3xl mx-auto transition-all duration-700 delay-200', testimonials.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12 text-center relative">
              <Quote className="w-10 h-10 text-amber-400/30 absolute top-6 left-6" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg shadow-amber-500/30">
                {testimonialData[currentTestimonial].avatar}
              </div>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonialData[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonialData[currentTestimonial].text}"
              </p>
              <div>
                <div className="text-white font-semibold">{testimonialData[currentTestimonial].name}</div>
                <div className="text-amber-300/60 text-sm">{testimonialData[currentTestimonial].role}</div>
              </div>
              <div className="flex justify-center gap-3 mt-8">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonialData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={cn('w-2 h-2 rounded-full transition-all', i === currentTestimonial ? 'bg-amber-400 w-6' : 'bg-white/30')}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ BRANDS WE CARRY ══════════════════ */}
      <section ref={brands.ref} className="py-16 bg-[#fffbf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('text-center mb-10 transition-all duration-700', brands.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <span className="text-amber-700 text-sm font-semibold tracking-wider uppercase">Our Partners</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Trusted Brands We Carry</h2>
          </div>
          <div className={cn('grid grid-cols-3 md:grid-cols-6 gap-6 transition-all duration-700 delay-200', brands.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {['DentPro', 'OralTech', 'SmileCraft', 'PrecisionDent', 'SterilMax', 'FlexDental'].map((brand, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-amber-100 flex items-center justify-center hover:shadow-md hover:border-amber-200 transition-all group">
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {['🏥', '🔬', '😁', '🎯', '🛡️', '🦷'][i]}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ══════════════════ */}
      <section ref={newsletter.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-14 border border-amber-100 transition-all duration-700', newsletter.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-300/30">
                <span className="text-3xl">📬</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Stay in the Loop</h2>
              <p className="text-gray-500 mb-8">Subscribe to our newsletter for exclusive deals, new product launches, and dental industry insights.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                />
                <button className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-600/25 transition-all hover:scale-105 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section ref={cta.ref} className="py-20 bg-[#fffbf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden transition-all duration-700', cta.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Upgrade Your Practice?
              </h2>
              <p className="text-amber-100/80 mb-8 max-w-lg mx-auto">
                Join thousands of dental professionals who trust BuyDental for their equipment and supply needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/products"
                  className="px-8 py-3.5 bg-white text-amber-800 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
                >
                  Start Shopping
                </Link>
                <button className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
