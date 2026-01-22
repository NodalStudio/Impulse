const testimonials = [
  {
    quote: "Je chéris ces rdv qui ne sont pas networking mais concrets, axés vers la productivité et le développement personnel.",
    author: "Maud"
  },
  {
    quote: "J'aime particulièrement l'efficacité des ateliers de codéveloppement et l'utilisation de l'intelligence collective. Une révélation!",
    author: "Laure"
  },
  {
    quote: "Je suis particulièrement enthousiaste à cette idée de pouvoir contribuer en proposant mon sujet.",
    author: "Maud"
  },
  {
    quote: "Un cercle intime de femmes bienveillantes et inspirantes, dédié au partage d'outils précieux pour faire grandir son business!",
    author: "Isabelle"
  },
  {
    quote: "Ce groupe de femmes entrepreneuses est vraiment différent de tout ce que j'avais pu expérimenter avant. Bravo d'avoir apporté la touche du collectif (le vrai) !",
    author: "Laurita"
  }
];

const highlights = [
  "La diversité des sujets abordés",
  "Les spécialités de chaque femme",
  "L'énergie, l'entraide et la solidarité",
  "Les connaissances apprises, le pragmatisme",
  "La sororité, la bienveillance, l'ambiance chaleureuse"
];

export default function Testimonials() {
  return (
    <section id="temoignages" className="snap-section section bg-cream">
      <div className="container-impulse px-4 h-full flex flex-col py-4 lg:py-0 lg:justify-center">
        {/* Section header */}
        <div className="mb-3 lg:mb-8 animate-fade-in-up flex-shrink-0">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm mb-2">
            Témoignages
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
        </div>

        {/* Desktop layout - Creative asymmetric masonry */}
        <div className="hidden lg:block">
          {/* Highlights as horizontal flowing banner */}
          <div className="flex items-center justify-center gap-6 mb-10 animate-fade-in-up">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/50"></div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="font-cormorant text-base text-navy/80 flex items-center gap-3"
                >
                  {highlight}
                  {index < highlights.length - 1 && (
                    <span className="text-gold text-lg">·</span>
                  )}
                </span>
              ))}
            </div>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/50"></div>
          </div>

          {/* Testimonials in creative staggered layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Large decorative quote */}
            <span className="absolute -top-4 left-0 text-[120px] leading-none text-gold/10 font-serif select-none">
              &ldquo;
            </span>

            {/* Grid with varied positions */}
            <div className="grid grid-cols-12 gap-6">
              {/* Featured large testimonial - spans 5 cols, offset from top */}
              <div
                className="col-span-5 row-span-2 bg-white rounded-2xl p-8 shadow-lg border-l-4 border-gold animate-fade-in-up relative"
                style={{ marginTop: '2rem' }}
              >
                <p className="font-cormorant text-xl text-navy leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[4].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-beige flex items-center justify-center">
                    <span className="font-greatvibes text-lg text-navy">{testimonials[4].author[0]}</span>
                  </div>
                  <p className="font-greatvibes text-2xl text-navy">
                    {testimonials[4].author}
                  </p>
                </div>
              </div>

              {/* Top right - medium card */}
              <div
                className="col-span-4 bg-beige/60 rounded-2xl p-6 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <span className="text-gold text-3xl leading-none font-serif">&ldquo;</span>
                <p className="font-cormorant text-base text-navy leading-relaxed mt-2 mb-4">
                  {testimonials[0].quote}
                </p>
                <p className="font-greatvibes text-xl text-navy text-right">
                  {testimonials[0].author}
                </p>
              </div>

              {/* Far right - small accent card */}
              <div
                className="col-span-3 bg-navy rounded-2xl p-5 text-white animate-fade-in-up flex flex-col justify-between"
                style={{ animationDelay: '150ms' }}
              >
                <span className="text-gold/80 text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-cormorant text-sm text-white/90 leading-relaxed mt-2">
                  {testimonials[2].quote}
                </p>
                <p className="font-greatvibes text-lg text-gold mt-3 text-right">
                  {testimonials[2].author}
                </p>
              </div>

              {/* Bottom middle-left */}
              <div
                className="col-span-4 col-start-6 bg-white rounded-2xl p-6 shadow-md animate-fade-in-up"
                style={{ animationDelay: '200ms', marginTop: '-1rem' }}
              >
                <span className="text-gold text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-cormorant text-base text-navy leading-relaxed mt-2 mb-4">
                  {testimonials[1].quote}
                </p>
                <p className="font-greatvibes text-xl text-navy text-right">
                  {testimonials[1].author}
                </p>
              </div>

              {/* Bottom right */}
              <div
                className="col-span-3 bg-gradient-to-br from-rose/40 to-beige/60 rounded-2xl p-5 animate-fade-in-up"
                style={{ animationDelay: '250ms' }}
              >
                <span className="text-gold text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-cormorant text-sm text-navy leading-relaxed mt-2 mb-3">
                  {testimonials[3].quote}
                </p>
                <p className="font-greatvibes text-lg text-navy text-right">
                  {testimonials[3].author}
                </p>
              </div>
            </div>

            {/* Closing decorative quote */}
            <span className="absolute -bottom-8 right-0 text-[120px] leading-none text-gold/10 font-serif select-none rotate-180">
              &ldquo;
            </span>
          </div>
        </div>

        {/* Mobile/Tablet layout - fills full viewport height */}
        <div className="lg:hidden flex-1 flex flex-col gap-3">
          {/* Highlights - compact card */}
          <div className="bg-white rounded-xl p-4 border-2 border-gold/30">
            <p className="font-greatvibes text-xl text-navy text-center mb-3">
              Les points forts du groupe
            </p>
            <div className="space-y-1.5">
              {highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="font-cormorant text-sm text-navy flex items-center gap-2">
                  <span className="text-gold">·</span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          {/* 2 testimonials side by side - takes remaining space */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <div
                key={index}
                className="bg-beige/50 rounded-xl p-4 animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-gold text-lg leading-none">&ldquo;</span>
                <p className="font-cormorant text-sm text-navy leading-relaxed flex-1">
                  {testimonial.quote}
                </p>
                <p className="font-greatvibes text-lg text-navy text-right mt-2">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          {/* Featured testimonial at bottom */}
          <div className="bg-beige/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-gold text-lg leading-none">&ldquo;</span>
              <div className="flex-1">
                <p className="font-cormorant text-sm text-navy leading-relaxed">
                  {testimonials[3].quote}
                </p>
                <p className="font-greatvibes text-lg text-navy text-right mt-2">
                  {testimonials[3].author}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
