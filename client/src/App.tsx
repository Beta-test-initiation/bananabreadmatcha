import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DonorForm from './pages/DonorForm';
import HomePage from './pages/HomePage';
import MapView from './pages/MapView';
import NotFound from './pages/NotFound';
import RecipientForm from './pages/RecipientForm';
import React from 'react';
import { Routes, Route } from 'react-router-dom';



const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donor-form" element={<DonorForm />} />
          <Route path="/recipient-form" element={<RecipientForm />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 