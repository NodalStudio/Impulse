import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import { formatEventDate } from '@/lib/format';
import EventGallery from './EventGallery';

type Props = { event: ImpulseEvent; isPast: boolean };

export default function EventDetail({ event, isPast }: Props) {
  const monthLabel = new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const crumbCategory = isPast ? 'Souvenirs' : 'Événements';
  const hasGallery = (event.gallery?.length ?? 0) > 0;
  const hasContent = event.description || hasGallery || event.summary;

  return (
    <article className="min-h-screen bg-blush">
      <header className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-blush p-8 md:p-14">
        <svg className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" viewBox="0 0 600 600" fill="none" aria-hidden="true">
          <circle cx="300" cy="300" r="295" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.12" />
          <circle cx="300" cy="300" r="220" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.07" />
          <circle cx="300" cy="300" r="150" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.04" />
        </svg>
        <div className="relative max-w-3xl mx-auto">
          <a href="/" className="inline-flex items-center font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold/80 hover:text-gold transition-colors">
            ← {crumbCategory} / {monthLabel}
          </a>
          {isPast && (
            <div className="mt-4">
              <span className="inline-block border border-blush/20 text-blush/70 font-montserrat uppercase tracking-[0.25em] text-[9px] px-3 py-1.5">
                Événement passé
              </span>
            </div>
          )}
          {event.tagline && (
            <p className="font-script text-gold text-3xl md:text-4xl leading-none mt-5">{event.tagline}</p>
          )}
          <h1 className="font-tenor text-3xl md:text-4xl lg:text-5xl leading-tight mt-2 tracking-[0.01em]">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-blush/70 font-montserrat mt-5">
            <span>{formatEventDate(event.date)}{event.time ? ` · ${event.time}` : ''}</span>
            <span className="before:content-['—_'] before:text-gold/50 before:mr-1">{event.location}</span>
            {event.guest && (
              <span className="before:content-['—_'] before:text-gold/50 before:mr-1">Avec {event.guest.name}</span>
            )}
          </div>
          {!isPast && event.reservationUrl && (
            <a
              href={event.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-7 py-3 font-montserrat text-xs uppercase tracking-[0.2em] mt-7 hover:bg-gold/90 transition-colors"
            >
              Réserver ma place →
            </a>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {event.description ? (
          <div className="py-10 md:py-14">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            <p className="font-tenor text-lg md:text-xl text-navy/85 leading-relaxed text-center">
              {event.description}
            </p>
          </div>
        ) : (
          <div className="py-12 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-2 h-2 rotate-45 bg-gold/40" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </div>
        )}

        {event.guest?.photo && (
          <div className="mb-10">
            <div className="relative aspect-[16/10] overflow-hidden shadow-xl">
              <Image src={event.guest.photo} alt={event.guest.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
            {event.guest.role && (
              <p className="text-center font-montserrat text-sm text-navy/60 mt-3">
                <span className="font-tenor text-base text-navy">{event.guest.name}</span> — {event.guest.role}
              </p>
            )}
          </div>
        )}

        <EventGallery photos={event.gallery ?? []} title={event.title} />

        {event.summary && (
          <div className="my-12 bg-white p-8 md:p-10 border-t border-gold/30">
            <div className="font-montserrat uppercase tracking-[0.3em] text-[10px] text-gold mb-4">
              Résumé de la soirée
            </div>
            <p className="font-tenor text-base md:text-lg text-navy/85 leading-relaxed">
              {event.summary}
            </p>
          </div>
        )}

        {isPast && !hasContent && (
          <div className="text-center py-16 my-10 bg-white">
            <p className="font-script text-gold text-3xl md:text-4xl leading-none">à très vite</p>
            <h2 className="font-tenor text-xl md:text-2xl text-navy mt-3 tracking-[0.01em]">
              Une nouvelle édition chaque mois
            </h2>
            <p className="font-montserrat text-sm text-navy/60 mt-4 max-w-md mx-auto">
              Les souvenirs photos arrivent bientôt. En attendant, retrouvez-nous pour la prochaine soirée.
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-6" />
          </div>
        )}

        <div className="text-center py-12">
          <a href="/" className="inline-block font-montserrat uppercase tracking-[0.3em] text-[10px] text-navy/50 hover:text-gold transition-colors">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </article>
  );
}
