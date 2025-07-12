import React, { useState, useEffect } from 'react';
import { User, Search, MessageSquare, Star, Settings, LogOut, Plus, Users, AlertTriangle, Home, Info, Phone, HelpCircle, Menu, X } from 'lucide-react';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import SwapRequestsPage from './components/SwapRequestsPage';
import AdminPanel from './components/AdminPanel';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import HelpPage from './components/HelpPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

const Navigation = ({ activeTab, setActiveTab, user, logout }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'requests', label: 'Requests', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: Info },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  if (user?.isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin', icon: Settings });
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-xl shadow-lg">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SkillSync</h1>
              <p className="text-xs text-purple-100 hidden sm:block">Exchange • Learn • Grow</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm transform scale-105'
                    : 'text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <item.icon className="w-4 h-4 inline mr-2" />
                {item.label}
              </button>
            ))}
          </div>

          {/* User Info & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-xs text-purple-100">⭐ {user?.rating > 0 ? `${user.rating}/5` : 'New'}</p>
              </div>
              <button
                onClick={logout}
                className="text-purple-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-purple-300 border-opacity-30 bg-white bg-opacity-10 backdrop-blur-sm rounded-b-xl mb-2">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <item.icon className="w-4 h-4 inline mr-3" />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-purple-300 border-opacity-30 pt-3 mt-3">
                <div className="px-4 py-2 text-purple-100">
                  <p className="font-medium text-white">{user?.name}</p>
                  <p className="text-sm">⭐ {user?.rating > 0 ? `${user.rating}/5` : 'New User'}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4 inline mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const AppContent = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'search':
        return <SearchPage />;
      case 'requests':
        return <SwapRequestsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'help':
        return <HelpPage />;
      case 'admin':
        return user.isAdmin ? <AdminPanel /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        logout={logout} 
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold">SkillSync</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Connect, learn, and grow with our skill exchange platform. Share your expertise and discover new talents.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setActiveTab('search')} className="hover:text-white transition-colors">Find Skills</button></li>
                <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors">Help Center</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Community</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SkillSync. All rights reserved. Made with ❤️ for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;