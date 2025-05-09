import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormData>();
  
  // Demo login handlers
  const handleStudentLogin = () => {
    setValue('email', 'student@example.com');
    setValue('password', 'student123');
  };

  const handleAdminLogin = () => {
    setValue('email', 'admin@ypg.org');
    setValue('password', 'admin123');
  };
  
  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="flex h-screen">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 bg-[#1E1E24] flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-bold text-white mb-2">Login</h2>
          <p className="text-gray-400 mb-8">Enter your account details</p>
          
          {error && (
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 text-red-200">
              <p>{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                {...register('email', { 
                  required: 'Email is required'
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  {...register('password', { 
                    required: 'Password is required'
                  })}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1E1E24] text-gray-400">Demo accounts</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleStudentLogin}
                className="flex justify-center py-2 px-4 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-[#2A2A32] hover:bg-[#34343E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                Student demo
              </button>
              
              <button
                type="button"
                onClick={handleAdminLogin}
                className="flex justify-center py-2 px-4 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-[#2A2A32] hover:bg-[#34343E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                Admin demo
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Panel - Welcome Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-white text-center px-12">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Welcome to
            <br />
            <span className="text-7xl">student portal</span>
          </h1>
          <p className="text-lg text-purple-100">Login to access your account</p>
          
          {/* Illustration from example */}
          <div className="mt-12">
            <svg width="300" height="220" viewBox="0 0 300 220" className="mx-auto">
              <path 
                d="M150 20c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 70c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30z" 
                fill="#ffffff33"
              />
              <path 
                d="M150 105c-33.137 0-60 26.863-60 60s26.863 60 60 60 60-26.863 60-60-26.863-60-60-60zm0 100c-22.091 0-40-17.909-40-40s17.909-40 40-40 40 17.909 40 40-17.909 40-40 40z" 
                fill="#ffffff33"
              />
            </svg>
          </div>
        </div>
        
        {/* Abstract decorative shapes - replaced with more subtle ones */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 backdrop-blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 backdrop-blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 