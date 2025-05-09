import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data for members
const membersList = [
  { id: 1, name: 'Jane Cooper', role: 'Software Engineer', company: 'TechCorp', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 2, name: 'Michael Foster', role: 'Marketing Manager', company: 'BrandInc', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Dries Vincent', role: 'Product Designer', company: 'DesignStudio', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 4, name: 'Lindsay Walton', role: 'Data Analyst', company: 'DataCo', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 5, name: 'Courtney Henry', role: 'Legal Counsel', company: 'LexGroup', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 6, name: 'Tom Cook', role: 'Financial Advisor', company: 'MoneyWise', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = membersList.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Member Directory</h1>
        <p className="mt-1 text-sm text-gray-400">
          Connect with other YPG members to grow your professional network
        </p>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="max-w-lg">
          <label htmlFor="search" className="sr-only">
            Search Members
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-dark-600 py-2 pl-10 pr-3 text-white ring-1 ring-inset ring-dark-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
              placeholder="Search by name, role, or company"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden bg-dark-700 shadow-md rounded-lg">
        <ul className="divide-y divide-dark-600">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li key={member.id}>
                <Link to={`/members/${member.id}`} className="block hover:bg-dark-600">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={member.imageUrl} alt="" />
                      </div>
                      <div className="min-w-0 flex-1 px-4">
                        <div>
                          <p className="truncate text-sm font-medium text-purple-400">{member.name}</p>
                          <p className="mt-1 truncate text-sm text-gray-400">{member.role}</p>
                          <p className="mt-1 truncate text-sm text-gray-400">{member.company}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-sm text-gray-400">
              No members found matching your search criteria.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MembersPage; 