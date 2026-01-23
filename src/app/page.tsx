import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Pillars from '@/components/Pillars';
import Audience from '@/components/Audience';
import HowItWorks from '@/components/HowItWorks';
import Calendar from '@/components/Calendar';
import Benefits from '@/components/Benefits';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <div className="snap-container">
        <Hero />
        <Mission />
        <Problem />
        <Solution />
        <Pillars />
        <Audience />
        <HowItWorks />
        <Calendar />
        <Benefits />
        <Team />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
}
