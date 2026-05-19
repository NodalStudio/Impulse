import { getAllEvents } from '@/lib/events';
import { getAllSectionsContent } from '@/lib/sections';
import HomeClient from './HomeClient';

export default function Home() {
  const events = getAllEvents();
  const content = getAllSectionsContent();
  return <HomeClient events={events} content={content} />;
}
