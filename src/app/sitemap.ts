import type { MetadataRoute } from 'next';
import { getAllEvents } from '@/lib/events';

const BASE_URL = 'https://communaute-impulse.com';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const events = getAllEvents();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...events.map(event => ({
      url: `${BASE_URL}/evenements/${event.slug}`,
      lastModified: new Date(event.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
