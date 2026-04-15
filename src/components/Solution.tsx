export default function Solution() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Mobile layout */}
        <div className="lg:hidden space-y-8">
          {/* Intention */}
          <div className="animate-slide-left">
            <div className="mb-4">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs mb-3">
                Intention
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>

            <p className="font-tenor text-xl text-navy leading-snug">
              Offrir aux femmes{' '}
              <span className="text-gold font-medium">entrepreneuses et dirigeantes</span>
              {' '}un espace structurant, où transformer leur manière de penser et d&apos;agir
            </p>
            <p className="font-script text-xl text-navy mt-1">
              et grandir professionnellement.
            </p>
          </div>

          {/* Ambition */}
          <div className="relative bg-navy rounded-sm p-6 text-white overflow-hidden noise-overlay animate-slide-right">
            <div className="relative z-10">
              <div className="mb-4">
                <p className="font-montserrat uppercase tracking-[0.3em] text-gold/70 text-xs mb-3">
                  Ambition
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />
              </div>

              <p className="font-tenor text-xl text-blush leading-snug">
                Faire d&apos;<span className="font-montserrat uppercase tracking-[0.15em] font-semibold text-sm">Impulse</span>
              </p>
              <p className="font-script text-xl text-blush mt-2">
                le rendez-vous business incontournable
              </p>
              <p className="font-tenor text-xl text-blush leading-snug mt-2">
                des <span className="text-gold font-medium">entrepreneuses et dirigeantes francophones</span> à Barcelone.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start w-full">
          {/* Left - Intention */}
          <div className="animate-slide-left pt-12">
            <div className="mb-8">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
                Intention
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>

            <p className="font-tenor text-3xl text-navy leading-relaxed">
              Offrir aux femmes <span className="text-gold font-medium">entrepreneuses et dirigeantes</span>
              <br />
              un espace structurant,
              <br />
              où transformer leur manière de penser et d&apos;agir
              <br />
              <span className="font-script text-4xl">et grandir professionnellement.</span>
            </p>
          </div>

          {/* Right - Ambition */}
          <div className="relative bg-navy rounded-sm p-12 text-white overflow-hidden noise-overlay animate-slide-right">
            <div className="relative z-10">
              <div className="mb-8">
                <p className="font-montserrat uppercase tracking-[0.3em] text-gold/70 text-xs lg:text-sm mb-3">
                  Ambition
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />
              </div>

              <p className="font-tenor text-3xl text-blush leading-relaxed">
                Faire d&apos;<span className="font-montserrat uppercase tracking-[0.2em] font-semibold">Impulse</span>
              </p>
              <p className="font-script text-4xl text-blush mt-4">
                le rendez-vous business incontournable
              </p>
              <p className="font-tenor text-3xl mt-4">
                des <span className="text-gold font-medium">entrepreneuses et dirigeantes francophones</span>
              </p>
              <p className="font-tenor text-3xl text-blush mt-4">
                à Barcelone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
