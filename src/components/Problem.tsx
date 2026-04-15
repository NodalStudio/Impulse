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
    <section className="py-20 md:py-28 bg-blush">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 lg:mb-16 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
            Constat
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Main headline */}
        <div className="max-w-4xl mb-10 lg:mb-14 animate-fade-in-up delay-100">
          <h2 className="font-tenor text-2xl md:text-3xl lg:text-4xl text-navy leading-relaxed">
            Entreprendre et diriger seule a{' '}
            <span className="font-script text-3xl md:text-4xl lg:text-5xl text-gold">
              un coût invisible
            </span>
            &nbsp;:
          </h2>
        </div>

        {/* Problems list */}
        <div className="space-y-5 lg:space-y-6 max-w-3xl">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-3" />
              <p className="font-tenor text-lg md:text-xl lg:text-2xl text-navy">
                {problem.text}{' '}
                <span className="text-gold font-medium">{problem.highlight}</span>
                {problem.textAfter && ` ${problem.textAfter}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
