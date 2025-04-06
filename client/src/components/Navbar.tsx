import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
            <img src="/images/foodstash.png" alt="Logo" className="h-8 w-8 Header-branding-logo" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/donor-form" className="px-3 py-2 rounded-md text-gray-700 hover:text-primary-600">
              Donate Food
            </Link>
            <Link to="/recipient-form" className="px-3 py-2 rounded-md text-gray-700 hover:text-primary-600">
              Request Food
            </Link>
            <Link to="/scheduler" className="px-3 py-2 rounded-md text-gray-700 hover:text-primary-600">
              Schedule
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/donor-form"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate Food
            </Link>
            <Link
              to="/recipient-form"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Food
            </Link>
            <Link
              to="/map"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 