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
    <section id="calendrier" className="snap-section section bg-white">
      <div className="container-impulse px-4 h-full flex flex-col justify-center">
        {/* Section header */}
        <div className="mb-4 lg:mb-12 animate-fade-in-up flex-shrink-0">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-2">
            Calendrier 2026
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Mobile: Compact 2x3 grid that fits on one screen */}
        <div className="lg:hidden grid grid-cols-2 gap-2 flex-1 min-h-0">
          {events.map((event, index) => (
            <div
              key={index}
              className={`rounded-xl p-3 transition-all duration-300 animate-fade-in-up flex flex-col ${
                event.isSpecial
                  ? 'bg-navy text-white'
                  : 'bg-gradient-to-b from-cream to-rose/30'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Theme */}
              <h3 className={`font-cormorant text-sm font-semibold leading-tight mb-1 ${
                event.isSpecial ? 'text-white' : 'text-navy'
              }`}>
                {event.theme}
              </h3>

              {/* Month */}
              <p className={`font-greatvibes text-base mb-1 ${
                event.isSpecial ? 'text-gold' : 'text-gold'
              }`}>
                {event.month}
              </p>

              {/* Description - truncated on mobile */}
              <p className={`font-source text-[10px] leading-snug line-clamp-3 ${
                event.isSpecial ? 'text-white/80' : 'text-navy/70'
              }`}>
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: Full 6-column grid */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4">
          {events.map((event, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 transition-all duration-300 hover:shadow-lg animate-fade-in-up ${
                event.isSpecial
                  ? 'bg-navy text-white'
                  : 'bg-gradient-to-b from-cream to-rose/30'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Theme */}
              <h3 className={`font-cormorant text-lg font-semibold mb-3 leading-tight ${
                event.isSpecial ? 'text-white' : 'text-navy'
              }`}>
                {event.theme}
              </h3>

              {/* Month */}
              <p className={`font-greatvibes text-xl mb-4 ${
                event.isSpecial ? 'text-gold' : 'text-gold'
              }`}>
                {event.month}
              </p>

              {/* Description */}
              <p className={`font-source text-xs leading-relaxed ${
                event.isSpecial ? 'text-white/80' : 'text-navy/70'
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
