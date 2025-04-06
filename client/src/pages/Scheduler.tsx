import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';
import { mockDonors } from '../utils/mockDonors';

const Scheduler: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduledDonor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { schedule: optimizedSchedule } = getOptimizedSchedule(mockDonors);
    setSchedule(optimizedSchedule);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Optimized Schedule</h1>
      <ul>
        {schedule.map((donor) => (
          <li key={donor.order} className="mb-2 p-2 border rounded">
            <div>
              <strong>
                {donor.order}. {donor.name}
              </strong>
            </div>
            <div>Preferred Pickup: {donor.pickupTime}</div>
            <div>Scheduled Pickup: {donor.scheduledPickup}</div>
            <div>
              Location: ({donor.location.lat.toFixed(4)}, {donor.location.lng.toFixed(4)})
            </div>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Scheduler;
