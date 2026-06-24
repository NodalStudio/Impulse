import Image from 'next/image';
import type { PartnersContent, PartnerItem } from '@/lib/sections';

function LogoCell({ partner }: { partner: PartnerItem }) {
  const inner = (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={240}
      height={120}
      className="max-h-24 md:max-h-36 w-auto max-w-[94%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );

  const cellClass =
    'group relative flex items-center justify-center bg-white min-h-[150px] md:min-h-[190px] px-3 py-3 transition-colors duration-300';

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} — ouvrir le site`}
        className={`${cellClass} hover:bg-blush/50`}
      >
        {inner}
      </a>
    );
  }

  return <div className={`${cellClass} hover:bg-blush/40`}>{inner}</div>;
}

export default function Partners({ content }: { content: PartnersContent }) {
  return (
    <section id="partenaires" className="relative bg-navy overflow-hidden py-24 md:py-32">
      {/* Ambient depth + framing rule */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 75% 0%, var(--navy-light) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-impulse relative px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 md:mb-14 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-gold/80 text-xs lg:text-sm mb-3">
            {content.eyebrow}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Manifesto — narrative left, value props right */}
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 mb-16 md:mb-20">
          <div className="space-y-5 animate-fade-in-up delay-100">
            <p className="font-tenor italic text-xl md:text-2xl lg:text-3xl text-blush leading-snug">
              {content.intro1}
            </p>
            <p className="font-tenor italic text-lg md:text-xl text-blush/70 leading-relaxed">
              {content.intro2}
            </p>
          </div>

          <ul className="space-y-4 lg:space-y-5 lg:pt-2 self-center">
            {content.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: `${(index + 2) * 90}ms` }}
              >
                <svg
                  className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
                <span className="font-montserrat text-base md:text-lg text-blush/85 leading-relaxed">
                  {benefit.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signature tagline — gold script, flanked by hairline rules */}
        <div className="flex items-center gap-6 md:gap-10 mb-12 md:mb-16 animate-fade-in-up">
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <p className="font-script text-gold text-3xl md:text-4xl lg:text-5xl text-center leading-tight max-w-4xl">
            {content.tagline}
          </p>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* The partner board — framed cream cells, hairline-gold grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gold/20 rounded-sm overflow-hidden border border-gold/25 shadow-2xl animate-fade-in-up">
          {content.partners.map((partner, index) => (
            <LogoCell key={index} partner={partner} />
          ))}

          {/* Closing cell — become a partner */}
          <a
            href="#contact"
            className="group flex flex-col items-center justify-center text-center gap-1.5 bg-gold/95 min-h-[150px] md:min-h-[190px] px-3 py-3 transition-colors duration-300 hover:bg-gold"
          >
            <span className="font-tenor text-lg md:text-xl text-white leading-tight">
              Devenir partenaire
            </span>
            <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-white/80 flex items-center gap-1.5">
              Nous écrire
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
