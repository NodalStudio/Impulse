import type { SolutionContent } from '@/lib/sections';

export default function Solution({ content }: { content: SolutionContent }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Mobile layout */}
        <div className="lg:hidden space-y-8">
          {/* Intention */}
          <div className="animate-slide-left">
            <div className="mb-4">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs mb-3">
                {content.intentionEyebrow}
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>

            <p className="font-tenor text-xl text-navy leading-snug">
              {content.intentionMobileText1Before}
              <span className="text-gold font-medium">{content.intentionMobileText1Gold}</span>
              {content.intentionMobileText1After}
            </p>
            <p className="font-script text-xl text-navy mt-1">
              {content.intentionMobileScript}
            </p>
          </div>

          {/* Ambition */}
          <div className="relative bg-navy rounded-sm p-6 text-white overflow-hidden noise-overlay animate-slide-right">
            <div className="relative z-10">
              <div className="mb-4">
                <p className="font-montserrat uppercase tracking-[0.3em] text-gold/70 text-xs mb-3">
                  {content.ambitionEyebrow}
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />
              </div>

              <p className="font-tenor text-xl text-blush leading-snug">
                {content.ambitionFaireDe}<span className="font-montserrat uppercase tracking-[0.15em] font-semibold text-sm">{content.ambitionBrand}</span>
              </p>
              <p className="font-script text-xl text-blush mt-2">
                {content.ambitionScript}
              </p>
              <p className="font-tenor text-xl text-blush leading-snug mt-2">
                {content.ambitionMobileDesPrefix}<span className="text-gold font-medium">{content.ambitionMobileGold}</span>{content.ambitionMobileSuffix}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start w-full">
          {/* Left - Intention */}
          <div className="animate-slide-left pt-12">
            <div className="mb-8">
              <p className="font-montserrat uppercase tracking-[0.3em] text-navy/50 text-xs lg:text-sm mb-3">
                {content.intentionEyebrow}
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>

            <p className="font-tenor text-3xl text-navy leading-relaxed">
              {content.intentionDesktopBefore}<span className="text-gold font-medium">{content.intentionDesktopGold}</span>
              <br />
              {content.intentionDesktopMiddle1}
              <br />
              {content.intentionDesktopMiddle2}
              <br />
              <span className="font-script text-4xl">{content.intentionDesktopScript}</span>
            </p>
          </div>

          {/* Right - Ambition */}
          <div className="relative bg-navy rounded-sm p-12 text-white overflow-hidden noise-overlay animate-slide-right">
            <div className="relative z-10">
              <div className="mb-8">
                <p className="font-montserrat uppercase tracking-[0.3em] text-gold/70 text-xs lg:text-sm mb-3">
                  {content.ambitionEyebrow}
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />
              </div>

              <p className="font-tenor text-3xl text-blush leading-relaxed">
                {content.ambitionFaireDe}<span className="font-montserrat uppercase tracking-[0.2em] font-semibold">{content.ambitionBrand}</span>
              </p>
              <p className="font-script text-4xl text-blush mt-4">
                {content.ambitionScript}
              </p>
              <p className="font-tenor text-3xl mt-4">
                {content.ambitionDesktopDesPrefix}<span className="text-gold font-medium">{content.ambitionDesktopGold}</span>
              </p>
              <p className="font-tenor text-3xl text-blush mt-4">
                {content.ambitionDesktopCity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
