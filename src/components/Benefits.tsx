import type { BenefitsContent } from '@/lib/sections';

export default function Benefits({ content }: { content: BenefitsContent }) {
  const benefits = content.benefits;

  return (
    <section className="py-20 md:py-28 bg-blush">
      <div className="container-impulse px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 md:mb-14 animate-fade-in-up">
          <p className="font-montserrat uppercase tracking-[0.3em] text-navy/70 text-xs lg:text-sm mb-3">
            {content.eyebrow}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Benefits grid — two columns on desktop for visual interest */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10 max-w-4xl">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-start gap-3 lg:gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2.5" />
                <div>
                  <p className="font-tenor text-lg lg:text-xl text-navy mb-1.5">
                    {benefit.title}
                  </p>
                  <p className="font-montserrat text-sm lg:text-base text-navy/70 leading-relaxed">
                    {benefit.description}
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
