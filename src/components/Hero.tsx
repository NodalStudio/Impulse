'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="snap-section bg-gradient-hero">
      <div className="container-impulse px-4 h-full flex items-center">
        {/* Mobile: centered vertical layout - uses min-h to fill viewport minus header */}
        <div className="lg:hidden w-full min-h-[calc(100dvh-72px)] flex flex-col justify-center items-center -mt-8">
          {/* 3 Piliers - vertical stack with editorial styling */}
          <div className="mb-6 animate-fade-in-up">
            <div className="inline-flex flex-col items-start text-left border-l-2 border-gold/40 pl-5 py-1">
              <span className="font-cormorant text-xl text-navy/70 italic tracking-wide">Apprendre</span>
              <span className="font-cormorant text-xl text-navy/70 italic tracking-wide">S&apos;entraider</span>
              <span className="font-cormorant text-xl text-navy/70 italic tracking-wide">
                Réussir<span className="text-gold font-bold">.</span>
              </span>
            </div>
          </div>

          <h1 className="font-cormorant text-[2rem] sm:text-4xl font-semibold text-navy leading-[1.15] mb-8 animate-fade-in-up delay-100 text-center">
            Le rendez-vous business<br />
            des <span className="text-gold">femmes d&apos;impact</span><br />
            à Barcelone
          </h1>

          <div className="flex flex-col gap-4 w-full max-w-xs animate-fade-in-up delay-200">
            <a href="#contact" className="btn-primary group text-center">
              <span className="relative z-10">Rejoindre la communauté</span>
            </a>
            <a href="#calendrier" className="btn-secondary group text-center">
              Voir le calendrier
              <svg className="w-4 h-4 ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop layout - dynamic sizing based on viewport */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 xl:gap-12 items-center w-full">
          {/* Left content */}
          <div className="text-left">
            {/* 3 Piliers - vertical stack with editorial styling */}
            <div className="mb-[2vh] xl:mb-6 animate-fade-in-up">
              <div className="inline-flex flex-col items-start text-left border-l-2 border-gold/40 pl-4 py-0.5">
                <span className="font-cormorant text-base xl:text-lg text-navy/70 italic tracking-wide">Apprendre</span>
                <span className="font-cormorant text-base xl:text-lg text-navy/70 italic tracking-wide">S&apos;entraider</span>
                <span className="font-cormorant text-base xl:text-lg text-navy/70 italic tracking-wide">
                  Réussir<span className="text-gold font-bold">.</span>
                </span>
              </div>
            </div>

            <h1 className="font-cormorant text-[clamp(2rem,5vh,3.5rem)] font-semibold text-navy leading-[1.15] mb-[3vh] xl:mb-8 animate-fade-in-up delay-100">
              Le rendez-vous business<br />
              des <span className="text-gold relative inline-block group">
                femmes d&apos;impact
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span><br />
              à Barcelone
            </h1>

            <div className="flex flex-row gap-3 justify-start animate-fade-in-up delay-200">
              <a href="#contact" className="btn-primary group text-sm xl:text-base">
                <span className="relative z-10">Rejoindre la communauté</span>
              </a>
              <a href="#calendrier" className="btn-secondary group text-sm xl:text-base">
                Voir le calendrier
                <svg className="w-4 h-4 ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right - Photo Grid with dynamic sizing */}
          <div className="relative animate-fade-in delay-300">
            {/* Constrained photo grid - 3 images in elegant arrangement */}
            <div className="grid grid-cols-2 gap-3 max-w-sm xl:max-w-md">
              {/* Left column */}
              <div className="space-y-3">
                <div className="h-[15vh] xl:h-[18vh] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Impulse/images/placeholder-photo.svg"
                      alt="Événement Impulse"
                      width={240}
                      height={192}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500"></div>
                  </div>
                </div>
                <div className="h-[18vh] xl:h-[22vh] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Impulse/images/placeholder-photo.svg"
                      alt="Networking"
                      width={240}
                      height={224}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500"></div>
                  </div>
                </div>
              </div>
              {/* Right column - offset for asymmetry */}
              <div className="pt-[4vh]">
                <div className="h-[25vh] xl:h-[30vh] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Impulse/images/placeholder-photo.svg"
                      alt="Conférence"
                      width={240}
                      height={288}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements - subtle luxury accents */}
            <div className="absolute -bottom-4 -left-8 w-24 h-24 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -top-4 -right-8 w-32 h-32 bg-rose/30 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small viewports */}
      <div className="absolute bottom-4 xl:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <a
          href="#mission"
          className="flex flex-col items-center text-navy/40 hover:text-gold transition-all duration-500 group"
        >
          <span className="font-source text-xs uppercase tracking-[0.2em] mb-2 group-hover:tracking-[0.3em] transition-all duration-500">
            Découvrir
          </span>
          <div className="relative">
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}
