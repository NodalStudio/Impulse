import Gallery from './Gallery';

export default function Mission() {
  return (
    <section id="mission" className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Photo gallery with scroll-triggered reveal */}
        <Gallery />

        {/* Manifeste */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            {/* Decorative separator above manifesto */}
            <div className="flex items-center justify-center mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            <blockquote className="font-tenor text-lg md:text-xl lg:text-2xl text-navy leading-relaxed mb-8 md:mb-10">
              <p className="mb-4">
                Parce qu&apos;aucune entrepreneuse ou dirigeante ne devrait être seule face à ses challenges
                et les freins systémiques qui pèsent sur sa réussite,
              </p>
              <p className="mb-4">
                nous avons créé une <span className="text-gold font-medium">communauté</span> de professionnelles authentiques et actives
                qui osent se montrer telles qu&apos;elles sont, avec leurs forces et leurs vulnérabilités
              </p>
              <p className="mb-4">
                où les valeurs <span className="text-gold font-medium">d&apos;entraide, de bienveillance et de partage</span> s&apos;expriment
                dans le cadre de rendez-vous mensuels qui permettent à chacune
              </p>
              <p>
                <span className="text-gold font-medium">d&apos;apprendre, de grandir et de rayonner</span> professionnellement.
              </p>
            </blockquote>

            {/* Tagline */}
            <p className="font-tenor text-xl md:text-2xl text-navy mb-8 md:mb-10 animate-fade-in-up delay-100">
              Du business empowerment au féminin !
            </p>

            {/* Founders signatures */}
            <div className="border-t border-gold/20 pt-6 animate-fade-in-up delay-200">
              <p className="font-script text-xl md:text-2xl text-navy mb-3">
                Marina, Anaïs &amp; Sophie
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
