import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface StatCard {
  title: string;
  value: number;
  description: string;
  change: number;
  icon: string;
}

interface RecentStudent {
  id: string;
  name: string;
  college: string;
  interest: string;
  joinedDate: string;
}

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const adminName = user?.name || 'Admin';
  
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Students',
      value: 125,
      description: 'Total registered students',
      change: 12.5,
      icon: '👨‍🎓'
    },
    {
      title: 'Portfolio Items',
      value: 438,
      description: 'Total uploaded works',
      change: 5.4,
      icon: '📁'
    },
    {
      title: 'Colleges',
      value: 6,
      description: 'Participating institutions',
      change: 0,
      icon: '🏫'
    },
    {
      title: 'Career Views',
      value: 1243,
      description: 'Career explorer page views',
      change: 18.2,
      icon: '🔍'
    }
  ]);
  
  const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([
    {
      id: 'student-1',
      name: 'Jamie Smith',
      college: 'Harlow College',
      interest: 'Chef / Cooking',
      joinedDate: '2 days ago'
    },
    {
      id: 'student-2',
      name: 'Sarah Johnson',
      college: 'Westminster Kingsway College',
      interest: 'Bakery / Pastry',
      joinedDate: '3 days ago'
    },
    {
      id: 'student-3',
      name: 'Michael Brown',
      college: 'South Essex College',
      interest: 'Hotel Management',
      joinedDate: '5 days ago'
    },
    {
      id: 'student-4',
      name: 'Olivia Wilson',
      college: 'Colchester Institute',
      interest: 'Events & Catering',
      joinedDate: '1 week ago'
    },
    {
      id: 'student-5',
      name: 'David Taylor',
      college: 'Harlow College',
      interest: 'Chef / Cooking',
      joinedDate: '1 week ago'
    }
  ]);
  
  return (
    <div>
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Welcome, {adminName}
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-1.5 h-5 w-5">📊</span>
                  Admin Dashboard
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="h-10 w-10 rounded-md flex items-center justify-center bg-gold-600 text-xl">
                      {stat.icon}
                    </span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-500">
                    {stat.description}
                    {stat.change > 0 && (
                      <span className="text-green-600 ml-2">
                        +{stat.change}%
                      </span>
                    )}
                    {stat.change < 0 && (
                      <span className="text-red-600 ml-2">
                        {stat.change}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recently Joined Students</h2>
        <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentStudents.map((student) => (
              <li key={student.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gold-600 truncate">
                      {student.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {student.joinedDate}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="mr-1.5">🏫</span>
                        {student.college}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <span className="mr-1.5">👨‍🍳</span>
                        {student.interest}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <a
                href="/admin/users"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                Manage Users
              </a>
              <a
                href="/admin/content"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                Manage Content
              </a>
              <a
                href="/admin/export"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                Export Data
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                System Settings
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              System Status
            </h3>
            <div className="mt-5">
              <div className="flex items-center justify-between border-t border-gray-200 py-3">
                <div className="text-sm font-medium text-gray-500">Database</div>
                <div className="text-sm text-green-600">Operational</div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 py-3">
                <div className="text-sm font-medium text-gray-500">Storage</div>
                <div className="text-sm text-green-600">Operational</div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 py-3">
                <div className="text-sm font-medium text-gray-500">Authentication</div>
                <div className="text-sm text-green-600">Operational</div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 py-3">
                <div className="text-sm font-medium text-gray-500">API Service</div>
                <div className="text-sm text-green-600">Operational</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 