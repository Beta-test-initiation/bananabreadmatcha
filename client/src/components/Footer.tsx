import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Food Stash</h3>
            <p className="text-gray-300">
              Connecting food donors with recipients to reduce waste and feed those in need.
            </p>
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
                <Link to="/map" className="text-gray-300 hover:text-white">
                  Map View
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@foodstash.org</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Food Street, City, State 12345</li>
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