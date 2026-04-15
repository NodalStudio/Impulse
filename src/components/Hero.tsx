"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden hero-bg noise-overlay"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Concentric gold rings — offset right, symbolising community & radiating energy */}
        <svg
          className="absolute -right-24 sm:-right-16 lg:-right-8 top-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] md:w-[640px] md:h-[640px] lg:w-[750px] lg:h-[750px]"
          viewBox="0 0 750 750"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="375" cy="375" r="370" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.12" />
          <circle cx="375" cy="375" r="280" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.07" />
          <circle cx="375" cy="375" r="190" stroke="#bf8a3d" strokeWidth="0.5" opacity="0.04" />
        </svg>

        {/* Ambient colour glows for depth */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-burgundy/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Main content — vertically centred */}
      <div className="flex-1 flex items-center relative z-10 pt-24">
        <div className="container-impulse px-6 md:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorative diamond separator */}
            <div className="flex items-center justify-center mb-10 md:mb-14 animate-fade-in delay-100">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/50 mx-4 md:mx-6" />
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            {/* Main headline */}
            <h1 className="mb-7 md:mb-9">
              <span className="block font-tenor text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] text-blush leading-[1.2] tracking-[0.02em] animate-fade-in-up delay-200">
                Le rendez-vous business
              </span>
              <span className="block font-tenor text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] leading-[1.2] tracking-[0.02em] mt-1 animate-fade-in-up delay-300">
                <span className="text-blush">des </span>
                <span className="text-gold">femmes d&apos;impact</span>
              </span>
            </h1>

            {/* Gold dot */}
            <div className="flex justify-center mb-7 md:mb-9 animate-fade-in delay-400">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            </div>

            {/* Subtitle */}
            <p className="font-montserrat text-sm md:text-base text-blush/45 max-w-md mx-auto mb-10 md:mb-14 leading-relaxed font-light animate-fade-in-up delay-500">
              Des événements mensuels à Barcelone pour les femmes entrepreneures
              qui veulent apprendre, s&apos;entraider et agir ensemble.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
              <a href="#contact" className="hero-btn-primary group text-center">
                <span className="relative z-10">Rejoindre la communauté</span>
              </a>
              <a href="#calendrier" className="hero-btn-secondary group text-center">
                Voir le calendrier
                <svg
                  className="w-4 h-4 ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — pillars + scroll */}
      <div className="relative z-10 pb-6 md:pb-8">
        {/* Three pillars */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 mb-8 md:mb-10 animate-fade-in-up delay-700">
          <span className="font-montserrat text-[10px] sm:text-xs text-gold/40 uppercase tracking-[0.2em] sm:tracking-[0.25em] font-light">
            Apprendre
          </span>
          <span className="w-1 h-1 rounded-full bg-gold/25" />
          <span className="font-montserrat text-[10px] sm:text-xs text-gold/40 uppercase tracking-[0.2em] sm:tracking-[0.25em] font-light">
            S&apos;entraider
          </span>
          <span className="w-1 h-1 rounded-full bg-gold/25" />
          <span className="font-montserrat text-[10px] sm:text-xs text-gold/40 uppercase tracking-[0.2em] sm:tracking-[0.25em] font-light">
            Agir
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex flex-col items-center">
          <a
            href="#mission"
            className="flex flex-col items-center text-blush/20 hover:text-gold/50 transition-all duration-500 group"
          >
            <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] mb-2 group-hover:tracking-[0.4em] transition-all duration-500">
              Découvrir
            </span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom edge — gold gradient line for transition to blush section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
