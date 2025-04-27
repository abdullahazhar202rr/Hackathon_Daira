import React from 'react';
import { Link } from 'react-router-dom';
import { LucidePenTool as Tool, Twitter, Facebook, Instagram, Mail, PhoneCall } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div>
            <Link to="/" className="flex items-center mb-4">
              <Tool className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-2xl font-bold text-white">ServiceMat</span>
            </Link>
            <p className="mb-4">
              Connecting skilled professionals with customers in need of services, all in real-time and based on location.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  Find Services
                </Link>
              </li>
              <li>
                <Link to="/providers" className="hover:text-white transition-colors">
                  Browse Providers
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Service Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?service=Plumbing" className="hover:text-white transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/search?service=Electrical" className="hover:text-white transition-colors">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/search?service=Carpentry" className="hover:text-white transition-colors">
                  Carpentry
                </Link>
              </li>
              <li>
                <Link to="/search?service=HVAC" className="hover:text-white transition-colors">
                  HVAC
                </Link>
              </li>
              <li>
                <Link to="/search?service=Cleaning" className="hover:text-white transition-colors">
                  Cleaning
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-500" />
                <span>Syntax_Slayers@gmail.com</span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 mr-2 text-blue-500" />
                <span className='pr-5'>+923140632577</span>
                
                <span>+923314107040</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ServiceMat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;