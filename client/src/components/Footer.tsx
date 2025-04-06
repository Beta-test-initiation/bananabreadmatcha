import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
<footer className="bg-gray-800 text-white py-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
          <p className="text-gray-300">
          Food Stash Foundation operates on the unceded territories of the səl̓ilw̓ətaʔɬ (Tsleil-Waututh), Sḵwx̱wú7mesh (Squamish) and xʷməθkʷəy̓əm (Musqueam) Nations.            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donor-form" className="text-gray-300 hover:text-white">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/recipient-form" className="text-gray-300 hover:text-white">
                  Request Food
                </Link>
              </li>
              <li>
                <Link to="/scheduler" className="text-gray-300 hover:text-white">
                  Schedule
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: operations@foodstash.ca</li>
              <li>Phone: (604) 862-9701</li>
              <li>Our Warehouse: 100-290 E 1st Ave, City, Vancouver, BC V5T 1A65</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} Food Stash Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 