import type { ImpulseEvent } from '@/lib/types';
import SouvenirCard from './SouvenirCard';

type Props = { events: ImpulseEvent[] };

export default function SouvenirsCarousel({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <div className="mt-20 md:mt-28">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
        <p className="font-script text-gold-deep text-2xl md:text-3xl leading-none mb-1">les éditions passées</p>
        <h3 className="font-tenor text-2xl md:text-3xl text-navy tracking-[0.01em]">Souvenirs</h3>
        <p className="font-montserrat text-sm text-navy/70 mt-3 max-w-md mx-auto">Revivez les soirées qui ont marqué la communauté.</p>
      </div>

      <div className="souvenirs-scroll flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 md:-mx-8 md:px-8">
        {events.map(event => (
          <SouvenirCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
