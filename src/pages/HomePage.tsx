import { Link } from 'react-router-dom';
import { CalendarIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import TestComponent from '../components/TestComponent';

// Mock data for dashboard
const upcomingEvents = [
  { id: 1, name: 'Networking Mixer', date: '2023-07-15', time: '18:00', location: 'Downtown Conference Center' },
  { id: 2, name: 'Resume Workshop', date: '2023-07-22', time: '14:00', location: 'Virtual' },
  { id: 3, name: 'Industry Panel', date: '2023-08-05', time: '10:00', location: 'Tech Hub' },
];

const featuredResources = [
  { id: 1, title: 'Career Advancement Strategies', category: 'Career Development' },
  { id: 2, title: 'Effective Networking Guide', category: 'Networking' },
  { id: 3, title: 'Public Speaking Essentials', category: 'Skills Development' },
];

const stats = [
  { name: 'Total Members', value: '512', icon: UserGroupIcon },
  { name: 'Upcoming Events', value: '8', icon: CalendarIcon },
  { name: 'Learning Resources', value: '73', icon: BookOpenIcon },
];

const HomePage = () => {
  const greeting = 'Welcome to your YPG Dashboard';

  return (
    <div className="py-6">
      <TestComponent />
      
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">{greeting}</h1>
        <p className="mt-1 text-sm text-gray-400">
          Your hub for professional growth and networking
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-dark-700 overflow-hidden shadow-md rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-purple-500" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-white">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Upcoming Events</h2>
          <Link to="/events" className="text-sm font-medium text-purple-400 hover:text-purple-300">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-dark-500 md:rounded-lg">
          <table className="min-w-full divide-y divide-dark-600">
            <thead className="bg-dark-600">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                  Event
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Date & Time
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600 bg-dark-700">
              {upcomingEvents.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                    {event.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {event.date} at {event.time}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {event.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Featured Resources</h2>
          <Link to="/resources" className="text-sm font-medium text-purple-400 hover:text-purple-300">
            View all
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredResources.map((resource) => (
            <div key={resource.id} className="bg-dark-700 overflow-hidden shadow-md rounded-lg">
              <div className="p-5">
                <h3 className="text-base font-semibold text-white truncate">{resource.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{resource.category}</p>
                <div className="mt-4">
                  <Link
                    to={`/resources/${resource.id}`}
                    className="text-sm font-medium text-purple-400 hover:text-purple-300"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 