import React from 'react';
import { Users, Heart, Globe, Zap, Target, Award, ArrowRight, Sparkles, MessageSquare, Star } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '10,000+', label: 'Active Users', icon: Users },
    { number: '50,000+', label: 'Skills Exchanged', icon: MessageSquare },
    { number: '95%', label: 'Success Rate', icon: Star },
    { number: '150+', label: 'Countries', icon: Globe }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe in the power of human connection and mutual support in learning.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Breaking down barriers to make quality education accessible to everyone, everywhere.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving our platform to provide the best learning experience.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Quality Focus',
      description: 'Ensuring every skill exchange is meaningful and adds real value to both parties.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former educator passionate about democratizing learning through technology.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Tech visionary with 15+ years building scalable platforms for education.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Community',
      bio: 'Community builder dedicated to fostering meaningful connections between learners.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'UX expert focused on creating intuitive experiences for skill sharing.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 rounded-3xl text-white p-12 md:p-16">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white bg-opacity-10 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <span className="text-purple-200 font-semibold text-lg">About SkillSync</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connecting Minds,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              Sharing Knowledge
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
            We're building the world's largest community where everyone can teach, learn, and grow together through skill exchange.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg">
            Join Our Mission
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600">Making a difference in the global learning community</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At SkillSync, we believe that everyone has something valuable to teach and something important to learn. 
            Our mission is to create a world where knowledge flows freely, barriers to learning are eliminated, 
            and every person can reach their full potential through the power of community.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We're not just building a platform; we're fostering a global movement where curiosity meets expertise, 
            where passion drives progress, and where every interaction creates value for both the teacher and the learner.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center">
            Learn More About Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Built with Purpose</h3>
              <p className="text-gray-600">Every feature designed to bring people together and facilitate meaningful learning experiences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600">The principles that guide everything we do</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="text-lg text-gray-600 space-y-6 leading-relaxed">
            <p>
              SkillSync was born from a simple observation: in our interconnected world, there are millions of people 
              eager to learn new skills, and millions more with expertise to share. Yet, traditional education systems 
              often create barriers rather than bridges.
            </p>
            <p>
              Founded in 2024 by a team of educators, technologists, and community builders, SkillSync started as 
              an experiment in peer-to-peer learning. What began as a small platform for local skill exchanges has 
              grown into a global community where knowledge knows no boundaries.
            </p>
            <p>
              Today, we're proud to facilitate thousands of skill exchanges daily, connecting people across continents, 
              cultures, and disciplines. Every success story on our platform reinforces our belief that the best learning 
              happens when people come together with mutual respect, curiosity, and a shared desire to grow.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600">The passionate people behind SkillSync</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-purple-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl text-white p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Be part of the learning revolution. Share your skills, discover new passions, and connect with amazing people worldwide.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Start Learning Today
          </button>
          <button className="bg-purple-700 bg-opacity-50 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-70 transition-all duration-200 border border-purple-400 border-opacity-30">
            Become a Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;