import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, UpdateUserRequest } from '../types/movie';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Validate and clean user data
        const normalizedUser: User = {
          userId: parsedUser.userId || parsedUser.UserId || 0,
          username: parsedUser.username || parsedUser.Username || '',
          passwordHash: parsedUser.passwordHash || parsedUser.PasswordHash || '',
          fullName: parsedUser.fullName || parsedUser.FullName || '',
          age: parsedUser.age || parsedUser.Age || 0,
          email: parsedUser.email || parsedUser.Email || '',
          role: parsedUser.role || parsedUser.Role || 'user',
          createdAt: parsedUser.createdAt || parsedUser.CreatedAt || new Date().toISOString(),
        };
        
        // Validate that we have the minimum required data
        if (normalizedUser.userId && normalizedUser.username && normalizedUser.passwordHash) {
          setUser(normalizedUser);
        } else {
          console.warn('Invalid user data in localStorage, clearing it');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const payload = {
        Username: credentials.username,
        Password: credentials.password,
      };
      const userResponse = await apiService.login(payload);
      
      // Normalize user data to handle both camelCase and PascalCase
      const user: User = {
        userId: userResponse.userId || userResponse.UserId,
        username: userResponse.username || userResponse.Username,
        passwordHash: userResponse.passwordHash || userResponse.PasswordHash,
        fullName: userResponse.fullName || userResponse.FullName,
        age: userResponse.age || userResponse.Age,
        email: userResponse.email || userResponse.Email,
        role: userResponse.role || userResponse.Role || 'user', // Default to 'user' if backend doesn't provide role
        createdAt: userResponse.createdAt || userResponse.CreatedAt,
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const payload = {
        Username: userData.username,
        Password: userData.password,
        Email: userData.email,
        FullName: userData.fullName,
        Age: userData.age ? parseInt(String(userData.age), 10) : undefined,
        // Role: userData.role, // Commented out until backend supports it
      };
      const userResponse = await apiService.register(payload);
      
      // Normalize user data to handle both camelCase and PascalCase
      const newUser: User = {
        userId: userResponse.userId || userResponse.UserId,
        username: userResponse.username || userResponse.Username,
        passwordHash: userResponse.passwordHash || userResponse.PasswordHash,
        fullName: userResponse.fullName || userResponse.FullName,
        age: userResponse.age || userResponse.Age,
        email: userResponse.email || userResponse.Email,
        role: userResponse.role || userResponse.Role || userData.role || 'user', // Use selected role or default to 'user'
        createdAt: userResponse.createdAt || userResponse.CreatedAt,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    try {
      console.log('AuthContext: Updating user with data:', userData);
      
      // Validate and convert data types
      const age = userData.age !== undefined ? Number(userData.age) : user.age;
      if (isNaN(age) || age < 1 || age > 150) {
        throw new Error('Invalid age value');
      }
      
      // Transform keys to PascalCase for backend and include UserId in body
      const payload: UpdateUserRequest = {
        UserId: user.userId,
        Username: (userData.username ?? user.username).trim(),
        FullName: (userData.fullName ?? user.fullName).trim(),
        Email: (userData.email ?? user.email).trim(),
        Age: age,
        PasswordHash: (userData as any).password || user.passwordHash, // Use new password if provided, otherwise keep current
        Role: userData.role || user.role, // Include role if backend supports it
      };
      
      // Validate required fields
      if (!payload.Username || !payload.FullName || !payload.Email || !payload.PasswordHash) {
        throw new Error('All required fields must be provided');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.Email)) {
        throw new Error('Invalid email format');
      }
      
      const userResponse = await apiService.updateUser(user.userId, payload);
      
      // Normalize user data to handle both camelCase and PascalCase
      const updatedUser: User = {
        userId: userResponse.userId || userResponse.UserId,
        username: userResponse.username || userResponse.Username,
        passwordHash: userResponse.passwordHash || userResponse.PasswordHash,
        fullName: userResponse.fullName || userResponse.FullName,
        age: userResponse.age || userResponse.Age,
        email: userResponse.email || userResponse.Email,
        role: userResponse.role || userResponse.Role || user.role, // Keep existing role if backend doesn't return it
        createdAt: userResponse.createdAt || userResponse.CreatedAt,
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};