import { useState, useEffect } from 'react';
import { colleges, interests } from '../../contexts/AuthContext';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: any) => void;
  initialData?: {
    id?: string;
    name: string;
    email: string;
    college: string;
    interest: string;
  };
}

interface FormData {
  name: string;
  email: string;
  college: string;
  otherCollege: string;
  interest: string;
  otherInterest: string;
}

const UserFormModal = ({ isOpen, onClose, onSubmit, initialData }: UserFormModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    college: '',
    otherCollege: '',
    interest: '',
    otherInterest: '',
  });

  useEffect(() => {
    if (initialData) {
      // Check if the college is in the predefined list
      const isPredefinedCollege = colleges.some(c => c.id === initialData.college);
      // Check if the interest is in the predefined list
      const isPredefinedInterest = interests.some(i => i.id === initialData.interest);
      
      setFormData({
        ...initialData,
        college: isPredefinedCollege ? initialData.college : 'other',
        otherCollege: isPredefinedCollege ? '' : initialData.college,
        interest: isPredefinedInterest ? initialData.interest : 'other',
        otherInterest: isPredefinedInterest ? '' : initialData.interest
      });
    } else {
      // Reset form when adding new student
      setFormData({
        name: '',
        email: '',
        college: '',
        otherCollege: '',
        interest: '',
        otherInterest: '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { otherCollege, otherInterest, ...submitData } = formData;
    const finalData = {
      ...submitData,
      college: formData.college === 'other' ? formData.otherCollege : formData.college,
      interest: formData.interest === 'other' ? formData.otherInterest : formData.interest
    };
    onSubmit(finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {initialData?.id ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                College
              </label>
              <select
                id="college"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              >
                <option value="">Select a college</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            {formData.college === 'other' && (
              <div>
                <label htmlFor="otherCollege" className="block text-sm font-medium text-gray-700">
                  College Name
                </label>
                <input
                  type="text"
                  id="otherCollege"
                  value={formData.otherCollege}
                  onChange={(e) => setFormData({ ...formData, otherCollege: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                  required
                  placeholder="Enter college name"
                />
              </div>
            )}

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                Area of Interest
              </label>
              <select
                id="interest"
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              >
                <option value="">Select an interest</option>
                {interests.map((interest) => (
                  <option key={interest.id} value={interest.id}>
                    {interest.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            {formData.interest === 'other' && (
              <div>
                <label htmlFor="otherInterest" className="block text-sm font-medium text-gray-700">
                  Interest Area
                </label>
                <input
                  type="text"
                  id="otherInterest"
                  value={formData.otherInterest}
                  onChange={(e) => setFormData({ ...formData, otherInterest: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                  required
                  placeholder="Enter area of interest"
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
            >
              {initialData?.id ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal; 