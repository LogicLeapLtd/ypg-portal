import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();
  
  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex h-screen">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 bg-[#1E1E24] flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-gray-400 mb-8">
            Enter your email and we'll send you instructions on how to reset your password
          </p>
          
          {isSubmitted ? (
            <div>
              <div className="bg-green-900/20 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-400">
                      Password reset instructions have been sent to your email address.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
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

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send reset instructions'}
                </button>
              </div>
              
              <div className="text-sm text-center">
                <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Right Panel - Decoration */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-white text-center px-12">
          <h1 className="text-4xl font-bold mb-4">Forgot your password?</h1>
          <p className="text-lg text-purple-100 mb-8">
            Don't worry, we'll help you get back into your account.
          </p>
          
          {/* Lock Icon */}
          <div className="w-32 h-32 bg-purple-500/30 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <p className="text-purple-200">
            We'll send you instructions on how to reset your password so you can get back to learning.
          </p>
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

export default ForgotPasswordPage; 