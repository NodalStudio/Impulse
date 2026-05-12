import type { ImpulseEvent } from '@/lib/types';
import { formatEventDate } from '@/lib/format';

type Props = { events: ImpulseEvent[] };

export default function UpcomingStrip({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between border-b border-navy/10 pb-2 mb-4">
        <h4 className="font-cormorant text-lg font-semibold text-navy">Et après…</h4>
        <span className="font-montserrat uppercase tracking-[0.2em] text-[9px] text-gold">
          Mis à jour automatiquement
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {events.slice(0, 3).map(event => (
          <a
            key={event.slug}
            href={`/evenements/${event.slug}`}
            className="bg-gradient-to-b from-cream to-rose/40 rounded-xl p-4 border-l-2 border-transparent hover:border-gold transition-all min-h-[120px] flex flex-col justify-between"
          >
            <div>
              <div className="font-montserrat uppercase tracking-[0.2em] text-[10px] text-gold">
                {formatEventDate(event.date)}
              </div>
              {event.tagline && (
                <div className="font-greatvibes text-gold text-lg leading-none mt-0.5">
                  {event.tagline}
                </div>
              )}
              <h5 className="font-cormorant font-semibold text-base text-navy leading-tight mt-0.5">
                {event.title}
              </h5>
            </div>
            <div className={event.location ? 'text-xs text-navy/65 mt-2' : 'text-xs italic text-navy/40 mt-2'}>
              {event.location || 'Lieu à confirmer'}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
