import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  fileType: 'document' | 'image' | 'video';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  dateUploaded: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = {
  document: ['.pdf', '.doc', '.docx', '.txt'],
  image: ['.jpg', '.jpeg', '.png', '.gif'],
  video: ['.mp4', '.mov', '.avi']
};

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    fileType: 'document' as 'document' | 'image' | 'video',
    file: null as File | null
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    // Determine file type
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    let fileType: 'document' | 'image' | 'video' = 'document';
    
    if (ALLOWED_FILE_TYPES.image.includes(extension)) {
      fileType = 'image';
    } else if (ALLOWED_FILE_TYPES.video.includes(extension)) {
      fileType = 'video';
    } else if (!ALLOWED_FILE_TYPES.document.includes(extension)) {
      setUploadError('File type not supported. Please upload a document, image, or video.');
      return;
    }

    setNewItem(prev => ({
      ...prev,
      file,
      fileType,
      title: file.name.split('.')[0] // Set default title to filename without extension
    }));
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!newItem.file || !newItem.title.trim()) {
      setUploadError('Please provide a title and select a file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Simulate file upload with progress
      // In a real application, this would be an actual API call
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(uploadInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(uploadInterval);
      setUploadProgress(100);

      const uploadedItem: PortfolioItem = {
        id: `item-${Date.now()}`,
        title: newItem.title,
        description: newItem.description,
        fileType: newItem.fileType,
        fileUrl: URL.createObjectURL(newItem.file), // In a real app, this would be the URL from the server
        fileName: newItem.file.name,
        fileSize: newItem.file.size,
        dateUploaded: new Date().toLocaleDateString()
      };

      setPortfolioItems(prev => [uploadedItem, ...prev]);
      setShowUploadModal(false);
      setNewItem({
        title: '',
        description: '',
        fileType: 'document',
        file: null
      });
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-dark-700"
          >
            Upload Work
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
                    <p>File: {item.fileName}</p>
                    <p>Size: {formatFileSize(item.fileSize)}</p>
                    <p>Uploaded: {item.dateUploaded}</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-600 px-5 py-3">
                  <div className="text-sm">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      View file
                    </a>
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
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-dark-700"
                >
                  Upload your first item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-dark-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Upload New Work
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 dark:border-dark-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-dark-700 dark:text-white sm:text-sm"
                      placeholder="Enter a title for your work"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 dark:border-dark-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-dark-700 dark:text-white sm:text-sm"
                      placeholder="Describe your work"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      File
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-600 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-dark-700 rounded-md font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileSelect}
                              className="sr-only"
                              accept={[...ALLOWED_FILE_TYPES.document, ...ALLOWED_FILE_TYPES.image, ...ALLOWED_FILE_TYPES.video].join(',')}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {Object.values(ALLOWED_FILE_TYPES).flat().join(', ')} up to {MAX_FILE_SIZE / (1024 * 1024)}MB
                        </p>
                      </div>
                    </div>
                    {newItem.file && (
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Selected file: {newItem.file.name} ({formatFileSize(newItem.file.size)})
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {uploadError}
                    </div>
                  )}

                  {isUploading && (
                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 dark:bg-purple-900 dark:text-purple-200">
                              Uploading...
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-purple-600 dark:text-purple-200">
                              {uploadProgress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200 dark:bg-purple-900">
                          <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-600 shadow-sm px-4 py-2 bg-white dark:bg-dark-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage; 