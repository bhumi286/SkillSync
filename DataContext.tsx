import React, { createContext, useContext, useState, useEffect } from 'react';

interface SwapRequest {
  id: string;
  senderId: string;
  receiverId: string;
  skillOffered: string;
  skillRequested: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
  senderName: string;
  receiverName: string;
}

interface Feedback {
  id: string;
  fromUserId: string;
  toUserId: string;
  swapRequestId: string;
  rating: number;
  comment: string;
  createdAt: string;
  fromUserName: string;
  toUserName: string;
}

interface DataContextType {
  swapRequests: SwapRequest[];
  feedback: Feedback[];
  users: any[];
  createSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  updateSwapRequestStatus: (id: string, status: SwapRequest['status']) => void;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => void;
  deleteSwapRequest: (id: string) => void;
  getUserById: (id: string) => any;
  getPublicUsers: () => any[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedRequests = localStorage.getItem('skillsync_swap_requests');
    const storedFeedback = localStorage.getItem('skillsync_feedback');
    const storedUsers = localStorage.getItem('skillsync_users');

    if (storedRequests) {
      setSwapRequests(JSON.parse(storedRequests));
    }
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const createSwapRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedRequests = [...swapRequests, newRequest];
    setSwapRequests(updatedRequests);
    localStorage.setItem('skillsync_swap_requests', JSON.stringify(updatedRequests));
  };

  const updateSwapRequestStatus = (id: string, status: SwapRequest['status']) => {
    const updatedRequests = swapRequests.map(request =>
      request.id === id ? { ...request, status } : request
    );
    setSwapRequests(updatedRequests);
    localStorage.setItem('skillsync_swap_requests', JSON.stringify(updatedRequests));
  };

  const deleteSwapRequest = (id: string) => {
    const updatedRequests = swapRequests.filter(request => request.id !== id);
    setSwapRequests(updatedRequests);
    localStorage.setItem('skillsync_swap_requests', JSON.stringify(updatedRequests));
  };

  const addFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt'>) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedFeedback = [...feedback, newFeedback];
    setFeedback(updatedFeedback);
    localStorage.setItem('skillsync_feedback', JSON.stringify(updatedFeedback));

    // Update user ratings
    const targetUser = users.find(u => u.id === feedbackData.toUserId);
    if (targetUser) {
      const userFeedback = updatedFeedback.filter(f => f.toUserId === feedbackData.toUserId);
      const avgRating = userFeedback.reduce((sum, f) => sum + f.rating, 0) / userFeedback.length;
      
      const updatedUsers = users.map(u =>
        u.id === feedbackData.toUserId 
          ? { ...u, rating: Math.round(avgRating * 10) / 10, completedSwaps: u.completedSwaps + 1 }
          : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('skillsync_users', JSON.stringify(updatedUsers));
    }
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const getPublicUsers = () => {
    return users.filter(user => user.isPublic);
  };

  return (
    <DataContext.Provider value={{
      swapRequests,
      feedback,
      users,
      createSwapRequest,
      updateSwapRequestStatus,
      addFeedback,
      deleteSwapRequest,
      getUserById,
      getPublicUsers
    }}>
      {children}
    </DataContext.Provider>
  );
};