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
  };

  if (event.coverPhoto) {
    data.image = `${BASE_URL}${event.coverPhoto}`;
  }

  if (event.reservationUrl && !isPast) {
    data.offers = {
      '@type': 'Offer',
      url: event.reservationUrl,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      price: '37',
      validFrom: new Date().toISOString(),
    };
  }

  if (event.guest?.name) {
    data.performer = {
      '@type': 'Person',
      name: event.guest.name,
      ...(event.guest.role ? { jobTitle: event.guest.role } : {}),
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
