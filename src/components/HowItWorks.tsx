export default function HowItWorks() {
  const features = [
    {
      text: "1",
      highlight: "rendez-vous",
      textAfter: "mensuel"
    },
    {
      text: "un",
      highlight: "format clair et structuré",
      textAfter: "(accueil – intervention – échanges)"
    },
    {
      text: "des",
      highlight: "intervenantes",
      textAfter: "internes et externes"
    },
    {
      text: "des livrables",
      highlight: "concrets & actionnables",
      textAfter: ""
    },
    {
      text: "un suivi et des",
      highlight: "ressources",
      textAfter: "entre les sessions"
    }
  ];

  return (
    <section className="snap-section section-alt">
      <div className="container-impulse px-4 h-full flex flex-col justify-center">
        {/* Section header */}
        <div className="mb-10 lg:mb-16 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-2">
            Fonctionnement
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Main headline */}
        <div className="max-w-4xl mb-10 lg:mb-14 animate-fade-in-up delay-100">
          <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-navy leading-relaxed">
            <span className="font-montserrat uppercase tracking-[0.2em] font-semibold">Impulse</span>{' '}
            offre un cadre pour{' '}
            <span className="font-greatvibes text-3xl md:text-4xl lg:text-5xl text-gold">
              apprendre, échanger et agir
            </span>
            :
          </h2>
        </div>

        {/* Features list - styled like PDF */}
        <div className="space-y-5 lg:space-y-6 max-w-3xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <span className="text-gold text-xl mt-1 flex-shrink-0">&gt;</span>
              <p className="font-cormorant text-lg md:text-xl lg:text-2xl text-navy">
                {feature.text}{' '}
                <span className="text-gold font-semibold">{feature.highlight}</span>
                {feature.textAfter && ` ${feature.textAfter}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
