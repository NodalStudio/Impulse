const events = [
  {
    month: "janvier",
    theme: "Objectif 2026",
    description: "Repartez avec une vision claire de 2026, des priorités assumées et un plan d'actions réaliste pour piloter votre business sans vous éparpiller."
  },
  {
    month: "février",
    theme: "Facturation & recouvrement",
    description: "Mettez en place un système simple et conforme pour facturer sans stress, être payée à temps et reprendre le contrôle de votre trésorerie."
  },
  {
    month: "mars",
    theme: "Vitalité & business",
    description: "Recharger votre énergie, retrouver de la clarté mentale et poser des routines durables pour performer sans vous épuiser."
  },
  {
    month: "avril",
    theme: "Vente & prospection",
    description: "Structurer une approche commerciale simple et alignée pour attirer des clients réguliers et sécuriser votre chiffre d'affaires."
  },
  {
    month: "mai",
    theme: "Intelligence artificielle",
    description: "Comprendre comment utiliser l'IA concrètement pour gagner du temps, améliorer vos décisions et faire grandir votre business sans travailler plus."
  },
  {
    month: "juin",
    theme: "IMPULSE Night",
    description: "Une soirée pour créer des connexions utiles, provoquer des opportunités et repartir boostée, inspirée et alignée.",
    isSpecial: true
  }
];

export default function Calendar() {
  return (
    <section id="calendrier" className="py-20 md:py-28 bg-white scroll-mt-[20vh]">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 lg:mb-14 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
            Calendrier 2026
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Mobile: 2x3 grid */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            {events.map((event, index) => (
              <div
                key={index}
                className={`rounded-sm p-4 transition-all duration-300 animate-fade-in-up flex flex-col ${
                  event.isSpecial
                    ? 'bg-navy text-white'
                    : 'bg-blush border border-gold/10'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className={`font-tenor text-sm font-medium leading-tight mb-2 ${
                  event.isSpecial ? 'text-blush' : 'text-navy'
                }`}>
                  {event.theme}
                </h3>
                <p className="font-script text-base mb-2 text-gold">
                  {event.month}
                </p>
                <p className={`font-montserrat text-xs leading-snug ${
                  event.isSpecial ? 'text-blush/60' : 'text-navy/60'
                }`}>
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 6-column grid */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-stretch">
          {events.map((event, index) => (
            <div
              key={index}
              className={`rounded-sm p-5 transition-all duration-300 hover:shadow-lg animate-fade-in-up flex flex-col ${
                event.isSpecial
                  ? 'bg-navy text-white'
                  : 'bg-blush border border-gold/10 hover:border-gold/25'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h3 className={`font-tenor text-base font-medium leading-tight min-h-[2.5rem] ${
                event.isSpecial ? 'text-blush' : 'text-navy'
              }`}>
                {event.theme}
              </h3>

              <p className="font-script text-lg mb-3 leading-loose text-gold">
                {event.month}
              </p>

              <p className={`font-montserrat text-xs lg:text-sm leading-relaxed flex-grow ${
                event.isSpecial ? 'text-blush/60' : 'text-navy/60'
              }`}>
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
