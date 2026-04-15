'use client';

import { useState, useEffect, type RefObject } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '#mission', label: 'Notre Mission' },
  { href: '#piliers', label: 'Les 3 Piliers' },
  { href: '#calendrier', label: 'Calendrier' },
  { href: '#equipe', label: 'Équipe' },
  { href: '#contact', label: 'Contact' },
];

interface HeaderProps {
  introComplete?: boolean;
  logoRef?: RefObject<HTMLAnchorElement | null>;
}

export default function Header({ introComplete = true, logoRef }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnContact, setIsOnContact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observe when Contact section is visible
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger when Contact section covers most of the viewport
        setIsOnContact(entry.intersectionRatio >= 0.6);
      },
      {
        threshold: [0, 0.6],
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  // On the navy hero (not scrolled, not on contact) = dark mode
  const isDark = !isScrolled && !isOnContact;

  const getHeaderClasses = () => {
    if (isOnContact) {
      return 'bg-white border-b-2 border-gold py-3';
    }
    if (isScrolled) {
      return 'bg-white/80 backdrop-blur-md shadow-sm py-3';
    }
    return 'bg-transparent py-5';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClasses()}`}
    >
      <div className="container-impulse flex items-center justify-between px-4 md:px-8">
        {/* Logo — always visible, swaps variant based on background */}
        <a ref={logoRef} href="#hero" className="flex items-center relative h-8 md:h-10">
          {/* Light logo for dark backgrounds */}
          <Image
            src="/images/logo-light.svg"
            alt="Impulse"
            width={180}
            height={76}
            className={`h-8 md:h-10 w-auto transition-opacity duration-300 ${
              isDark && introComplete ? 'opacity-100' : 'opacity-0'
            }`}
            priority
          />
          {/* Primary logo for light backgrounds */}
          <Image
            src="/images/logo-primary.svg"
            alt="Impulse"
            width={180}
            height={76}
            className={`h-8 md:h-10 w-auto absolute left-0 top-0 transition-opacity duration-300 ${
              !isDark && introComplete ? 'opacity-100' : 'opacity-0'
            }`}
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center gap-8 transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-montserrat text-sm font-medium transition-colors tracking-wide ${
                isDark
                  ? 'text-blush/70 hover:text-gold'
                  : 'text-navy hover:text-gold'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-sm py-2 px-6">
            Nous rejoindre
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              } ${isDark ? 'bg-blush' : 'bg-navy'}`}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              } ${isDark ? 'bg-blush' : 'bg-navy'}`}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              } ${isDark ? 'bg-blush' : 'bg-navy'}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container-impulse py-6 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-montserrat text-lg text-navy hover:text-gold transition-colors py-2 tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-center mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nous rejoindre
          </a>
        </nav>
      </div>
    </header>
  );
}
