import { useState } from 'react';

interface LoginParams {
  usernameOrEmail: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
  agreeToTerms: boolean;
}

interface AuthState {
  isLoading: boolean;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
  };
  handleLogin: (params: LoginParams) => Promise<void>;
  handleSignup: (params: SignupParams) => Promise<void>;
}

export function useAuthentication(): AuthState {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthState['errors']>({});

  const handleLogin = async (params: LoginParams): Promise<void> => {
    setIsLoading(true);
    setErrors({});

    try {
      // Here you would typically make an API call to your backend
      console.log('Login attempt with:', params);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!params.usernameOrEmail) {
        setErrors(prev => ({ ...prev, username: 'Username or email is required' }));
        return;
      }
      
      if (!params.password) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
        return;
      }

      // Successful login would redirect or update authentication state
      console.log('Login successful');
      
      // Redirect based on stored path if available
      const redirectPath = sessionStorage.getItem("redirectAfterAuth");
      if (redirectPath) {
        window.location.href = redirectPath;
        sessionStorage.removeItem("redirectAfterAuth");
      } else {
        // Default redirect
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (params: SignupParams): Promise<void> => {
    setIsLoading(true);
    setErrors({});

    try {
      // Here you would typically make an API call to your backend
      console.log('Signup attempt with:', params);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!params.username) {
        setErrors(prev => ({ ...prev, username: 'Username is required' }));
        return;
      }
      
      if (!params.email) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
        return;
      }
      
      if (!params.password) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
        return;
      }
      
      if (params.password.length < 8) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
        return;
      }
      
      if (params.password !== params.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        return;
      }
      
      if (!params.agreeToTerms) {
        setErrors(prev => ({ ...prev, terms: 'You must agree to the terms' }));
        return;
      }

      // Successful signup would redirect or update authentication state
      console.log('Signup successful');
      window.location.href = "/onboarding";
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    handleLogin,
    handleSignup
  };
}