import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import EventOrnament from './EventOrnament';
import { formatEventDate } from '@/lib/format';

type Props = { event: ImpulseEvent | null };

export default function EventHero({ event }: Props) {
  if (!event) return null;

  return (
    <a
      href={`/evenements/${event.slug}`}
      className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-dark text-white shadow-xl group"
    >
      <div
        className="pointer-events-none absolute -right-12 -bottom-12 w-56 h-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.22), transparent 70%)' }}
      />

      <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-6 p-6 md:p-8 items-center">
        <div>
          <span className="inline-block font-montserrat uppercase tracking-[0.3em] text-[10px] text-gold border border-gold/50 rounded-full px-3 py-1 mb-3">
            Prochain événement
          </span>
          {event.tagline && (
            <p className="font-greatvibes text-gold text-2xl leading-none mb-1">{event.tagline}</p>
          )}
          <h3 className="font-cormorant text-2xl md:text-3xl font-semibold leading-tight mb-3">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-3 text-xs opacity-85 mb-3">
            <span>
              {formatEventDate(event.date)}
              {event.time ? ` · ${event.time}` : ''}
            </span>
            <span className="before:content-['•_'] before:text-gold">{event.location}</span>
            {event.price && (
              <span className="before:content-['•_'] before:text-gold">{event.price}</span>
            )}
          </div>
          {event.description && (
            <p className="text-sm opacity-85 leading-relaxed mb-4 line-clamp-3">
              {event.description}
            </p>
          )}
          <span className="inline-block bg-gold text-white px-5 py-2 rounded-md font-source text-xs uppercase tracking-widest">
            {event.reservationUrl ? 'Réserver ma place →' : 'En savoir plus →'}
          </span>
        </div>

        <div className="relative">
          {event.guest?.photo ? (
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={event.guest.photo}
                alt={event.guest.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ) : (
            <EventOrnament variant="hero" />
          )}
        </div>
      </div>
    </a>
  );
}
