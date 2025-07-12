import React, { useState } from 'react';
import { User, Mail, Lock, MapPin, Sparkles, Users, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (!formData.name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        const success = await register(formData);
        if (!success) {
          setError('Email already exists');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const demoLogin = async (email: string) => {
    setLoading(true);
    setError('');
    const success = await login(email, 'demo');
    if (!success) {
      setError('Demo login failed');
    }
    setLoading(false);
  };

  const features = [
    {
      icon: Users,
      title: 'Connect Globally',
      description: 'Join thousands of learners worldwide'
    },
    {
      icon: MessageSquare,
      title: 'Easy Exchanges',
      description: 'Simple skill swap requests and coordination'
    },
    {
      icon: Star,
      title: 'Build Reputation',
      description: 'Earn ratings and build trust in the community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="text-center lg:text-left space-y-8">
          <div>
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-lg">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">SkillSync</h1>
                <p className="text-purple-600 font-medium">Exchange • Learn • Grow</p>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Share Your Skills,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Learn Something New
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join our vibrant community where knowledge flows freely. Connect with experts, 
              share your expertise, and grow together through meaningful skill exchanges.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-white border-opacity-50">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">50K+</div>
              <div className="text-sm text-gray-600">Skills Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">150+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="max-w-md w-full mx-auto">
          {/* Demo Users */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Try Demo Accounts</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => demoLogin('admin@skillsync.com')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50 transition-all duration-200 text-sm border border-blue-100 group"
                disabled={loading}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-blue-800">Admin User</strong>
                    <p className="text-blue-600 text-xs">Full access including admin panel</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                </div>
              </button>
              <button
                onClick={() => demoLogin('alex@example.com')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50 transition-all duration-200 text-sm border border-blue-100 group"
                disabled={loading}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-blue-800">Alex Johnson</strong>
                    <p className="text-blue-600 text-xs">JavaScript developer</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                </div>
              </button>
              <button
                onClick={() => demoLogin('sarah@example.com')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50 transition-all duration-200 text-sm border border-blue-100 group"
                disabled={loading}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-blue-800">Sarah Chen</strong>
                    <p className="text-blue-600 text-xs">UI/UX designer</p>
                  </div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Auth Form */}
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white border-opacity-50">
            <div className="flex mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all duration-200 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all duration-200 ml-2 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white bg-opacity-80"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white bg-opacity-80"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white bg-opacity-80"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white bg-opacity-80"
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-4 rounded-xl font-semibold hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Please wait...
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;