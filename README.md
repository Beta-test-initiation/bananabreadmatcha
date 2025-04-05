# Food Stash Optimization

A platform that optimizes food donation routes between donors and recipients, reducing food waste and helping those in need.

## Project Overview

Food Stash Optimization is a full-stack web application that connects food donors with recipients in need. The platform uses route optimization algorithms to efficiently match and deliver food donations, reducing waste and helping communities.

### Key Features

- **Donor Portal**: Easy interface for food donors to register and list available food items
- **Recipient Portal**: Simple process for organizations to request food donations
- **Interactive Map**: Visual representation of donors and recipients with optimized routes
- **Route Optimization**: Algorithm to determine the most efficient delivery routes
- **Dashboard**: Analytics and statistics on food donations and deliveries

## Project Structure

```
food-stash-optimization/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   │   ├── index.html      # HTML template
│   │   └── markers/        # Map marker icons
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main application component
│   │   ├── index.tsx       # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   ├── webpack.config.js   # Webpack configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
│
└── server/                 # Backend Node.js application
    ├── src/                # Source code
    │   ├── controllers/    # Request handlers
    │   ├── models/         # Data models
    │   ├── routes/         # API routes
    │   ├── services/       # Business logic
    │   ├── utils/          # Utility functions
    │   └── index.js        # Entry point
    ├── package.json        # Backend dependencies
    └── tsconfig.json       # TypeScript configuration
```

## Frontend Documentation

### Technology Stack

- **React**: UI library for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet**: Interactive maps
- **Axios**: HTTP client for API requests

### Key Components

#### Pages

1. **HomePage**: Landing page with hero section, features, and call-to-action
2. **DonorForm**: Multi-step form for food donors to register and list food items
3. **RecipientForm**: Multi-step form for recipients to request food donations
4. **MapView**: Interactive map showing donors, recipients, and optimized routes
5. **Dashboard**: Analytics and statistics on food donations and deliveries
6. **NotFound**: 404 error page

#### Reusable Components

1. **Navbar**: Navigation bar with links to all pages
2. **Footer**: Footer with organization information and quick links
3. **Button**: Reusable button component with different styles
4. **Card**: Card component for displaying information
5. **Form Elements**: Input fields, labels, and form groups

### Styling

The application uses Tailwind CSS for styling with a custom color palette:

- **Primary Colors**: Green shades for primary actions and branding
- **Secondary Colors**: Yellow/amber shades for secondary actions
- **Neutral Colors**: Gray shades for text and backgrounds

### State Management

- React hooks for local component state
- Context API for global state (if needed)
- Form state managed within form components

## Backend Documentation

### Technology Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **TypeScript**: Type-safe JavaScript
- **Jest**: Testing framework

### API Endpoints

#### Donors

- `GET /api/donors`: Get all donors
- `GET /api/donors/:id`: Get a specific donor
- `POST /api/donors`: Create a new donor
- `PUT /api/donors/:id`: Update a donor
- `DELETE /api/donors/:id`: Delete a donor

#### Recipients

- `GET /api/recipients`: Get all recipients
- `GET /api/recipients/:id`: Get a specific recipient
- `POST /api/recipients`: Create a new recipient
- `PUT /api/recipients/:id`: Update a recipient
- `DELETE /api/recipients/:id`: Delete a recipient

#### Food Items

- `GET /api/food-items`: Get all food items
- `GET /api/food-items/:id`: Get a specific food item
- `POST /api/food-items`: Create a new food item
- `PUT /api/food-items/:id`: Update a food item
- `DELETE /api/food-items/:id`: Delete a food item

#### Routes

- `GET /api/routes`: Get all optimized routes
- `GET /api/routes/:id`: Get a specific route
- `POST /api/routes/optimize`: Generate optimized routes

### Data Models

#### Donor

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

#### Recipient

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

#### FoodItem

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

#### FoodRequest

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

#### Route

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

### Route Optimization Algorithm

The route optimization algorithm uses the following approach:

1. **Clustering**: Group nearby donors and recipients
2. **Matching**: Match donors with recipients based on food type and quantity
3. **Route Generation**: Generate optimal routes using the Traveling Salesman Problem algorithm
4. **Refinement**: Adjust routes based on time windows and vehicle capacity

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at http://localhost:3000

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The API will be available at http://localhost:5000

## Deployment

### Frontend Deployment

1. Build the production bundle:
   ```
   cd client
   npm run build
   ```

2. Deploy the `dist` directory to a static hosting service like Netlify, Vercel, or GitHub Pages

### Backend Deployment

1. Build the production bundle:
   ```
   cd server
   npm run build
   ```

2. Deploy to a cloud provider like Heroku, AWS, or Google Cloud Platform

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
