import type { ImpulseEvent } from '@/lib/types';
import { formatEventDate } from '@/lib/format';

type Props = { events: ImpulseEvent[] };

export default function UpcomingStrip({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
        <h4 className="font-montserrat uppercase tracking-[0.3em] text-[11px] text-gold/70 mx-5">Et après…</h4>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {events.slice(0, 3).map(event => (
          <a
            key={event.slug}
            href={`/evenements/${event.slug}`}
            className="group bg-white p-6 border-t border-gold/30 transition-all hover:border-gold hover:-translate-y-1 hover:shadow-lg min-h-[160px] flex flex-col justify-between basis-full sm:basis-[calc(50%-12px)] md:basis-[calc(33.333%-16px)] sm:max-w-md"
          >
            <div>
              <div className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold mb-2">
                {formatEventDate(event.date)}
              </div>
              {event.tagline && (
                <div className="font-script text-gold text-xl leading-none mb-1">
                  {event.tagline}
                </div>
              )}
              <h5 className="font-tenor text-lg md:text-xl text-navy leading-snug tracking-[0.01em]">
                {event.title}
              </h5>
            </div>
            <div className={event.location ? 'font-montserrat text-xs text-navy/55 mt-3' : 'font-montserrat text-xs italic text-navy/35 mt-3'}>
              {event.location || 'Lieu à confirmer'}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
