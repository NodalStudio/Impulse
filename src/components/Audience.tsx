export default function Audience() {
  const criteria = [
    {
      text: "entreprennent ou dirigent",
      highlight: ""
    },
    {
      text: "sont engagées dans leur",
      highlight: "développement business"
    },
    {
      text: "veulent",
      highlight: "s'entourer",
      textAfter: "intelligemment"
    },
    {
      text: "recherchent autant la",
      highlight: "stimulation intellectuelle",
      textAfter: "que la qualité des",
      highlight2: "relations humaines"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 lg:mb-16 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
            Communauté
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Main headline */}
        <div className="max-w-4xl mb-10 lg:mb-14 animate-fade-in-up delay-100">
          <h2 className="font-tenor text-2xl md:text-3xl lg:text-4xl text-navy leading-relaxed">
            <span className="font-montserrat uppercase tracking-[0.2em] font-semibold">Impulse</span>{' '}
            s&apos;adresse aux{' '}
            <span className="font-script text-3xl md:text-4xl lg:text-5xl text-gold">
              femmes
            </span>{' '}
            qui :
          </h2>
        </div>

        {/* Criteria list */}
        <div className="space-y-5 lg:space-y-6 max-w-3xl">
          {criteria.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-3" />
              <p className="font-tenor text-lg md:text-xl lg:text-2xl text-navy">
                {item.text}{' '}
                {item.highlight && (
                  <span className="text-gold font-medium">{item.highlight}</span>
                )}
                {item.textAfter && ` ${item.textAfter}`}
                {item.highlight2 && (
                  <span className="text-gold font-medium"> {item.highlight2}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
