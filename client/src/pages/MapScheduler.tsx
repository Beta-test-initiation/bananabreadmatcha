import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';
import { getOptimizedDropoffSchedule, ScheduledRecipient } from '../utils/recipient';

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
  order?: number;
  scheduledTime?: string;
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
  return donors.map((donor) => ({
    id: donor.order.toString(),
    type: 'donor',
    name: donor.name,
    latitude: donor.location.lat,
    longitude: donor.location.lng,
    order: donor.order,
    scheduledTime: donor.scheduledPickup
  }));
};

// Convert recipients to the Location interface format
const convertRecipientsToLocations = (recipients: ScheduledRecipient[]): Location[] => {
  return recipients.map((recipient) => ({
    id: `r-${recipient.order}`,
    type: 'recipient',
    name: recipient.name,
    latitude: recipient.location.lat,
    longitude: recipient.location.lng,
    order: recipient.order,
    scheduledTime: recipient.scheduledDropoff
  }));
};

const MapScheduler: React.FC = () => {
  const [donorLocations, setDonorLocations] = useState<Location[]>([]);
  const [recipientLocations, setRecipientLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'donor' | 'recipient'>('all');
  const [showOptimizedRoute, setShowOptimizedRoute] = useState<boolean>(true);
  const [donorSchedule, setDonorSchedule] = useState<ScheduledDonor[]>([]);
  const [recipientSchedule, setRecipientSchedule] = useState<ScheduledRecipient[]>([]);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch donors and compute optimized schedule
  useEffect(() => {
    async function fetchDonors() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:80/donors/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const donorsData = await response.json();
        const transformedDonors = donorsData.map((donor: any) => ({
          ...donor,
          location: {
            lat: parseFloat(donor.latitude),
            lng: parseFloat(donor.longitude),
          },
          pickupTime:
            donor.pickup_time.charAt(0).toUpperCase() +
            donor.pickup_time.slice(1).toLowerCase(),
          date: donor.date,
        }));
        const { schedule: optimizedSchedule } = getOptimizedSchedule(transformedDonors);
        setDonorSchedule(optimizedSchedule);
        setDonorLocations(convertDonorsToLocations(optimizedSchedule));
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
          dropoffTime:
            recipient.dropoff_time.charAt(0).toUpperCase() +
            recipient.dropoff_time.slice(1).toLowerCase(),
          date: recipient.date,
        }));
        const { schedule: optimizedSchedule } = getOptimizedDropoffSchedule(transformedRecipients);
        setRecipientSchedule(optimizedSchedule);
        setRecipientLocations(convertRecipientsToLocations(optimizedSchedule));
      } catch (error) {
        console.error('Error fetching recipients:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipients();
  }, []);

  const filteredLocations = (() => {
    if (!showOptimizedRoute) return [];
    if (selectedType === 'all') return [...donorLocations, ...recipientLocations];
    if (selectedType === 'donor') return donorLocations;
    return recipientLocations;
  })();

  const handleOptimizeRoute = (type: 'all' | 'donor' | 'recipient') => {
    setShowOptimizedRoute(true);
    setSelectedType(type);
  };

  const handleResetView = () => {
    setIsResetting(true);
    setTimeout(() => {
      setShowOptimizedRoute(false);
      setSelectedType('all');
      setIsResetting(false);
    }, 0);
  };

  // Function to handle clicking on a schedule item to highlight on map
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  
  const handleScheduleItemClick = (id: string) => {
    setSelectedLocationId(prevId => prevId === id ? null : id);
    // Can also pan map to this location if needed
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Loading routes...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header with title and controls */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Food Stash Route Planner</h1>
          
          <div className="flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded-md ${
                showOptimizedRoute && selectedType === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
              onClick={() => handleOptimizeRoute('all')}
              disabled={isResetting}
            >
              Show All Routes
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                showOptimizedRoute && selectedType === 'donor'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
              onClick={() => handleOptimizeRoute('donor')}
              disabled={isResetting}
            >
              Show Pickup Route
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                showOptimizedRoute && selectedType === 'recipient'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
              onClick={() => handleOptimizeRoute('recipient')}
              disabled={isResetting}
            >
              Show Dropoff Route
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
          {selectedType === 'donor' || selectedType === 'all' ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-green-700">Pickup Schedule</h2>
              <motion.div
                className="relative mb-8"
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Vertical line for donor timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-200" />
                <div className="space-y-6">
                  {donorSchedule.map((donor) => (
                    <motion.div
                      key={donor.order}
                      className={`relative flex items-center cursor-pointer 
                        ${selectedLocationId === donor.order.toString() ? 'ring-2 ring-green-500 rounded-lg' : ''}`}
                      variants={itemVariants}
                      onClick={() => handleScheduleItemClick(donor.order.toString())}
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
            </>
          ) : null}
          
          {selectedType === 'recipient' || selectedType === 'all' ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-orange-700">Dropoff Schedule</h2>
              <motion.div
                className="relative"
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Vertical line for recipient timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-orange-200" />
                <div className="space-y-6">
                  {recipientSchedule.map((recipient) => (
                    <motion.div
                      key={recipient.order}
                      className={`relative flex items-center cursor-pointer 
                        ${selectedLocationId === `r-${recipient.order}` ? 'ring-2 ring-orange-500 rounded-lg' : ''}`}
                      variants={itemVariants}
                      onClick={() => handleScheduleItemClick(`r-${recipient.order}`)}
                    >
                      {/* Timeline dot */}
                      <div className="z-10 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                        {recipient.order}
                      </div>
                      {/* Minimal info card */}
                      <div className="ml-4 p-3 bg-white rounded shadow-sm w-full">
                        <div className="text-lg font-semibold">{recipient.name}</div>
                        <div className="text-sm text-gray-500">Dropoff at {recipient.scheduledDropoff}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : null}
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
                  background={'#6366F1'}  
                  glyphColor={'#fff'}
                  borderColor={'#000'}
                  scale={1.2}
                />
              </AdvancedMarker>
              
              {/* Location markers */}
              {!isResetting && filteredLocations.map((location) => {
                const isSelected = selectedLocationId === location.id;
                const isDonor = location.type === 'donor';
                
                return (
                  <AdvancedMarker
                    key={location.id}
                    position={{ lat: location.latitude, lng: location.longitude }}
                    title={location.name}
                  >
                    <div className="relative">
                      <Pin 
                        background={isSelected 
                          ? (isDonor ? '#22C55E' : '#F97316') 
                          : (isDonor ? '#4ADE80' : '#FB923C')} 
                        glyphColor={'#fff'} 
                        borderColor={'#000'}
                        scale={isSelected ? 1.3 : 1} 
                      />
                     {/* <InfoWindow
                        position={{ lat: location.latitude, lng: location.longitude }}
                      >
                        <h3 className="font-bold text-lg">{location.order}</h3>
                      </InfoWindow> */}
                      
                      <div 
                        className={`absolute -top-8 -left-3 bg-white px-2 py-1 rounded-full shadow-md
                          border-2 ${isSelected 
                            ? (isDonor ? 'border-green-600' : 'border-orange-600') 
                            : (isDonor ? 'border-green-400' : 'border-orange-400')}`}
                      >
                        <span className="font-bold text-lg">{location.order}</span>
                      </div>
                    </div>
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