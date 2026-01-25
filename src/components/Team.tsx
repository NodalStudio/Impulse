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
      <div className="container-impulse px-4 h-full flex flex-col justify-center pt-[8vh] pb-[2vh] lg:py-4">
        {/* Section header */}
        <div className="mb-[1vh] lg:mb-[1.5vh] animate-fade-in-up flex-shrink-0 text-center lg:text-left">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-xs lg:text-sm mb-1">
            Équipe
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent mx-auto lg:mx-0"></div>
        </div>

        {/* Mobile layout - Cards fill viewport height */}
        <div className="lg:hidden flex-1 flex flex-col justify-between gap-[1vh]">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="animate-fade-in-up flex-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Photo + Name + Bio in horizontal layout */}
              <div className="flex items-start gap-3">
                {/* Circular photo with gold ring - smaller */}
                <div className="relative flex-shrink-0">
                  <div className="w-[5.5vh] h-[5.5vh] rounded-full p-[2px] bg-gradient-to-br from-gold via-gold/60 to-gold">
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
                  <p className="font-greatvibes text-[2.6vh] text-navy leading-none">{founder.name}</p>
                  <p className="font-montserrat uppercase tracking-wider text-[1.2vh] text-gold">
                    {founder.role}
                  </p>
                  <p className="font-source text-[1.4vh] text-navy/70 leading-snug line-clamp-2 mt-[0.3vh]">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop layout - Elegant horizontal cards with circular photos */}
        <div className="hidden lg:flex lg:flex-col gap-[1.5vh] xl:gap-[2vh] max-w-4xl mx-auto w-full">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4 xl:gap-5 p-[1.5vh] xl:p-[2vh] rounded-2xl bg-white/60 backdrop-blur-sm border border-beige/30 hover:bg-white/80 hover:shadow-lg transition-all duration-500">
                {/* Circular photo with gold ring */}
                <div className="relative flex-shrink-0">
                  <div className="w-[9vh] h-[9vh] min-w-[70px] min-h-[70px] max-w-[100px] max-h-[100px] rounded-full p-[2px] bg-gradient-to-br from-gold via-gold/70 to-gold/40 group-hover:from-gold group-hover:via-gold group-hover:to-gold/60 transition-all duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-rose to-beige">
                      <Image
                        src="/images/placeholder-team.svg"
                        alt={founder.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {/* Decorative dot */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name + Role inline */}
                  <div className="flex items-baseline gap-3 mb-[0.5vh] flex-wrap">
                    <p className="font-greatvibes text-[clamp(1.5rem,3.5vh,2rem)] text-navy leading-none">
                      {founder.name}
                    </p>
                    <p className="font-montserrat uppercase tracking-[0.15em] text-[10px] xl:text-[11px] text-gold font-medium">
                      {founder.role}
                    </p>
                  </div>
                  {/* Bio */}
                  <p className="font-source text-[clamp(0.7rem,1.4vh,0.8rem)] text-navy/70 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
