import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const studentName = user?.name || 'Student';
  const collegeId = (user?.role === 'student' && 'college' in user) ? user.college : '';
  
  // Get college name from ID
  const getCollegeName = () => {
    switch (collegeId) {
      case 'harlow':
        return 'Harlow College';
      case 'westminster':
        return 'Westminster Kingsway College';
      case 'southend':
        return 'South Essex College';
      case 'colchester':
        return 'Colchester Institute';
      case 'other':
        return 'Other Institution';
      default:
        return 'Your Institution';
    }
  };

  return (
    <div>
      <div className="bg-dark-700 shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                Welcome back, {studentName}!
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <span className="mr-1.5 h-5 w-5">🏫</span>
                  {getCollegeName()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Portfolio Quick Access */}
          <div className="bg-dark-700 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="h-10 w-10 rounded-md flex items-center justify-center bg-purple-600 text-xl">
                    📁
                  </span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Portfolio Items
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">0 items</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-dark-600 px-5 py-3">
              <div className="text-sm">
                <Link to="/portfolio" className="font-medium text-purple-400 hover:text-purple-300">
                  View portfolio
                </Link>
              </div>
            </div>
          </div>

          {/* Career Explorer */}
          <div className="bg-dark-700 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="h-10 w-10 rounded-md flex items-center justify-center bg-purple-600 text-xl">
                    🔍
                  </span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Career Paths
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">24 options</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-dark-600 px-5 py-3">
              <div className="text-sm">
                <Link to="/careers" className="font-medium text-purple-400 hover:text-purple-300">
                  Explore careers
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-dark-700 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="h-10 w-10 rounded-md flex items-center justify-center bg-purple-600 text-xl">
                    👤
                  </span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Profile Completion
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">80%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-dark-600 px-5 py-3">
              <div className="text-sm">
                <Link to="/profile" className="font-medium text-purple-400 hover:text-purple-300">
                  Complete profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium text-white">Upcoming Events</h2>
        <div className="mt-2 bg-dark-700 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-dark-600">
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-purple-400 truncate">
                    Hospitality Career Fair
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Online
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-400">
                      June 15, 2023
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-purple-400 truncate">
                    YPG Student Workshop
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Person
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-400">
                      June 22, 2023
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage; 