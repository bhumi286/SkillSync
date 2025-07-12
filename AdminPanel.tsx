import React, { useState } from 'react';
import { Users, MessageSquare, AlertTriangle, Ban, Trash2, Eye, Mail, Shield } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AdminPanel = () => {
  const { users, swapRequests, feedback } = useData();
  const [activeTab, setActiveTab] = useState<'users' | 'swaps' | 'feedback' | 'notifications'>('users');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleBanUser = (userId: string) => {
    // In a real app, this would update the user's banned status
    console.log('Banning user:', userId);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would delete the user
    console.log('Deleting user:', userId);
  };

  const handleDeleteSwap = (swapId: string) => {
    // In a real app, this would delete the swap request
    console.log('Deleting swap:', swapId);
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    // In a real app, this would delete the feedback
    console.log('Deleting feedback:', feedbackId);
  };

  const sendNotification = () => {
    if (!notificationMessage.trim()) return;
    
    // In a real app, this would send notifications to selected users or all users
    console.log('Sending notification to users:', selectedUsers.length > 0 ? selectedUsers : 'all users');
    console.log('Message:', notificationMessage);
    
    setNotificationMessage('');
    setShowNotificationModal(false);
    setSelectedUsers([]);
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: Users, count: users.length },
    { id: 'swaps', label: 'Swaps', icon: MessageSquare, count: swapRequests.length },
    { id: 'feedback', label: 'Feedback', icon: Eye, count: feedback.length },
    { id: 'notifications', label: 'Notifications', icon: Mail, count: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-red-100">Platform management and moderation</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
                <button
                  onClick={() => setShowNotificationModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Notification
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(users.map(u => u.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user.id]);
                              } else {
                                setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                              }
                            }}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-blue-100 rounded-full p-2 mr-3">
                              <Users className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.location || 'No location'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900">{user.rating > 0 ? `${user.rating}/5` : 'No rating'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.isAdmin ? 'Admin' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleBanUser(user.id)}
                            className="text-orange-600 hover:text-orange-900"
                            title="Ban User"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Swaps Tab */}
          {activeTab === 'swaps' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Swap Requests</h2>
              <div className="space-y-4">
                {swapRequests.map((swap) => (
                  <div key={swap.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          {swap.senderName} → {swap.receiverName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {swap.skillOffered} ↔ {swap.skillRequested}
                        </p>
                        <p className="text-xs text-gray-500">{swap.createdAt}</p>
                        {swap.message && (
                          <p className="text-sm text-gray-700 mt-2 italic">"{swap.message}"</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          swap.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          swap.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          swap.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {swap.status}
                        </span>
                        <button
                          onClick={() => handleDeleteSwap(swap.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Swap"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">User Feedback</h2>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.fromUserName} → {item.toUserName}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500">{'★'.repeat(item.rating)}</span>
                          <span className="text-gray-300">{'★'.repeat(5 - item.rating)}</span>
                          <span className="ml-2 text-sm text-gray-600">({item.rating}/5)</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">"{item.comment}"</p>
                        <p className="text-xs text-gray-500 mt-1">{item.createdAt}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteFeedback(item.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Feedback"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Platform Notifications</h2>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Send Platform-wide Notification</h3>
                <p className="text-gray-500 mb-4">
                  Communicate important updates, announcements, or alerts to your users.
                </p>
                <button
                  onClick={() => setShowNotificationModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Notification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Send Platform Notification
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedUsers.length > 0 
                    ? `${selectedUsers.length} selected users` 
                    : 'All users'
                  }
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter your notification message..."
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowNotificationModal(false);
                  setNotificationMessage('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendNotification}
                disabled={!notificationMessage.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;