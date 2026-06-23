import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import EventOrnament from './EventOrnament';
import { splitEventDate } from '@/lib/format';

type Props = { event: ImpulseEvent };

export default function SouvenirCard({ event }: Props) {
  const { day, month } = splitEventDate(event.date);
  const photoCount = event.gallery?.length ?? 0;

  return (
    <a
      href={`/evenements/${event.slug}`}
      className="flex-none w-64 md:w-72 bg-white overflow-hidden snap-start group transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden">
        {event.coverPhoto ? (
          <>
            <Image src={event.coverPhoto} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="288px" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/70" />
            {photoCount > 0 && (
              <div className="absolute top-3 right-3 bg-navy/70 backdrop-blur text-blush text-[10px] font-montserrat uppercase tracking-[0.15em] px-2.5 py-1">
                {photoCount} photos
              </div>
            )}
            <div className="absolute bottom-3 left-3 font-montserrat uppercase tracking-[0.25em] text-[10px] text-blush">
              {day} {month} {event.date.slice(0, 4)}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark">
            <EventOrnament variant="cover" day={day} month={month} />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="font-script text-gold-deep text-lg leading-none mb-1">retour sur</div>
        <h4 className="font-tenor text-lg text-navy leading-snug tracking-[0.01em]">
          {event.title}
        </h4>
        {event.summary ? (
          <p className="font-montserrat text-xs text-navy/70 mt-2 leading-relaxed line-clamp-2">
            {event.summary}
          </p>
        ) : (
          <div className="flex items-center gap-2 mt-3">
            <span className="w-4 h-px bg-gold/40" />
            <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-navy/70">Édition Impulse</span>
          </div>
        )}
      </div>
    </a>
  );
}
