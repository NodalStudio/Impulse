'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="snap-section bg-gradient-hero">
      <div className="container-impulse px-4 h-full flex items-center">
        {/* Mobile: fills viewport with distributed content */}
        <div className="lg:hidden w-full h-full flex flex-col justify-around items-center py-[2vh]">
          {/* 3 Piliers - vertical stack with editorial styling */}
          <div className="animate-fade-in-up">
            <div className="inline-flex flex-col items-start text-left border-l-2 border-gold/40 pl-5 py-1">
              <span className="font-cormorant text-[3vh] text-navy/70 italic tracking-wide">Apprendre</span>
              <span className="font-cormorant text-[3vh] text-navy/70 italic tracking-wide">S&apos;entraider</span>
              <span className="font-cormorant text-[3vh] text-navy/70 italic tracking-wide">
                Réussir<span className="text-gold font-bold">.</span>
              </span>
            </div>
          </div>

          <h1 className="font-cormorant text-[5vh] font-semibold text-navy leading-[1.15] animate-fade-in-up delay-100 text-center">
            Le rendez-vous business<br />
            des <span className="text-gold">femmes d&apos;impact</span><br />
            à Barcelone
          </h1>

          <div className="flex flex-col gap-[2vh] w-full max-w-xs animate-fade-in-up delay-200">
            <a href="#contact" className="btn-primary group text-center py-[2vh] text-[1.8vh]">
              <span className="relative z-10">Rejoindre la communauté</span>
            </a>
            <a href="#calendrier" className="btn-secondary group text-center py-[2vh] text-[1.8vh]">
              Voir le calendrier
              <svg className="w-[2vh] h-[2vh] ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop layout - dynamic sizing based on viewport */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 xl:gap-12 items-center w-full max-w-5xl mx-auto">
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

            <p className="font-cormorant text-[clamp(2rem,5vh,3.5rem)] font-semibold text-navy leading-[1.15] mb-[3vh] xl:mb-8 animate-fade-in-up delay-100" role="heading" aria-level={1}>
              Le rendez-vous business<br />
              des <span className="text-gold relative inline-block group">
                femmes d&apos;impact
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span><br />
              à Barcelone
            </p>

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
          <div className="relative animate-fade-in delay-300 justify-self-end">
            {/* Constrained photo grid - 4 images in elegant arrangement */}
            <div className="grid grid-cols-2 gap-3 max-w-md xl:max-w-lg">
              {/* Left column */}
              <div className="space-y-3">
                <div className="h-[18vh] xl:h-[20vh] rounded-xl overflow-hidden shadow-lg group transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 border-2 border-gold/30 hover:border-gold">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/community-event.jpg"
                      alt="Événement business mensuel Impulse pour femmes entrepreneures à Barcelone"
                      width={280}
                      height={220}
                      priority
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                  </div>
                </div>
                <div className="h-[20vh] xl:h-[22vh] rounded-xl overflow-hidden shadow-lg group transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 border-2 border-gold/30 hover:border-gold">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/community-networking.jpg"
                      alt="Networking entre femmes d'affaires lors d'un atelier Impulse"
                      width={280}
                      height={250}
                      priority
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                  </div>
                </div>
              </div>
              {/* Right column - offset for asymmetry */}
              <div className="pt-[4vh] space-y-3">
                <div className="h-[20vh] xl:h-[22vh] rounded-xl overflow-hidden shadow-lg group transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 border-2 border-gold/30 hover:border-gold">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/community-garden.jpg"
                      alt="Communauté de femmes entrepreneures Impulse en extérieur à Barcelone"
                      width={280}
                      height={250}
                      priority
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                  </div>
                </div>
                <div className="h-[18vh] xl:h-[20vh] rounded-xl overflow-hidden shadow-lg group transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 border-2 border-gold/30 hover:border-gold">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/community-workshop.jpg"
                      alt="Atelier pratique de formation entrepreneuriat féminin Impulse"
                      width={280}
                      height={250}
                      priority
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
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
