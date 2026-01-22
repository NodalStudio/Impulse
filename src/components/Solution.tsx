export default function Solution() {
  return (
    <section className="snap-section section-alt">
      <div className="container-impulse px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left - Intention */}
          <div className="animate-slide-left">
            <div className="mb-8">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-2">
                Intention
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-navy leading-relaxed">
              Offrir aux femmes{' '}
              <span className="text-gold font-semibold">entrepreneuses et dirigeantes</span>
            </p>
            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-navy leading-relaxed mt-4">
              un espace structurant,
            </p>
            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-navy leading-relaxed mt-4">
              où transformer leur manière de penser et d&apos;agir
            </p>
            <p className="font-greatvibes text-2xl md:text-3xl lg:text-4xl text-navy mt-6">
              et grandir professionnellement.
            </p>
          </div>

          {/* Right - Ambition */}
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white animate-slide-right">
            <div className="mb-8">
              <p className="font-montserrat uppercase tracking-[0.3em] text-gold text-sm mb-2">
                Ambition
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-white leading-relaxed">
              Faire d&apos;<span className="font-montserrat uppercase tracking-[0.2em] font-semibold">Impulse</span>
            </p>
            <p className="font-greatvibes text-2xl md:text-3xl lg:text-4xl text-white mt-4">
              le rendez-vous business incontournable
            </p>
            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl mt-4">
              des <span className="text-gold font-semibold">entrepreneuses et dirigeantes francophones</span>
            </p>
            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-white mt-4">
              à Barcelone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
