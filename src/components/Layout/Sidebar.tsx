import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserCircleIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';

const studentNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Portfolio', href: '/portfolio', icon: DocumentTextIcon },
  { name: 'Careers', href: '/careers', icon: BriefcaseIcon },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Content', href: '/admin/content', icon: DocumentTextIcon },
  { name: 'Export', href: '/admin/export', icon: DocumentArrowDownIcon },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const userInitials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'YP';
  const userName = user ? user.name : 'User';
  const userType = user?.role === 'student' ? 'student' : 'admin';
  const navigation = userType === 'student' ? studentNavigation : adminNavigation;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white dark:bg-dark-700 dark:border-dark-600">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">YPG Portal</span>
            </Link>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-600 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      isActive
                        ? 'text-purple-500 dark:text-purple-300'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 border-t border-gray-200 dark:border-dark-600 p-4">
          <div className="flex w-full items-center justify-between">
            <Link
              to="/profile"
              className="group block flex-shrink-0"
            >
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    {userInitials}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                    {userName}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                    View profile
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-300 dark:hover:bg-dark-600 dark:hover:text-white"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 