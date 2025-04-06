import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin, useMap } from '@vis.gl/react-google-maps';
import { mockDonors } from '../utils/mockDonors';
import { getOptimizedSchedule, ScheduledDonor } from '../utils/scheduler';

const apiKey = "AIzaSyAvAe-i8pMrp3_2vVbdhjEdHY05Ro1ZOnE";

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
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

/**
 * DirectionsRendererComponent uses the Google Directions API to fetch the route
 * between the optimized locations and renders it using DirectionsRenderer.
 */
const DirectionsRendererComponent: React.FC<{ optimizedSchedule: ScheduledDonor[] }> = ({ optimizedSchedule }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || optimizedSchedule.length < 2) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const origin = new window.google.maps.LatLng(
      optimizedSchedule[0].location.lat,
      optimizedSchedule[0].location.lng
    );
    const destination = new window.google.maps.LatLng(
      optimizedSchedule[optimizedSchedule.length - 1].location.lat,
      optimizedSchedule[optimizedSchedule.length - 1].location.lng
    );
    const waypoints = optimizedSchedule
      .slice(1, optimizedSchedule.length - 1)
      .map(donor => ({
        location: new window.google.maps.LatLng(donor.location.lat, donor.location.lng),
        stopover: true
      }));

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Error fetching directions', result);
        }
      }
    );

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [map, optimizedSchedule]);

  return null;
};

const MapView: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'donor' | 'recipient'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showOptimizedRoute, setShowOptimizedRoute] = useState<boolean>(false);
  const [optimizedSchedule, setOptimizedSchedule] = useState<ScheduledDonor[]>([]);

  // Initialize locations on component mount
  useEffect(() => {
    const { schedule } = getOptimizedSchedule(mockDonors);
    setLocations(convertDonorsToLocations(schedule));
  }, []);

  // Update optimized schedule when activated
  useEffect(() => {
    if (showOptimizedRoute) {
      const { schedule } = getOptimizedSchedule(mockDonors);
      setOptimizedSchedule(schedule);
    }
  }, [showOptimizedRoute]);

  const filteredLocations = showOptimizedRoute 
    ? convertDonorsToLocations(optimizedSchedule)
    : locations.filter(location => selectedType === 'all' || location.type === selectedType);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleInfoWindowClose = () => {
    setSelectedLocation(null);
  };

  const handleOptimizeRoute = () => {
    setShowOptimizedRoute(true);
    setSelectedType('donor');
  };

  const handleResetView = () => {
    setShowOptimizedRoute(false);
    setSelectedType('all');
  };

  // Find the corresponding scheduled donor for a location (for the info window)
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
              className={`px-4 py-2 rounded-md ${selectedType === 'all' && !showOptimizedRoute
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedType('all');
                setShowOptimizedRoute(false);
              }}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedType === 'donor' && !showOptimizedRoute
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedType('donor');
                setShowOptimizedRoute(false);
              }}
            >
              Donors
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedType === 'recipient' && !showOptimizedRoute
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
              className={`px-4 py-2 rounded-md ${showOptimizedRoute
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              onClick={handleOptimizeRoute}
            >
              Show Optimized Route
            </button>
            {showOptimizedRoute && (
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
            defaultCenter={center}
            style={containerStyle}
          >
            {/* Warehouse marker */}
            <AdvancedMarker
              position={center}
              title="Food Stash Warehouse"
            >
              <Pin
                background={'#FF5722'}  
                glyphColor={'#fff'}
                borderColor={'#000'}
                scale={1.2}
              />
            </AdvancedMarker>
            {filteredLocations.map((location, index) => {
              const scheduledDonor = findScheduledDonor(location);
              return (
                <AdvancedMarker
                  key={location.id}
                  position={{ lat: location.latitude, lng: location.longitude }}
                  title={location.name}
                  onClick={() => handleMarkerClick(location)}
                >
                  {showOptimizedRoute && scheduledDonor ? (
                    <div className="relative">
                      <Pin 
                        background={'#4CAF50'} 
                        glyphColor={'#fff'} 
                        borderColor={'#000'} 
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {scheduledDonor.order}
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-20">
                      <Pin 
                        background={location.type === 'donor' ? '#4CAF50' : '#2196F3'} 
                        glyphColor={'#fff'} 
                        borderColor={'#000'} 
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                  )}
                </AdvancedMarker>
              );
            })}
            {selectedLocation && (
              <InfoWindow
                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                onCloseClick={handleInfoWindowClose}
              >
                <div className="p-2">
                  <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                  {showOptimizedRoute && (() => {
                    const scheduledDonor = findScheduledDonor(selectedLocation);
                    if (scheduledDonor) {
                      return (
                        <>
                          <p className="font-semibold">Pickup Order: #{scheduledDonor.order}</p>
                          <p>Scheduled Time: {scheduledDonor.scheduledPickup}</p>
                          <p>Preferred Time: {scheduledDonor.pickupTime}</p>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
              </InfoWindow>
            )}
            {/* Render the calculated route using the Directions API */}
            {showOptimizedRoute && optimizedSchedule.length > 1 && (
              <DirectionsRendererComponent optimizedSchedule={optimizedSchedule} />
            )}
          </Map>
        </APIProvider>
      </div>
      {showOptimizedRoute && (
        <div className="bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2">Optimized Pickup Schedule</h2>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {optimizedSchedule.map((donor) => (
              <div key={donor.name} className="p-3 border rounded shadow-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-2">
                    {donor.order}
                  </div>
                  <strong>{donor.name}</strong>
                </div>
                <div className="text-sm text-gray-600">Scheduled: {donor.scheduledPickup}</div>
                <div className="text-sm text-gray-600">Preferred: {donor.pickupTime}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
