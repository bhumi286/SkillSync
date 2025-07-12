import React, { useState } from 'react';
import { MessageSquare, Check, X, Trash2, Star, Clock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const SwapRequestsPage = () => {
  const { user } = useAuth();
  const { swapRequests, updateSwapRequestStatus, deleteSwapRequest, addFeedback, getUserById } = useData();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    comment: ''
  });

  const userRequests = swapRequests.filter(req => 
    req.senderId === user?.id || req.receiverId === user?.id
  );

  const receivedRequests = userRequests.filter(req => req.receiverId === user?.id);
  const sentRequests = userRequests.filter(req => req.senderId === user?.id);

  const currentRequests = activeTab === 'received' ? receivedRequests : sentRequests;

  const handleAccept = (requestId: string) => {
    updateSwapRequestStatus(requestId, 'accepted');
  };

  const handleReject = (requestId: string) => {
    updateSwapRequestStatus(requestId, 'rejected');
  };

  const handleDelete = (requestId: string) => {
    deleteSwapRequest(requestId);
  };

  const handleComplete = (request: any) => {
    updateSwapRequestStatus(request.id, 'completed');
    setSelectedRequest(request);
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    if (!selectedRequest || !user) return;

    const otherUserId = selectedRequest.senderId === user.id ? selectedRequest.receiverId : selectedRequest.senderId;
    const otherUserName = selectedRequest.senderId === user.id ? selectedRequest.receiverName : selectedRequest.senderName;

    addFeedback({
      fromUserId: user.id,
      toUserId: otherUserId,
      swapRequestId: selectedRequest.id,
      rating: feedbackForm.rating,
      comment: feedbackForm.comment,
      fromUserName: user.name,
      toUserName: otherUserName
    });

    setShowFeedbackModal(false);
    setFeedbackForm({ rating: 5, comment: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'completed': return <Star className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Skill Swap Requests</h1>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 py-2 px-4 text-center font-medium rounded-md transition-colors ${
              activeTab === 'received'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Received ({receivedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`flex-1 py-2 px-4 text-center font-medium rounded-md transition-colors ${
              activeTab === 'sent'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Sent ({sentRequests.length})
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {currentRequests.length > 0 ? (
          currentRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {activeTab === 'received' ? request.senderName : request.receiverName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {activeTab === 'received' ? 'Wants to swap with you' : 'You requested a swap'}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </span>
                  </div>

                  {/* Swap Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">They Offer</p>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {request.skillOffered}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-gray-400">
                          ⇄
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">For Your</p>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {request.skillRequested}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {request.message && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Message:</p>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                    </div>
                  )}

                  {/* Date */}
                  <p className="text-xs text-gray-500 mb-4">
                    Sent on {new Date(request.createdAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {activeTab === 'received' && request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </>
                    )}
                    
                    {request.status === 'accepted' && (
                      <button
                        onClick={() => handleComplete(request)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Mark Complete & Rate
                      </button>
                    )}
                    
                    {(request.status === 'rejected' || (activeTab === 'sent' && request.status === 'pending')) && (
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {activeTab} requests
            </h3>
            <p className="text-gray-500">
              {activeTab === 'received' 
                ? "You haven't received any skill swap requests yet."
                : "You haven't sent any skill swap requests yet."
              }
            </p>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Rate Your Experience
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5 stars) *
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                      className={`text-2xl transition-colors ${
                        star <= feedbackForm.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment (Optional)
                </label>
                <textarea
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Share your experience with this skill swap..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={submitFeedback}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapRequestsPage;