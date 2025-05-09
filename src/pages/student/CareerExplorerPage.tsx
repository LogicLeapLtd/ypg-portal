import { useState } from 'react';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  salary: string;
  education: string;
  growth: string;
  category: 'cooking' | 'hotel' | 'bakery' | 'events' | 'other';
}

const CAREERS: CareerPath[] = [
  {
    id: 'chef-1',
    title: 'Executive Chef',
    description: 'Lead the kitchen operations, create menus, and oversee food preparation.',
    salary: '£40,000 - £70,000',
    education: 'Culinary degree + 5-10 years experience',
    growth: 'Moderate growth expected through 2030',
    category: 'cooking'
  },
  {
    id: 'chef-2',
    title: 'Sous Chef',
    description: 'Second in command in the kitchen, assists executive chef and manages staff.',
    salary: '£28,000 - £40,000',
    education: 'Culinary degree + 3-5 years experience',
    growth: 'Moderate growth expected through 2030',
    category: 'cooking'
  },
  {
    id: 'hotel-1',
    title: 'Hotel Manager',
    description: 'Oversee all aspects of hotel operations and guest satisfaction.',
    salary: '£35,000 - £65,000',
    education: 'Hospitality degree + 5+ years experience',
    growth: 'Steady growth expected through 2030',
    category: 'hotel'
  },
  {
    id: 'bakery-1',
    title: 'Pastry Chef',
    description: 'Create desserts, pastries, and baked goods for restaurants or bakeries.',
    salary: '£25,000 - £40,000',
    education: 'Baking/Pastry certification + experience',
    growth: 'Steady growth expected through 2030',
    category: 'bakery'
  }
];

const CareerExplorerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCareers = CAREERS.filter(career => {
    const matchesCategory = selectedCategory ? career.category === selectedCategory : true;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          career.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Hospitality Career Explorer
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Discover careers in the hospitality and culinary industry that match your interests and skills.
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <div>
            <h3 className="text-md font-medium text-gray-900">Categories</h3>
            <div className="mt-2 space-y-2">
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded ${
                    selectedCategory === null
                      ? 'bg-gold-100 text-gold-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All Careers
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('cooking')}
                  className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded ${
                    selectedCategory === 'cooking'
                      ? 'bg-gold-100 text-gold-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Cooking
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('hotel')}
                  className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded ${
                    selectedCategory === 'hotel'
                      ? 'bg-gold-100 text-gold-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Hotel Management
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('bakery')}
                  className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded ${
                    selectedCategory === 'bakery'
                      ? 'bg-gold-100 text-gold-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Bakery & Pastry
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('events')}
                  className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded ${
                    selectedCategory === 'events'
                      ? 'bg-gold-100 text-gold-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Events & Catering
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Careers
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search job titles"
              />
            </div>
          </div>
        </div>
        
        <div className="sm:col-span-3">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => (
                  <li key={career.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-gold-600 truncate">
                          {career.title}
                        </h3>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {career.category}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          {career.description}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center text-xs font-medium text-gray-500">
                          <span className="mr-1.5">💰</span> {career.salary}
                        </span>
                        <span className="inline-flex items-center text-xs font-medium text-gray-500">
                          <span className="mr-1.5">🎓</span> {career.education}
                        </span>
                        <span className="inline-flex items-center text-xs font-medium text-gray-500">
                          <span className="mr-1.5">📈</span> {career.growth}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 sm:px-6">
                  <p className="text-sm text-gray-500">No careers found matching your criteria. Try adjusting your filters.</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerExplorerPage; 