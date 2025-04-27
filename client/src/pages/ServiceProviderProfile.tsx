import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Phone, Mail, Clock, MapPin, Calendar, CheckCircle } from 'lucide-react';

const ServiceProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    // Fetch provider data from the back-end server
    axios.get(`http://localhost:5000/provider/${id}`)
      .then(response => {
        setProvider(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleBooking = () => {
    alert(`Booking confirmed with ${provider.name} on ${provider.availability_slots[selectedDay].day} at ${selectedTime}`);
    // In a real app, this would submit the booking to an API
  };

  if (!provider) return <p>Loading...</p>;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Provider Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <div className="w-40 h-40 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={provider.imageUrl} 
                  alt={provider.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/4">
              <div className="flex items-center mb-2">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`text-sm font-medium ${provider.isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                  {provider.availability}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-1">{provider.name}</h1>
              <p className="text-xl text-gray-600 mb-3">{provider.profession}</p>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-800 font-medium">{provider.rating}</span>
                <span className="text-gray-600 ml-1">({provider.reviewCount} reviews)</span>
                <div className="mx-3 h-5 border-l border-gray-300"></div>
                <MapPin className="h-5 w-5 text-gray-500 mr-1" />
                <span>{provider.location} • {provider.distance} miles away</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-2" />
                  <a href={`mailto:${provider.email}`} className="text-blue-600 hover:underline">
                    Contact via Email
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-2" />
                  <a href={`tel:${provider.phoneNumber}`} className="text-blue-600 hover:underline">
                    {provider.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-1/4 mt-6 md:mt-0 flex flex-col items-center md:items-end justify-start">
              <p className="text-2xl font-bold text-gray-800 mb-2">${provider.hourlyRate}/hr</p>
              <p className="text-gray-600 mb-4">{provider.responseTime} response time</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full md:w-auto text-center">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add Tabs and other sections as necessary */}
    </div>
  );
};

export default ServiceProviderProfile;
