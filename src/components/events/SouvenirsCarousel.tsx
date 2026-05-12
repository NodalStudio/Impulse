import type { ImpulseEvent } from '@/lib/types';
import SouvenirCard from './SouvenirCard';

type Props = { events: ImpulseEvent[] };

export default function SouvenirsCarousel({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <div className="mt-8 bg-gradient-to-b from-white to-rose/60 rounded-2xl p-5 md:p-6">
      <div className="text-center mb-5">
        <p className="font-greatvibes text-gold text-2xl leading-none">les éditions passées</p>
        <h3 className="font-cormorant font-semibold text-2xl text-navy">Souvenirs</h3>
        <p className="text-sm text-navy/70 mt-1">Revivez les soirées qui ont marqué la communauté.</p>
      </div>

      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-2 px-2">
        {events.map(event => (
          <SouvenirCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
