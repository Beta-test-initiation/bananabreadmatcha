// src/components/Scheduler.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
};

const Scheduler: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduledDonor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch('http://localhost:80/donors/');
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const donorsData = await response.json();
        // Transform the donor data to match what getOptimizedSchedule expects:
        // - Create a location object with numeric lat and lng.
        // - Here we assume that "longitude" should become lat and "latitude" becomes lng.
        const transformedDonors = donorsData.map((donor: any) => ({
          ...donor,
          location: {
            lat: parseFloat(donor.longitude),
            lng: parseFloat(donor.latitude),
          },
          // Optionally, ensure pickup_time is lowercase if needed by your scheduler
          pickupTime: donor.pickup_time.toLowerCase(),
          date: donor.date,
        }));
        // Generate the optimized schedule using the transformed donor data
        const { schedule: optimizedSchedule } = getOptimizedSchedule(transformedDonors);
        setSchedule(optimizedSchedule);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    }
    fetchDonors();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Pickup Schedule</h1>
      <motion.div
        className="relative max-w-2xl mx-auto"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Vertical line for timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-200" />
        <div className="space-y-8">
          {schedule.map((donor) => (
            <motion.div
              key={donor.order}
              className="relative flex items-center"
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="z-10 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {donor.order}
              </div>
              {/* Minimal info card */}
              <div className="ml-6 p-4 bg-white rounded shadow-md w-full">
                <div className="text-lg font-semibold">{donor.name}</div>
                <div className="text-sm text-gray-500">Pickup at {donor.scheduledPickup}</div>
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
