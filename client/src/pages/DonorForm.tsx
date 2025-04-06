// src/pages/DonorForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Donor names (for the dropdown)
const donors = [
  'Bob Brown',
  'Uptown Market',
  'Westside Cafe',
  'Eastside Eatery',
  'Northside Grocer',
  'Southside Fruits',
  'Harbor Seafood',
  'Suburban Supply',
];

// Pickup time options
const pickupTimes = ['Morning', 'Afternoon', 'Evening', 'Night'];

// SVG icons for the form
const IconShop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const DonorForm: React.FC = () => {
  const [selectedDonor, setSelectedDonor] = useState('');
  const [selectedPickup, setSelectedPickup] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-04-10'); // Default date
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build the payload using the donor name directly
    const payload = {
      name: selectedDonor,
      date: selectedDate,
      pickupTime: selectedPickup.toLowerCase(),
    };

    try {
      const response = await fetch('http://localhost:80/donors/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Optionally process response data here
      setSubmitted(true);
    } catch (error) {
      console.error('Error updating donor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Time of day icon selector
  const getTimeIcon = (time: string) => {
    switch (time) {
      case 'Morning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-500">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      case 'Afternoon':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-orange-500">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
          </svg>
        );
      case 'Evening':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-indigo-500">
            <path d="M17 18a5 5 0 0 0-10 0"></path>
            <line x1="12" y1="2" x2="12" y2="9"></line>
            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
            <line x1="1" y1="18" x2="3" y2="18"></line>
            <line x1="21" y1="18" x2="23" y2="18"></line>
            <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
            <line x1="23" y1="22" x2="1" y2="22"></line>
            <polyline points="8 6 12 2 16 6"></polyline>
          </svg>
        );
      case 'Night':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-blue-800">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {/* Decorative floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-200 opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-8 bg-white rounded-xl shadow-lg text-center max-w-md w-full relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-green-500 mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-6">Your donation preferences have been saved successfully!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              Start Over
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md relative z-10"
          >
            <div className="bg-green-500 p-6 text-center relative overflow-hidden">
              <motion.div 
                className="absolute top-4 left-4 text-white opacity-30"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </motion.div>
              <motion.div 
                className="absolute bottom-4 right-4 text-white opacity-30"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-2.6 1.5L5 5m7 3v13m0-13h2.5a2 2 0 012 2v.5M5 5v14a2 2 0 002 2h10a2 2 0 002-2v-8h-4" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-white relative z-10">Donor Preferences</h2>
            </div>
            <motion.form onSubmit={handleSubmit} className="p-6">
              {/* Donor Dropdown */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <IconShop />
                  <span>Select Donor</span>
                </label>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <select
                    value={selectedDonor}
                    onChange={(e) => setSelectedDonor(e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pl-4 appearance-none bg-white text-gray-700"
                  >
                    <option value="">-- Choose a Donor --</option>
                    {donors.map((donor, idx) => (
                      <option key={idx} value={donor}>
                        {donor}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              </div>
              {/* Date Picker */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              {/* Pickup Time Radio Buttons */}
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700 flex items-center gap-2">
                  <IconClock />
                  <span>Preferred Pickup Time</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {pickupTimes.map((time) => (
                    <motion.label 
                      key={time} 
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedPickup === time 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-green-200'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="pickupTime"
                        value={time}
                        checked={selectedPickup === time}
                        onChange={(e) => setSelectedPickup(e.target.value)}
                        className="form-radio text-green-500 hidden"
                      />
                      <div className="flex items-center gap-2">
                        <span className="flex-shrink-0">{getTimeIcon(time)}</span>
                        <span className="font-medium text-gray-700">{time}</span>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>
              {/* Fun interactive donation image */}
              <motion.div 
                className="mb-6 bg-green-50 p-4 rounded-lg border border-green-100 relative"
                initial={{ opacity: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="flex justify-center items-center">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <svg className="w-32 h-32 text-green-600" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M20 16C20 11.5817 23.5817 8 28 8H36C40.4183 8 44 11.5817 44 16V20H46C48.2091 20 50 21.7909 50 24V48C50 50.2091 48.2091 52 46 52H18C15.7909 52 14 50.2091 14 48V24C14 21.7909 15.7909 20 18 20H20V16ZM36 12H28C25.7909 12 24 13.7909 24 16V20H40V16C40 13.7909 38.2091 12 36 12ZM32 36C34.7614 36 37 33.7614 37 31C37 28.2386 34.7614 26 32 26C29.2386 26 27 28.2386 27 31C27 33.7614 29.2386 36 32 36ZM32 40C36.4183 40 40 38.2091 40 36C40 33.7909 36.4183 32 32 32C27.5817 32 24 33.7909 24 36C24 38.2091 27.5817 40 32 40Z" fill="currentColor"/>
                    </svg>
                    <motion.div 
                      className="absolute top-1/2 left-0 w-full flex justify-center"
                      animate={{ 
                        y: [0, -30],
                        opacity: [1, 0],
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
                <p className="text-center text-sm text-green-700 mt-2">Thank you for your generous donation!</p>
              </motion.div>
              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!selectedDonor || !selectedPickup || isSubmitting}
                className={`w-full p-3 mt-4 rounded-lg text-white font-semibold transition-all ${
                  !selectedDonor || !selectedPickup || isSubmitting
                    ? 'bg-gray-300' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                    Sending...
                  </div>
                ) : 'Submit'}
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonorForm;
