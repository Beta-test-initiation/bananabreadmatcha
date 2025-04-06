import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Food Stash Optimization</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Connecting surplus food with those who need it most. Our platform streamlines the food donation and distribution process.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/donor-form" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Donate Food
          </Link>
          <Link to="/recipient-form" className="btn bg-secondary-600 text-white hover:bg-secondary-700">
            Request Food
          </Link>
          <Link to="/scheduler" className="btn bg-secondary-600 text-white hover:bg-secondary-700">
            Schedule 
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Donate Food</h3>
            <p className="text-gray-600">
              Register as a donor and submit information about your surplus food, including type, quantity, and pickup location.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Optimize Routes</h3>
            <p className="text-gray-600">
              Our system generates optimal pickup and delivery routes based on food perishability, location, and timing.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Deliver Food</h3>
            <p className="text-gray-600">
              Food Stash employees pick up and deliver food to recipients, ensuring it reaches those in need efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Join our community of donors and recipients to help reduce food waste and feed those in need.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/donor-form" className="btn btn-primary">
            Become a Donor
          </Link>
          <Link to="/recipient-form" className="btn btn-secondary">
            Register as Recipient
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 