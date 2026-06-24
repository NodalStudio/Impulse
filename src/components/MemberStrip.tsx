'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { PartnerItem } from '@/lib/sections';

const DURATION = 60000; // ms for one full content-width drift

/**
 * Discreet "colophon" of community members. Logos are unified to a single
 * muted ink (grayscale + low opacity) so they read as a quiet typographic
 * texture rather than a billboard; hovering one blooms it back to full colour.
 * The strip drifts slowly on its own, pauses while hovered/focused (so members
 * with a link can be clicked), and can be grabbed and dragged to scrub manually.
 */
function MemberLogo({ partner }: { partner: PartnerItem }) {
  const img = (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={160}
      height={64}
      draggable={false}
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
        draggable={false}
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
  const animRef = useRef<Animation | null>(null);
  const drag = useRef({
    hovering: false,
    down: false,
    dragging: false,
    startX: 0,
    startTime: 0,
    contentW: 0,
    moved: 0,
    suppressClick: false,
  });

  const DRAG_THRESHOLD = 6; // px before a press becomes a drag (vs a click)

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const anim = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: DURATION, iterations: Infinity, easing: 'linear' }
    );
    animRef.current = anim;
    return () => anim.cancel();
  }, [logos.length]);

  // Auto-play unless the user is hovering/focusing or actively dragging.
  const syncPlay = () => {
    const a = animRef.current;
    const s = drag.current;
    if (!a) return;
    if (s.hovering || s.dragging) a.pause();
    else a.play();
  };

  const onEnter = () => {
    drag.current.hovering = true;
    syncPlay();
  };
  const onLeave = () => {
    drag.current.hovering = false;
    syncPlay();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = animRef.current;
    const track = trackRef.current;
    if (!a || !track) return;
    if (e.button !== 0) return; // primary button / touch only
    const s = drag.current;
    s.down = true;
    s.dragging = false;
    s.suppressClick = false;
    s.startX = e.clientX;
    s.moved = 0;
    s.startTime = (a.currentTime as number) ?? 0;
    // One content copy = half the doubled track; the drift covers it per loop.
    s.contentW =
      (track.firstElementChild as HTMLElement)?.getBoundingClientRect().width ||
      track.scrollWidth / 2;
    a.pause(); // hold still during the press, but DON'T capture yet —
    // capturing here would retarget the click to the container, so a plain
    // click on a member would never reach its link.
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    const a = animRef.current;
    if (!s.down || !a || !s.contentW) return;
    const dx = e.clientX - s.startX;
    s.moved = Math.max(s.moved, Math.abs(dx));
    if (!s.dragging) {
      if (s.moved <= DRAG_THRESHOLD) return; // still could be a click
      s.dragging = true;
      e.currentTarget.setPointerCapture?.(e.pointerId); // now own the gesture
    }
    // Dragging right reveals earlier logos → rewind the timeline; wrap to loop.
    let t = s.startTime - dx * (DURATION / s.contentW);
    t = ((t % DURATION) + DURATION) % DURATION;
    a.currentTime = t;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    if (!s.down) return;
    if (s.dragging) {
      s.suppressClick = true; // a drag, not a click — don't open a link
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    }
    s.down = false;
    s.dragging = false;
    syncPlay();
  };

  // Swallow the click that follows a drag; let a plain click reach its link.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.suppressClick = false;
    }
  };

  return (
    <div
      className="relative overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocusCapture={onEnter}
      onBlurCapture={onLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
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
