// src/utils/optimizedScheduler.ts

export type Location = { lat: number; lng: number };

export type PickupSlot = "Morning" | "Afternoon" | "Evening" | "Night";

export interface Donor {
  name: string;
  location: Location;
  pickupTime: PickupSlot;
}

export interface ScheduledDonor extends Donor {
  order: number;
  scheduledPickup: string; // computed exact time (HH:MM format)
}

// Map each slot to a representative time (in minutes since midnight)
const pickupSlotMapping: Record<PickupSlot, number> = {
  Morning: 540,   // 09:00 AM
  Afternoon: 780, // 01:00 PM
  Evening: 1080,  // 06:00 PM
  Night: 1320,    // 10:00 PM
};

function minutesToTimeString(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

// Haversine distance (in kilometers) between two geo-coordinates
function haversineDistance(loc1: Location, loc2: Location): number {
  const R = 6371; // km
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Generates an optimized schedule for donor pickups.
 * @param donors Array of donors with pickup slots.
 * @returns Ordered schedule with computed pickup times.
 */
export function getOptimizedSchedule(
  donors: Donor[]
): { schedule: ScheduledDonor[] } {
  if (donors.length === 0) return { schedule: [] };

  // Create a shallow copy of donors
  const unscheduled: Donor[] = [...donors];

  // Sort donors based on the representative time for their pickup slot
  unscheduled.sort(
    (a, b) =>
      pickupSlotMapping[a.pickupTime] - pickupSlotMapping[b.pickupTime]
  );

  // Start with the donor who has the earliest pickup slot
  const startDonor = unscheduled.shift()!;
  let currentTime = pickupSlotMapping[startDonor.pickupTime];
  let currentLocation = startDonor.location;

  const schedule: ScheduledDonor[] = [
    {
      order: 1,
      ...startDonor,
      scheduledPickup: minutesToTimeString(currentTime),
    },
  ];

  const speed = 50; // km/h assumed constant driving speed
  let order = 2;

  while (unscheduled.length > 0) {
    let bestCandidateIndex = 0;
    let bestCost = Infinity;
    let candidateArrivalTime = 0;

    unscheduled.forEach((donor, index) => {
      const travelDistance = haversineDistance(currentLocation, donor.location);
      const travelTime = (travelDistance / speed) * 60; // in minutes
      const arrivalTime = currentTime + travelTime;
      const donorPreferredTime = pickupSlotMapping[donor.pickupTime];

      // Waiting time if arriving earlier than the donor's preferred slot
      const waitingTime = arrivalTime < donorPreferredTime
        ? donorPreferredTime - arrivalTime
        : 0;

      const cost = travelTime + waitingTime;

      if (cost < bestCost) {
        bestCost = cost;
        bestCandidateIndex = index;
        candidateArrivalTime = Math.max(arrivalTime, donorPreferredTime);
      }
    });

    const nextDonor = unscheduled.splice(bestCandidateIndex, 1)[0];
    schedule.push({
      order: order++,
      ...nextDonor,
      scheduledPickup: minutesToTimeString(Math.round(candidateArrivalTime)),
    });
    currentLocation = nextDonor.location;
    currentTime = candidateArrivalTime;
  }

  return { schedule };
}
