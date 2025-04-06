import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';
import { mockDonors } from '../utils/mockDonors';

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
    const { schedule: optimizedSchedule } = getOptimizedSchedule(mockDonors);
    setSchedule(optimizedSchedule);
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
