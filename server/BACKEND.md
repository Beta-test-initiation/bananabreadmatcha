# Backend Documentation

## Overview

The Food Stash Optimization backend is a Node.js application built with Express and TypeScript, providing a RESTful API for the frontend application. The backend handles data storage, route optimization, and business logic for the food donation platform.

## Technology Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **TypeScript**: Type-safe JavaScript
- **Jest**: Testing framework

## Project Structure

```
server/
├── src/                    # Source code
│   ├── controllers/        # Request handlers
│   │   ├── donorController.ts    # Donor-related operations
│   │   ├── recipientController.ts # Recipient-related operations
│   │   ├── foodItemController.ts # Food item-related operations
│   │   └── routeController.ts    # Route optimization operations
│   ├── models/             # Data models
│   │   ├── Donor.ts        # Donor model
│   │   ├── Recipient.ts    # Recipient model
│   │   ├── FoodItem.ts     # Food item model
│   │   ├── FoodRequest.ts  # Food request model
│   │   └── Route.ts        # Route model
│   ├── routes/             # API routes
│   │   ├── donorRoutes.ts  # Donor routes
│   │   ├── recipientRoutes.ts # Recipient routes
│   │   ├── foodItemRoutes.ts # Food item routes
│   │   └── routeRoutes.ts  # Route optimization routes
│   ├── services/           # Business logic
│   │   ├── donorService.ts # Donor business logic
│   │   ├── recipientService.ts # Recipient business logic
│   │   ├── foodItemService.ts # Food item business logic
│   │   └── routeService.ts # Route optimization logic
│   ├── utils/              # Utility functions
│   │   ├── geocoding.ts    # Geocoding utilities
│   │   ├── validation.ts   # Data validation utilities
│   │   └── optimization.ts # Route optimization utilities
│   ├── middleware/         # Express middleware
│   │   ├── auth.ts         # Authentication middleware
│   │   ├── error.ts        # Error handling middleware
│   │   └── validation.ts   # Request validation middleware
│   ├── config/             # Configuration files
│   │   ├── db.ts           # Database configuration
│   │   └── env.ts          # Environment variables
│   └── index.ts            # Entry point
├── package.json            # Backend dependencies
└── tsconfig.json           # TypeScript configuration
```

## API Documentation

### Donors

#### Get All Donors

