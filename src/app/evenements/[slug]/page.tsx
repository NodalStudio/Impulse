import { notFound } from 'next/navigation';
import { getAllEvents, getEventBySlug } from '@/lib/events';
import { partitionEvents } from '@/lib/partition';
import EventDetail from '@/components/events/EventDetail';

export const dynamicParams = false;

export function generateStaticParams() {
  const events = getAllEvents();
  return events.map(event => ({ slug: event.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const allEvents = getAllEvents();
  const { past } = partitionEvents([event], new Date());
  const isPast = past.length > 0;

  // Internal linking: surface up to 3 other events.
  // Prefer upcoming first, then most recent past, to give visitors something
  // actionable to click next. Excludes the current event.
  const { upcoming: otherUpcoming, past: otherPast } = partitionEvents(
    allEvents.filter(e => e.slug !== event.slug),
    new Date(),
  );
  const related = [...otherUpcoming, ...otherPast].slice(0, 3);

  return <EventDetail event={event} isPast={isPast} related={related} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  const baseUrl = 'https://communaute-impulse.com';
  const url = `${baseUrl}/evenements/${event.slug}`;
  const description =
    event.description?.split(/\n\s*\n/)[0]?.trim() ??
    `Événement Impulse à ${event.location}`;
  return {
    title: `${event.title} — Impulse`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${event.title} — Impulse`,
      description,
      url,
      type: 'article',
      images: event.coverPhoto
        ? [{ url: `${baseUrl}${event.coverPhoto}`, alt: `${event.title} — événement Impulse à ${event.location}` }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} — Impulse`,
      description,
      images: event.coverPhoto ? [`${baseUrl}${event.coverPhoto}`] : undefined,
    },
  };
}
