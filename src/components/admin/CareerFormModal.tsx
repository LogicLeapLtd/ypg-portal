import { useState, useEffect } from 'react';

interface CareerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (careerData: any) => void;
  initialData?: {
    id?: string;
    title: string;
    description: string;
    category: string;
    active: boolean;
  };
}

interface FormData {
  title: string;
  description: string;
  category: string;
  otherCategory: string;
  active: boolean;
}

const CATEGORIES = [
  { id: 'cooking', name: 'Cooking' },
  { id: 'hotel', name: 'Hotel Management' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'events', name: 'Events' },
  { id: 'other', name: 'Other' }
];

const CareerFormModal = ({ isOpen, onClose, onSubmit, initialData }: CareerFormModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    otherCategory: '',
    active: true
  });

  useEffect(() => {
    if (initialData) {
      // Check if the category is in the predefined list
      const isPredefinedCategory = CATEGORIES.some(c => c.id === initialData.category);
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: isPredefinedCategory ? initialData.category : 'other',
        otherCategory: isPredefinedCategory ? '' : initialData.category,
        active: initialData.active
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        otherCategory: '',
        active: true
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { otherCategory, ...submitData } = formData;
    const finalData = {
      ...submitData,
      category: formData.category === 'other' ? formData.otherCategory : formData.category
    };
    onSubmit(finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {initialData?.id ? 'Edit Career' : 'Add New Career'}
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
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {formData.category === 'other' && (
              <div>
                <label htmlFor="otherCategory" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="otherCategory"
                  value={formData.otherCategory}
                  onChange={(e) => setFormData({ ...formData, otherCategory: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                  required
                  placeholder="Enter category name"
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
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
              {initialData?.id ? 'Save Changes' : 'Add Career'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerFormModal; 