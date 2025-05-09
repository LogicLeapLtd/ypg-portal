import { useState } from 'react';

interface ExportOption {
  id: string;
  name: string;
  description: string;
  fileType: 'CSV' | 'Excel' | 'PDF';
}

const DataExportPage = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  
  const exportOptions: ExportOption[] = [
    {
      id: 'students',
      name: 'Student List',
      description: 'Export a list of all registered students with their details',
      fileType: 'Excel'
    },
    {
      id: 'portfolios',
      name: 'Portfolio Submissions',
      description: 'Export data about student portfolio uploads',
      fileType: 'Excel'
    },
    {
      id: 'activity',
      name: 'Student Activity',
      description: 'Export student engagement metrics and activity logs',
      fileType: 'CSV'
    },
    {
      id: 'colleges',
      name: 'College Report',
      description: 'Export student distribution by college/institution',
      fileType: 'PDF'
    }
  ];
  
  const handleExport = () => {
    setIsExporting(true);
    
    // Mock export process - would call API in real app
    setTimeout(() => {
      setIsExporting(false);
      alert(`Export of ${selectedOption} completed!`);
    }, 2000);
  };
  
  const isValidForm = () => {
    return selectedOption && dateRange.start && dateRange.end;
  };
  
  const selectedExportOption = exportOptions.find(option => option.id === selectedOption);
  
  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Data Export
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Generate and download reports for platform data.
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Select Data to Export
          </label>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exportOptions.map((option) => (
              <div
                key={option.id}
                className={`relative rounded-lg border ${
                  selectedOption === option.id
                    ? 'border-gold-500 ring-2 ring-gold-500'
                    : 'border-gray-300'
                } bg-white p-4 shadow-sm focus:outline-none cursor-pointer`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex flex-col h-full">
                  <p className="text-base font-medium text-gray-900">{option.name}</p>
                  <p className="mt-1 flex items-center text-sm text-gray-500">{option.description}</p>
                  <p className="mt-auto pt-4 flex items-center text-sm font-medium text-gold-600">
                    {option.fileType} format
                  </p>
                </div>
                {selectedOption === option.id && (
                  <div className="absolute top-4 right-4 text-gold-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="sm:col-span-3">
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="start-date"
              id="start-date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="sm:col-span-3">
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="end-date"
              id="end-date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="sm:col-span-6">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700">Export Options</legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input
                    id="include-personal"
                    name="include-personal"
                    type="checkbox"
                    className="focus:ring-gold-500 h-4 w-4 text-gold-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="include-personal" className="font-medium text-gray-700">
                    Include personal information
                  </label>
                  <p className="text-gray-500">
                    Export sensitive data like email addresses and phone numbers
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input
                    id="anonymize"
                    name="anonymize"
                    type="checkbox"
                    className="focus:ring-gold-500 h-4 w-4 text-gold-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="anonymize" className="font-medium text-gray-700">
                    Anonymize data
                  </label>
                  <p className="text-gray-500">
                    Remove personally identifiable information from export
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 p-4 sm:p-6 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Export Information
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                {selectedExportOption ? (
                  <>
                    You are about to export <strong>{selectedExportOption.name}</strong> data in {selectedExportOption.fileType} format.
                    {dateRange.start && dateRange.end ? (
                      <> Data will be filtered from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}.</>
                    ) : (
                      <> Please select a date range to continue.</>
                    )}
                  </>
                ) : (
                  <>Please select a data export option to continue.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleExport}
          disabled={!isValidForm() || isExporting}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </>
          ) : (
            'Generate Export'
          )}
        </button>
      </div>
    </div>
  );
};

export default DataExportPage; 