```
GET /api/donors
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "latitude": "number",
    "longitude": "number",
    "foodItems": [
      {
        "id": "string",
        "name": "string",
        "type": "perishable | non-perishable",
        "quantity": "number",
        "unit": "string",
        "description": "string",
        "expiryDate": "date",
        "donorId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "preferredPickupTimes": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### Get a Specific Donor

```
GET /api/donors/:id
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "foodItems": [
    {
      "id": "string",
      "name": "string",
      "type": "perishable | non-perishable",
      "quantity": "number",
      "unit": "string",
      "description": "string",
      "expiryDate": "date",
      "donorId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "preferredPickupTimes": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Create a New Donor

```
POST /api/donors
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "preferredPickupTimes": ["string"]
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "foodItems": [],
  "preferredPickupTimes": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Update a Donor

```
PUT /api/donors/:id
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "preferredPickupTimes": ["string"]
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "foodItems": [
    {
      "id": "string",
      "name": "string",
      "type": "perishable | non-perishable",
      "quantity": "number",
      "unit": "string",
      "description": "string",
      "expiryDate": "date",
      "donorId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "preferredPickupTimes": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Delete a Donor

```
DELETE /api/donors/:id
```

**Response:**
```json
{
  "message": "Donor deleted successfully"
}
```

### Recipients

#### Get All Recipients

```
GET /api/recipients
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "organization": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "latitude": "number",
    "longitude": "number",
    "peopleToServe": "number",
    "foodRequests": [
      {
        "id": "string",
        "type": "perishable | non-perishable | both",
        "quantity": "number",
        "unit": "string",
        "description": "string",
        "urgency": "low | medium | high",
        "recipientId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### Get a Specific Recipient

```
GET /api/recipients/:id
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "organization": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "peopleToServe": "number",
  "foodRequests": [
    {
      "id": "string",
      "type": "perishable | non-perishable | both",
      "quantity": "number",
      "unit": "string",
      "description": "string",
      "urgency": "low | medium | high",
      "recipientId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Create a New Recipient

```
POST /api/recipients
```

**Request Body:**
```json
{
  "name": "string",
  "organization": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "peopleToServe": "number"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "organization": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "peopleToServe": "number",
  "foodRequests": [],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Update a Recipient

```
PUT /api/recipients/:id
```

**Request Body:**
```json
{
  "name": "string",
  "organization": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "peopleToServe": "number"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "organization": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "peopleToServe": "number",
  "foodRequests": [
    {
      "id": "string",
      "type": "perishable | non-perishable | both",
      "quantity": "number",
      "unit": "string",
      "description": "string",
      "urgency": "low | medium | high",
      "recipientId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Delete a Recipient

```
DELETE /api/recipients/:id
```

**Response:**
```json
{
  "message": "Recipient deleted successfully"
}
```

### Food Items

#### Get All Food Items

```
GET /api/food-items
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "type": "perishable | non-perishable",
    "quantity": "number",
    "unit": "string",
    "description": "string",
    "expiryDate": "date",
    "donorId": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### Get a Specific Food Item

```
GET /api/food-items/:id
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "type": "perishable | non-perishable",
  "quantity": "number",
  "unit": "string",
  "description": "string",
  "expiryDate": "date",
  "donorId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Create a New Food Item

```
POST /api/food-items
```

**Request Body:**
```json
{
  "name": "string",
  "type": "perishable | non-perishable",
  "quantity": "number",
  "unit": "string",
  "description": "string",
  "expiryDate": "date",
  "donorId": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "type": "perishable | non-perishable",
  "quantity": "number",
  "unit": "string",
  "description": "string",
  "expiryDate": "date",
  "donorId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Update a Food Item

```
PUT /api/food-items/:id
```

**Request Body:**
```json
{
  "name": "string",
  "type": "perishable | non-perishable",
  "quantity": "number",
  "unit": "string",
  "description": "string",
  "expiryDate": "date",
  "donorId": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "type": "perishable | non-perishable",
  "quantity": "number",
  "unit": "string",
  "description": "string",
  "expiryDate": "date",
  "donorId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Delete a Food Item

```
DELETE /api/food-items/:id
```

**Response:**
```json
{
  "message": "Food item deleted successfully"
}
```

### Routes

#### Get All Routes

```
GET /api/routes
```

**Response:**
```json
[
  {
    "id": "string",
    "donorId": "string",
    "recipientId": "string",
    "foodItems": [
      {
        "id": "string",
        "name": "string",
        "type": "perishable | non-perishable",
        "quantity": "number",
        "unit": "string",
        "description": "string",
        "expiryDate": "date",
        "donorId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "distance": "number",
    "duration": "number",
    "waypoints": [[number, number]],
    "status": "pending | in-progress | completed",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### Get a Specific Route

```
GET /api/routes/:id
```

**Response:**
```json
{
  "id": "string",
  "donorId": "string",
  "recipientId": "string",
  "foodItems": [
    {
      "id": "string",
      "name": "string",
      "type": "perishable | non-perishable",
      "quantity": "number",
      "unit": "string",
      "description": "string",
      "expiryDate": "date",
      "donorId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "distance": "number",
  "duration": "number",
  "waypoints": [[number, number]],
  "status": "pending | in-progress | completed",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Generate Optimized Routes

```
POST /api/routes/optimize
```

**Request Body:**
```json
{
  "donors": ["string"],
  "recipients": ["string"],
  "constraints": {
    "maxDistance": "number",
    "maxDuration": "number",
    "vehicleCapacity": "number"
  }
}
```

**Response:**
```json
[
  {
    "id": "string",
    "donorId": "string",
    "recipientId": "string",
    "foodItems": [
      {
        "id": "string",
        "name": "string",
        "type": "perishable | non-perishable",
        "quantity": "number",
        "unit": "string",
        "description": "string",
        "expiryDate": "date",
        "donorId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "distance": "number",
    "duration": "number",
    "waypoints": [[number, number]],
    "status": "pending",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

## Data Models

### Donor

```typescript
interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  foodItems: FoodItem[];
  preferredPickupTimes: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Recipient

```typescript
interface Recipient {
  id: string;
  name: string;
  organization?: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  peopleToServe: number;
  foodRequests: FoodRequest[];
  createdAt: Date;
  updatedAt: Date;
}
```

### FoodItem

```typescript
interface FoodItem {
  id: string;
  name: string;
  type: 'perishable' | 'non-perishable';
  quantity: number;
  unit: string;
  description: string;
  expiryDate: Date;
  donorId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### FoodRequest

```typescript
interface FoodRequest {
  id: string;
  type: 'perishable' | 'non-perishable' | 'both';
  quantity: number;
  unit: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  recipientId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Route

```typescript
interface Route {
  id: string;
  donorId: string;
  recipientId: string;
  foodItems: FoodItem[];
  distance: number;
  duration: number;
  waypoints: [number, number][];
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
```

## Route Optimization Algorithm

The route optimization algorithm uses the following approach:

### 1. Clustering

- Group nearby donors and recipients based on geographical proximity
- Use k-means clustering to create clusters of locations
- Each cluster contains a set of donors and recipients that are close to each other

### 2. Matching

- Match donors with recipients within the same cluster
- Consider food type compatibility (perishable, non-perishable, both)
- Match based on quantity requirements
- Prioritize matches with higher urgency levels

### 3. Route Generation

- Generate optimal routes using the Traveling Salesman Problem algorithm
- Consider multiple factors:
  - Distance between locations
  - Time windows for pickups and deliveries
  - Vehicle capacity constraints
  - Traffic conditions

### 4. Refinement

- Adjust routes based on real-time constraints
- Optimize for fuel efficiency
- Balance load across vehicles
- Minimize total travel time

## Database Schema

### Donor Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  address: String,
  latitude: Number,
  longitude: Number,
  preferredPickupTimes: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Recipient Collection

```javascript
{
  _id: ObjectId,
  name: String,
  organization: String,
  email: String,
  phone: String,
  address: String,
  latitude: Number,
  longitude: Number,
  peopleToServe: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### FoodItem Collection

```javascript
{
  _id: ObjectId,
  name: String,
  type: String,
  quantity: Number,
  unit: String,
  description: String,
  expiryDate: Date,
  donorId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### FoodRequest Collection

```javascript
{
  _id: ObjectId,
  type: String,
  quantity: Number,
  unit: String,
  description: String,
  urgency: String,
  recipientId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Route Collection

```javascript
{
  _id: ObjectId,
  donorId: ObjectId,
  recipientId: ObjectId,
  foodItems: [ObjectId],
  distance: Number,
  duration: Number,
  waypoints: [[Number, Number]],
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication and Authorization

The API uses JWT (JSON Web Tokens) for authentication:

### Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. Server generates a JWT token
4. Client stores the token
5. Client includes the token in subsequent requests
6. Server validates the token for protected routes

### Protected Routes

- All routes except public ones require authentication
- Role-based access control for admin functions

## Error Handling

The API uses a consistent error handling approach:

### Error Response Format

```json
{
  "error": {
    "message": "string",
    "code": "string",
    "details": {}
  }
}
```

### Common Error Codes

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Testing

The backend uses Jest for testing:

### Unit Tests

- Controller tests
- Service tests
- Utility function tests

### Integration Tests

- API endpoint tests
- Database interaction tests
- Authentication tests

## Deployment

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- Environment variables configured

### Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-stash
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Deployment Steps

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Build the application: `npm run build`
5. Start the server: `npm start`

### Production Considerations

- Use a process manager like PM2
- Set up a reverse proxy (Nginx)
- Enable HTTPS
- Implement rate limiting
- Set up monitoring and logging 