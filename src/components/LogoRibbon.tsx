'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { PartnerItem } from '@/lib/sections';

const BASE_RATE = 1;
const SCRUB_RATE = 8;

function LogoCell({ partner }: { partner: PartnerItem }) {
  const inner = (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={240}
      height={120}
      className="max-h-24 md:max-h-36 w-auto max-w-[80%] object-contain transition-transform duration-500 hover:scale-[1.04]"
    />
  );

  const cellClass =
    'flex items-center justify-center bg-white shrink-0 w-[200px] md:w-[300px] min-h-[150px] md:min-h-[190px] px-3 border-r border-gold/15 transition-colors duration-300';

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} — ouvrir le site`}
        className={`${cellClass} hover:bg-blush/50`}
      >
        {inner}
      </a>
    );
  }

  return <div className={cellClass}>{inner}</div>;
}

function ScrubControl({
  side,
  onScrub,
  onRelease,
}: {
  side: 'left' | 'right';
  onScrub: () => void;
  onRelease: () => void;
}) {
  const isLeft = side === 'left';
  return (
    <button
      type="button"
      aria-label={isLeft ? 'Faire défiler vers l’arrière' : 'Faire défiler vers l’avant'}
      onMouseEnter={onScrub}
      onMouseLeave={onRelease}
      onFocus={onScrub}
      onBlur={onRelease}
      className={[
        'absolute inset-y-0 z-10 flex items-center w-14 md:w-20 text-navy/70 hover:text-navy',
        'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300',
        isLeft
          ? 'left-0 justify-start pl-3 bg-gradient-to-r from-white via-white/85 to-transparent'
          : 'right-0 justify-end pr-3 bg-gradient-to-l from-white via-white/85 to-transparent',
      ].join(' ')}
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

export default function LogoRibbon({ logos }: { logos: PartnerItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const anim = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: 50000, iterations: Infinity, easing: 'linear' }
    );
    animRef.current = anim;
    return () => anim.cancel();
  }, []);

  const setRate = (rate: number) => {
    if (animRef.current) animRef.current.playbackRate = rate;
  };

  return (
    <div className="group relative flex-1 overflow-hidden bg-white">
      <div ref={trackRef} className="flex w-max">
        {/* Two identical tracks for a seamless loop */}
        {[0, 1].map((track) => (
          <div key={track} className="flex shrink-0" aria-hidden={track === 1}>
            {logos.map((partner, index) => (
              <LogoCell key={`${track}-${index}`} partner={partner} />
            ))}
          </div>
        ))}
      </div>

      <ScrubControl side="left" onScrub={() => setRate(-SCRUB_RATE)} onRelease={() => setRate(BASE_RATE)} />
      <ScrubControl side="right" onScrub={() => setRate(SCRUB_RATE)} onRelease={() => setRate(BASE_RATE)} />
    </div>
  );
}
