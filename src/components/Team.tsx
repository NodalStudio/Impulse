import Image from "next/image";

const founders = [
  {
    name: "Anaïs Derenne",
    role: "Expérience membre & facilitation",
    image: "/images/team-anais.png",
    alt: "Anaïs Derenne, co-fondatrice d'Impulse Barcelone, facilitatrice en talents et fondatrice de BeauBOULOT",
    bio: "Facilitatrice en talents et fondatrice de BeauBOULOT, Anaïs accompagne depuis plus de 10 ans les décideurs et les équipes sur les enjeux de recrutement, d'évaluation et de sens au travail. Elle rejoint l'équipe d'IMPULSE en 2025, avec l'envie de fédérer un collectif de femmes ambitieuses, inspirantes et engagées dans leur développement professionnel. Elle est garante de l'expérience membre et de la facilitation des ateliers.",
  },
  {
    name: "Marina Serr",
    role: "Fondatrice & vision Impulse",
    image: "/images/team-marina.png",
    alt: "Marina Serr, fondatrice d'Impulse Barcelone, business coach certifiée accompagnant entrepreneurs et dirigeants",
    bio: "Business coach certifiée, Marina guide entrepreneurs, dirigeants et cadres dans des phases clés de structuration, de transition et de montée en posture. Elle a déjà accompagné plus de 100 leaders. Fondatrice du RDV des entrepreneuses en 2022, devenu IMPULSE en 2026, elle croit en la force d'un collectif exigeant et humain comme levier de réussite pour les femmes. Elle est garante de la vision, du cadre, de la dynamique collective et de la cohérence globale d'IMPULSE.",
  },
  {
    name: "Sophie Bernicke",
    role: "Structure & cohésion du collectif",
    image: "/images/team-sophie.png",
    alt: "Sophie Bernicke, co-fondatrice d'Impulse Barcelone, naturopathe spécialisée dans le mieux vieillir",
    bio: "Naturopathe spécialisée dans le mieux vieillir, Sophie accompagne les femmes à retrouver énergie et vitalité durablement grâce une approche globale, bienveillante et pragmatique. Engagée au sein d'IMPULSE depuis 2025, elle porte la conviction que la puissance du collectif nourrit l'énergie humaine et soutient une transformation professionnelle durable. Elle est garante de la structure et de la facilitation globale du collectif.",
  },
];

export default function Team() {
  return (
    <section id="equipe" className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 lg:mb-14 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
            Équipe
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-8">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Circular photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-white shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gold">
                      <Image
                        src={founder.image}
                        alt={founder.alt}
                        width={80}
                        height={100}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-script text-lg text-navy mb-1">
                    {founder.name}
                  </p>
                  <p className="font-montserrat uppercase tracking-wider text-[10px] text-gold font-medium mb-2">
                    {founder.role}
                  </p>
                  <p className="font-montserrat text-xs text-navy/60 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clip path for desktop photos */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <clipPath id="photo-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 L 1 0 L 1 0.56 A 0.5 0.44 0 0 1 0 0.56 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="group animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Photo */}
              <div className="relative mx-auto mb-6 w-28 h-28 xl:w-40 xl:h-40 transition-all duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,162,39,0.25)]">
                <div className="absolute -inset-[10px] rounded-full border border-navy/[0.08]" />
                <div className="absolute inset-0 rounded-full bg-white shadow-md" />
                <div className="absolute inset-[4px] rounded-full bg-gold" />
                <div className="absolute left-[4px] right-[4px] bottom-[4px] photo-clip-container">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-top object-cover grayscale-[15%]"
                  />
                </div>
              </div>

              <p className="font-script text-3xl xl:text-4xl text-navy mb-6">
                {founder.name}
              </p>

              <p className="font-montserrat uppercase tracking-wider text-[10px] xl:text-xs text-gold font-medium mb-4">
                {founder.role}
              </p>

              <p className="font-montserrat text-sm text-navy/60 leading-relaxed px-2">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
