import { useState } from 'react';
import { colleges, interests } from '../../contexts/AuthContext';

interface Student {
  id: string;
  name: string;
  email: string;
  college: string;
  interest: string;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  joinedDate: string;
}

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Mock student data
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'student-1',
      name: 'Jamie Smith',
      email: 'jamie.smith@example.com',
      college: 'harlow',
      interest: 'chef',
      emailVerified: true,
      onboardingCompleted: true,
      joinedDate: '2023-05-10'
    },
    {
      id: 'student-2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      college: 'westminster',
      interest: 'baker',
      emailVerified: true,
      onboardingCompleted: false,
      joinedDate: '2023-05-09'
    },
    {
      id: 'student-3',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      college: 'southend',
      interest: 'hotel',
      emailVerified: true,
      onboardingCompleted: true,
      joinedDate: '2023-05-07'
    },
    {
      id: 'student-4',
      name: 'Olivia Wilson',
      email: 'olivia.wilson@example.com',
      college: 'colchester',
      interest: 'events',
      emailVerified: false,
      onboardingCompleted: false,
      joinedDate: '2023-05-05'
    },
    {
      id: 'student-5',
      name: 'David Taylor',
      email: 'david.taylor@example.com',
      college: 'harlow',
      interest: 'chef',
      emailVerified: true,
      onboardingCompleted: true,
      joinedDate: '2023-05-05'
    }
  ]);
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = selectedCollege ? student.college === selectedCollege : true;
    const matchesStatus = selectedStatus === null 
                          ? true 
                          : selectedStatus === 'active' 
                            ? (student.emailVerified && student.onboardingCompleted)
                            : selectedStatus === 'pending' 
                              ? (!student.emailVerified || !student.onboardingCompleted)
                              : true;
    
    return matchesSearch && matchesCollege && matchesStatus;
  });
  
  const handleDeleteStudent = (studentId: string) => {
    // In a real app, this would call an API
    setStudents(students.filter(student => student.id !== studentId));
  };
  
  const getCollegeName = (collegeId: string) => {
    const college = colleges.find(c => c.id === collegeId);
    return college ? college.name : 'Unknown';
  };
  
  const getInterestName = (interestId: string) => {
    const interest = interests.find(i => i.id === interestId);
    return interest ? interest.name : 'Unknown';
  };
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          User Management
        </h2>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
          >
            Add Student
          </button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Search by name or email"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="college" className="block text-sm font-medium text-gray-700">
            College
          </label>
          <select
            id="college"
            name="college"
            value={selectedCollege || ''}
            onChange={(e) => setSelectedCollege(e.target.value === '' ? null : e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm rounded-md"
          >
            <option value="">All Colleges</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value === '' ? null : e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col">
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      College
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Interest
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Joined
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getCollegeName(student.college)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getInterestName(student.interest)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.emailVerified && student.onboardingCompleted ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : !student.emailVerified ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Unverified
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Onboarding
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(student.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gold-600 hover:text-gold-900">
                          Edit
                        </button>
                        <button 
                          className="ml-4 text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage; 