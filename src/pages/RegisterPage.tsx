import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, colleges, interests } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  college: string;
  interest: string;
};

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: {
      college: '',
      interest: ''
    }
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await registerUser(data.name, data.email, data.password, data.college, data.interest);
      navigate('/email-verification');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen">
      {/* Left Panel - Registration Form */}
      <div className="w-full lg:w-7/12 bg-[#1E1E24] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 overflow-y-auto">
        <div className="max-w-lg w-full mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-8">Join the Young Professionals Guild</p>
          
          {error && (
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 text-red-200">
              <p>{error}</p>
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  }
                })}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-300 mb-1">
                  College/Institution
                </label>
                <select
                  id="college"
                  className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  {...register('college', { 
                    required: 'Please select your college'
                  })}
                >
                  <option value="" className="bg-[#2A2A32]">Select college</option>
                  {colleges.map(college => (
                    <option key={college.id} value={college.id} className="bg-[#2A2A32]">
                      {college.name}
                    </option>
                  ))}
                </select>
                {errors.college && (
                  <p className="mt-2 text-sm text-red-400">{errors.college.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-1">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  {...register('interest', { 
                    required: 'Please select your interest'
                  })}
                >
                  <option value="" className="bg-[#2A2A32]">Select interest</option>
                  {interests.map(interest => (
                    <option key={interest.id} value={interest.id} className="bg-[#2A2A32]">
                      {interest.name}
                    </option>
                  ))}
                </select>
                {errors.interest && (
                  <p className="mt-2 text-sm text-red-400">{errors.interest.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    }
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="appearance-none block w-full px-4 py-3 bg-[#2A2A32] border border-[#3A3A45] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return "Passwords don't match";
                      }
                    }
                  })}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
            
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {/* Right Panel - Illustration */}
      <div className="hidden lg:flex lg:w-5/12 bg-purple-600 items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-white text-center px-12">
          <h1 className="text-4xl font-bold mb-4">Join the YPG Community</h1>
          <p className="text-lg text-purple-100 mb-6">
            Develop your skills and launch your career in hospitality and culinary arts
          </p>
          
          {/* Updated decorative element */}
          <div className="rounded-xl bg-white/10 backdrop-blur-lg p-8 mt-8 max-w-md mx-auto">
            <div className="flex space-x-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-left space-y-4">
              <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
              <div className="h-3 bg-white/20 rounded-full w-4/6"></div>
              <div className="h-3 bg-white/20 rounded-full w-full"></div>
              <div className="h-3 bg-white/20 rounded-full w-4/6"></div>
              <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
              <div className="h-3 bg-white/20 rounded-full w-3/6"></div>
            </div>
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

export default RegisterPage; 