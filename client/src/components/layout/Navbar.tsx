import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LucidePenTool as Tool, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = isHomePage 
    ? `fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'}`
    : 'bg-white shadow-md text-gray-800';

  const linkClass = isHomePage && !isScrolled
    ? 'text-white hover:text-gray-200'
    : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          <Link to="/" className="flex items-center">
            <Tool className={`h-8 w-8 ${isHomePage && !isScrolled ? 'text-white' : 'text-blue-600'}`} />
            <span className="ml-2 text-xl font-bold">FixConnect</span>
          </Link>


          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/search" className={`${linkClass} font-medium`}>
              Find Services
            </Link>
            <Link to="/providers" className={`${linkClass} font-medium`}>
              Service Providers
            </Link>
            <Link to="/about" className={`${linkClass} font-medium`}>
              How It Works
            </Link>
            <Link to="/login" className="ml-4">
              <button className={`border ${isHomePage && !isScrolled ? 'border-white text-white hover:bg-white hover:bg-opacity-10' : 'border-blue-600 text-blue-600 hover:bg-blue-50'} px-4 py-2 rounded-lg font-medium transition duration-200`}>
                Log In
              </button>
            </Link>
            <Link to="/register" className="ml-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
                Sign Up
              </button>
            </Link>
          </div>


          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>


        {isOpen && (
          <div className="md:hidden bg-white text-gray-800 shadow-lg rounded-b-lg absolute left-0 right-0 z-50 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link to="/search" className="py-2 hover:text-blue-600" onClick={toggleMenu}>
                Find Services
              </Link>
              <Link to="/providers" className="py-2 hover:text-blue-600" onClick={toggleMenu}>
                Service Providers
              </Link>
              <Link to="/about" className="py-2 hover:text-blue-600" onClick={toggleMenu}>
                How It Works
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link to="/login" onClick={toggleMenu}>
                  <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium mb-2">
                    Log In
                  </button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;