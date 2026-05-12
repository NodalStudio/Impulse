import type { ImpulseEvent } from './types';

/**
 * Partitions events into upcoming (date >= today midnight UTC) and past.
 * upcoming sorted by date ASC, past sorted by date DESC.
 */
export function partitionEvents(
  events: ImpulseEvent[],
  now: Date,
): { upcoming: ImpulseEvent[]; past: ImpulseEvent[] } {
  const startOfToday = new Date(now);
  startOfToday.setUTCHours(0, 0, 0, 0);

  const upcoming: ImpulseEvent[] = [];
  const past: ImpulseEvent[] = [];

  for (const e of events) {
    const eventDate = new Date(e.date);
    if (eventDate.getTime() >= startOfToday.getTime()) {
      upcoming.push(e);
    } else {
      past.push(e);
    }
  }

  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
}
