export default function Mission() {
  return (
    <section id="mission" className="snap-section section-alt">
      <div className="container-impulse py-8 lg:py-0 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Manifeste - exact PDF wording */}
          <div className="animate-fade-in-up">
            <blockquote className="font-cormorant text-lg md:text-xl lg:text-2xl text-navy leading-relaxed mb-8">
              <p className="mb-4">
                Parce qu&apos;aucune entrepreneuse ou dirigeante ne devrait être seule face à ses challenges
                et les freins systémiques qui pèsent sur sa réussite,
              </p>
              <p className="mb-4">
                nous avons créé une <span className="text-gold font-semibold">communauté</span> de professionnelles authentiques et actives
                qui osent se montrer telles qu&apos;elles sont, avec leurs forces et leurs vulnérabilités
              </p>
              <p className="mb-4">
                où les valeurs <span className="text-gold font-semibold">d&apos;entraide, de bienveillance et de partage</span> s&apos;expriment
                dans le cadre de rendez-vous mensuels qui permettent à chacune
              </p>
              <p>
                <span className="text-gold font-semibold">d&apos;apprendre, de grandir et de rayonner</span> professionnellement.
              </p>
            </blockquote>

            {/* Tagline */}
            <p className="font-cormorant text-xl md:text-2xl font-semibold text-navy mb-10 animate-fade-in-up delay-100">
              Du business empowerment au féminin !
            </p>

            {/* Founders signatures */}
            <div className="border-t border-gold/30 pt-8 animate-fade-in-up delay-200">
              <p className="font-greatvibes text-2xl md:text-3xl text-navy mb-2">
                Anaïs, Marina &amp; Sophie
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
