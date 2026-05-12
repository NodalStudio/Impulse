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
      className="flex-none w-60 bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform snap-start"
    >
      <div className="relative h-36 overflow-hidden">
        {event.coverPhoto ? (
          <>
            <Image
              src={event.coverPhoto}
              alt={event.title}
              fill
              className="object-cover"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
            {photoCount > 0 && (
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur text-white text-[10px] px-2 py-1 rounded-full">
                📷 {photoCount} photos
              </div>
            )}
            <div className="absolute bottom-2.5 left-2.5 font-montserrat uppercase tracking-[0.25em] text-[9.5px] text-white">
              {day} {month} {event.date.slice(0, 4)}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark">
            <EventOrnament variant="cover" day={day} month={month} />
          </div>
        )}
      </div>

      <div className="p-3.5">
        <div className="font-greatvibes text-gold text-base leading-none">retour sur</div>
        <h4 className="font-cormorant font-semibold text-[15px] text-navy leading-tight mt-0.5">
          {event.title}
        </h4>
        {event.summary ? (
          <p className="text-[11.5px] text-navy/65 mt-1.5 leading-relaxed line-clamp-2">
            {event.summary}
          </p>
        ) : (
          <p className="text-[11.5px] italic text-navy/50 mt-1.5 flex items-center gap-1.5 before:content-[''] before:inline-block before:w-4 before:h-px before:bg-gold">
            Une édition Impulse Night
          </p>
        )}
      </div>
    </a>
  );
}
