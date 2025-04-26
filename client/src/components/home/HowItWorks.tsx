import React from 'react';
import { Search, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC=()=> {
  const steps=[
    {
      id: 1,
      title: 'Search',
      description: 'Find service providers by skill and location',
      icon: <Search className="h-10 w-10" />,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Book',
      description: 'Choose a time that works for you',
      icon: <Calendar className="h-10 w-10" />,
      color: 'bg-teal-500'
    },
    {
      id: 3,
      title: 'Done',
      description: 'Get your task completed by professionals',
      icon: <CheckCircle className="h-10 w-10" />,
      color: 'bg-green-500'
    }
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
      
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center text-white mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center px-4">
                <ArrowRight className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;