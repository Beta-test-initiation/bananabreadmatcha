// src/utils/optimizedRecipientScheduler.ts

export type Location = { lat: number; lng: number };

export type DropoffSlot = "Morning" | "Afternoon" | "Evening" | "Night";

export interface Recipient {
  name: string;
  location: Location;
  dropoffTime: DropoffSlot;
}

export interface ScheduledRecipient extends Recipient {
  order: number;
  scheduledDropoff: string; // computed exact time (HH:MM format)
}

// Map each slot to a representative time (in minutes since midnight)
const dropoffSlotMapping: Record<DropoffSlot, number> = {
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
 * Generates an optimized schedule for recipient dropoffs.
 * @param recipients Array of recipients with dropoff slots.
 * @returns Ordered schedule with computed dropoff times.
 */
export function getOptimizedDropoffSchedule(
  recipients: Recipient[]
): { schedule: ScheduledRecipient[] } {
  if (recipients.length === 0) return { schedule: [] };

  // Create a shallow copy of recipients
  const unscheduled: Recipient[] = [...recipients];

  // Sort recipients based on the representative time for their dropoff slot
  unscheduled.sort(
    (a, b) => dropoffSlotMapping[a.dropoffTime] - dropoffSlotMapping[b.dropoffTime]
  );

  // Start with the recipient who has the earliest dropoff slot
  const startRecipient = unscheduled.shift()!;
  let currentTime = dropoffSlotMapping[startRecipient.dropoffTime];
  let currentLocation = startRecipient.location;

  const schedule: ScheduledRecipient[] = [
    {
      order: 1,
      ...startRecipient,
      scheduledDropoff: minutesToTimeString(currentTime),
    },
  ];

  const speed = 50; // km/h assumed constant driving speed
  let order = 2;

  while (unscheduled.length > 0) {
    let bestCandidateIndex = 0;
    let bestCost = Infinity;
    let candidateArrivalTime = 0;

    unscheduled.forEach((recipient, index) => {
      const travelDistance = haversineDistance(currentLocation, recipient.location);
      const travelTime = (travelDistance / speed) * 60; // in minutes
      const arrivalTime = currentTime + travelTime;
      const recipientPreferredTime = dropoffSlotMapping[recipient.dropoffTime];

      // Waiting time if arriving earlier than the recipient's preferred slot
      const waitingTime = arrivalTime < recipientPreferredTime
        ? recipientPreferredTime - arrivalTime
        : 0;

      const cost = travelTime + waitingTime;

      if (cost < bestCost) {
        bestCost = cost;
        bestCandidateIndex = index;
        candidateArrivalTime = Math.max(arrivalTime, recipientPreferredTime);
      }
    });

    const nextRecipient = unscheduled.splice(bestCandidateIndex, 1)[0];
    schedule.push({
      order: order++,
      ...nextRecipient,
      scheduledDropoff: minutesToTimeString(Math.round(candidateArrivalTime)),
    });
    currentLocation = nextRecipient.location;
    currentTime = candidateArrivalTime;
  }

  return { schedule };
}
