import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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

const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  
  return null;
};

const MapView: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [selectedType, setSelectedType] = useState<'all' | 'donor' | 'recipient'>('all');
  const [center] = useState<[number, number]>([49.2827, -123.1207]); // Vancouver coordinates

  const filteredLocations = locations.filter(location => 
    selectedType === 'all' || location.type === selectedType
  );

  const getMarkerIcon = (type: 'donor' | 'recipient') => {
    return new L.Icon({
      iconUrl: type === 'donor' 
        ? '/markers/donor-marker.png'
        : '/markers/recipient-marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
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
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController center={center} />
          
          {filteredLocations.map(location => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={getMarkerIcon(location.type)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  {location.organization && (
                    <p className="text-gray-600">{location.organization}</p>
                  )}
                  
                  {location.type === 'donor' && location.foodItems && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Available Food:</h4>
                      <ul className="list-disc list-inside">
                        {location.foodItems.map((item, index) => (
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
                  
                  {location.type === 'recipient' && location.foodRequests && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Food Requests:</h4>
                      <ul className="list-disc list-inside">
                        {location.foodRequests.map((request, index) => (
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
                      {location.servingSize && (
                        <p className="mt-2 text-sm text-gray-600">
                          Serving {location.servingSize} people
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView; 