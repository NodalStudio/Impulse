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
      className="block relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-blush shadow-2xl group"
    >
      {/* Concentric gold rings — echo of Hero section */}
      <svg
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        viewBox="0 0 500 500" fill="none" aria-hidden="true"
      >
        <circle cx="250" cy="250" r="245" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.15" />
        <circle cx="250" cy="250" r="180" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.08" />
        <circle cx="250" cy="250" r="120" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.04" />
      </svg>

      <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-8 p-8 md:p-12 items-center">
        <div>
          <span className="inline-block font-montserrat uppercase tracking-[0.3em] text-[10px] text-gold/80 border border-gold/40 px-4 py-1.5 mb-5">
            Prochain événement
          </span>
          {event.tagline && (
            <p className="font-script text-gold text-2xl md:text-3xl leading-none mb-2">{event.tagline}</p>
          )}
          <h3 className="font-tenor text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 tracking-[0.01em]">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-blush/70 mb-5 font-montserrat">
            <span>
              {formatEventDate(event.date)}
              {event.time ? ` · ${event.time}` : ''}
            </span>
            <span className="before:content-['—_'] before:text-gold/50 before:mr-1">{event.location}</span>
            {event.price && (
              <span className="before:content-['—_'] before:text-gold/50 before:mr-1">{event.price}</span>
            )}
          </div>
          {event.description && (
            <p className="font-montserrat text-sm md:text-base text-blush/60 leading-relaxed mb-6 max-w-prose line-clamp-3">
              {event.description}
            </p>
          )}
          <span className="inline-block bg-gold text-white px-7 py-3 font-montserrat text-xs uppercase tracking-[0.2em] transition-all group-hover:bg-gold/90">
            {event.reservationUrl ? 'Réserver ma place →' : 'En savoir plus →'}
          </span>
        </div>

        <div className="relative">
          {event.guest?.photo ? (
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
              <Image src={event.guest.photo} alt={event.guest.name ?? 'Invitée'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ) : (
            <EventOrnament variant="hero" />
          )}
        </div>
      </div>
    </a>
  );
}
