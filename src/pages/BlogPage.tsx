import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Search, ChevronRight } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Dental Instruments Every Practice Needs in 2026',
      excerpt: 'Discover the essential dental instruments that should be in every modern dental practice. From diagnostic tools to surgical equipment, we cover everything you need.',
      category: 'Equipment',
      author: 'Dr. Sarah Chen',
      date: 'April 5, 2026',
      readTime: '8 min read',
      image: '🦷',
      featured: true,
    },
    {
      id: 2,
      title: 'Understanding Dental Loupes: A Complete Buying Guide',
      excerpt: 'Learn how to choose the right dental loupes for your practice. We break down magnification, working distance, and ergonomic considerations.',
      category: 'Guide',
      author: 'Dr. Michael Rivera',
      date: 'April 3, 2026',
      readTime: '12 min read',
      image: '🔍',
      featured: true,
    },
    {
      id: 3,
      title: 'Infection Control Best Practices for Modern Dental Clinics',
      excerpt: 'Stay compliant with the latest infection control guidelines. Learn about sterilization protocols, PPE requirements, and office safety measures.',
      category: 'Safety',
      author: 'Dr. Emily Watson',
      date: 'March 30, 2026',
      readTime: '10 min read',
      image: '🛡️',
      featured: false,
    },
    {
      id: 4,
      title: 'Digital Dentistry: The Future is Now',
      excerpt: 'Explore how digital impressions, 3D printing, and CAD/CAM technology are revolutionizing dental practices worldwide.',
      category: 'Technology',
      author: 'Dr. James Park',
      date: 'March 28, 2026',
      readTime: '15 min read',
      image: '💻',
      featured: false,
    },
    {
      id: 5,
      title: 'Composite vs Amalgam: Making the Right Choice',
      excerpt: 'A comprehensive comparison of composite and amalgam fillings, including durability, aesthetics, and patient preferences.',
      category: 'Materials',
      author: 'Dr. Lisa Anderson',
      date: 'March 25, 2026',
      readTime: '9 min read',
      image: '🎨',
      featured: false,
    },
    {
      id: 6,
      title: 'How to Maintain Your Dental Handpieces',
      excerpt: 'Extend the life of your dental handpieces with proper maintenance techniques. Learn cleaning, lubrication, and sterilization best practices.',
      category: 'Maintenance',
      author: 'Dr. Robert Kim',
      date: 'March 22, 2026',
      readTime: '7 min read',
      image: '🔧',
      featured: false,
    },
    {
      id: 7,
      title: 'Pediatric Dentistry: Creating a Child-Friendly Practice',
      excerpt: 'Tips and tools for making your dental practice more welcoming to young patients. From equipment to office design.',
      category: 'Practice Tips',
      author: 'Dr. Amanda Torres',
      date: 'March 18, 2026',
      readTime: '11 min read',
      image: '👶',
      featured: false,
    },
    {
      id: 8,
      title: 'Understanding Dental Implant Systems',
      excerpt: 'A detailed overview of different dental implant systems, their components, and how to choose the right one for your patients.',
      category: 'Implants',
      author: 'Dr. David Miller',
      date: 'March 15, 2026',
      readTime: '14 min read',
      image: '⚙️',
      featured: false,
    },
  ];

  const categories = ['All', 'Equipment', 'Guide', 'Safety', 'Technology', 'Materials', 'Maintenance', 'Practice Tips', 'Implants'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Latest Blog</h1>
          <p className="text-amber-200/80 text-lg">Insights, guides, and news from the dental industry</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 overflow-hidden hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{post.image}</span>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-bold rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      {/* <span className="text-xs text-amber-700 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-md'
                    : 'bg-white border border-amber-200 text-gray-600 hover:border-amber-400 hover:text-amber-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Blog</span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-amber-700 font-medium">{selectedCategory}</span>
            </>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-amber-100">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6 text-sm">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === 'All' && !searchQuery ? regularPosts : filteredPosts).map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl border border-amber-100 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{post.image}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-amber-50">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      {/* <span className="text-xs text-amber-700 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-amber-100">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-300/30">
              <span className="text-3xl">📬</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-gray-500 mb-8">
              Get the latest dental industry insights, product reviews, and practice tips delivered to your inbox.
            </p>
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
    </div>
  );
}
