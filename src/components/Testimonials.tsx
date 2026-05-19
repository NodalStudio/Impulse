import type { TestimonialsContent } from '@/lib/sections';

export default function Testimonials({ content }: { content: TestimonialsContent }) {
  const testimonials = content.testimonials;
  const highlights = content.highlights;

  return (
    <section id="temoignages" className="py-20 md:py-28 bg-blush">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
            {content.eyebrow}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Desktop layout — asymmetric masonry */}
        <div className="hidden lg:block">
          {/* Highlights banner */}
          <div className="flex items-center justify-center gap-6 mb-12 animate-fade-in-up">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {highlights.map((highlight, index) => (
                <span
                  key={highlight}
                  className="font-tenor text-sm text-navy/70 flex items-center gap-3"
                >
                  {highlight}
                  {index < highlights.length - 1 && (
                    <span className="text-gold text-sm">·</span>
                  )}
                </span>
              ))}
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
          </div>

          {/* Testimonials grid */}
          <div className="relative max-w-6xl mx-auto">
            {/* Large decorative quote */}
            <span className="absolute -top-4 left-0 text-[120px] leading-none text-gold/8 font-serif select-none pointer-events-none">
              &ldquo;
            </span>

            <div className="grid grid-cols-12 gap-5">
              {/* Featured large testimonial */}
              <div className="col-span-5 row-span-2 bg-white rounded-sm p-8 shadow-sm border-l-2 border-gold animate-fade-in-up relative mt-8">
                <p className="font-tenor text-xl text-navy leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[4].quote}&rdquo;
                </p>
                <p className="font-script text-2xl text-navy">
                  {testimonials[4].author}
                </p>
              </div>

              {/* Top right — medium card */}
              <div className="col-span-4 bg-rose/40 rounded-sm p-6 animate-fade-in-up delay-100">
                <span className="text-gold text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-tenor text-base text-navy leading-relaxed mt-2 mb-4">
                  {testimonials[0].quote}
                </p>
                <p className="font-script text-lg text-navy text-right">
                  {testimonials[0].author}
                </p>
              </div>

              {/* Far right — navy accent card */}
              <div className="col-span-3 bg-navy rounded-sm p-5 text-white animate-fade-in-up delay-150 flex flex-col justify-between">
                <span className="text-gold/60 text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-tenor text-sm text-blush/80 leading-relaxed mt-2">
                  {testimonials[2].quote}
                </p>
                <p className="font-script text-lg text-gold mt-3 text-right">
                  {testimonials[2].author}
                </p>
              </div>

              {/* Bottom middle-left */}
              <div className="col-span-4 col-start-6 bg-white rounded-sm p-6 shadow-sm animate-fade-in-up delay-200 -mt-4">
                <span className="text-gold text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-tenor text-base text-navy leading-relaxed mt-2 mb-4">
                  {testimonials[1].quote}
                </p>
                <p className="font-script text-lg text-navy text-right">
                  {testimonials[1].author}
                </p>
              </div>

              {/* Bottom right */}
              <div className="col-span-3 bg-rose/30 rounded-sm p-5 animate-fade-in-up delay-250">
                <span className="text-gold text-2xl leading-none font-serif">&ldquo;</span>
                <p className="font-tenor text-sm text-navy leading-relaxed mt-2 mb-3">
                  {testimonials[3].quote}
                </p>
                <p className="font-script text-lg text-navy text-right">
                  {testimonials[3].author}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-4">
          {/* Highlights */}
          <div className="bg-white rounded-sm p-4 border border-gold/15">
            <p className="font-script text-base text-navy text-center mb-2">
              {content.mobileHighlightsTitle}
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {highlights.slice(0, 3).map((highlight) => (
                <span key={highlight} className="font-tenor text-xs text-navy/70 flex items-center gap-1">
                  <span className="text-gold">·</span>
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials cards */}
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <div
              key={testimonial.quote}
              className={`rounded-sm p-4 animate-fade-in-up ${
                index === 0 ? 'bg-white shadow-sm border-l-2 border-gold' : 'bg-rose/30'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-gold text-lg leading-none font-serif">&ldquo;</span>
              <p className="font-tenor text-sm text-navy leading-relaxed mt-1 mb-2">
                {testimonial.quote}
              </p>
              <p className="font-script text-base text-navy text-right">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
