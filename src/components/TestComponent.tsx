import React from 'react';

const TestComponent = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mx-auto max-w-sm mt-4 sm:mt-8 flex items-center space-x-3 sm:space-x-4">
      <div>
        <div className="bg-gold-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-base sm:text-xl">YP</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-900">YPG Portal</h3>
        <p className="text-sm text-gray-500">Tailwind CSS Test</p>
      </div>
    </div>
  );
};

export default TestComponent; 