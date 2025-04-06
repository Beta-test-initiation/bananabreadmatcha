import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';

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
  organization?: string;
  latitude: number;
  longitude: number;
  foodItems?: {
    name: string;
    type: string;
    quantity: number;
    unit: string;
    expiryDate: string;
  }[];
  foodRequests?: {
    type: string;
    quantity: number;
    unit: string;
    urgency: string;
  }[];
  servingSize?: number;
}

// Mock data - replace with API calls in production
const mockLocations: Location[] = [
  {
    id: '1',
    type: 'donor',
    name: 'John Smith',
    organization: 'Local Restaurant',
    latitude: 49.2827,
    longitude: -123.1207,
    foodItems: [
      {
        name: 'Fresh Vegetables',
        type: 'perishable',
        quantity: 50,
        unit: 'kg',
        expiryDate: '2024-03-25',
      },
    ],
  },
  {
    id: '2',
    type: 'recipient',
    name: 'Community Food Bank',
    latitude: 49.2927,
    longitude: -123.1307,
    foodRequests: [
      {
        type: 'perishable',
        quantity: 100,
        unit: 'kg',
        urgency: 'high',
      },
    ],
    servingSize: 200,
  },
];

const MapView: React.FC = () => {
  const [locations] = useState<Location[]>(mockLocations);
  const [selectedType, setSelectedType] = useState<'all' | 'donor' | 'recipient'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = locations.filter(location =>
    selectedType === 'all' || location.type === selectedType
  );

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleInfoWindowClose = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Food Stash Map</h1>

          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                selectedType === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                selectedType === 'donor'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType('donor')}
            >
              Donors
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                selectedType === 'recipient'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType('recipient')}
            >
              Recipients
            </button>
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
            {filteredLocations.map(location => (
              <AdvancedMarker
                key={location.id}
                position={{ lat: location.latitude, lng: location.longitude }}
                title={location.name}
                onClick={() => handleMarkerClick(location)}
              >
                <Pin
                  background={location.type === 'donor' ? '#4CAF50' : '#2196F3'}
                  glyphColor={'#fff'}
                  borderColor={'#000'}
                />
              </AdvancedMarker>
            ))}

            {selectedLocation && (
              <InfoWindow
                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                onCloseClick={handleInfoWindowClose}
              >
                <div className="p-2">
                  <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                  {selectedLocation.organization && (
                    <p className="text-gray-600">{selectedLocation.organization}</p>
                  )}

                  {selectedLocation.type === 'donor' && selectedLocation.foodItems && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Available Food:</h4>
                      <ul className="list-disc list-inside">
                        {selectedLocation.foodItems.map((item, index) => (
                          <li key={index}>
                            {item.name} - {item.quantity} {item.unit}
                            <br />
                            <span className="text-sm text-gray-500">
                              Expires: {new Date(item.expiryDate).toLocaleDateString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedLocation.type === 'recipient' && selectedLocation.foodRequests && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Food Requests:</h4>
                      <ul className="list-disc list-inside">
                        {selectedLocation.foodRequests.map((request, index) => (
                          <li key={index}>
                            {request.type} - {request.quantity} {request.unit}
                            <br />
                            <span className={`text-sm ${
                              request.urgency === 'high' ? 'text-red-600' :
                              request.urgency === 'medium' ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              Urgency: {request.urgency}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {selectedLocation.servingSize && (
                        <p className="mt-2 text-sm text-gray-600">
                          Serving {selectedLocation.servingSize} people
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default MapView;