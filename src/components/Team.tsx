import Image from 'next/image';

const founders = [
  {
    name: "Anaïs Derenne",
    role: "Expérience membre & facilitation",
    image: "/images/team-anais.png",
    bio: "Facilitatrice en talents et fondatrice de BeauBOULOT, Anaïs accompagne depuis plus de 10 ans les décideurs et les équipes sur les enjeux de recrutement, d'évaluation et de sens au travail. Elle rejoint l'équipe d'IMPULSE en 2025, avec l'envie de fédérer un collectif de femmes ambitieuses, inspirantes et engagées dans leur développement professionnel. Elle est garante de l'expérience membre et de la facilitation des ateliers."
  },
  {
    name: "Marina Serr",
    role: "Fondatrice & vision Impulse",
    image: "/images/team-marina.png",
    bio: "Business coach certifiée, Marina guide entrepreneurs, dirigeants et cadres dans des phases clés de structuration, de transition et de montée en posture. Elle a déjà accompagné plus de 100 leaders. Fondatrice du RDV des entrepreneuses en 2022, devenu IMPULSE en 2026, elle croit en la force d'un collectif exigeant et humain comme levier de réussite pour les femmes. Elle est garante de la vision, du cadre, de la dynamique collective et de la cohérence globale d'IMPULSE."
  },
  {
    name: "Sophie Bernicke",
    role: "Structure & cohésion du collectif",
    image: "/images/team-sophie.png",
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
        <div className="lg:hidden flex-1 flex flex-col justify-evenly">
          {/* Section header - Mobile */}
          <div className="animate-fade-in-up">
            <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-1">
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
                {/* Circular photo — white ring, gold fill */}
                <div className="relative flex-shrink-0">
                  <div className="w-[8vh] h-[8vh] rounded-full p-[2px] bg-white shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gold">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        width={80}
                        height={100}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
                {/* Name + Role + Bio - more compact */}
                <div className="flex-1 min-w-0">
                  <p className="font-greatvibes text-xs mb-2 text-navy leading-normal">{founder.name}</p>
                  <p className="font-montserrat uppercase tracking-wider text-[1.1vh] text-gold">
                    {founder.role}
                  </p>
                  <p className="font-source text-xs text-navy/70 leading-snug mt-[0.3vh]">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clip path: flat top (head overflows), semicircular bottom matching gold circle */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <clipPath id="photo-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 L 1 0 L 1 0.56 A 0.5 0.44 0 0 1 0 0.56 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Desktop layout - 3 column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Photo — gold circle, white ring, navy accent, head overflow */}
              <div className="relative mx-auto mb-6 w-28 h-28 xl:w-40 xl:h-40 transition-all duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,162,39,0.3)]">
                {/* Thin decorative navy ring */}
                <div className="absolute -inset-[10px] rounded-full border border-navy/[0.12]" />
                {/* White ring with shadow */}
                <div className="absolute inset-0 rounded-full bg-white shadow-md" />
                {/* Gold circle fill */}
                <div className="absolute inset-[4px] rounded-full bg-gold" />
                {/* Photo — SVG clip: flat top (head overflows freely), semicircular bottom */}
                <div
                  className="absolute left-[4px] right-[4px] bottom-[4px]"
                  style={{ top: '-10%', clipPath: 'url(#photo-clip)' }}
                >
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-top object-cover grayscale-[15%]"
                  />
                </div>
              </div>

              {/* Nom en Great Vibes */}
              <p className="font-greatvibes text-3xl xl:text-4xl text-navy mb-6">
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
