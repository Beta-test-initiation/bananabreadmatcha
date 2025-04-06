// src/utils/mockDonors.ts
import { Donor } from "./scheduler";

export const mockDonors: Donor[] = [
  {
    name: "Downtown Deli",
    location: { lat: 49.2820, lng: -123.1171 },
    pickupTime: "Morning",
  },
  {
    name: "Uptown Market",
    location: { lat: 49.3000, lng: -123.1300 },
    pickupTime: "Morning",
  },
  {
    name: "Westside Cafe",
    location: { lat: 49.2750, lng: -123.1500 },
    pickupTime: "Afternoon",
  },
  {
    name: "Eastside Eatery",
    location: { lat: 49.2800, lng: -123.1000 },
    pickupTime: "Afternoon",
  },
  {
    name: "Northside Grocer",
    location: { lat: 49.3100, lng: -123.1100 },
    pickupTime: "Evening",
  },
  {
    name: "Southside Fruits",
    location: { lat: 49.2600, lng: -123.1400 },
    pickupTime: "Evening",
  },
  {
    name: "Harbor Seafood",
    location: { lat: 49.2700, lng: -123.0900 },
    pickupTime: "Night",
  },
  {
    name: "Suburban Supply",
    location: { lat: 49.2900, lng: -123.1600 },
    pickupTime: "Night",
  },
];
