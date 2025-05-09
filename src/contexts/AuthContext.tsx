import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// College options for registration
export const colleges = [
  { id: 'harlow', name: 'Harlow College' },
  { id: 'westminster', name: 'Westminster Kingsway College' },
  { id: 'southend', name: 'South Essex College' },
  { id: 'colchester', name: 'Colchester Institute' },
  { id: 'other', name: 'Other Institution' }
];

// Interest areas for students
export const interests = [
  { id: 'chef', name: 'Chef / Cooking' },
  { id: 'hotel', name: 'Hotel Management' },
  { id: 'baker', name: 'Bakery / Pastry' },
  { id: 'events', name: 'Events & Catering' },
  { id: 'hospitality', name: 'General Hospitality' },
  { id: 'other', name: 'Other Culinary Interest' }
];

// Define the base user type
interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

// Student-specific fields
interface Student extends BaseUser {
  role: 'student';
  college: string;
  interest: string;
  emailVerified: boolean;
  onboardingCompleted: boolean;
}

// Admin-specific fields
interface Admin extends BaseUser {
  role: 'admin';
}

// Combined user type
export type User = Student | Admin;

// Define the auth context shape
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string, 
    email: string, 
    password: string, 
    college: string, 
    interest: string
  ) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  isAdmin: () => boolean;
  isStudent: () => boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check for existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function with hardcoded credentials for demo
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Admin credentials
      if (email === 'admin@ypg.org' && password === 'admin123') {
        const adminUser: Admin = {
          id: 'admin-1',
          name: 'YPG Admin',
          email: 'admin@ypg.org',
          role: 'admin',
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return;
      }
      
      // Demo student credentials
      if (email === 'student@example.com' && password === 'student123') {
        const studentUser: Student = {
          id: 'student-1',
          name: 'Jamie Smith',
          email: 'student@example.com',
          role: 'student',
          college: 'harlow',
          interest: 'chef',
          emailVerified: true,
          onboardingCompleted: true
        };
        
        setUser(studentUser);
        localStorage.setItem('user', JSON.stringify(studentUser));
        return;
      }
      
      // In a real app, this would verify credentials with an API
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Register function for students
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    college: string, 
    interest: string
  ) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, would create user and send verification email
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create student user
      const studentUser: Student = {
        id: 'student-' + Date.now(),
        name,
        email,
        role: 'student',
        college,
        interest,
        emailVerified: false,  // Requires verification in real app
        onboardingCompleted: false
      };
      
      setUser(studentUser);
      localStorage.setItem('user', JSON.stringify(studentUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Email verification function (mock)
  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, would verify email using token
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user && user.role === 'student') {
        const updatedUser: Student = {
          ...user,
          emailVerified: true
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Complete onboarding function
  const completeOnboarding = async () => {
    if (user && user.role === 'student') {
      const updatedUser: Student = {
        ...user,
        onboardingCompleted: true
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Check if current user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if current user is student
  const isStudent = () => {
    return user?.role === 'student';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        verifyEmail,
        completeOnboarding,
        isAdmin,
        isStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 