import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define your types
interface Filters {
  availableNow: boolean;
  rating4Plus: boolean;
  priceRange: [number, number];
}

interface Provider {
  id: string;
  name: string;
  rating: number;
  price: number;
  availableNow: boolean;
}

interface SearchResultsProps {
  service: string;
  locationInput: string;
  selectedFilters: Filters;
}

const SearchResults: React.FC<SearchResultsProps> = ({ service, locationInput, selectedFilters }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Start by setting loading to true
        setLoading(true);

        // Make the API call
        const response = await axios.get('/api/providers', {
          params: {
            service,
            location: locationInput,
            availableNow: selectedFilters.availableNow,
            rating4Plus: selectedFilters.rating4Plus,
            minPrice: selectedFilters.priceRange[0],
            maxPrice: selectedFilters.priceRange[1]
          }
        });

        // Update the state with the providers
        setProviders(response.data);

      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        // Set loading to false after the API call
        setLoading(false);
      }
    };

    // Call the fetch function only when the relevant data changes
    fetchProviders();
  }, [service, locationInput, selectedFilters]);

  if (loading) {
    return <div>Loading providers...</div>;
  }

  return (
    <div>
      <h2>Service Providers</h2>
      {providers.length > 0 ? (
        <ul>
          {providers.map((provider) => (
            <li key={provider.id}>
              <h3>{provider.name}</h3>
              <p>Rating: {provider.rating}</p>
              <p>Price: ${provider.price}</p>
              <p>Available Now: {provider.availableNow ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center w-60 h-60 rounded-md text-center my-40 mx-auto   bg-red-200">
          <p className="text-2xl text-red-600 font-bold">Failed to load providers/No providers nearby</p></div>
      )}
    </div>
  );
};

export default SearchResults;
