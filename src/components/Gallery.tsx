"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/images/community-event.jpg",
    alt: "Événement business mensuel Impulse pour femmes entrepreneures à Barcelone",
  },
  {
    src: "/images/community-networking.jpg",
    alt: "Networking entre femmes d'affaires lors d'un atelier Impulse",
  },
  {
    src: "/images/community-garden.jpg",
    alt: "Communauté de femmes entrepreneures Impulse en extérieur à Barcelone",
  },
  {
    src: "/images/community-workshop.jpg",
    alt: "Atelier pratique de formation entrepreneuriat féminin Impulse",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll<HTMLElement>("[data-gallery-item]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay || 0);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) scale(1)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="mb-14 md:mb-20">
      {/* Asymmetric 2-row editorial layout */}
      <div className="grid grid-cols-5 gap-3 md:gap-4">
        {/* Row 1: 3/5 + 2/5 */}
        <div
          data-gallery-item
          data-delay="0"
          className="col-span-3 h-48 md:h-72 lg:h-80 overflow-hidden rounded-sm"
          style={{
            opacity: 0,
            transform: "translateY(20px) scale(0.98)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Image
            src={photos[0].src}
            alt={photos[0].alt}
            width={800}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div
          data-gallery-item
          data-delay="150"
          className="col-span-2 h-48 md:h-72 lg:h-80 overflow-hidden rounded-sm"
          style={{
            opacity: 0,
            transform: "translateY(20px) scale(0.98)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Image
            src={photos[1].src}
            alt={photos[1].alt}
            width={600}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Row 2: 2/5 + 3/5 — zigzag */}
        <div
          data-gallery-item
          data-delay="300"
          className="col-span-2 h-44 md:h-64 lg:h-72 overflow-hidden rounded-sm"
          style={{
            opacity: 0,
            transform: "translateY(20px) scale(0.98)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Image
            src={photos[2].src}
            alt={photos[2].alt}
            width={600}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div
          data-gallery-item
          data-delay="450"
          className="col-span-3 h-44 md:h-64 lg:h-72 overflow-hidden rounded-sm"
          style={{
            opacity: 0,
            transform: "translateY(20px) scale(0.98)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Image
            src={photos[3].src}
            alt={photos[3].alt}
            width={800}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}
