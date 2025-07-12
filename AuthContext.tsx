import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  isAdmin: boolean;
  profilePhoto?: string;
  joinDate: string;
  rating: number;
  completedSwaps: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('skillsync_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Initialize with demo data
      initializeDemoData();
    }
  }, []);

  const initializeDemoData = () => {
    const demoUsers = [
      {
        id: '1',
        email: 'admin@skillsync.com',
        name: 'Admin User',
        location: 'San Francisco, CA',
        skillsOffered: ['Project Management', 'Team Leadership'],
        skillsWanted: ['Data Science', 'Machine Learning'],
        availability: ['Weekends', 'Evenings'],
        isPublic: true,
        isAdmin: true,
        joinDate: '2024-01-15',
        rating: 4.8,
        completedSwaps: 15
      },
      {
        id: '2',
        email: 'alex@example.com',
        name: 'Alex Johnson',
        location: 'New York, NY',
        skillsOffered: ['JavaScript', 'React', 'Node.js'],
        skillsWanted: ['Python', 'Data Analysis'],
        availability: ['Weekends'],
        isPublic: true,
        isAdmin: false,
        joinDate: '2024-02-01',
        rating: 4.6,
        completedSwaps: 8
      },
      {
        id: '3',
        email: 'sarah@example.com',
        name: 'Sarah Chen',
        location: 'Austin, TX',
        skillsOffered: ['Graphic Design', 'UI/UX Design', 'Adobe Creative Suite'],
        skillsWanted: ['Web Development', 'JavaScript'],
        availability: ['Evenings', 'Weekends'],
        isPublic: true,
        isAdmin: false,
        joinDate: '2024-01-20',
        rating: 4.9,
        completedSwaps: 12
      },
      {
        id: '4',
        email: 'mike@example.com',
        name: 'Mike Rodriguez',
        location: 'Seattle, WA',
        skillsOffered: ['Data Science', 'Python', 'Machine Learning'],
        skillsWanted: ['DevOps', 'AWS'],
        availability: ['Weekdays after 6PM'],
        isPublic: true,
        isAdmin: false,
        joinDate: '2024-02-10',
        rating: 4.7,
        completedSwaps: 6
      }
    ];

    // Store demo users
    localStorage.setItem('skillsync_users', JSON.stringify(demoUsers));
    
    // Initialize demo swap requests
    const demoSwapRequests = [
      {
        id: '1',
        senderId: '2',
        receiverId: '3',
        skillOffered: 'JavaScript',
        skillRequested: 'Graphic Design',
        status: 'pending',
        message: 'Hi Sarah! I\'d love to learn graphic design basics in exchange for JavaScript tutoring.',
        createdAt: '2024-12-20',
        senderName: 'Alex Johnson',
        receiverName: 'Sarah Chen'
      },
      {
        id: '2',
        senderId: '4',
        receiverId: '2',
        skillOffered: 'Python',
        skillRequested: 'React',
        status: 'accepted',
        message: 'Hey Alex! I can teach you Python data science if you help me with React.',
        createdAt: '2024-12-18',
        senderName: 'Mike Rodriguez',
        receiverName: 'Alex Johnson'
      }
    ];
    
    localStorage.setItem('skillsync_swap_requests', JSON.stringify(demoSwapRequests));

    // Initialize feedback
    const demoFeedback = [
      {
        id: '1',
        fromUserId: '2',
        toUserId: '4',
        swapRequestId: '2',
        rating: 5,
        comment: 'Mike was an excellent teacher! Very patient and knowledgeable about Python.',
        createdAt: '2024-12-19',
        fromUserName: 'Alex Johnson',
        toUserName: 'Mike Rodriguez'
      }
    ];
    
    localStorage.setItem('skillsync_feedback', JSON.stringify(demoFeedback));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('skillsync_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
    
    // Check if email already exists
    if (users.find((u: User) => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      location: userData.location || '',
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      isPublic: true,
      isAdmin: false,
      joinDate: new Date().toISOString().split('T')[0],
      rating: 0,
      completedSwaps: 0
    };

    users.push(newUser);
    localStorage.setItem('skillsync_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('skillsync_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillsync_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('skillsync_user', JSON.stringify(updatedUser));

    // Update in users list
    const users = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('skillsync_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};