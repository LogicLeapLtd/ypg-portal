import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  fileType: 'document' | 'image' | 'video';
  fileUrl: string;
  dateUploaded: string;
}

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileUpload = () => {
    setIsUploading(true);
    
    // Mock file upload that would normally call an API
    setTimeout(() => {
      const newItem: PortfolioItem = {
        id: `item-${Date.now()}`,
        title: 'My Sample Recipe',
        description: 'A demonstration of my cooking skills',
        fileType: 'document',
        fileUrl: '#',
        dateUploaded: new Date().toLocaleDateString()
      };
      
      setPortfolioItems([newItem, ...portfolioItems]);
      setIsUploading(false);
    }, 1500);
  };
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200 dark:border-dark-600 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          My Portfolio
        </h2>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={handleFileUpload}
            disabled={isUploading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-dark-700"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>Upload Work</>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-dark-700 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {item.fileType}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Uploaded on {item.dateUploaded}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-600 px-5 py-3">
                  <div className="text-sm">
                    <button
                      onClick={() => window.open(item.fileUrl, '_blank')}
                      className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      View file
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-700 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Your portfolio is empty
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Upload your coursework, recipes, photos, or other hospitality-related assignments to build your portfolio.
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-dark-700"
                >
                  Upload your first item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage; 