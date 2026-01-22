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
      <div className="container-impulse px-4 h-full flex flex-col">
        {/* Section header */}
        <div className="mb-2 animate-fade-in-up flex-shrink-0">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-2">
            3 Piliers
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Triangle visual with pillars - Desktop */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="relative flex flex-col items-center">

            {/* Pillar 1 - apprendre - centered at top */}
            <div className="text-center mb-4 animate-fade-in-up">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center font-source text-xl text-gold">
                  1
                </span>
                <span className="font-greatvibes text-6xl text-navy">
                  {pillars[0].title}
                </span>
              </div>
              <p className="font-cormorant text-xl text-navy/70">
                {pillars[0].description}
              </p>
            </div>

            {/* Triangle SVG */}
            <div className="relative">
              <svg
                viewBox="0 0 400 280"
                className="w-[420px] h-auto"
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

            {/* Bottom pillars row - with more space between */}
            <div className="flex justify-center gap-36 mt-4">
              {/* Pillar 2 - s'entraider - bottom left */}
              <div className="text-center animate-fade-in-up delay-100">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center font-source text-xl text-gold">
                    2
                  </span>
                  <span className="font-greatvibes text-6xl text-navy">
                    {pillars[1].title}
                  </span>
                </div>
                <p className="font-cormorant text-xl text-navy/70">
                  {pillars[1].description}
                </p>
              </div>

              {/* Pillar 3 - réussir - bottom right */}
              <div className="text-center animate-fade-in-up delay-200">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center font-source text-xl text-gold">
                    3
                  </span>
                  <span className="font-greatvibes text-6xl text-navy">
                    {pillars[2].title}
                  </span>
                </div>
                <p className="font-cormorant text-xl text-navy/70">
                  {pillars[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet - Vertical list with better centering */}
        <div className="lg:hidden min-h-[calc(100dvh-140px)] flex items-center justify-center -mt-8">
          <div className="space-y-10">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="flex items-start gap-5 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center font-source text-xl text-gold flex-shrink-0">
                  {pillar.number}
                </span>
                <div>
                  <p className="font-greatvibes text-4xl text-navy mb-2">
                    {pillar.title}
                  </p>
                  <p className="font-cormorant text-xl text-navy/70">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
