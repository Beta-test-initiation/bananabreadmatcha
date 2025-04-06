import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';

import { mockDonors } from '../utils/mockDonors';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';

const apiKey = "AIzaSyAvAe-i8pMrp3_2vVbdhjEdHY05Ro1ZOnE";

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const warehouseLocation = {
  lat: 49.26869788991187,
  lng: -123.0979434827872, // Food Stash Warehouse
};

interface Location {
  id: string;
  type: 'donor' | 'recipient';
  name: string;
  latitude: number;
  longitude: number;
}

// Animation variants
const timelineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
};

// Convert donors to the Location interface format
const convertDonorsToLocations = (donors: ScheduledDonor[]): Location[] => {
  return donors.map((donor, index) => ({
    id: (index + 1).toString(),
    type: 'donor',
    name: donor.name,
    latitude: donor.location.lat,
    longitude: donor.location.lng
  }));
};

const MapScheduler: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'donor' | 'recipient'>('all');
  const [showOptimizedRoute, setShowOptimizedRoute] = useState<boolean>(true);
  const [optimizedSchedule, setOptimizedSchedule] = useState<ScheduledDonor[]>([]);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const navigate = useNavigate();

  // Initialize the locations and schedule on component mount
  useEffect(() => {
    const { schedule } = getOptimizedSchedule(mockDonors);
    setOptimizedSchedule(schedule);
    setLocations(convertDonorsToLocations(schedule));
  }, []);

  const filteredLocations = showOptimizedRoute 
    ? convertDonorsToLocations(optimizedSchedule)
    : locations.filter(location => selectedType === 'all' || location.type === selectedType);

  const handleOptimizeRoute = () => {
    setShowOptimizedRoute(true);
    setSelectedType('donor');
  };

  const handleResetView = () => {
    setIsResetting(true);
    setTimeout(() => {
      setShowOptimizedRoute(false);
      setSelectedType('all');
      setIsResetting(false);
    }, 0);
  };

  const findScheduledDonor = (location: Location): ScheduledDonor | undefined => {
    if (!showOptimizedRoute) return undefined;
    return optimizedSchedule.find(donor => 
      donor.location.lat === location.latitude && 
      donor.location.lng === location.longitude
    );
  };

  // Function to handle clicking on a schedule item to highlight on map
  const [selectedDonorId, setSelectedDonorId] = useState<string | null>(null);
  
  const handleScheduleItemClick = (donor: ScheduledDonor) => {
    setSelectedDonorId(donor.order.toString());
    // Can also pan map to this location if needed
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header with title and controls */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Food Stash Route Planner</h1>
          
          <div className="flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded-md ${
                showOptimizedRoute
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
              onClick={handleOptimizeRoute}
              disabled={isResetting}
            >
              Show Optimized Route
            </button>
            {showOptimizedRoute && !isResetting && (
              <button
                className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                onClick={handleResetView}
              >
                Reset View
              </button>
            )}
            <button
              className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 ml-auto"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content area with split view */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side: Schedule */}
        <div className="w-full md:w-1/3 bg-gray-50 overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">Pickup Schedule</h2>
          
          <motion.div
            className="relative"
            variants={timelineVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Vertical line for timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-200" />
            <div className="space-y-6">
              {optimizedSchedule.map((donor) => (
                <motion.div
                  key={donor.order}
                  className={`relative flex items-center cursor-pointer 
                    ${selectedDonorId === donor.order.toString() ? 'ring-2 ring-green-500 rounded-lg' : ''}`}
                  variants={itemVariants}
                  onClick={() => handleScheduleItemClick(donor)}
                >
                  {/* Timeline dot */}
                  <div className="z-10 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    {donor.order}
                  </div>
                  {/* Minimal info card */}
                  <div className="ml-4 p-3 bg-white rounded shadow-sm w-full">
                    <div className="text-lg font-semibold">{donor.name}</div>
                    <div className="text-sm text-gray-500">Pickup at {donor.scheduledPickup}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right side: Map */}
        <div className="w-full md:w-2/3 h-64 md:h-auto">
          <APIProvider apiKey={apiKey}>
            <Map
              mapId={'DEMO_MAP_ID'}
              defaultZoom={13}
              defaultCenter={warehouseLocation}
              style={mapContainerStyle}
            >
              {/* Warehouse marker */}
              <AdvancedMarker
                position={warehouseLocation}
                title="Food Stash Warehouse"
              >
                <Pin
                  background={'#FF5722'}  
                  glyphColor={'#fff'}
                  borderColor={'#000'}
                  scale={1.2}
                />
              </AdvancedMarker>
              
              {/* Location markers */}
              {!isResetting && filteredLocations.map((location) => {
                const scheduledDonor = findScheduledDonor(location);
                const markerKey = `${location.id}-${showOptimizedRoute ? 'optimized' : 'regular'}`;
                const isSelected = scheduledDonor && selectedDonorId === scheduledDonor.order.toString();
                
                return (
                  <AdvancedMarker
                    key={markerKey}
                    position={{ lat: location.latitude, lng: location.longitude }}
                    title={location.name}
                  >
                    {showOptimizedRoute && scheduledDonor ? (
                      <div className="relative">
                        <Pin 
                          background={isSelected ? '#F59E0B' : '#4CAF50'} 
                          glyphColor={'#fff'} 
                          borderColor={'#000'}
                          scale={isSelected ? 1.3 : 1} 
                        />
                        <div 
                          className={`absolute -top-8 -left-3 bg-white px-2 py-1 rounded-full shadow-md
                            border-2 ${isSelected ? 'border-yellow-500' : 'border-green-500'}`}
                        >
                          <span className="font-bold text-lg">{scheduledDonor.order}</span>
                        </div>
                      </div>
                    ) : (
                      <Pin 
                        background={location.type === 'donor' ? '#4CAF50' : '#2196F3'} 
                        glyphColor={'#fff'} 
                        borderColor={'#000'} 
                      />
                    )}
                  </AdvancedMarker>
                );
              })}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default MapScheduler;