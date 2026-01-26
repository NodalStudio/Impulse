export default function Pillars() {
  const pillars = [
    {
      number: "1",
      title: "apprendre",
      description: "des contenus et échanges actionnables"
    },
    {
      number: "2",
      title: "s'entraider",
      description: "intelligence collective et soutien réel"
    },
    {
      number: "3",
      title: "réussir",
      description: "posture, visibilité, décisions alignées"
    }
  ];

  return (
    <section id="piliers" className="snap-section section bg-cream">
      <div className="container-impulse px-4 h-full flex flex-col lg:py-0">
        {/* Triangle visual with pillars - Desktop - scaled for smaller viewports */}
        <div className="hidden lg:flex mb-10 flex-1 items-center justify-center">
          <div className="relative flex flex-col items-center scale-[0.85] xl:scale-100 origin-center">

            {/* Section header - inside centered container */}
            <div className="mb-8 animate-fade-in-up text-left self-start">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm lg:text-xl mb-1">
                3 Piliers
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            </div>

            {/* Pillar 1 - apprendre - centered at top */}
            <div className="text-center mb-[1vh] animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="w-[5vh] h-[5vh] rounded-full border-2 border-gold flex items-center justify-center font-source text-[2vh] text-gold">
                  1
                </span>
                <span className="font-greatvibes text-[6vh] text-navy">
                  {pillars[0].title}
                </span>
              </div>
              <p className="font-cormorant text-[2vh] text-navy/70">
                {pillars[0].description}
              </p>
            </div>

            {/* Triangle SVG - dynamic height */}
            <div className="relative">
              <svg
                viewBox="0 0 400 280"
                className="w-[50vh] max-w-[420px] h-auto"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(30, 58, 95, 0.1))' }}
              >
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5e6e0" />
                    <stop offset="100%" stopColor="#efe8e1" />
                  </linearGradient>
                </defs>
                <path
                  d="M200 20 L380 260 L20 260 Z"
                  fill="url(#triangleGradient)"
                  stroke="#1e3a5f"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                />
              </svg>
            </div>

            {/* Bottom pillars row */}
            <div className="flex justify-center gap-[15vh] mt-[1vh]">
              {/* Pillar 2 - s'entraider */}
              <div className="text-center animate-fade-in-up delay-100">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="w-[5vh] h-[5vh] rounded-full border-2 border-gold flex items-center justify-center font-source text-[2vh] text-gold">
                    2
                  </span>
                  <span className="font-greatvibes text-[6vh] text-navy">
                    {pillars[1].title}
                  </span>
                </div>
                <p className="font-cormorant text-[2vh] text-navy/70">
                  {pillars[1].description}
                </p>
              </div>

              {/* Pillar 3 - réussir */}
              <div className="text-center animate-fade-in-up delay-200">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="w-[5vh] h-[5vh] rounded-full border-2 border-gold flex items-center justify-center font-source text-[2vh] text-gold">
                    3
                  </span>
                  <span className="font-greatvibes text-[6vh] text-navy">
                    {pillars[2].title}
                  </span>
                </div>
                <p className="font-cormorant text-[2vh] text-navy/70">
                  {pillars[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile - Pillars fill viewport */}
        <div className="lg:hidden flex-1 flex flex-col justify-center gap-[4vh]">
          {/* Section header - Mobile */}
          <div className="animate-fade-in-up">
            <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-1">
              3 Piliers
            </p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
          </div>

          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="w-[6vh] h-[6vh] rounded-full border-2 border-gold flex items-center justify-center font-source text-[2.2vh] text-gold flex-shrink-0">
                {pillar.number}
              </span>
              <div>
                <p className="font-greatvibes text-[4.5vh] text-navy mb-[0.3vh]">
                  {pillar.title}
                </p>
                <p className="font-cormorant text-[2.2vh] text-navy/70">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
