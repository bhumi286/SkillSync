import React, { useState } from 'react';
import { User, MapPin, Clock, Eye, EyeOff, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    skillsOffered: user?.skillsOffered || [],
    skillsWanted: user?.skillsWanted || [],
    availability: user?.availability || [],
    isPublic: user?.isPublic || true
  });
  const [newSkill, setNewSkill] = useState({ offered: '', wanted: '' });
  const [newAvailability, setNewAvailability] = useState('');

  const skillOptions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Data Science', 'Machine Learning',
    'Graphic Design', 'UI/UX Design', 'Adobe Creative Suite', 'Web Development',
    'Project Management', 'Team Leadership', 'DevOps', 'AWS', 'Photography',
    'Video Editing', 'Content Writing', 'Digital Marketing', 'SEO', 'Social Media',
    'Accounting', 'Finance', 'Legal Advice', 'Public Speaking', 'Teaching',
    'Language Translation', 'Music Production', 'Cooking', 'Fitness Training'
  ];

  const availabilityOptions = [
    'Weekdays 9-5', 'Weekdays after 6PM', 'Weekends', 'Evenings', 'Mornings',
    'Flexible schedule', 'By appointment only'
  ];

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    const skill = type === 'offered' ? newSkill.offered : newSkill.wanted;
    if (skill.trim() && !formData[type === 'offered' ? 'skillsOffered' : 'skillsWanted'].includes(skill)) {
      setFormData({
        ...formData,
        [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: [
          ...formData[type === 'offered' ? 'skillsOffered' : 'skillsWanted'],
          skill
        ]
      });
      setNewSkill({ ...newSkill, [type]: '' });
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', skillToRemove: string) => {
    setFormData({
      ...formData,
      [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: formData[type === 'offered' ? 'skillsOffered' : 'skillsWanted'].filter(skill => skill !== skillToRemove)
    });
  };

  const addAvailability = () => {
    if (newAvailability.trim() && !formData.availability.includes(newAvailability)) {
      setFormData({
        ...formData,
        availability: [...formData.availability, newAvailability]
      });
      setNewAvailability('');
    }
  };

  const removeAvailability = (availabilityToRemove: string) => {
    setFormData({
      ...formData,
      availability: formData.availability.filter(avail => avail !== availabilityToRemove)
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <User className="w-16 h-16" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center mt-2 space-x-4">
                  {user.location && (
                    <div className="flex items-center text-blue-100">
                      <MapPin className="w-4 h-4 mr-1" />
                      {user.location}
                    </div>
                  )}
                  <div className="flex items-center text-blue-100">
                    <div className="flex items-center">
                      ⭐ {user.rating > 0 ? `${user.rating}/5` : 'No rating yet'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., San Francisco, CA"
                  />
                ) : (
                  <p className="text-gray-800">{user.location || 'Not specified'}</p>
                )}
              </div>
            </div>

            {/* Privacy Toggle */}
            <div className="mt-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  disabled={!isEditing}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 flex items-center">
                  {formData.isPublic ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                  Public profile (visible to other users)
                </span>
              </label>
            </div>
          </section>

          {/* Skills Offered */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills You Offer</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.skillsOffered.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill('offered', skill)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <select
                    value={newSkill.offered}
                    onChange={(e) => setNewSkill({ ...newSkill, offered: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a skill to offer</option>
                    {skillOptions.map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => addSkill('offered')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Skills Wanted */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills You Want to Learn</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.skillsWanted.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill('wanted', skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <select
                    value={newSkill.wanted}
                    onChange={(e) => setNewSkill({ ...newSkill, wanted: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a skill to learn</option>
                    {skillOptions.map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => addSkill('wanted')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Availability</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.availability.map((avail, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {avail}
                    {isEditing && (
                      <button
                        onClick={() => removeAvailability(avail)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <select
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <button
                    onClick={addAvailability}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;