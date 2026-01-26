export default function Problem() {
  const problems = [
    {
      highlight: "enfermée",
      text: "rester",
      textAfter: "dans son propre regard"
    },
    {
      highlight: "angles morts",
      text: "manquer d'espaces pour confronter ses",
      textAfter: ""
    },
    {
      highlight: "soutien",
      text: "avancer sans miroir exigeant ni",
      textAfter: "structuré"
    },
    {
      highlight: "décisions lourdes",
      text: "porter des",
      textAfter: "et seule"
    },
    {
      highlight: "potentiel",
      text: "sous exploiter son",
      textAfter: ""
    }
  ];

  return (
    <section className="snap-section section bg-cream">
      <div className="container-impulse px-4 h-full flex flex-col justify-center">
        {/* Section header */}
        <div className="mb-10 lg:mb-16 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm lg:text-xl mb-2">
            Constat
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Main headline */}
        <div className="max-w-5xl mb-10 lg:mb-14 animate-fade-in-up delay-100">
          <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-navy leading-relaxed">
            Entreprendre et diriger seule a{' '}
            <span className="font-greatvibes text-3xl md:text-4xl lg:text-5xl text-gold">
              un coût invisible
            </span>
            &nbsp;:
          </h2>
        </div>

        {/* Problems list - styled like PDF */}
        <div className="space-y-5 lg:space-y-6 max-w-3xl">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <span className="text-gold text-xl mt-1 flex-shrink-0">&gt;</span>
              <p className="font-cormorant text-lg md:text-xl lg:text-2xl text-navy">
                {problem.text}{' '}
                <span className="text-gold font-semibold">{problem.highlight}</span>
                {problem.textAfter && ` ${problem.textAfter}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
