import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';

import { mockDonors } from '../utils/mockDonors';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';

const apiKey = "AIzaSyAvAe-i8pMrp3_2vVbdhjEdHY05Ro1ZOnE";

const containerStyle = {
  width: '100%',
  height: '500px',
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

const MapView: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'donor' | 'recipient'>('all');
  const [showOptimizedRoute, setShowOptimizedRoute] = useState<boolean>(false);
  const [optimizedSchedule, setOptimizedSchedule] = useState<ScheduledDonor[]>([]);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Initialize the locations on component mount
  useEffect(() => {
    const { schedule } = getOptimizedSchedule(mockDonors);
    setLocations(convertDonorsToLocations(schedule));
  }, []);

  useEffect(() => {
    if (showOptimizedRoute) {
      const { schedule } = getOptimizedSchedule(mockDonors);
      setOptimizedSchedule(schedule);
    }
  }, [showOptimizedRoute]);

  const filteredLocations = showOptimizedRoute 
    ? convertDonorsToLocations(optimizedSchedule)
    : locations.filter(location => selectedType === 'all' || location.type === selectedType);

  const handleOptimizeRoute = () => {
    setShowOptimizedRoute(true);
    setSelectedType('donor');
  };

  const handleResetView = () => {
    // Set temporary isResetting flag to avoid DOM manipulation issues
    setIsResetting(true);
    
    // Use setTimeout to ensure we clear everything properly
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

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Food Stash Map</h1>
          
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${
                selectedType === 'all' && !showOptimizedRoute
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedType('all');
                setShowOptimizedRoute(false);
              }}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                (selectedType === 'donor' && !showOptimizedRoute)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedType('donor');
                setShowOptimizedRoute(false);
              }}
            >
              Donors
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                selectedType === 'recipient' && !showOptimizedRoute
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedType('recipient');
                setShowOptimizedRoute(false);
              }}
            >
              Recipients
            </button>
          </div>
          
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
      <div className="flex-1">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId={'DEMO_MAP_ID'}
            defaultZoom={13}
            defaultCenter={warehouseLocation}
            style={containerStyle}
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
            
            {/* Location markers - use key that changes when optimized state changes */}
            {!isResetting && filteredLocations.map((location) => {
              const scheduledDonor = findScheduledDonor(location);
              const markerKey = `${location.id}-${showOptimizedRoute ? 'optimized' : 'regular'}`;
              
              return (
                <AdvancedMarker
                  key={markerKey}
                  position={{ lat: location.latitude, lng: location.longitude }}
                  title={location.name}
                >
                  {showOptimizedRoute && scheduledDonor ? (
                    <div className="relative">
                      <Pin 
                        background={'#4CAF50'} 
                        glyphColor={'#fff'} 
                        borderColor={'#000'} 
                      />
                      <InfoWindow
                        position={{ lat: location.latitude, lng: location.longitude }}
                      >
                        <h3 className="font-bold text-lg">{scheduledDonor.order}</h3>
                      </InfoWindow>
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
  );
};

export default MapView;