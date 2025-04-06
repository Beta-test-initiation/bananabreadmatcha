// src/components/Scheduler.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';
import { getOptimizedDropoffSchedule, ScheduledRecipient } from '../utils/recipient';

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
};

const Scheduler: React.FC = () => {
  const [donorSchedule, setDonorSchedule] = useState<ScheduledDonor[]>([]);
  const [recipientSchedule, setRecipientSchedule] = useState<ScheduledRecipient[]>([]);
  const navigate = useNavigate();

  // Fetch donors and compute optimized schedule
  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch('http://localhost:80/donors/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const donorsData = await response.json();
        const transformedDonors = donorsData.map((donor: any) => ({
          ...donor,
          location: {
            lat: parseFloat(donor.latitude),      // Use latitude for lat
            lng: parseFloat(donor.longitude),       // Use longitude for lng
          },
          // Ensure pickupTime matches exactly the keys in your scheduler (e.g., "Morning")
          pickupTime:
            donor.pickup_time.charAt(0).toUpperCase() +
            donor.pickup_time.slice(1).toLowerCase(),
          date: donor.date,
        }));
        const { schedule: optimizedSchedule } = getOptimizedSchedule(transformedDonors);
        setDonorSchedule(optimizedSchedule);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    }
    fetchDonors();
  }, []);

  // Fetch recipients and compute optimized schedule for dropoffs
  useEffect(() => {
    async function fetchRecipients() {
      try {
        const response = await fetch('http://localhost:80/recipients/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipientsData = await response.json();
        const transformedRecipients = recipientsData.map((recipient: any) => ({
          ...recipient,
          location: {
            lat: parseFloat(recipient.latitude),
            lng: parseFloat(recipient.longitude),
          },
          // Ensure dropoffTime is properly capitalized (e.g., "Morning")
          dropoffTime:
            recipient.dropoff_time.charAt(0).toUpperCase() +
            recipient.dropoff_time.slice(1).toLowerCase(),
          date: recipient.date,
        }));
        const { schedule: optimizedSchedule } = getOptimizedDropoffSchedule(transformedRecipients);
        setRecipientSchedule(optimizedSchedule);
      } catch (error) {
        console.error('Error fetching recipients:', error);
      }
    }
    fetchRecipients();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      {/* Donor Schedule */}
      <h1 className="text-3xl font-bold text-center mb-8">Pickup Schedule</h1>
      <motion.div
        className="relative max-w-2xl mx-auto mb-12"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Vertical line for donor timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-200" />
        <div className="space-y-8">
          {donorSchedule.map((donor) => (
            <motion.div
              key={donor.order}
              className="relative flex items-center"
              variants={itemVariants}
            >
              {/* Donor timeline dot */}
              <div className="z-10 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {donor.order}
              </div>
              {/* Donor info card */}
              <div className="ml-6 p-4 bg-white rounded shadow-md w-full">
                <div className="text-lg font-semibold">{donor.name}</div>
                <div className="text-sm text-gray-500">Pickup at {donor.scheduledPickup}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recipient Schedule */}
      <h1 className="text-3xl font-bold text-center mb-8">Dropoff Schedule</h1>
      <motion.div
        className="relative max-w-2xl mx-auto mb-12"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Vertical line for recipient timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-orange-200" />
        <div className="space-y-8">
          {recipientSchedule.map((recipient) => (
            <motion.div
              key={recipient.order}
              className="relative flex items-center"
              variants={itemVariants}
            >
              {/* Recipient timeline dot */}
              <div className="z-10 w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
                {recipient.order}
              </div>
              {/* Recipient info card */}
              <div className="ml-6 p-4 bg-white rounded shadow-md w-full">
                <div className="text-lg font-semibold">{recipient.name}</div>
                <div className="text-sm text-gray-500">Dropoff at {recipient.scheduledDropoff}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-12 text-center">
        <button
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Scheduler;
