const benefits = [
  {
    title: "Élargir sa manière de penser",
    description: "en confrontant ses points de vue à ceux d'autres entrepreneuses et dirigeantes."
  },
  {
    title: "Renforcer sa posture professionnelle",
    description: "en prenant du recul sur ses décisions, ses rôles et ses responsabilités."
  },
  {
    title: "Apprendre autrement",
    description: "par le partage d'expériences, la transmission et l'intelligence collective."
  },
  {
    title: "Ne plus porter seule",
    description: "ses questionnements, ses doutes ou ses choix structurants."
  },
  {
    title: "Grandir dans un cadre exigeant et sécurisant",
    description: "qui encourage l'expression, la contribution et la mise en mouvement."
  }
];

export default function Benefits() {
  return (
    <section className="snap-section section bg-cream">
      <div className="container-impulse px-4 h-full flex flex-col justify-evenly">
        {/* Section header */}
        <div className="animate-fade-in-up flex-shrink-0">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm lg:text-xl mb-2">
            Bénéfices
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Benefits list - compact on mobile */}
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex items-start gap-3 lg:gap-4">
              <span className="text-gold text-lg lg:text-xl mt-1 flex-shrink-0">&gt;</span>
              <div>
                <p className="font-greatvibes text-lg lg:text-2xl text-navy mb-1 lg:mb-2">
                  {benefit.title}
                </p>
                <p className="font-cormorant text-sm lg:text-xl text-navy/70">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
