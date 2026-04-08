import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-amber-200/80 text-lg">We're here to help with all your dental supply needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
              <div className="p-6 border-b border-amber-100">
                <h2 className="font-semibold text-gray-900 text-lg">Get in Touch</h2>
                <p className="text-sm text-gray-500 mt-1">Reach out to us through any of these channels</p>
              </div>
              <div className="divide-y divide-amber-50">
                <div className="p-5 flex items-start gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Phone</h3>
                    <p className="text-sm text-gray-600">1-800-BUY-DENT</p>
                    <p className="text-xs text-gray-400 mt-0.5">Mon-Fri 8am-6pm EST</p>
                  </div>
                </div>

                <div className="p-5 flex items-start gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Email</h3>
                    <p className="text-sm text-gray-600">support@buydental.com</p>
                    <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="p-5 flex items-start gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Address</h3>
                    <p className="text-sm text-gray-600">123 Dental Drive, Suite 100</p>
                    <p className="text-sm text-gray-600">San Francisco, CA 94102</p>
                  </div>
                </div>

                <div className="p-5 flex items-start gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Business Hours</h3>
                    <p className="text-sm text-gray-600">Mon-Fri: 8am - 6pm EST</p>
                    <p className="text-sm text-gray-600">Sat: 9am - 2pm EST</p>
                    <p className="text-xs text-gray-400 mt-0.5">Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Need Quick Support?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our dental professionals are available to help you choose the right products for your practice.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-amber-600">✓</span>
                  <span>Product recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-amber-600">✓</span>
                  <span>Order assistance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-amber-600">✓</span>
                  <span>Technical support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
              <div className="p-6 border-b border-amber-100">
                <h2 className="font-semibold text-gray-900 text-lg">Send us a Message</h2>
                <p className="text-sm text-gray-500 mt-1">Fill out the form below and we'll get back to you as soon as possible</p>
              </div>

              {submitted ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 mb-2">Thank you for contacting us.</p>
                  <p className="text-gray-400 text-sm">
                    We've received your message and will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" /> Full Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400"
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="product">Product Question</option>
                        <option value="technical">Technical Support</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="bulk">Bulk Orders</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 resize-none"
                      placeholder="How can we help you?"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                      Please provide as much detail as possible so we can assist you better.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <p className="text-xs text-gray-400">
                      * Required fields
                    </p>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-600/25 transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-2xl border border-amber-100 overflow-hidden">
          <div className="p-6 border-b border-amber-100">
            <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-700" />
              Our Location
            </h2>
          </div>
          <div className="h-80 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">BuyDental Headquarters</h3>
              <p className="text-gray-600">123 Dental Drive, Suite 100, San Francisco, CA 94102</p>
              <p className="text-sm text-gray-400 mt-2">Map integration available</p>
            </div>
          </div>
        </div>

          </div>
    </div>
  );
}
