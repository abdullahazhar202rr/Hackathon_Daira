import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  setProviders: (providers: any[]) => void; // State setter for storing the fetched providers
}

const SearchBar: React.FC<SearchBarProps> = ({ setProviders }) => {
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fetch providers based on the location and service
    try {
      const response = await fetch(`http://localhost:5000/api/providers?location=${location}&service=${service}`);
      const data = await response.json();
      setProviders(data); // Update the parent component's state with the results
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row"
    >
      <div className="flex items-center flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="What service do you need?"
          className="w-full outline-none text-gray-700"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center flex-1 p-2">
        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Enter your location"
          className="w-full outline-none text-gray-700"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 mt-2 md:mt-0 md:ml-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
