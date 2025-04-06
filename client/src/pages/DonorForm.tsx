// src/pages/DonorForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const donors = [
  'Downtown Deli',
  'Uptown Market',
  'Westside Cafe',
  'Eastside Eatery',
  'Northside Grocer',
  'Southside Fruits',
  'Harbor Seafood',
  'Suburban Supply',
];

const pickupTimes = ['Morning', 'Afternoon', 'Evening', 'Night'];

const DonorForm: React.FC = () => {
  const [selectedDonor, setSelectedDonor] = useState('');
  const [selectedPickup, setSelectedPickup] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending data to a database
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <AnimatePresence>
        {submitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-8 bg-white rounded shadow-md text-center"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">Form Submitted!</h2>
            <p>Your preferences have been saved.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 bg-white rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center text-green-500 mb-6">Donor Preferences</h2>
            {/* Donor Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Donor</label>
              <select
                value={selectedDonor}
                onChange={(e) => setSelectedDonor(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">-- Choose a Donor --</option>
                {donors.map((donor, idx) => (
                  <option key={idx} value={donor}>
                    {donor}
                  </option>
                ))}
              </select>
            </div>
            {/* Pickup Time Radio Buttons */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Preferred Pickup Time</label>
              <div className="flex flex-col space-y-2">
                {pickupTimes.map((time) => (
                  <label key={time} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="pickupTime"
                      value={time}
                      checked={selectedPickup === time}
                      onChange={(e) => setSelectedPickup(e.target.value)}
                      className="form-radio text-green-500"
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!selectedDonor || !selectedPickup || isSubmitting}
              className="w-full p-2 mt-4 rounded text-white font-semibold bg-green-400 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonorForm;
