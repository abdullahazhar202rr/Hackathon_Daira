import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import axios from 'axios';

interface Provider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviewCount: number;
  location: string;
  availability: string;
  imageUrl: string;
  isAvailable: boolean;
}

const FeaturedProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // API URL - Update this with your actual backend endpoint
  const API_URL = 'http://localhost:5000/providers';

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL); // Get provider data from backend
        setProviders(response.data); // Assuming the backend sends an array of providers
      } catch (err) {
        setError('Failed to load providers/No providers nearby');
        console.error('Error fetching providers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleProviderClick = (id: string) => {
    navigate(`/provider/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-16 h-16"></div>
        <p className="mt-4 text-xl text-gray-700">Loading providers...</p>
      </div>
    ); // Show loading spinner while fetching data
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-60 h-60 rounded-md text-center m-auto  bg-red-200">
        <p className="text-2xl text-red-600 font-bold">{error}</p>
      </div>
    ); // Show error message if data fetch fails
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <div
          key={provider.id}
          onClick={() => handleProviderClick(provider.id)}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="relative h-48">
            <img
              src={provider.imageUrl}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`${
                  provider.isAvailable ? 'bg-green-500' : 'bg-gray-500'
                } text-white text-xs px-2 py-1 rounded-full font-medium`}
              >
                {provider.availability}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{provider.name}</h3>
                <p className="text-gray-600">{provider.profession}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700 font-medium">{provider.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({provider.reviewCount})</span>
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{provider.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProviders;
