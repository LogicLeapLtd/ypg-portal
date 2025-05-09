import { useState } from 'react';

interface Career {
  id: string;
  title: string;
  description: string;
  category: string;
  active: boolean;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  active: boolean;
}

const ContentManagementPage = () => {
  const [activeTab, setActiveTab] = useState<'careers' | 'assignments'>('careers');
  
  // Mock career data
  const [careers, setCareers] = useState<Career[]>([
    {
      id: 'career-1',
      title: 'Executive Chef',
      description: 'Lead the kitchen operations, create menus, and oversee food preparation.',
      category: 'cooking',
      active: true
    },
    {
      id: 'career-2',
      title: 'Sous Chef',
      description: 'Second in command in the kitchen, assists executive chef and manages staff.',
      category: 'cooking',
      active: true
    },
    {
      id: 'career-3',
      title: 'Hotel Manager',
      description: 'Oversee all aspects of hotel operations and guest satisfaction.',
      category: 'hotel',
      active: true
    },
    {
      id: 'career-4',
      title: 'Pastry Chef',
      description: 'Create desserts, pastries, and baked goods for restaurants or bakeries.',
      category: 'bakery',
      active: true
    },
    {
      id: 'career-5',
      title: 'Event Coordinator',
      description: 'Plan and execute hospitality events from concept to completion.',
      category: 'events',
      active: false
    }
  ]);
  
  // Mock assignment data
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'assignment-1',
      title: 'Classic French Cuisine',
      description: 'Prepare a three-course French meal including appetizer, main course, and dessert.',
      dueDate: '2023-06-15',
      category: 'cooking',
      active: true
    },
    {
      id: 'assignment-2',
      title: 'Hotel Revenue Management',
      description: 'Create a pricing strategy for a boutique hotel during high and low seasons.',
      dueDate: '2023-06-20',
      category: 'hotel',
      active: true
    },
    {
      id: 'assignment-3',
      title: 'Artisan Bread Techniques',
      description: 'Demonstrate three different artisan bread-making methods with documentation.',
      dueDate: '2023-06-10',
      category: 'bakery',
      active: true
    }
  ]);
  
  const toggleCareerStatus = (careerId: string) => {
    setCareers(careers.map(career => 
      career.id === careerId ? { ...career, active: !career.active } : career
    ));
  };
  
  const toggleAssignmentStatus = (assignmentId: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, active: !assignment.active } : assignment
    ));
  };
  
  const deleteCareer = (careerId: string) => {
    setCareers(careers.filter(career => career.id !== careerId));
  };
  
  const deleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
  };
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Content Management
        </h2>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
          >
            {activeTab === 'careers' ? 'Add Career' : 'Add Assignment'}
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200 mt-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('careers')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'careers'
                ? 'border-gold-500 text-gold-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Career Paths
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'assignments'
                ? 'border-gold-500 text-gold-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Assignments
          </button>
        </nav>
      </div>
      
      {activeTab === 'careers' && (
        <div className="mt-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {careers.map((career) => (
                        <tr key={career.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{career.title}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{career.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {career.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              career.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {career.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-gold-600 hover:text-gold-900"
                              onClick={() => toggleCareerStatus(career.id)}
                            >
                              {career.active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button 
                              className="ml-4 text-gold-600 hover:text-gold-900"
                            >
                              Edit
                            </button>
                            <button 
                              className="ml-4 text-red-600 hover:text-red-900"
                              onClick={() => deleteCareer(career.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'assignments' && (
        <div className="mt-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{assignment.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {assignment.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assignment.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {assignment.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-gold-600 hover:text-gold-900"
                              onClick={() => toggleAssignmentStatus(assignment.id)}
                            >
                              {assignment.active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button 
                              className="ml-4 text-gold-600 hover:text-gold-900"
                            >
                              Edit
                            </button>
                            <button 
                              className="ml-4 text-red-600 hover:text-red-900"
                              onClick={() => deleteAssignment(assignment.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagementPage; 