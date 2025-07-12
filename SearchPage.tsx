import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, MessageSquare, User, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const SearchPage = () => {
  const { user } = useAuth();
  const { getPublicUsers, createSwapRequest } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [requestForm, setRequestForm] = useState({
    skillOffered: '',
    skillRequested: '',
    message: ''
  });

  const publicUsers = getPublicUsers().filter(u => u.id !== user?.id);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    publicUsers.forEach(user => {
      user.skillsOffered.forEach((skill: string) => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, [publicUsers]);

  const filteredUsers = useMemo(() => {
    return publicUsers.filter(u => {
      const matchesSearch = searchTerm === '' || 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.skillsOffered.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSkill = selectedSkill === '' || u.skillsOffered.includes(selectedSkill);
      
      return matchesSearch && matchesSkill;
    });
  }, [publicUsers, searchTerm, selectedSkill]);

  const handleSendRequest = (targetUser: any) => {
    setSelectedUser(targetUser);
    setRequestForm({
      skillOffered: '',
      skillRequested: '',
      message: ''
    });
    setShowRequestModal(true);
  };

  const submitRequest = () => {
    if (!selectedUser || !user || !requestForm.skillOffered || !requestForm.skillRequested) return;

    createSwapRequest({
      senderId: user.id,
      receiverId: selectedUser.id,
      skillOffered: requestForm.skillOffered,
      skillRequested: requestForm.skillRequested,
      status: 'pending',
      message: requestForm.message,
      senderName: user.name,
      receiverName: selectedUser.name
    });

    setShowRequestModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Skills & People</h1>
        
        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, location, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-gray-600">{filteredUsers.length} users found</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((targetUser) => (
          <div key={targetUser.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* User Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{targetUser.name}</h3>
                  {targetUser.location && (
                    <div className="flex items-center text-blue-100 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {targetUser.location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 space-y-4">
              {/* Rating & Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {targetUser.rating > 0 ? `${targetUser.rating}/5` : 'No rating'}
                </div>
                <div>{targetUser.completedSwaps} swaps</div>
              </div>

              {/* Skills Offered */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Offers:</h4>
                <div className="flex flex-wrap gap-1">
                  {targetUser.skillsOffered.slice(0, 3).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {targetUser.skillsOffered.length > 3 && (
                    <span className="text-gray-500 text-xs">+{targetUser.skillsOffered.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Skills Wanted */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Wants:</h4>
                <div className="flex flex-wrap gap-1">
                  {targetUser.skillsWanted.slice(0, 3).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {targetUser.skillsWanted.length > 3 && (
                    <span className="text-gray-500 text-xs">+{targetUser.skillsWanted.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Availability */}
              {targetUser.availability.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Available:</h4>
                  <p className="text-sm text-gray-600">{targetUser.availability.join(', ')}</p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => handleSendRequest(targetUser)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Swap Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or check back later for new users.
          </p>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Send Swap Request to {selectedUser.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill You Offer *
                </label>
                <select
                  value={requestForm.skillOffered}
                  onChange={(e) => setRequestForm({ ...requestForm, skillOffered: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a skill you offer</option>
                  {user?.skillsOffered.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill You Want *
                </label>
                <select
                  value={requestForm.skillRequested}
                  onChange={(e) => setRequestForm({ ...requestForm, skillRequested: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a skill you want</option>
                  {selectedUser.skillsOffered.map((skill: string) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={requestForm.message}
                  onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Tell them why you'd like to swap skills..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRequest}
                disabled={!requestForm.skillOffered || !requestForm.skillRequested}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;