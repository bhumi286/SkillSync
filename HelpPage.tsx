import React, { useState } from 'react';
import { Search, Book, Users, MessageSquare, Shield, Star, ChevronDown, ChevronRight, Play, FileText, Video, Headphones } from 'lucide-react';

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const helpCategories = [
    {
      icon: Users,
      title: 'Getting Started',
      description: 'Learn the basics of using SkillSync',
      color: 'from-blue-500 to-indigo-500',
      articles: 12
    },
    {
      icon: MessageSquare,
      title: 'Skill Exchanges',
      description: 'How to send, receive, and manage swap requests',
      color: 'from-green-500 to-teal-500',
      articles: 8
    },
    {
      icon: Shield,
      title: 'Safety & Trust',
      description: 'Stay safe and build trust in the community',
      color: 'from-purple-500 to-pink-500',
      articles: 6
    },
    {
      icon: Star,
      title: 'Ratings & Reviews',
      description: 'Understanding our feedback system',
      color: 'from-yellow-500 to-orange-500',
      articles: 4
    }
  ];

  const quickGuides = [
    {
      title: 'How to Create Your First Skill Exchange',
      duration: '3 min read',
      type: 'article',
      icon: FileText
    },
    {
      title: 'Setting Up Your Profile for Success',
      duration: '5 min watch',
      type: 'video',
      icon: Video
    },
    {
      title: 'Building Trust in the Community',
      duration: '4 min read',
      type: 'article',
      icon: FileText
    },
    {
      title: 'Safety Guidelines Podcast',
      duration: '15 min listen',
      type: 'audio',
      icon: Headphones
    }
  ];

  const faqSections = [
    {
      title: 'Account & Profile',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button and fill in your basic information. You can start using SkillSync immediately after registration.'
        },
        {
          question: 'Can I change my username?',
          answer: 'Yes, you can update your display name in your profile settings at any time. Your email address serves as your unique identifier.'
        },
        {
          question: 'How do I make my profile more attractive?',
          answer: 'Add a clear profile photo, list your skills with specific details, include your availability, and write a brief bio about your interests and experience.'
        }
      ]
    },
    {
      title: 'Skill Exchanges',
      faqs: [
        {
          question: 'How do skill exchanges work?',
          answer: 'Find someone with a skill you want to learn, send them a swap request offering one of your skills in return. If they accept, you can coordinate your learning sessions.'
        },
        {
          question: 'What if someone doesn\'t respond to my request?',
          answer: 'Users have 7 days to respond to requests. If there\'s no response, the request expires automatically. Try reaching out to other users with similar skills.'
        },
        {
          question: 'Can I exchange multiple skills with the same person?',
          answer: 'Absolutely! Many users develop ongoing learning partnerships. You can send multiple requests or discuss additional exchanges after completing your first one.'
        }
      ]
    },
    {
      title: 'Safety & Community',
      faqs: [
        {
          question: 'How do I report inappropriate behavior?',
          answer: 'Use the "Report" button on any user profile or message. Our moderation team reviews all reports within 24 hours and takes appropriate action.'
        },
        {
          question: 'Is it safe to meet people from SkillSync?',
          answer: 'Always meet in public places for in-person exchanges. For online sessions, use video calls. Trust your instincts and report any concerning behavior.'
        },
        {
          question: 'What happens if I have a dispute?',
          answer: 'Contact our support team immediately. We have a mediation process to help resolve conflicts fairly and maintain community standards.'
        }
      ]
    }
  ];

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  const filteredFaqs = faqSections.map(section => ({
    ...section,
    faqs: section.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.faqs.length > 0);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white p-12 md:p-16">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-10 rounded-full -translate-y-48 translate-x-48"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Book className="w-8 h-8 text-blue-300" />
            <span className="text-blue-200 font-semibold text-lg">Help Center</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How can we
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              {' '}help you?
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Find answers, learn best practices, and get the most out of your SkillSync experience.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{category.articles} articles</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Guides */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Start Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickGuides.map((guide, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <guide.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{guide.title}</h3>
                <p className="text-sm text-gray-600">{guide.duration}</p>
              </div>
              <Play className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {(searchTerm ? filteredFaqs : faqSections).map((section, sectionIndex) => (
            <div key={sectionIndex} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                {expandedSection === section.title ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              {expandedSection === section.title && (
                <div className="px-6 py-4 space-y-4">
                  {section.faqs.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-4 border-purple-200 pl-4">
                      <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {searchTerm && filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try different keywords or browse our help categories above.</p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is here to help you with any questions or issues.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105">
            Contact Support
          </button>
          <button className="bg-purple-700 bg-opacity-50 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-70 transition-all duration-200 border border-purple-400 border-opacity-30">
            Join Community Forum
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;