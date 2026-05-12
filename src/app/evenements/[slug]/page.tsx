import { notFound } from 'next/navigation';
import { getAllEvents, getEventBySlug } from '@/lib/events';
import { partitionEvents } from '@/lib/partition';
import EventDetail from '@/components/events/EventDetail';
import Header from '@/components/Header';
import { getSettings, getHeaderContent } from '@/lib/content';

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

  const { past } = partitionEvents([event], new Date());
  const isPast = past.length > 0;

  const settings = getSettings();
  const headerContent = getHeaderContent();

  return (
    <>
      <Header content={headerContent} settings={settings} />
      <EventDetail event={event} isPast={isPast} />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} — Impulse`,
    description: event.description ?? `Événement Impulse — ${event.location}`,
  };
}
