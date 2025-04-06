// src/pages/RecipientForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const recipients = [
  'Community Kitchen',
  'Food Bank',
  'Shelter House',
  'Local Soup Kitchen',
  'Neighborhood Center',
];

const deliveryTimes = ['Morning', 'Afternoon', 'Evening', 'Night'];

const RecipientForm: React.FC = () => {
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
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
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <AnimatePresence>
        {submitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-8 bg-white rounded shadow-md text-center"
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Form Submitted!</h2>
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
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Recipient Preferences</h2>
            {/* Recipient Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Recipient</label>
              <select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">-- Choose a Recipient --</option>
                {recipients.map((recipient, idx) => (
                  <option key={idx} value={recipient}>
                    {recipient}
                  </option>
                ))}
              </select>
            </div>
            {/* Delivery Time Radio Buttons */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Preferred Delivery Time</label>
              <div className="flex flex-col space-y-2">
                {deliveryTimes.map((time) => (
                  <label key={time} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value={time}
                      checked={selectedDelivery === time}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="form-radio text-orange-500"
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
              disabled={!selectedRecipient || !selectedDelivery || isSubmitting}
              className="w-full p-2 mt-4 rounded text-white font-semibold bg-orange-400 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipientForm;
