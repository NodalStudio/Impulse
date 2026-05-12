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
    <article className="min-h-screen bg-white">
      <header className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-white p-6 md:p-10">
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.18), transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <a href="/" className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold/85 hover:text-gold">
            ← {crumbCategory} / {monthLabel}
          </a>
          {isPast && (
            <div className="mt-3">
              <span className="inline-block bg-white/10 border border-white/20 text-white font-montserrat uppercase tracking-[0.25em] text-[9px] px-3 py-1 rounded-full">
                Événement passé
              </span>
            </div>
          )}
          {event.tagline && (
            <p className="font-greatvibes text-gold text-2xl leading-none mt-3">{event.tagline}</p>
          )}
          <h1 className="font-cormorant text-3xl md:text-4xl font-semibold leading-tight mt-1">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs opacity-85 mt-3">
            <span>{formatEventDate(event.date)}{event.time ? ` · ${event.time}` : ''}</span>
            <span className="before:content-['•_'] before:text-gold">{event.location}</span>
            {event.guest && (
              <span className="before:content-['•_'] before:text-gold">Avec {event.guest.name}</span>
            )}
          </div>
          {!isPast && event.reservationUrl && (
            <a
              href={event.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-6 py-2.5 rounded-md font-source text-xs uppercase tracking-widest mt-5"
            >
              Réserver ma place →
            </a>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto">
        {event.description ? (
          <p className="font-cormorant italic text-base md:text-lg text-navy/85 leading-relaxed border-l-2 border-gold pl-4 m-6 md:m-8">
            {event.description}
          </p>
        ) : (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 text-navy/40">
              <span className="w-8 h-px bg-gold/50" />
              <em className="font-greatvibes text-gold text-xl not-italic opacity-70">I</em>
              <span className="w-8 h-px bg-gold/50" />
            </div>
          </div>
        )}

        {event.guest?.photo && (
          <div className="px-6 md:px-8 mb-6">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
              <Image src={event.guest.photo} alt={event.guest.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
            {event.guest.role && (
              <p className="text-center text-sm text-navy/65 mt-2">
                <span className="font-cormorant font-semibold">{event.guest.name}</span> — {event.guest.role}
              </p>
            )}
          </div>
        )}

        <EventGallery photos={event.gallery ?? []} title={event.title} />

        {event.summary && (
          <div className="mx-6 md:mx-8 mb-8 bg-gradient-to-br from-cream to-rose p-5 rounded-xl border-l-4 border-gold">
            <div className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold mb-2">
              Résumé de la soirée
            </div>
            <p className="font-cormorant italic text-base text-navy/85 leading-relaxed">
              {event.summary}
            </p>
          </div>
        )}

        {isPast && !hasContent && (
          <div className="text-center py-10 px-6 bg-gradient-to-b from-white to-rose">
            <p className="font-greatvibes text-gold text-2xl leading-none">à très vite</p>
            <h2 className="font-cormorant font-semibold text-xl text-navy mt-1">
              Une nouvelle édition chaque mois
            </h2>
            <p className="text-sm text-navy/70 mt-2 max-w-md mx-auto">
              Les souvenirs photos arrivent bientôt. En attendant, retrouvez-nous pour la prochaine soirée.
            </p>
            <div className="w-10 h-px bg-gold mx-auto mt-4" />
          </div>
        )}

        <div className="text-center py-8">
          <a href="/" className="inline-block font-montserrat uppercase tracking-[0.25em] text-[11px] text-navy/70 hover:text-gold">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </article>
  );
}
