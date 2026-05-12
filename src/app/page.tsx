import { getAllEvents } from '@/lib/events';
import HomeClient from './HomeClient';

export default function Home() {
  const events = getAllEvents();
  return <HomeClient events={events} />;
}
