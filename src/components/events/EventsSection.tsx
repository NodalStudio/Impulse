'use client';

import { useEffect, useState } from 'react';
import type { ImpulseEvent } from '@/lib/types';
import { partitionEvents } from '@/lib/partition';
import EventHero from './EventHero';
import UpcomingStrip from './UpcomingStrip';
import SouvenirsCarousel from './SouvenirsCarousel';

type Props = { events: ImpulseEvent[] };

export default function EventsSection({ events }: Props) {
  const [{ upcoming, past }, setPartition] = useState(() => partitionEvents(events, new Date()));

  useEffect(() => {
    setPartition(partitionEvents(events, new Date()));
  }, [events]);

  if (upcoming.length === 0 && past.length === 0) return null;

  const next = upcoming[0] ?? null;
  const afterNext = upcoming.slice(1, 4);

  return (
    <section id="calendrier" className="py-20 md:py-28 bg-blush">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <p className="font-montserrat uppercase tracking-[0.3em] text-[11px] text-gold/70 mb-3">
            Les rendez-vous Impulse
          </p>
          <h2 className="font-tenor text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
            Événements
          </h2>
          <p className="font-script text-2xl md:text-3xl text-gold mt-2">une fois par mois</p>
        </div>

        <EventHero event={next} />
        <UpcomingStrip events={afterNext} />
        <SouvenirsCarousel events={past} />
      </div>
    </section>
  );
}
