import React from 'react';
import { MapPin } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  location: string;  // Location as a string
  isAvailable: boolean;
  distance: number;
}

interface MapViewProps {
  providers: Provider[];
}

const MapView: React.FC<MapViewProps> = ({ providers }) => {
  
  return (
    <div className="relative h-80 bg-blue-50 w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">
          Interactive map would display here with provider locations
        </p>
      </div>
      {providers.map((provider) => (
        <div 
          key={provider.id}
          className="absolute cursor-pointer"
          style={{ left: '50%', top: '50%' }}  // Center all markers for now
        >
          <div className={`p-1 rounded-full ${provider.isAvailable ? 'bg-green-500' : 'bg-blue-500'}`}>
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div className="bg-white text-xs font-medium rounded shadow px-2 py-1 mt-1">
            {provider.name}
            <p className="text-gray-500">{provider.location}</p> {/* Display the location */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapView;
