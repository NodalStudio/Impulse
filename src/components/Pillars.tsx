'use client';

import { useEffect, useRef } from 'react';

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      number: "01",
      title: "apprendre",
      description:
        "Des contenus et échanges actionnables pour nourrir votre réflexion et affûter vos compétences.",
    },
    {
      number: "02",
      title: "s'entraider",
      description:
        "Intelligence collective et soutien réel entre femmes qui comprennent vos enjeux.",
    },
    {
      number: "03",
      title: "agir",
      description:
        "Posture, visibilité et décisions alignées pour passer à l'action concrètement.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="piliers"
      className="relative py-20 md:py-32 overflow-hidden hero-bg noise-overlay"
    >
      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Subtle decorative ring — background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px]"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="300" cy="300" r="295" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.08" />
          <circle cx="300" cy="300" r="220" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.04" />
        </svg>
      </div>

      <div className="container-impulse px-6 md:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-20 pillar-animate">
          <p className="font-montserrat uppercase tracking-[0.3em] text-blush/40 text-xs lg:text-sm mb-4">
            Nos 3 Piliers
          </p>
          <div className="flex items-center justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-4" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </div>

        {/* ─── Desktop: triangular arrangement ─── */}
        <div className="hidden md:block max-w-4xl mx-auto">
          {/* Top vertex — Apprendre (above the triangle) */}
          <div
            className="flex justify-center mb-6 pillar-animate"
            style={{ animationDelay: "150ms" }}
          >
            <div className="text-center max-w-xs">
              <span className="font-montserrat text-[11px] text-gold/40 tracking-[0.35em] uppercase font-medium">
                01
              </span>
              <h3 className="font-tenor text-2xl lg:text-3xl text-blush mt-2 mb-3 capitalize tracking-wide">
                {pillars[0].title}
              </h3>
              <p className="font-montserrat text-sm text-blush/50 leading-relaxed">
                {pillars[0].description}
              </p>
            </div>
          </div>

          {/* Triangle — geometric connector between the three pillars */}
          <div className="flex justify-center">
            <svg
              className="w-[58%] h-auto"
              viewBox="0 0 500 433"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="pillar-tri-stroke"
                  x1="0"
                  y1="0"
                  x2="500"
                  y2="433"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#d4a456" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#bf8a3d" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#d4a456" stopOpacity="0.4" />
                </linearGradient>
                <radialGradient id="pillar-tri-glow" cx="50%" cy="60%" r="40%">
                  <stop offset="0%" stopColor="#bf8a3d" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#bf8a3d" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Soft inner glow */}
              <polygon
                points="250,15 485,420 15,420"
                fill="url(#pillar-tri-glow)"
              />

              {/* Main triangle — draws itself in */}
              <polygon
                points="250,15 485,420 15,420"
                stroke="url(#pillar-tri-stroke)"
                strokeWidth="1"
                strokeLinejoin="round"
                fill="none"
                className="pillar-triangle-draw"
              />

              {/* Inner echo triangle for depth */}
              <polygon
                points="250,65 458,398 42,398"
                stroke="#bf8a3d"
                strokeWidth="0.5"
                fill="none"
                opacity="0.06"
              />

              {/* Vertex diamonds */}
              <g transform="translate(250,15) rotate(45)">
                <rect x="-5" y="-5" width="10" height="10" rx="1" fill="#bf8a3d" opacity="0.5" />
              </g>
              <g transform="translate(15,420) rotate(45)">
                <rect x="-5" y="-5" width="10" height="10" rx="1" fill="#bf8a3d" opacity="0.5" />
              </g>
              <g transform="translate(485,420) rotate(45)">
                <rect x="-5" y="-5" width="10" height="10" rx="1" fill="#bf8a3d" opacity="0.5" />
              </g>

              {/* Edge midpoint accents */}
              <circle cx="132" cy="218" r="1.5" fill="#bf8a3d" opacity="0.2" />
              <circle cx="250" cy="420" r="1.5" fill="#bf8a3d" opacity="0.2" />
              <circle cx="368" cy="218" r="1.5" fill="#bf8a3d" opacity="0.2" />
            </svg>
          </div>

          {/* Bottom vertices — centered on bottom triangle points
               SVG is 58% wide, centered → each bottom vertex sits at
               (100%-58%)/2 + (15/500)*58% = 22.74% from the edge.
               calc(22.74% - 120px) centres a 240px block on that point. */}
          <div className="flex items-start mt-6">
            <div
              className="text-center w-[240px] shrink-0 pillar-animate"
              style={{ marginLeft: 'calc(22.74% - 120px)', animationDelay: '300ms' }}
            >
              <span className="font-montserrat text-[11px] text-gold/40 tracking-[0.35em] uppercase font-medium">
                02
              </span>
              <h3 className="font-tenor text-2xl lg:text-3xl text-blush mt-2 mb-3 capitalize tracking-wide">
                {pillars[1].title}
              </h3>
              <p className="font-montserrat text-sm text-blush/50 leading-relaxed">
                {pillars[1].description}
              </p>
            </div>

            <div className="flex-1" />

            <div
              className="text-center w-[240px] shrink-0 pillar-animate"
              style={{ marginRight: 'calc(22.74% - 120px)', animationDelay: '450ms' }}
            >
              <span className="font-montserrat text-[11px] text-gold/40 tracking-[0.35em] uppercase font-medium">
                03
              </span>
              <h3 className="font-tenor text-2xl lg:text-3xl text-blush mt-2 mb-3 capitalize tracking-wide">
                {pillars[2].title}
              </h3>
              <p className="font-montserrat text-sm text-blush/50 leading-relaxed">
                {pillars[2].description}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Mobile: vertical stack with decorative triangle ─── */}
        <div className="md:hidden">
          {/* Small decorative triangle echoing the desktop layout */}
          <div className="flex justify-center mb-10">
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              aria-hidden="true"
            >
              <polygon
                points="18,2 34,30 2,30"
                stroke="#bf8a3d"
                strokeWidth="0.75"
                fill="none"
                opacity="0.3"
              />
              <g transform="translate(18,2) rotate(45)">
                <rect x="-2" y="-2" width="4" height="4" fill="#bf8a3d" opacity="0.4" />
              </g>
            </svg>
          </div>

          <div className="space-y-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="text-center pillar-animate"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <span className="font-montserrat text-[11px] text-gold/40 tracking-[0.35em] uppercase font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-tenor text-2xl text-blush mt-2 mb-3 capitalize tracking-wide">
                  {pillar.title}
                </h3>
                <p className="font-montserrat text-sm text-blush/50 leading-relaxed max-w-xs mx-auto">
                  {pillar.description}
                </p>
                {/* Gold connector between items */}
                {index < pillars.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <div className="w-px h-6 bg-gradient-to-b from-gold/20 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
