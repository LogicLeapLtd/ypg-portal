import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const OnboardingPage = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    { id: 1, name: 'Welcome to YPG', description: 'Learn about the Young Professionals Guild', completed: true },
    { id: 2, name: 'Complete your profile', description: 'Add personal details and profile photo', completed: false },
    { id: 3, name: 'Upload your first work', description: 'Add a recipe, photo, or written assignment', completed: false },
    { id: 4, name: 'Explore career paths', description: 'Discover opportunities in hospitality', completed: false },
  ]);

  const completeStep = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  const handleComplete = async () => {
    await completeOnboarding();
    navigate('/dashboard');
  };

  const allStepsCompleted = steps.every(step => step.completed);

  return (
    <div className="min-h-screen bg-dark-800">
      <div className="bg-purple-700 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Welcome to YPG</h1>
            <p className="mt-2 text-lg text-purple-100">
              Let's get you started on your hospitality journey
            </p>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-700 rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-b border-dark-500 pb-5">
              <h2 className="text-lg font-medium text-white">Getting Started</h2>
              <p className="mt-2 text-sm text-gray-400">
                Complete these steps to make the most of your YPG experience
              </p>
            </div>

            <div className="mt-8 flow-root">
              <ul className="-mb-8">
                {steps.map((step, stepIdx) => (
                  <li key={step.id}>
                    <div className="relative pb-8">
                      {stepIdx !== steps.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-dark-500"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`${
                              step.completed ? 'bg-purple-500' : 'bg-dark-500'
                            } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-dark-700`}
                          >
                            {step.completed ? (
                              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                            ) : (
                              <span className="text-xs font-medium text-gray-400">{step.id}</span>
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className={`text-sm font-medium ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                              {step.name}
                            </p>
                            <p className="text-sm text-gray-500">{step.description}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap">
                            {step.completed ? (
                              <span className="text-green-400">Completed</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => completeStep(step.id)}
                                className="font-medium text-purple-400 hover:text-purple-300"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleComplete}
                disabled={!allStepsCompleted}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                  ${allStepsCompleted 
                    ? 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500' 
                    : 'bg-dark-500 cursor-not-allowed'}`}
              >
                Continue to Dashboard
                <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
              </button>
              
              {!allStepsCompleted && (
                <p className="mt-2 text-sm text-gray-400">
                  Complete all steps to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage; 