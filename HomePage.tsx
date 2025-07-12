import React from 'react';
import { Users, MessageSquare, Star, TrendingUp, Search, Plus, Zap, Target, Globe, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const HomePage = () => {
  const { user } = useAuth();
  const { swapRequests, feedback, users } = useData();

  const userRequests = swapRequests.filter(req => 
    req.senderId === user?.id || req.receiverId === user?.id
  );
  
  const pendingRequests = userRequests.filter(req => req.status === 'pending');
  const completedSwaps = userRequests.filter(req => req.status === 'completed');

  const stats = [
    {
      icon: Users,
      label: 'Active Users',
      value: users.length,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: MessageSquare,
      label: 'Pending Requests',
      value: pendingRequests.length,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      icon: Star,
      label: 'Your Rating',
      value: user?.rating ? `${user.rating}/5` : 'New',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      icon: TrendingUp,
      label: 'Completed Swaps',
      value: user?.completedSwaps || 0,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  const features = [
    {
      icon: Search,
      title: 'Discover Skills',
      description: 'Find experts in any field and connect with like-minded learners',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageSquare,
      title: 'Easy Communication',
      description: 'Send requests, chat, and coordinate your skill exchanges seamlessly',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Award,
      title: 'Build Reputation',
      description: 'Earn ratings and build trust within our growing community',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with people worldwide and expand your horizons',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const recentActivity = [
    ...swapRequests
      .filter(req => req.senderId === user?.id || req.receiverId === user?.id)
      .slice(-5)
      .map(req => ({
        type: 'swap',
        title: req.senderId === user?.id ? `Sent request to ${req.receiverName}` : `Received request from ${req.senderName}`,
        subtitle: `${req.skillOffered} ↔ ${req.skillRequested}`,
        time: req.createdAt,
        status: req.status
      })),
    ...feedback
      .filter(f => f.toUserId === user?.id)
      .slice(-3)
      .map(f => ({
        type: 'feedback',
        title: `Received ${f.rating}-star rating`,
        subtitle: `From ${f.fromUserName}`,
        time: f.createdAt,
        status: 'completed'
      }))
  ]
  .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  .slice(0, 5);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl text-white p-8 md:p-12">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span className="text-purple-200 font-medium">Welcome back!</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hello, <span className="text-yellow-300">{user?.name}</span>! 👋
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl">
            Ready to share your expertise and discover new skills? Your learning journey continues here.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Explore Skills
            </button>
            <button className="bg-purple-700 bg-opacity-50 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-70 transition-all duration-200 border border-purple-400 border-opacity-30 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:border-purple-200 transform group-hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className={`w-12 h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-60`}></div>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">SkillSync</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of learners and experts in our vibrant community where knowledge flows freely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    activity.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    activity.status === 'accepted' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                    activity.status === 'pending' ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                    'bg-gradient-to-r from-gray-400 to-gray-500'
                  } shadow-sm`}></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">Start exploring to see your activity here</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl mr-4">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">Discover New Skills</p>
                    <p className="text-sm text-blue-600">Find experts in your area of interest</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button className="w-full text-left p-6 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl hover:from-teal-100 hover:to-green-100 transition-all duration-200 border border-teal-200 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-xl mr-4">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-teal-800">Manage Requests</p>
                    <p className="text-sm text-teal-600">View and respond to skill swap requests</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button className="w-full text-left p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-200 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-800">Update Profile</p>
                    <p className="text-sm text-purple-600">Add new skills and update availability</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      {user && (user.skillsOffered.length > 0 || user.skillsWanted.length > 0) && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Skill Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills You Offer</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.skillsOffered.length > 0 ? (
                  user.skillsOffered.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold border border-green-200 hover:shadow-md transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No skills added yet</p>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills You Want</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.skillsWanted.length > 0 ? (
                  user.skillsWanted.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No skills specified</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;