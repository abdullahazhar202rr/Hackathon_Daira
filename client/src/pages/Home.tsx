import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Map, Star, Clock, Award, LucidePenTool as Tool } from 'lucide-react';
import ServiceCategoryCard from '../components/services/ServiceCategoryCard';
import FeaturedProviders from '../components/services/FeaturedProviders';
import SearchBar from '../components/search/SearchBar';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Register from './Register';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?service=${service}&location=${location}`);
  };

  const categories = [
    { id: 1, name: 'Plumbing', icon: <Tool className="h-8 w-8" />, color: 'bg-blue-500' },
    { id: 2, name: 'Electrical', icon: <Tool className="h-8 w-8" />, color: 'bg-yellow-500' },
    { id: 3, name: 'Carpentry', icon: <Tool className="h-8 w-8" />, color: 'bg-green-500' },
    { id: 4, name: 'Cleaning', icon: <Tool className="h-8 w-8" />, color: 'bg-purple-500' },
    { id: 5, name: 'Painting', icon: <Tool className="h-8 w-8" />, color: 'bg-red-500' },
    { id: 6, name: 'HVAC', icon: <Tool className="h-8 w-8" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex flex-col w-full">

      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Expert Service Providers Near You
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with qualified professionals for your home and office needs
            </p>
            
            <SearchBar 
              location={location} 
              setLocation={setLocation}
              service={service}
              setService={setService}
              handleSearch={handleSearch}
            />

            <div className="flex flex-wrap justify-center mt-8 gap-4">
              <div className="flex items-center text-sm md:text-base">
                <Clock className="h-5 w-5 mr-2" />
                <span>Real-time availability</span>
              </div>
              <div className="flex items-center text-sm md:text-base">
                <Star className="h-5 w-5 mr-2" />
                <span>Verified professionals</span>
              </div>
              <div className="flex items-center text-sm md:text-base">
                <Map className="h-5 w-5 mr-2" />
                <span>Location-based matching</span>
              </div>
            </div>
          </div>
        </div>
        

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-gray-50">
            <path d="M0,64L80,64C160,64,320,64,480,53.3C640,43,800,21,960,21.3C1120,21,1280,43,1360,53.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>


      <section className="py-12 md:py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Service Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <ServiceCategoryCard 
              key={category.id} 
              name={category.name} 
              icon={category.icon} 
              color={category.color}
            />
          ))}
        </div>
      </section>


      <HowItWorks />


      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Rated Service Providers</h2>
          <FeaturedProviders />
        </div>
      </section>


      <Testimonials />


      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to offer your services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our network of professional service providers and grow your business
          </p>
          <Link to="/register">
          <button className="bg-white text-blue-600 hover:bg-blue-50 transition px-8 py-3 rounded-lg font-semibold text-lg" >
            Become a Provider
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;