'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

type Props = { photos: string[]; title: string };

export default function EventGallery({ photos, title }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section className="px-6 md:px-8 pb-6 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-navy/70">
          Galerie
        </h3>
        <span className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold">
          {photos.length} photo{photos.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`relative overflow-hidden rounded-lg group ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3]' : 'aspect-square'}`}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        title={title}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex(i => i === null ? null : (i - 1 + photos.length) % photos.length)}
        onNext={() => setOpenIndex(i => i === null ? null : (i + 1) % photos.length)}
      />
    </section>
  );
}
