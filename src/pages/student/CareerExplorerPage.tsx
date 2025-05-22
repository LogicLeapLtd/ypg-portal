import { useState } from 'react';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  education: string;
  experience: 'entry' | 'mid' | 'senior';
  qualifications: string[];
  growth: string;
  category: 'cooking' | 'hotel' | 'bakery' | 'events' | 'other';
}

const CAREERS: CareerPath[] = [
  {
    id: 'chef-1',
    title: 'Executive Chef',
    description: 'Lead the kitchen operations, create menus, and oversee food preparation.',
    salary: '£40,000 - £70,000',
    salaryMin: 40000,
    salaryMax: 70000,
    education: 'Culinary degree + 5-10 years experience',
    experience: 'senior',
    qualifications: ['Culinary Degree', 'Food Safety Certification', 'Management Experience'],
    growth: 'Moderate growth expected through 2030',
    category: 'cooking'
  },
  {
    id: 'chef-2',
    title: 'Sous Chef',
    description: 'Second in command in the kitchen, assists executive chef and manages staff.',
    salary: '£28,000 - £40,000',
    salaryMin: 28000,
    salaryMax: 40000,
    education: 'Culinary degree + 3-5 years experience',
    experience: 'mid',
    qualifications: ['Culinary Degree', 'Food Safety Certification'],
    growth: 'Moderate growth expected through 2030',
    category: 'cooking'
  },
  {
    id: 'hotel-1',
    title: 'Hotel Manager',
    description: 'Oversee all aspects of hotel operations and guest satisfaction.',
    salary: '£35,000 - £65,000',
    salaryMin: 35000,
    salaryMax: 65000,
    education: 'Hospitality degree + 5+ years experience',
    experience: 'senior',
    qualifications: ['Hospitality Degree', 'Management Certification', 'Customer Service Experience'],
    growth: 'Steady growth expected through 2030',
    category: 'hotel'
  },
  {
    id: 'bakery-1',
    title: 'Pastry Chef',
    description: 'Create desserts, pastries, and baked goods for restaurants or bakeries.',
    salary: '£25,000 - £40,000',
    salaryMin: 25000,
    salaryMax: 40000,
    education: 'Baking/Pastry certification + experience',
    experience: 'mid',
    qualifications: ['Baking/Pastry Certification', 'Food Safety Certification'],
    growth: 'Steady growth expected through 2030',
    category: 'bakery'
  }
];

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior Level (5+ years)' }
];

const QUALIFICATIONS = [
  'Culinary Degree',
  'Hospitality Degree',
  'Baking/Pastry Certification',
  'Food Safety Certification',
  'Management Certification',
  'Customer Service Experience',
  'Management Experience'
];

const CareerExplorerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([20000, 100000]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);
  
  const filteredCareers = CAREERS.filter(career => {
    const matchesCategory = selectedCategory ? career.category === selectedCategory : true;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSalary = career.salaryMin >= salaryRange[0] && career.salaryMax <= salaryRange[1];
    const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(career.experience);
    const matchesQualifications = selectedQualifications.length === 0 || 
                                selectedQualifications.some(qual => career.qualifications.includes(qual));
    
    return matchesCategory && matchesSearch && matchesSalary && matchesExperience && matchesQualifications;
  });

  const handleExperienceToggle = (experience: string) => {
    setSelectedExperience(prev => 
      prev.includes(experience) 
        ? prev.filter(e => e !== experience)
        : [...prev, experience]
    );
  };

  const handleQualificationToggle = (qualification: string) => {
    setSelectedQualifications(prev => 
      prev.includes(qualification)
        ? prev.filter(q => q !== qualification)
        : [...prev, qualification]
    );
  };
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200 dark:border-dark-600">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Hospitality Career Explorer
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500 dark:text-gray-400">
          Discover careers in the hospitality and culinary industry that match your interests and skills.
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="sm:col-span-1 space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Categories</h3>
            <div className="mt-2 space-y-2">
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded ${
                    selectedCategory === null
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:hover:bg-dark-500'
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
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:hover:bg-dark-500'
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
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:hover:bg-dark-500'
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
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:hover:bg-dark-500'
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
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:hover:bg-dark-500'
                  }`}
                >
                  Events & Catering
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Salary Range</h3>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>£{salaryRange[0].toLocaleString()}</span>
                <span>£{salaryRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="100000"
                step="5000"
                value={salaryRange[0]}
                onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
                className="w-full mt-2"
              />
              <input
                type="range"
                min="20000"
                max="100000"
                step="5000"
                value={salaryRange[1]}
                onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                className="w-full mt-2"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Experience Level</h3>
            <div className="mt-2 space-y-2">
              {EXPERIENCE_LEVELS.map((level) => (
                <div key={level.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`experience-${level.value}`}
                    checked={selectedExperience.includes(level.value)}
                    onChange={() => handleExperienceToggle(level.value)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:border-dark-600 dark:bg-dark-700"
                  />
                  <label
                    htmlFor={`experience-${level.value}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Qualifications</h3>
            <div className="mt-2 space-y-2">
              {QUALIFICATIONS.map((qualification) => (
                <div key={qualification} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`qualification-${qualification}`}
                    checked={selectedQualifications.includes(qualification)}
                    onChange={() => handleQualificationToggle(qualification)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:border-dark-600 dark:bg-dark-700"
                  />
                  <label
                    htmlFor={`qualification-${qualification}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {qualification}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Careers
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 dark:border-dark-600 rounded-md dark:bg-dark-700 dark:text-white"
                placeholder="Search job titles"
              />
            </div>
          </div>
        </div>
        
        <div className="sm:col-span-3">
          <div className="bg-white dark:bg-dark-700 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-dark-600">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => (
                  <li key={career.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-purple-600 dark:text-purple-400 truncate">
                          {career.title}
                        </h3>
                        <div className="ml-2 flex-shrink-0 flex space-x-2">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {career.category}
                          </p>
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {career.experience}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {career.description}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                          <span className="mr-1.5">💰</span> {career.salary}
                        </span>
                        <span className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                          <span className="mr-1.5">🎓</span> {career.education}
                        </span>
                        <span className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                          <span className="mr-1.5">📈</span> {career.growth}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {career.qualifications.map((qualification) => (
                            <span
                              key={qualification}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            >
                              {qualification}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 sm:px-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No careers found matching your criteria. Try adjusting your filters.</p>
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