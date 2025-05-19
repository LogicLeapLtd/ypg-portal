import { useState } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Career Development' | 'Skills' | 'Industry Knowledge' | 'Networking';
  type: 'Article' | 'Video' | 'Document' | 'Course';
}

// Mock data for resources
const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Career Advancement Strategies',
    description: 'Learn effective strategies to advance your career in the hospitality industry.',
    category: 'Career Development',
    type: 'Article'
  },
  {
    id: '2',
    title: 'Effective Networking Guide',
    description: 'Master the art of networking in the hospitality sector.',
    category: 'Networking',
    type: 'Document'
  },
  {
    id: '3',
    title: 'Public Speaking Essentials',
    description: 'Develop your public speaking skills for hospitality professionals.',
    category: 'Skills',
    type: 'Course'
  },
  {
    id: '4',
    title: 'Industry Trends 2024',
    description: 'Stay updated with the latest trends in hospitality and culinary arts.',
    category: 'Industry Knowledge',
    type: 'Article'
  }
];

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Career Development', 'Skills', 'Industry Knowledge', 'Networking'];

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Learning Resources
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Access learning materials and resources to support your professional development.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Search */}
        <div>
          <label htmlFor="search" className="sr-only">Search resources</label>
          <input
            type="text"
            name="search"
            id="search"
            className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources List */}
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredResources.map((resource) => (
              <li key={resource.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium text-purple-600 truncate">
                      {resource.title}
                    </h3>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {resource.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {resource.description}
                    </p>
                  </div>
                  <div className="mt-3">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {resource.category}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage; 