import Gallery from './Gallery';
import type { MissionContent } from '@/lib/sections';

export default function Mission({ content }: { content: MissionContent }) {
  return (
    <section id="mission" className="py-20 md:py-28 bg-white">
      <div className="container-impulse px-6 md:px-8">
        {/* Photo gallery with scroll-triggered reveal */}
        <Gallery />

        {/* Manifeste */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            {/* Decorative separator above manifesto */}
            <div className="flex items-center justify-center mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 mx-5" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            <blockquote className="font-tenor text-lg md:text-xl lg:text-2xl text-navy leading-relaxed mb-8 md:mb-10">
              <p className="mb-4">
                {content.paragraph1}
              </p>
              <p className="mb-4">
                {content.paragraph2Before}<span className="text-gold-deep font-medium">{content.paragraph2Gold}</span>{content.paragraph2After}
              </p>
              <p className="mb-4">
                {content.paragraph3Before}<span className="text-gold-deep font-medium">{content.paragraph3Gold}</span>{content.paragraph3After}
              </p>
              <p>
                <span className="text-gold-deep font-medium">{content.paragraph4Gold}</span>{content.paragraph4After}
              </p>
            </blockquote>

            {/* Tagline */}
            <p className="font-tenor text-xl md:text-2xl text-navy mb-8 md:mb-10 animate-fade-in-up delay-100">
              {content.tagline}
            </p>

            {/* Founders signatures */}
            <div className="border-t border-gold/20 pt-6 animate-fade-in-up delay-200">
              <p className="font-script text-xl md:text-2xl text-navy mb-3">
                {content.signature}
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
