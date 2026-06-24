'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { PartnerItem } from '@/lib/sections';

/**
 * Discreet "colophon" of community members. Logos are unified to a single
 * muted ink (grayscale + low opacity) so they read as a quiet typographic
 * texture rather than a billboard; hovering one blooms it back to full colour.
 * A slow continuous drift, edge fades and no controls keep it whisper-quiet.
 */
function MemberLogo({ partner }: { partner: PartnerItem }) {
  const img = (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={160}
      height={64}
      className="h-12 md:h-[4.5rem] w-auto object-contain opacity-70 grayscale-[0.55] transition-all duration-500 hover:opacity-100 hover:grayscale-0"
    />
  );

  const cellClass = 'flex items-center justify-center shrink-0 px-7 md:px-10';

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} — ouvrir le site`}
        className={cellClass}
      >
        {img}
      </a>
    );
  }

  return <div className={cellClass}>{img}</div>;
}

export default function MemberStrip({ logos }: { logos: PartnerItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const anim = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: 60000, iterations: Infinity, easing: 'linear' }
    );
    return () => anim.cancel();
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        // Soft blush→transparent fade at both edges, so logos slip in and out.
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        maskImage:
          'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div ref={trackRef} className="flex w-max">
        {/* Two identical tracks for a seamless loop */}
        {[0, 1].map((track) => (
          <div
            key={track}
            className="flex shrink-0"
            // The clone is a visual duplicate for the seamless loop; `inert`
            // keeps its links out of the tab order and accessibility tree.
            {...(track === 1 ? { inert: true } : {})}
          >
            {logos.map((partner, index) => (
              <MemberLogo key={`${track}-${index}`} partner={partner} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
