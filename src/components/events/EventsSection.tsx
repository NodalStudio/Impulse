'use client';

import { useEffect, useState } from 'react';
import type { ImpulseEvent } from '@/lib/types';
import { partitionEvents } from '@/lib/partition';
import EventHero from './EventHero';
import UpcomingStrip from './UpcomingStrip';
import SouvenirsCarousel from './SouvenirsCarousel';

type Props = { events: ImpulseEvent[] };

export default function EventsSection({ events }: Props) {
  // Initial partition uses build-time date (server-side render).
  // Re-partition on client mount using real "now" — handles the case where
  // an event has crossed midnight since the last build.
  const [{ upcoming, past }, setPartition] = useState(() => partitionEvents(events, new Date()));

  useEffect(() => {
    setPartition(partitionEvents(events, new Date()));
  }, [events]);

  if (upcoming.length === 0 && past.length === 0) return null;

  const next = upcoming[0] ?? null;
  const afterNext = upcoming.slice(1, 4);

  return (
    <section id="evenements" className="snap-section section bg-white">
      <div className="container-impulse px-4 h-full flex flex-col justify-center py-12">
        <div className="text-center mb-8">
          <p className="font-montserrat uppercase tracking-[0.3em] text-[11px] text-navy/70">
            Les rendez-vous Impulse
          </p>
          <p className="font-greatvibes text-gold text-3xl leading-none mt-1">une fois par mois</p>
          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-navy">Événements</h2>
          <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mx-auto mt-2" />
        </div>

        <EventHero event={next} />
        <UpcomingStrip events={afterNext} />
        <SouvenirsCarousel events={past} />
      </div>
    </section>
  );
}
