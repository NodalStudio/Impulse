const essentiellFeatures = [
  "Accès whatsapp (tips, questions, infos)",
  "1 rdv test au choix (au tarif normal, exclusivement pour les nouvelles)",
  "Accès à la soirée IMPULSE Night",
  "Accès à des évènements IMPULSE Mood"
];

const experienceFeatures = [
  {
    title: "Les RDV IMPULSE (~ 10/an)",
    items: ["Webinaire", "Template ultra actionnable"]
  },
  { title: "Annuaire - trombi" },
  { title: "Groupe Visibilité" },
  { title: "Accès guides et ressources" },
  { title: "Mises en relation double opt-in" },
  { title: "Espace Notion (septembre)" }
];

export default function Pricing() {
  return (
    <section id="offres" className="snap-section section bg-gradient-to-br from-cream via-white to-rose/20">
      <div className="container-impulse px-4 h-full flex flex-col justify-center">
        {/* Section header */}
        <div className="mb-3 lg:mb-12 animate-fade-in-up flex-shrink-0">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-2">
            Offres
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Mobile: Compact stacked cards */}
        <div className="lg:hidden flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto">
          {/* Essentielle - Compact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-beige/50 animate-fade-in-up flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <p className="font-greatvibes text-2xl text-navy">
                Essentielle
              </p>
              <p className="font-greatvibes text-xl text-gold">
                Offert
              </p>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-gold text-sm">&gt;</span>
              <p className="font-montserrat uppercase tracking-wider text-[10px] text-navy font-semibold">
                Rester connectée
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
              {essentiellFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-gold text-xs">•</span>
                  <span className="font-source text-[11px] text-navy/80 leading-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expérience - Compact */}
          <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gold/30 animate-fade-in-up delay-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <p className="font-greatvibes text-2xl text-navy">
                Expérience
              </p>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-gold text-sm">&gt;</span>
              <p className="font-montserrat uppercase tracking-wider text-[10px] text-navy font-semibold">
                S&apos;impliquer, contribuer, grandir
              </p>
            </div>

            <p className="font-cormorant text-sm text-navy mb-2 italic">
              + Accès à toute l&apos;offre essentielle
            </p>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-3">
              {experienceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-1">
                  <span className="text-gold text-[10px] mt-0.5">+</span>
                  <span className="font-source text-[11px] text-navy font-medium leading-tight">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing callout - Compact */}
            <div className="bg-gradient-to-r from-cream to-rose/30 rounded-lg p-3 text-center">
              <p className="font-greatvibes text-base text-gold">
                Offre de lancement
              </p>
              <p className="font-cormorant text-lg text-navy font-semibold">
                79€HT pour 6 mois*
              </p>
              <p className="font-source text-[10px] text-navy/70">
                + ~25€HT / event • *jan-juin 2026
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Full layout - compact to fit viewport */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Essentielle */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-beige/50 animate-fade-in-up">
            <p className="font-greatvibes text-4xl text-navy mb-3">
              Essentielle
            </p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-gold text-lg">&gt;</span>
              <p className="font-montserrat uppercase tracking-wider text-xs text-navy font-semibold">
                Rester connectée
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {essentiellFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">•</span>
                  <span className="font-source text-sm text-navy/80 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-beige/50">
              <p className="font-greatvibes text-2xl text-gold text-center">
                Offert
              </p>
            </div>
          </div>

          {/* Expérience */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gold/30 animate-fade-in-up delay-100">
            <p className="font-greatvibes text-4xl text-navy mb-3">
              Expérience
            </p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-gold text-lg">&gt;</span>
              <p className="font-montserrat uppercase tracking-wider text-xs text-navy font-semibold">
                S&apos;impliquer, contribuer, grandir plus vite
              </p>
            </div>

            <p className="font-cormorant text-sm text-navy mb-4 italic">
              Accès à toute l&apos;offre essentielle
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
              {experienceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gold text-sm mt-0.5">+</span>
                  <div>
                    <span className="font-source text-sm text-navy font-medium">
                      {feature.title}
                    </span>
                    {feature.items && (
                      <ul className="mt-0.5 ml-2 space-y-0">
                        {feature.items.map((item, i) => (
                          <li key={i} className="text-xs text-navy/60 flex items-center gap-1">
                            <span>•</span> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing callout */}
            <div className="bg-gradient-to-r from-cream to-rose/30 rounded-xl p-4 text-center">
              <p className="font-greatvibes text-lg text-gold mb-1">
                Offre de lancement
              </p>
              <p className="font-cormorant text-xl text-navy font-semibold">
                seulement 79€HT pour 6 mois*
              </p>
              <p className="font-source text-xs text-navy/70 mt-1">
                + ~25€HT / event en earlybird
              </p>
              <p className="font-source text-[10px] text-navy/50 mt-2">
                *janvier - juin 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
