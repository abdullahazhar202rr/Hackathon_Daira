import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';


export interface Provider {
  id: string;
  name: string;
  profession: string;
  bio: string;
  rating: number;
  reviewCount: number;
  location: string;
  availability: string;
  isAvailable: boolean;
  distance: number;
  hourlyRate: number;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  services: string[];
  responseTime: string;
  yearsOfExperience: number;
  completedJobs: number;
}

export interface Review {
  id: string;
  providerId: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  content: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ServiceContextType {
  providers: Provider[];
  featuredProviders: Provider[];
  reviews: Review[];
  categories: Category[];
  getProviderById: (id: string) => Provider | undefined;
  searchProviders: (service: string, location: string) => Provider[];
  getProviderReviews: (providerId: string) => void;
  bookAppointment: (providerId: string, date: string, time: string) => Promise<boolean>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceProvider = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceProvider must be used within a ServiceProvider');
  }
  return context;
};

const fetchProviders = async () => {
  const { data } = await axios.get('http://localhost:5000/api/providers');
  return data;
};

const fetchReviews = async (providerId: string) => {
  const { data } = await axios.get(`http://localhost:5000/api/reviews/${providerId}`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await axios.get('http://localhost:5000/api/categories');
  return data;
};

const bookAppointment = async (providerId: string, date: string, time: string) => {
  const response = await axios.post('http://localhost:5000/api/book-appointment', { providerId, date, time });
  return response.data;
};

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const providersData = await fetchProviders();
      setProviders(providersData);
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const getProviderById = (id: string) => {
    return providers.find(provider => provider.id === id);
  };

  const searchProviders = (service: string, location: string) => {
    return providers.filter(provider => provider.services.includes(service) && provider.location.includes(location));
  };

  const getProviderReviews = async (providerId: string) => {
    const reviewsData = await fetchReviews(providerId);
    setReviews(reviewsData);
  };

  const contextValue = {
    providers,
    featuredProviders: providers.slice(0, 5), 
    reviews,
    categories,
    getProviderById,
    searchProviders,
    getProviderReviews,
    bookAppointment,
  };

  return <ServiceContext.Provider value={contextValue}>{children}</ServiceContext.Provider>;
};
