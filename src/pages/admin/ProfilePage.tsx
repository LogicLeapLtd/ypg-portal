import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Platform Administrator');
  const [department, setDepartment] = useState('Education & Training');
  
  // Admin data from context
  const adminName = user?.name || 'Admin';
  const adminEmail = user?.email || 'admin@ypg.org';
  
  const handleSaveProfile = () => {
    // Would normally save to an API
    setIsEditing(false);
  };
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Admin Profile
        </h2>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {isEditing ? (
            <button
              type="button"
              onClick={handleSaveProfile}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your administrator account details.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {adminName}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {adminEmail}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your role"
                    />
                  ) : (
                    role
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your department"
                    />
                  ) : (
                    department
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    phone || 'Not provided'
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Security Settings
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Manage your account security settings and password.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                Change Password
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage; 