'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type Props = {
  photos: string[];
  index: number | null;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ photos, index, title, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 text-white/85 hover:text-white text-3xl leading-none"
      >
        ×
      </button>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Photo précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Photo suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl"
      >
        ›
      </button>
      <div
        className="relative w-full max-w-5xl aspect-[3/2]"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt={`${title} — photo ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
        <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
