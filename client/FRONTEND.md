# Frontend Documentation

## Overview

The Food Stash Optimization frontend is a React application built with TypeScript, using modern web technologies to provide a responsive and user-friendly interface for food donors and recipients.

## Technology Stack

- **React**: UI library for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet**: Interactive maps
- **Axios**: HTTP client for API requests

## Project Structure

```
client/
├── public/                 # Static assets
│   ├── index.html          # HTML template
│   └── markers/            # Map marker icons
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── DonorForm.tsx   # Donor registration form
│   │   ├── RecipientForm.tsx # Recipient registration form
│   │   ├── MapView.tsx     # Interactive map
│   │   ├── Dashboard.tsx   # Analytics dashboard
│   │   └── NotFound.tsx    # 404 error page
│   ├── services/           # API services
│   │   ├── api.ts          # API client setup
│   │   ├── donorService.ts # Donor API calls
│   │   └── recipientService.ts # Recipient API calls
│   ├── utils/              # Utility functions
│   │   ├── formatters.ts   # Data formatting utilities
│   │   └── validators.ts   # Form validation utilities
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point
│   └── index.css           # Global styles
├── package.json            # Frontend dependencies
├── tsconfig.json           # TypeScript configuration
├── webpack.config.js       # Webpack configuration
├── postcss.config.js       # PostCSS configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Component Documentation

### Pages

#### HomePage

The landing page of the application, featuring:

- Hero section with call-to-action buttons
- Features section explaining how the platform works
- CTA section encouraging users to join

**Key Features:**
- Responsive design for all screen sizes
- Clear value proposition
- Easy navigation to donor and recipient forms

#### DonorForm

A multi-step form for food donors to register and list food items:

- **Step 1: Donor Information**
  - Name, email, phone, address
  - Location coordinates
  - Preferred pickup times

- **Step 2: Food Items**
  - Add multiple food items
  - Specify name, type, quantity, unit, description, expiry date

- **Step 3: Review**
  - Summary of all entered information
  - Submit button

**Key Features:**
- Form validation
- Dynamic food item addition/removal
- Progress indicator
- Responsive design

#### RecipientForm

A multi-step form for recipients to request food donations:

- **Step 1: Recipient Information**
  - Name, organization (optional), email, phone
  - Address and location coordinates
  - Number of people to serve

- **Step 2: Food Requests**
  - Add multiple food requests
  - Specify type, quantity, unit, description, urgency

- **Step 3: Review**
  - Summary of all entered information
  - Submit button

**Key Features:**
- Form validation
- Dynamic food request addition/removal
- Progress indicator
- Responsive design

#### MapView

An interactive map showing donors, recipients, and optimized routes:

- **Map Features:**
  - Custom markers for donors and recipients
  - Popups with detailed information
  - Route visualization
  - Filter controls (all, donors, recipients)

- **Information Display:**
  - Donor details (available food items, quantities, expiry dates)
  - Recipient details (food requests, urgency levels, serving sizes)
  - Route information (distance, duration, waypoints)

**Key Features:**
- Interactive map with Leaflet
- Custom marker icons
- Filtering capabilities
- Responsive design

#### Dashboard

An analytics dashboard showing statistics and recent activity:

- **Stats Grid:**
  - Total donors
  - Total recipients
  - Total food items
  - Total requests
  - Matched pairs

- **Quick Actions:**
  - Donate food
  - Request food
  - View map

- **Recent Activity:**
  - Recent donations
  - Recent requests
  - Recent matches

**Key Features:**
- Real-time statistics
- Visual data representation
- Quick access to key actions
- Activity timeline

#### NotFound

A 404 error page for handling non-existent routes:

- **Features:**
  - Clear error message
  - Link back to home page
  - Consistent styling

### Reusable Components

#### Navbar

The navigation bar at the top of the application:

- **Features:**
  - Logo and brand name
  - Navigation links
  - Mobile-responsive menu
  - Active link highlighting

#### Footer

The footer at the bottom of the application:

- **Features:**
  - Organization information
  - Quick links
  - Contact details
  - Copyright information

#### Button

A reusable button component with different styles:

- **Variants:**
  - Primary (green)
  - Secondary (yellow)
  - Outline

- **Props:**
  - `variant`: Button style
  - `children`: Button content
  - `onClick`: Click handler
  - `disabled`: Disabled state

#### Card

A reusable card component for displaying information:

- **Features:**
  - Consistent padding and border radius
  - Shadow effect
  - Optional header and footer

#### Form Elements

Reusable form components:

- **Input:**
  - Text input with label
  - Validation state
  - Error message

- **Select:**
  - Dropdown with options
  - Label and validation

- **Checkbox/Radio:**
  - Selection controls
  - Label and validation

## Styling

The application uses Tailwind CSS for styling with a custom color palette:

### Color Palette

- **Primary Colors:**
  - 50: #f0fdf4
  - 100: #dcfce7
  - 200: #bbf7d0
  - 300: #86efac
  - 400: #4ade80
  - 500: #22c55e
  - 600: #16a34a
  - 700: #15803d
  - 800: #166534
  - 900: #14532d

- **Secondary Colors:**
  - 50: #fffbeb
  - 100: #fef3c7
  - 200: #fde68a
  - 300: #fcd34d
  - 400: #fbbf24
  - 500: #f59e0b
  - 600: #d97706
  - 700: #b45309
  - 800: #92400e
  - 900: #78350f

### Typography

- **Font Family:** Inter, sans-serif
- **Headings:**
  - h1: text-4xl font-bold
  - h2: text-3xl font-bold
  - h3: text-2xl font-bold
  - h4: text-xl font-bold
- **Body Text:**
  - Regular: text-base
  - Small: text-sm
  - Large: text-lg

### Spacing

- Consistent spacing scale using Tailwind's spacing utilities
- Responsive padding and margins

### Components

- **Buttons:**
  - Primary: bg-primary-600 text-white hover:bg-primary-700
  - Secondary: bg-secondary-600 text-white hover:bg-secondary-700
  - Outline: border border-gray-300 hover:bg-gray-100

- **Cards:**
  - bg-white rounded-lg shadow-md p-6

- **Forms:**
  - Input: w-full px-3 py-2 border border-gray-300 rounded-md
  - Label: block text-sm font-medium text-gray-700 mb-1

## State Management

The application uses React hooks for state management:

### Local State

- `useState` for component-level state
- `useReducer` for complex state logic

### Form State

- Form state managed within form components
- Validation state for form fields

### Global State (if needed)

- Context API for global state
- Custom hooks for reusable state logic

## API Integration

The application uses Axios for API requests:

### API Client Setup

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### API Services

- **Donor Service:**
  - Get all donors
  - Get a specific donor
  - Create a new donor
  - Update a donor
  - Delete a donor

- **Recipient Service:**
  - Get all recipients
  - Get a specific recipient
  - Create a new recipient
  - Update a recipient
  - Delete a recipient

- **Food Item Service:**
  - Get all food items
  - Get a specific food item
  - Create a new food item
  - Update a food item
  - Delete a food item

- **Route Service:**
  - Get all routes
  - Get a specific route
  - Generate optimized routes

## Routing

The application uses React Router for client-side routing:

### Routes

- `/`: Home page
- `/donate`: Donor form
- `/request`: Recipient form
- `/map`: Map view
- `/dashboard`: Dashboard
- `*`: 404 page

### Route Configuration

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<DonorForm />} />
          <Route path="/request" element={<RecipientForm />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

## Testing

The application uses Jest and React Testing Library for testing:

### Unit Tests

- Component rendering tests
- State management tests
- Utility function tests

### Integration Tests

- Form submission tests
- API integration tests
- Routing tests

## Build and Deployment

### Development

```bash
npm start
```

### Production Build

```bash
npm run build
```

### Deployment

The application can be deployed to static hosting services like Netlify, Vercel, or GitHub Pages.

## Browser Compatibility

The application is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React.lazy
- Image optimization
- Minification and compression
- Caching strategies

## Accessibility

The application follows WCAG 2.1 guidelines:

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Color contrast
- Screen reader compatibility 