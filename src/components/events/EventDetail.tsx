import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import { formatEventDate } from '@/lib/format';
import EventGallery from './EventGallery';
import EventJsonLd from './EventJsonLd';

type Props = {
  event: ImpulseEvent;
  isPast: boolean;
  related?: ImpulseEvent[];
};

export default function EventDetail({ event, isPast, related = [] }: Props) {
  const monthLabel = new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const crumbCategory = isPast ? 'Souvenirs' : 'Événements';
  const hasGallery = (event.gallery?.length ?? 0) > 0;
  const hasContent = event.description || hasGallery || event.summary;
  const paragraphs = event.description?.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean) ?? [];

  return (
    <article className="min-h-screen bg-blush">
      <EventJsonLd event={event} isPast={isPast} />
      <header className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-blush">
        <svg className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" viewBox="0 0 600 600" fill="none" aria-hidden="true">
          <circle cx="300" cy="300" r="295" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.12" />
          <circle cx="300" cy="300" r="220" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.07" />
          <circle cx="300" cy="300" r="150" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.04" />
        </svg>
        <div className="relative max-w-5xl mx-auto p-8 md:p-14 grid gap-10 md:gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <a href="/#calendrier" className="inline-flex items-center font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold/80 hover:text-gold transition-colors">
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
              {event.guest?.name && (
                <span className="before:content-['—_'] before:text-gold/50 before:mr-1">Avec {event.guest.name}</span>
              )}
              {event.price && (
                <span className="before:content-['—_'] before:text-gold/50 before:mr-1">{event.price}</span>
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

          {event.coverPhoto && (
            <div className="relative aspect-[3/4] w-full max-w-[260px] md:max-w-none mx-auto md:mx-0 overflow-hidden shadow-2xl">
              <Image
                src={event.coverPhoto}
                alt={`Affiche ${event.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 260px, 320px"
                priority
              />
            </div>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-8">

        {paragraphs.length > 0 ? (
          <div className="py-10 md:py-14">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            <div className="space-y-5 font-tenor text-lg md:text-xl text-navy/85 leading-relaxed text-center">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
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

        {event.programme && event.programme.length > 0 && (
          <div className="mb-12 bg-white p-8 md:p-10 border-t border-gold/30">
            <div className="font-montserrat uppercase tracking-[0.3em] text-[10px] text-gold mb-6 text-center">
              Au programme
            </div>
            <ul className="space-y-3 max-w-md mx-auto">
              {event.programme.map((p, i) => (
                <li key={i} className="flex items-baseline gap-4 font-tenor text-base md:text-lg text-navy/85">
                  <span className="font-montserrat text-gold tracking-wider text-sm flex-none w-14">
                    {p.time}
                  </span>
                  <span>{p.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {event.guest && (event.guest.name || event.guest.photo || event.guest.bio) && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <p className="font-script text-gold text-2xl md:text-3xl leading-none">notre invitée d&apos;honneur</p>
            </div>
            {event.guest.photo && (
              <div className="relative aspect-[16/10] overflow-hidden shadow-xl mb-5">
                <Image src={event.guest.photo} alt={event.guest.name ?? 'Invitée'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
              </div>
            )}
            {event.guest.name && (
              <p className="text-center font-tenor text-xl md:text-2xl text-navy mb-1">{event.guest.name}</p>
            )}
            {event.guest.role && (
              <p className="text-center font-montserrat text-sm text-navy/60 mb-5">{event.guest.role}</p>
            )}
            {event.guest.bio && (
              <p className="font-tenor text-base md:text-lg text-navy/85 leading-relaxed text-center max-w-2xl mx-auto">
                {event.guest.bio}
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

        {!isPast && event.reservationUrl && (
          <div className="my-14 text-center">
            <a
              href={event.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-10 py-4 font-montserrat text-sm uppercase tracking-[0.25em] hover:bg-gold/90 transition-colors"
            >
              Réserver ma place →
            </a>
            <p className="mt-3 font-montserrat text-xs text-navy/45">Billetterie sécurisée Entradium</p>
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
      </div>

      {related.length > 0 && (
        <section className="bg-white py-16 md:py-20 mt-12">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center mb-5">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
              </div>
              <p className="font-script text-gold text-2xl md:text-3xl leading-none">les autres rendez-vous</p>
              <h2 className="font-tenor text-2xl md:text-3xl text-navy mt-1 tracking-[0.01em]">D&apos;autres soirées Impulse</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.slice(0, 3).map(e => (
                <a
                  key={e.slug}
                  href={`/evenements/${e.slug}`}
                  className="group bg-blush p-5 border-t border-gold/30 hover:border-gold transition-colors"
                >
                  <div className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold mb-1">
                    {formatEventDate(e.date)}
                  </div>
                  <h3 className="font-tenor text-lg text-navy leading-snug">{e.title}</h3>
                  {e.guest?.name && (
                    <p className="font-montserrat text-xs text-navy/55 mt-2">avec {e.guest.name}</p>
                  )}
                </a>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="/#calendrier" className="inline-block font-montserrat uppercase tracking-[0.3em] text-[11px] text-navy/60 hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1">
                Voir tous les événements
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="text-center py-10 bg-blush">
        <a href="/" className="inline-block font-montserrat uppercase tracking-[0.3em] text-[10px] text-navy/70 hover:text-gold transition-colors">
          ← Retour à l&apos;accueil
        </a>
      </div>
    </article>
  );
}
