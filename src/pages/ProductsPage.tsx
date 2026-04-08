import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList, Star, Eye, ShoppingCart,
} from 'lucide-react';
import { products, categories, brands } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1600]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('featured');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: true,
    rating: false,
  });

  // Read category from URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFilter = (section: string) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 1600]);
    setMinRating(0);
    setInStockOnly(false);
    setSort('featured');
  };

  const activeFilterCount = selectedCategories.length + selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 1600 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    return result;
  }, [search, selectedCategories, selectedBrands, priceRange, minRating, inStockOnly, sort]);

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn(mobile ? '' : 'hidden lg:block w-72 flex-shrink-0')}>
      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-700" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="border-b border-amber-100">
          <button
            onClick={() => toggleFilter('category')}
            className="flex items-center justify-between w-full p-5 text-left"
          >
            <span className="font-medium text-gray-900 text-sm">Category</span>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', expandedFilters.category && 'rotate-180')} />
          </button>
          {expandedFilters.category && (
            <div className="px-5 pb-5 space-y-2">
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat).length;
                return (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1 transition-colors">
                      {cat}
                    </span>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-b border-amber-100">
          <button
            onClick={() => toggleFilter('brand')}
            className="flex items-center justify-between w-full p-5 text-left"
          >
            <span className="font-medium text-gray-900 text-sm">Brand</span>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', expandedFilters.brand && 'rotate-180')} />
          </button>
          {expandedFilters.brand && (
            <div className="px-5 pb-5 space-y-2">
              {brands.map(brand => {
                const count = products.filter(p => p.brand === brand).length;
                return (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1 transition-colors">
                      {brand}
                    </span>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-b border-amber-100">
          <button
            onClick={() => toggleFilter('price')}
            className="flex items-center justify-between w-full p-5 text-left"
          >
            <span className="font-medium text-gray-900 text-sm">Price Range</span>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', expandedFilters.price && 'rotate-180')} />
          </button>
          {expandedFilters.price && (
            <div className="px-5 pb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">Min</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
                    min={0}
                  />
                </div>
                <span className="text-gray-300 mt-5">—</span>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">Max</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
                    max={1600}
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={1600}
                step={10}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>$1,600</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-amber-100">
          <button
            onClick={() => toggleFilter('rating')}
            className="flex items-center justify-between w-full p-5 text-left"
          >
            <span className="font-medium text-gray-900 text-sm">Rating</span>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', expandedFilters.rating && 'rotate-180')} />
          </button>
          {expandedFilters.rating && (
            <div className="px-5 pb-5 space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors',
                    minRating === rating ? 'bg-amber-50 text-amber-800' : 'hover:bg-gray-50 text-gray-600'
                  )}
                >
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3.5 h-3.5',
                          i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'
                        )}
                      />
                    ))}
                  </div>
                  <span>& Up</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-700 font-medium">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategories.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-200/60 text-sm">Category:</span>
                <span className="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                  {selectedCategories.join(', ')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedCategories[0]} Products</h1>
              <p className="text-amber-200/80">Showing all products in the {selectedCategories[0]} category</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">All Products</h1>
              <p className="text-amber-200/80">Browse our complete collection of dental tools and supplies</p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, categories, brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-amber-50 rounded-md"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-amber-200 rounded-xl text-sm font-medium hover:border-amber-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 bg-amber-600 text-white text-xs rounded-full">{activeFilterCount}</span>
              )}
            </button>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-4 py-3 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 cursor-pointer min-w-[180px]"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="hidden sm:flex items-center bg-white border border-amber-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setGridView(true)}
                className={cn('p-3 transition-colors', gridView ? 'bg-amber-50 text-amber-700' : 'text-gray-400 hover:text-gray-600')}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridView(false)}
                className={cn('p-3 transition-colors', !gridView ? 'bg-amber-50 text-amber-700' : 'text-gray-400 hover:text-gray-600')}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedCategories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-medium rounded-full hover:bg-amber-100 transition-colors"
              >
                {cat}
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedBrands.map(brand => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-800 text-xs font-medium rounded-full hover:bg-orange-100 transition-colors"
              >
                {brand}
                <X className="w-3 h-3" />
              </button>
            ))}
            {minRating > 0 && (
              <button
                onClick={() => setMinRating(0)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-800 text-xs font-medium rounded-full hover:bg-yellow-100 transition-colors"
              >
                {minRating}+ Stars
                <X className="w-3 h-3" />
              </button>
            )}
            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full hover:bg-green-100 transition-colors"
              >
                In Stock
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-red-500 ml-2 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex gap-8">
          <FilterSidebar />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-amber-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 text-sm">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : gridView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ListProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity lg:hidden',
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-full max-w-sm bg-[#fffbf5] z-50 overflow-y-auto transition-transform duration-300 lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 bg-white border-b border-amber-100">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-amber-50 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <FilterSidebar mobile />
        </div>
        <div className="p-4 border-t border-amber-100 bg-white sticky bottom-0">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full py-3 bg-amber-700 text-white rounded-xl font-medium hover:bg-amber-800 transition-colors"
          >
            Show {filteredProducts.length} Results
          </button>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

function ListProductCard({ product, onQuickView }: { product: Product; onQuickView?: (product: Product) => void }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-amber-100 p-4 flex gap-5 hover:shadow-lg hover:border-amber-200 transition-all">
      <div className="relative w-24 h-24 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        {product.productImage ? (
          <img src={product.productImage} alt={product.name} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-4xl">{product.image}</span>
        )}
        <button
          onClick={() => onQuickView?.(product)}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
        >
          <div className="p-2 bg-white rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Eye className="w-4 h-4 text-amber-700" />
          </div>
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-amber-700 font-medium mb-1">{product.category}</div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('w-3 h-3', i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
            {product.badge && (
              <span className="ml-2 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">{product.badge}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickView?.(product)}
              className="p-2 rounded-xl text-gray-400 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                isAdded
                  ? 'bg-green-500 text-white'
                  : product.inStock
                  ? 'bg-amber-700 text-white hover:bg-amber-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {isAdded ? 'Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
