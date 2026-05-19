import Image from "next/image";
import type { TeamContent } from '@/lib/sections';

export default function Team({ content }: { content: TeamContent }) {
  const founders = content.founders;

  return (
    <section id="equipe" className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 lg:mb-14 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
            {content.eyebrow}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-8">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Circular photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-white shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gold">
                      <Image
                        src={founder.image}
                        alt={founder.alt}
                        width={80}
                        height={100}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-script text-lg text-navy mb-1">
                    {founder.name}
                  </p>
                  <p className="font-montserrat uppercase tracking-wider text-[10px] text-gold font-medium mb-2">
                    {founder.role}
                  </p>
                  <p className="font-montserrat text-xs text-navy/60 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clip path for desktop photos */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <clipPath id="photo-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 L 1 0 L 1 0.56 A 0.5 0.44 0 0 1 0 0.56 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="group animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Photo */}
              <div className="relative mx-auto mb-6 w-28 h-28 xl:w-40 xl:h-40 transition-all duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,162,39,0.25)]">
                <div className="absolute -inset-[10px] rounded-full border border-navy/[0.08]" />
                <div className="absolute inset-0 rounded-full bg-white shadow-md" />
                <div className="absolute inset-[4px] rounded-full bg-gold" />
                <div className="absolute left-[4px] right-[4px] bottom-[4px] photo-clip-container">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-top object-cover grayscale-[15%]"
                  />
                </div>
              </div>

              <p className="font-script text-3xl xl:text-4xl text-navy mb-6">
                {founder.name}
              </p>

              <p className="font-montserrat uppercase tracking-wider text-[10px] xl:text-xs text-gold font-medium mb-4">
                {founder.role}
              </p>

              <p className="font-montserrat text-sm text-navy/60 leading-relaxed px-2">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
