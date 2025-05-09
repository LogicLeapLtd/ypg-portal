import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-800 text-white border-t border-dark-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">Young Professionals Guild &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 