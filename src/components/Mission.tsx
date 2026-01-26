export default function Mission() {
  return (
    <section id="mission" className="snap-section section-alt">
      <div className="container-impulse h-full flex flex-col justify-center py-2 lg:py-4">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Manifeste - exact PDF wording with dynamic sizing */}
          <div className="animate-fade-in-up">
            <blockquote className="font-cormorant text-[2.8vh] lg:text-[clamp(0.95rem,2.5vh,1.5rem)] text-navy leading-snug lg:leading-relaxed mb-[1.5vh] lg:mb-6">
              <p className="mb-[1vh] lg:mb-[1.5vh]">
                Parce qu&apos;aucune entrepreneuse ou dirigeante ne devrait être seule face à ses challenges
                et les freins systémiques qui pèsent sur sa réussite,
              </p>
              <p className="mb-[1vh] lg:mb-[1.5vh]">
                nous avons créé une <span className="text-gold font-semibold">communauté</span> de professionnelles authentiques et actives
                qui osent se montrer telles qu&apos;elles sont, avec leurs forces et leurs vulnérabilités
              </p>
              <p className="mb-[1vh] lg:mb-[1.5vh]">
                où les valeurs <span className="text-gold font-semibold">d&apos;entraide, de bienveillance et de partage</span> s&apos;expriment
                dans le cadre de rendez-vous mensuels qui permettent à chacune
              </p>
              <p>
                <span className="text-gold font-semibold">d&apos;apprendre, de grandir et de rayonner</span> professionnellement.
              </p>
            </blockquote>

            {/* Tagline */}
            <p className="font-cormorant text-[3vh] lg:text-[clamp(1.1rem,3vh,1.5rem)] font-semibold text-navy mb-[1.5vh] lg:mb-8 animate-fade-in-up delay-100">
              Du business empowerment au féminin !
            </p>

            {/* Founders signatures */}
            <div className="border-t border-gold/30 pt-[1.5vh] lg:pt-6 animate-fade-in-up delay-200">
              <p className="font-greatvibes text-[2.5vh] lg:text-[clamp(1.05rem,2.8vh,1.5rem)] text-navy mb-1">
                Marina, Anaïs &amp; Sophie
              </p>
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
