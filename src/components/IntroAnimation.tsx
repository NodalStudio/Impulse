'use client';

import { useEffect, useLayoutEffect, useRef, RefObject } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onLogoLanded: () => void;
  onComplete: () => void;
  headerLogoRef: RefObject<HTMLAnchorElement | null>;
}

export default function IntroAnimation({
  onLogoLanded,
  onComplete,
  headerLogoRef,
}: IntroAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);

  // Measure header logo position → inject CSS custom properties for the move animation
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const headerLogo = headerLogoRef.current;
    const logoWrapper = logoWrapperRef.current;
    if (!overlay || !headerLogo || !logoWrapper) return;

    requestAnimationFrame(() => {
      const headerRect = headerLogo.getBoundingClientRect();
      const introRect = logoWrapper.getBoundingClientRect();

      // Translation: from intro logo center → header logo center
      const tx =
        headerRect.left +
        headerRect.width / 2 -
        (introRect.left + introRect.width / 2);
      const ty =
        headerRect.top +
        headerRect.height / 2 -
        (introRect.top + introRect.height / 2);

      // Scale: shrink intro logo to header logo size
      const scale = headerRect.height / introRect.height;

      overlay.style.setProperty('--intro-tx', `${tx}px`);
      overlay.style.setProperty('--intro-ty', `${ty}px`);
      overlay.style.setProperty('--intro-scale', `${scale}`);
    });
  }, [headerLogoRef]);

  // Lock scroll, freeze page animations, schedule phase callbacks
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onLogoLanded();
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('intro-active');

    // Logo reaches header position → show real header logo
    const landedTimer = setTimeout(onLogoLanded, 1800);

    // Wipe starts → unfreeze hero animations so they cascade under the wipe
    const unfreezeTimer = setTimeout(() => {
      document.documentElement.classList.remove('intro-active');
    }, 1850);

    // Overlay wipe finishes → clean up
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 2550);

    return () => {
      clearTimeout(landedTimer);
      clearTimeout(unfreezeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
      document.documentElement.classList.remove('intro-active');
    };
  }, [onLogoLanded, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay noise-overlay"
      aria-hidden="true"
    >
      {/* Gold halo */}
      <div className="intro-halo" />

      {/* Centered logo + decorative line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center">
          {/* Logo wrapper — animates from center to header */}
          <div ref={logoWrapperRef} className="intro-logo-wrapper">
            <Image
              src="/images/logo-light.svg"
              alt=""
              width={450}
              height={190}
              className="intro-logo-img h-[80px] md:h-[120px] w-auto"
              priority
            />
            {/* Golden shimmer sweep */}
            <div className="intro-shimmer" />
          </div>

          {/* Gold decorative line */}
          <div className="intro-line" />
        </div>
      </div>
    </div>
  );
}
