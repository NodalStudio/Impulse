import Image from 'next/image';

const founders = [
  {
    name: "Anaïs Devenne",
    role: "Expérience membre & facilitation",
    bio: "Facilitatrice en talents et fondatrice de BeauBOULOT, Anaïs accompagne depuis plus de 10 ans les décideurs et les équipes sur les enjeux de recrutement, d'évaluation et de sens au travail. Elle rejoint l'équipe d'IMPULSE en 2025, avec l'envie de fédérer un collectif de femmes ambitieuses, inspirantes et engagées dans leur développement professionnel. Elle est garante de l'expérience membre et de la facilitation des ateliers."
  },
  {
    name: "Marina Gerr",
    role: "Fondatrice & vision Impulse",
    bio: "Business coach certifiée, Marina guide entrepreneurs, dirigeants et cadres dans des phases clés de structuration, de transition et de montée en posture. Elle a déjà accompagné plus de 100 leaders. Fondatrice du RDV des entrepreneuses en 2022, devenu IMPULSE en 2026, elle croit en la force d'un collectif exigeant et humain comme levier de réussite pour les femmes. Elle est garante de la vision, du cadre, de la dynamique collective et de la cohérence globale d'IMPULSE."
  },
  {
    name: "Sophie Bornicke",
    role: "Structure & cohésion du collectif",
    bio: "Naturopathe spécialisée dans le mieux vieillir, Sophie accompagne les femmes à retrouver énergie et vitalité durablement grâce une approche globale, bienveillante et pragmatique. Engagée au sein d'IMPULSE depuis 2025, elle porte la conviction que la puissance du collectif nourrit l'énergie humaine et soutient une transformation professionnelle durable. Elle est garante de la structure et de la facilitation globale du collectif."
  }
];

export default function Team() {
  return (
    <section id="equipe" className="snap-section section-alt">
      <div className="container-impulse px-4 h-full flex flex-col py-4 lg:py-6 justify-center">
        {/* Section header */}
        <div className="mb-3 lg:mb-4 animate-fade-in-up flex-shrink-0">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-1">
            Équipe
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Mobile layout - shows all text, fills viewport */}
        <div className="lg:hidden flex-1 flex flex-col gap-3">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up flex-1 flex min-h-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Photo */}
              <div className="w-24 flex-shrink-0 bg-gradient-to-br from-rose to-beige">
                <Image
                  src="/Impulse/images/placeholder-team.svg"
                  alt={founder.name}
                  width={96}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-3 flex flex-col">
                <p className="font-greatvibes text-xl text-navy leading-tight">{founder.name}</p>
                <p className="font-montserrat uppercase tracking-wider text-[8px] text-gold mb-1">
                  {founder.role}
                </p>
                <p className="font-source text-[10px] text-navy/70 leading-snug flex-1">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop layout - dynamic sizing based on viewport */}
        <div className="hidden lg:flex lg:gap-3 xl:gap-4 lg:justify-center">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="w-72 xl:w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Photo - dynamic height */}
              <div className="h-[12vh] xl:h-[15vh] relative overflow-hidden bg-gradient-to-br from-rose to-beige flex-shrink-0">
                <Image
                  src="/Impulse/images/placeholder-team.svg"
                  alt={founder.name}
                  width={300}
                  height={176}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-colors duration-300"></div>
              </div>

              {/* Info - dynamic text */}
              <div className="p-3 xl:p-4">
                <p className="font-greatvibes text-[clamp(1rem,2.5vh,1.25rem)] text-navy mb-0.5">{founder.name}</p>
                <p className="font-montserrat uppercase tracking-wider text-[8px] xl:text-[9px] text-gold mb-[0.5vh]">
                  {founder.role}
                </p>
                <p className="font-source text-[clamp(0.6rem,1.3vh,0.7rem)] text-navy/70 leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
