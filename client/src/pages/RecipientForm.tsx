import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FoodRequest {
  type: 'perishable' | 'non_perishable' | 'both';
  quantity: number;
  unit: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

const RecipientForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    email: '',
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
    servingSize: '',
    foodRequests: [] as FoodRequest[],
  });

  const [currentFoodRequest, setCurrentFoodRequest] = useState<FoodRequest>({
    type: 'both',
    quantity: 0,
    unit: 'kg',
    description: '',
    urgency: 'medium',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFoodRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentFoodRequest({
      ...currentFoodRequest,
      [name]: value,
    });
  };

  const handleAddFoodRequest = () => {
    setFormData({
      ...formData,
      foodRequests: [...formData.foodRequests, currentFoodRequest],
    });
    setCurrentFoodRequest({
      type: 'both',
      quantity: 0,
      unit: 'kg',
      description: '',
      urgency: 'medium',
    });
  };

  const handleRemoveFoodRequest = (index: number) => {
    const updatedFoodRequests = [...formData.foodRequests];
    updatedFoodRequests.splice(index, 1);
    setFormData({
      ...formData,
      foodRequests: updatedFoodRequests,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your API
    console.log('Form submitted:', formData);
    
    // Navigate to success page or map view
    navigate('/map');
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Request Food</h1>
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex-1 h-2 rounded-l-full ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
          <div className={`flex-1 h-2 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
          <div className={`flex-1 h-2 rounded-r-full ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${step >= 1 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>Recipient Info</span>
          <span className={`text-sm ${step >= 2 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>Food Requests</span>
          <span className={`text-sm ${step >= 3 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>Review</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Recipient Information</h2>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">Organization Name (if applicable)</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                className="input"
                value={formData.organizationName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address" className="form-label">Delivery Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="input"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="latitude" className="form-label">Latitude</label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  className="input"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 49.2827"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="longitude" className="form-label">Longitude</label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  className="input"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="e.g., -123.1207"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="servingSize" className="form-label">Number of People to Serve</label>
              <input
                type="number"
                id="servingSize"
                name="servingSize"
                className="input"
                value={formData.servingSize}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Food Requests</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Add Food Request</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="foodType" className="form-label">Food Type</label>
                  <select
                    id="foodType"
                    name="type"
                    className="input"
                    value={currentFoodRequest.type}
                    onChange={handleFoodRequestChange}
                    required
                  >
                    <option value="perishable">Perishable</option>
                    <option value="non_perishable">Non-perishable</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="urgency" className="form-label">Urgency Level</label>
                  <select
                    id="urgency"
                    name="urgency"
                    className="input"
                    value={currentFoodRequest.urgency}
                    onChange={handleFoodRequestChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity Needed</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="input"
                    value={currentFoodRequest.quantity}
                    onChange={handleFoodRequestChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="unit" className="form-label">Unit</label>
                  <select
                    id="unit"
                    name="unit"
                    className="input"
                    value={currentFoodRequest.unit}
                    onChange={handleFoodRequestChange}
                    required
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="l">Liters (L)</option>
                    <option value="ml">Milliliters (mL)</option>
                    <option value="pcs">Pieces</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="input"
                  rows={3}
                  value={currentFoodRequest.description}
                  onChange={handleFoodRequestChange}
                  placeholder="Please provide any specific requirements or preferences"
                ></textarea>
              </div>
              
              <button
                type="button"
                onClick={handleAddFoodRequest}
                className="btn btn-primary mt-4"
              >
                Add Food Request
              </button>
            </div>
            
            {formData.foodRequests.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Added Food Requests</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.foodRequests.map((request, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap capitalize">{request.type.replace('_', ' ')}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                              request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {request.urgency}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{request.quantity} {request.unit}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleRemoveFoodRequest(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
                disabled={formData.foodRequests.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Review Information</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Recipient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{formData.organizationName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{formData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{formData.latitude}, {formData.longitude}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Serving Size</p>
                  <p className="font-medium">{formData.servingSize} people</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Food Requests</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.foodRequests.map((request, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{request.type.replace('_', ' ')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                            request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.quantity} {request.unit}</td>
                        <td className="px-6 py-4">{request.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RecipientForm; 