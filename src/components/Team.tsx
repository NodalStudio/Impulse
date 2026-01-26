import Image from 'next/image';

const founders = [
  {
    name: "Anaïs Derenne",
    role: "Expérience membre & facilitation",
    bio: "Facilitatrice en talents et fondatrice de BeauBOULOT, Anaïs accompagne depuis plus de 10 ans les décideurs et les équipes sur les enjeux de recrutement, d'évaluation et de sens au travail. Elle rejoint l'équipe d'IMPULSE en 2025, avec l'envie de fédérer un collectif de femmes ambitieuses, inspirantes et engagées dans leur développement professionnel. Elle est garante de l'expérience membre et de la facilitation des ateliers."
  },
  {
    name: "Marina Serr",
    role: "Fondatrice & vision Impulse",
    bio: "Business coach certifiée, Marina guide entrepreneurs, dirigeants et cadres dans des phases clés de structuration, de transition et de montée en posture. Elle a déjà accompagné plus de 100 leaders. Fondatrice du RDV des entrepreneuses en 2022, devenu IMPULSE en 2026, elle croit en la force d'un collectif exigeant et humain comme levier de réussite pour les femmes. Elle est garante de la vision, du cadre, de la dynamique collective et de la cohérence globale d'IMPULSE."
  },
  {
    name: "Sophie Bernicke",
    role: "Structure & cohésion du collectif",
    bio: "Naturopathe spécialisée dans le mieux vieillir, Sophie accompagne les femmes à retrouver énergie et vitalité durablement grâce une approche globale, bienveillante et pragmatique. Engagée au sein d'IMPULSE depuis 2025, elle porte la conviction que la puissance du collectif nourrit l'énergie humaine et soutient une transformation professionnelle durable. Elle est garante de la structure et de la facilitation globale du collectif."
  }
];

export default function Team() {
  return (
    <section id="equipe" className="snap-section section-alt">
      <div className="container-impulse px-4 h-full flex flex-col justify-center lg:py-4">
        {/* Section header - Desktop only */}
        <div className="hidden lg:block mb-14 animate-fade-in-up flex-shrink-0 lg:text-left">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm lg:text-xl mb-1">
            Équipe
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent lg:mx-0"></div>
        </div>

        {/* Mobile layout - Cards centered */}
        <div className="lg:hidden flex-1 flex flex-col justify-center gap-[4vh]">
          {/* Section header - Mobile */}
          <div className="animate-fade-in-up">
            <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-xs mb-1">
              Équipe
            </p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
          </div>

          {founders.map((founder, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Photo + Name + Bio in horizontal layout */}
              <div className="flex items-start gap-3">
                {/* Circular photo with gold ring - smaller */}
                <div className="relative flex-shrink-0">
                  <div className="w-[5vh] h-[5vh] rounded-full p-[2px] bg-gradient-to-br from-gold via-gold/60 to-gold">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-rose to-beige">
                      <Image
                        src="/images/placeholder-team.svg"
                        alt={founder.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* Name + Role + Bio - more compact */}
                <div className="flex-1 min-w-0">
                  <p className="font-greatvibes text-[2.4vh] text-navy leading-normal">{founder.name}</p>
                  <p className="font-montserrat uppercase tracking-wider text-[1.1vh] text-gold">
                    {founder.role}
                  </p>
                  <p className="font-source text-[1.35vh] text-navy/70 leading-snug mt-[0.3vh]">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop layout - 3 column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Photo centrée avec ring doré */}
              <div className="relative mx-auto mb-6 w-28 h-28 xl:w-32 xl:h-32">
                <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-gold via-gold/60 to-gold/30 group-hover:from-gold group-hover:to-gold/60 transition-all duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-rose to-beige">
                    <Image
                      src="/images/placeholder-team.svg"
                      alt={founder.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                {/* Decorative dot on hover */}
                <div className="absolute -bottom-1 right-1/2 translate-x-1/2 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Nom en Great Vibes */}
              <p className="font-greatvibes text-3xl xl:text-4xl text-navy mb-2">
                {founder.name}
              </p>

              {/* Rôle en gold */}
              <p className="font-montserrat uppercase tracking-wider text-[10px] xl:text-xs text-gold font-medium mb-4">
                {founder.role}
              </p>

              {/* Bio */}
              <p className="font-source text-sm text-navy/70 leading-relaxed px-2">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
