import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Heart, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account or technical issues',
      contact: 'support@skillsync.com',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 24/7',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support specialists',
      contact: '+1 (555) 123-4567',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, Suite 100',
      country: 'United States',
      timezone: 'PST (UTC-8)'
    },
    {
      city: 'London',
      address: '456 Tech Square, Floor 5',
      country: 'United Kingdom',
      timezone: 'GMT (UTC+0)'
    },
    {
      city: 'Singapore',
      address: '789 Digital Hub, Level 12',
      country: 'Singapore',
      timezone: 'SGT (UTC+8)'
    }
  ];

  const faqs = [
    {
      question: 'How do I start a skill exchange?',
      answer: 'Simply search for users with skills you want to learn, then send them a swap request with details about what you can offer in return.'
    },
    {
      question: 'Is SkillSync free to use?',
      answer: 'Yes! SkillSync is completely free. We believe knowledge sharing should be accessible to everyone.'
    },
    {
      question: 'How do I build trust with other users?',
      answer: 'Complete your profile, get verified, and start with small skill exchanges. Our rating system helps build trust over time.'
    },
    {
      question: 'What if I have a dispute with another user?',
      answer: 'Contact our support team immediately. We have a dedicated mediation process to resolve conflicts fairly.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl text-white p-12 md:p-16">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-10 rounded-full -translate-y-48 translate-x-48"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="w-8 h-8 text-pink-300" />
            <span className="text-purple-200 font-semibold text-lg">We're Here to Help</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              {' '}Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
            Have questions, feedback, or need support? Our friendly team is ready to help you succeed on your learning journey.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group">
            <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <method.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{method.title}</h3>
            <p className="text-gray-600 mb-4">{method.description}</p>
            <p className="font-semibold text-purple-600">{method.contact}</p>
          </div>
        ))}
      </div>

      {/* Contact Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          
          {isSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell us how we can help you..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="space-y-8">
          {/* Office Locations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Our Offices
            </h3>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div key={index} className="border-l-4 border-purple-200 pl-4">
                  <h4 className="font-semibold text-gray-800">{office.city}</h4>
                  <p className="text-gray-600 text-sm">{office.address}</p>
                  <p className="text-gray-600 text-sm">{office.country}</p>
                  <div className="flex items-center mt-2">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{office.timezone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-green-800">Response Times</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Email Support:</span>
                <span className="font-medium text-green-800">Within 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Live Chat:</span>
                <span className="font-medium text-green-800">Immediate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Phone Support:</span>
                <span className="font-medium text-green-800">Within 2 hours</span>
              </div>
            </div>
          </div>

          {/* Global Reach */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-800">Global Support</h3>
            </div>
            <p className="text-blue-700 text-sm">
              Our support team operates across multiple time zones to provide 24/7 assistance to our global community of learners and teachers.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
            View Full FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;