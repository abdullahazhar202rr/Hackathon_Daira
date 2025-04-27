import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceCategoryCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ name, icon, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search?service=${name}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
    >
      <div className={`${color} p-6 flex justify-center`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  );
};

export default ServiceCategoryCard;