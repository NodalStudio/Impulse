export default function Solution() {
  return (
    <section className="snap-section section-alt">
      <div className="container-impulse px-4 h-full flex flex-col justify-evenly">
        {/* Mobile layout - compact vertical stack */}
        <div className="lg:hidden flex-1 flex flex-col justify-evenly gap-[4vh]">
          {/* Intention - compact */}
          <div className="animate-slide-left mb-[2vh]">
            <div className="mb-[2vh]">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm">
                Intention
              </p>
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            <p className="font-cormorant text-xl text-navy leading-snug">
              Offrir aux femmes{' '}
              <span className="text-gold font-semibold">entrepreneuses et dirigeantes</span>
              {' '}un espace structurant, où transformer leur manière de penser et d&apos;agir
            </p>
            <p className="font-greatvibes text-xl text-navy">
              et grandir professionnellement.
            </p>
          </div>

          {/* Ambition - compact */}
          <div className="bg-navy rounded-2xl p-[2.5vh] text-white animate-slide-right">
            <div className="mb-[2vh]">
              <p className="font-montserrat uppercase tracking-[0.3em] text-gold text-sm mb-1">
                Ambition
              </p>
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            <p className="font-cormorant text-xl text-white leading-snug">
              Faire d&apos;<span className="font-montserrat uppercase tracking-[0.15em] font-semibold text-[2vh]">Impulse</span>
            </p>
            <p className="font-greatvibes text-xl text-white mt-[0.5vh]">
              le rendez-vous business incontournable
            </p>
            <p className="font-cormorant text-xl text-white leading-snug mt-[0.5vh]">
              des <span className="text-gold font-semibold">entrepreneuses et dirigeantes francophones</span> à Barcelone.
            </p>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start w-full">
          {/* Left - Intention */}
          <div className="animate-slide-left pt-12">
            <div className="mb-8">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm lg:text-xl mb-2">
                Intention
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            <p className="font-cormorant text-3xl text-navy leading-relaxed">
              Offrir aux femmes <span className="text-gold font-semibold">entrepreneuses et dirigeantes</span>
              <br />
              un espace structurant,
              <br />
              où transformer leur manière de penser et d&apos;agir
              <br />
              <span className="font-greatvibes text-4xl">et grandir professionnellement.</span>
            </p>
          </div>

          {/* Right - Ambition */}
          <div className="bg-navy rounded-3xl p-12 text-white animate-slide-right">
            <div className="mb-8">
              <p className="font-montserrat uppercase tracking-[0.3em] text-gold text-sm lg:text-xl mb-2">
                Ambition
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            <p className="font-cormorant text-3xl text-white leading-relaxed">
              Faire d&apos;<span className="font-montserrat uppercase tracking-[0.2em] font-semibold">Impulse</span>
            </p>
            <p className="font-greatvibes text-4xl text-white mt-4">
              le rendez-vous business incontournable
            </p>
            <p className="font-cormorant text-3xl mt-4">
              des <span className="text-gold font-semibold">entrepreneuses et dirigeantes francophones</span>
            </p>
            <p className="font-cormorant text-3xl text-white mt-4">
              à Barcelone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
