import type { ImpulseEvent } from '@/lib/types';

/**
 * Schema.org Event + BreadcrumbList JSON-LD for an event detail page.
 *
 * Safe to use with dangerouslySetInnerHTML: the payload is built from a typed
 * ImpulseEvent that comes only from build-time content/events/*.md files (not
 * user input). JSON.stringify produces valid JSON for a <script type="application/ld+json">
 * context. Mirrors the pattern used in src/app/layout.tsx for the 5 global schemas.
 */

const BASE_URL = 'https://communaute-impulse.com';

/**
 * Build a schema.org offer from the free-text `price` field.
 *
 * Event prices are authored as human strings ("Solo 37€ · Duo 70€"), so we pull
 * out the numeric amounts and map them to the right offer shape:
 *  - 2+ tiers  → AggregateOffer with lowPrice/highPrice (matches the visible,
 *    tiered pricing so structured data doesn't contradict the page — a Trust /
 *    Search Console requirement)
 *  - 1 price   → a plain Offer with that price
 *  - no number → an Offer with availability/url only (never invent a price)
 */
function buildOffer(event: ImpulseEvent): Record<string, unknown> {
  const base = {
    url: event.reservationUrl,
    availability: 'https://schema.org/InStock',
    priceCurrency: 'EUR',
  };
  const amounts = (event.price?.match(/\d+(?:[.,]\d+)?/g) ?? [])
    .map(n => parseFloat(n.replace(',', '.')))
    .filter(n => Number.isFinite(n));

  if (amounts.length >= 2) {
    return {
      '@type': 'AggregateOffer',
      ...base,
      lowPrice: String(Math.min(...amounts)),
      highPrice: String(Math.max(...amounts)),
      offerCount: amounts.length,
    };
  }
  if (amounts.length === 1) {
    return { '@type': 'Offer', ...base, price: String(amounts[0]) };
  }
  return { '@type': 'Offer', ...base };
}

function buildEventLd(event: ImpulseEvent, isPast: boolean): string {
  const startDate = event.time
    ? `${event.date}T${event.time.replace('h', ':').padEnd(5, '0')}:00+02:00`
    : event.date;

  const firstParagraph =
    event.description?.split(/\n\s*\n/)[0]?.trim() ??
    `Événement Impulse à ${event.location}`;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location.split(',')[0]?.trim() ?? event.location,
      address: event.location,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Impulse',
      url: BASE_URL,
    },
    description: firstParagraph,
    inLanguage: 'fr-FR',
  };

  if (event.coverPhoto) {
    data.image = `${BASE_URL}${event.coverPhoto}`;
  }

  if (event.reservationUrl && !isPast) {
    data.offers = buildOffer(event);
  }

  if (event.guest?.name) {
    data.performer = {
      '@type': 'Person',
      name: event.guest.name,
      ...(event.guest.role ? { jobTitle: event.guest.role } : {}),
      ...(event.guest.bio ? { description: event.guest.bio } : {}),
    };
  }

  return JSON.stringify(data);
}

function buildBreadcrumbLd(event: ImpulseEvent): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calendrier',
        item: `${BASE_URL}/#calendrier`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: event.title,
        item: `${BASE_URL}/evenements/${event.slug}`,
      },
    ],
  };
  return JSON.stringify(data);
}

type Props = { event: ImpulseEvent; isPast: boolean };

export default function EventJsonLd({ event, isPast }: Props) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Build-time typed data, see file header
        dangerouslySetInnerHTML={{ __html: buildEventLd(event, isPast) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Build-time typed data, see file header
        dangerouslySetInnerHTML={{ __html: buildBreadcrumbLd(event) }}
      />
    </>
  );
}
