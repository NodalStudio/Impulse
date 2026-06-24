'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import type { ContactContent, PartnerItem } from '@/lib/sections';
import MemberStrip from './MemberStrip';

const CONTACT_API = process.env.NEXT_PUBLIC_IMPULSE_CONTACT_API || '';
const COOLDOWN_KEY = 'impulse_contact_cooldown';
const COOLDOWN_MS = 5 * 60 * 1000;
const MIN_INTERACTION_MS = 3000;

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  profession: '',
  age: '',
  location: '',
  message: '',
  website: ''
};

const getSubmitLabel = (
  formState: 'idle' | 'submitting' | 'success' | 'error' | 'network_error' | 'rate_limited',
  isCooldown: boolean,
  content: ContactContent
) => {
  if (formState === 'submitting') return content.formSubmitSubmitting;
  if (isCooldown) return content.formSubmitCooldown;
  return content.formSubmitDefault;
};

const isBotSubmission = (website: string, firstInteraction: number | null) => {
  if (website) return true;
  if (!firstInteraction) return true;
  return Date.now() - firstInteraction < MIN_INTERACTION_MS;
};

const getResponseState = (response: Response) => {
  if (response.ok) return 'success' as const;
  if (response.status === 429) return 'rate_limited' as const;
  return 'error' as const;
};

export default function Contact({
  content,
  members = [],
}: {
  content: ContactContent;
  members?: PartnerItem[];
}) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'network_error' | 'rate_limited'>('idle');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [cooldown, setCooldown] = useState(false);
  const firstInteractionRef = useRef<number | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const lastSent = localStorage.getItem(COOLDOWN_KEY);
    if (lastSent && Date.now() - Number(lastSent) < COOLDOWN_MS) {
      setCooldown(true);
      const remaining = COOLDOWN_MS - (Date.now() - Number(lastSent));
      const timer = setTimeout(() => setCooldown(false), remaining);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInteraction = () => {
    if (!firstInteractionRef.current) {
      firstInteractionRef.current = Date.now();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isBotSubmission(formData.website, firstInteractionRef.current)) {
      setFormState('success');
      return;
    }
    if (cooldown) return;
    setFormState('submitting');

    try {
      const { website: _, ...payload } = formData;
      const response = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const nextState = getResponseState(response);
      setFormState(nextState);
      if (nextState === 'success') {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        setCooldown(true);
        setTimeout(() => setCooldown(false), COOLDOWN_MS);
        setFormData(INITIAL_FORM_DATA);
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormState('network_error');
    }
  };

  const submitLabel = getSubmitLabel(formState, cooldown, content);

  const formContent = (idSuffix: string) => (
    <>
      {/* Honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`website-${idSuffix}`}>Website</label>
        <input type="text" id={`website-${idSuffix}`} name="website" tabIndex={-1} autoComplete="off"
          value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`name-${idSuffix}`} className="block font-montserrat text-xs font-medium text-navy mb-1">{content.formNameLabel}</label>
          <input type="text" id={`name-${idSuffix}`} name="name" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2.5 rounded-sm border border-rose/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none font-montserrat text-sm transition-colors"
            placeholder={content.formNamePlaceholder} />
        </div>
        <div>
          <label htmlFor={`email-${idSuffix}`} className="block font-montserrat text-xs font-medium text-navy mb-1">{content.formEmailLabel}</label>
          <input type="email" id={`email-${idSuffix}`} name="email" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2.5 rounded-sm border border-rose/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none font-montserrat text-sm transition-colors"
            placeholder={content.formEmailPlaceholder} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor={`profession-${idSuffix}`} className="block font-montserrat text-xs font-medium text-navy mb-1">{content.formProfessionLabel}</label>
          <select id={`profession-${idSuffix}`} name="profession" required value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            className="w-full px-3 py-2.5 rounded-sm border border-rose/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none font-montserrat text-sm bg-white transition-colors">
            <option value="">{content.formProfessionPlaceholder}</option>
            <option value="entrepreneure">Entrepreneure</option>
            <option value="dirigeante">Dirigeante</option>
            <option value="cadre">Cadre</option>
            <option value="independante">Indépendante</option>
            <option value="consultante">Consultante</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label htmlFor={`age-${idSuffix}`} className="block font-montserrat text-xs font-medium text-navy mb-1">{content.formAgeLabel}</label>
          <select id={`age-${idSuffix}`} name="age" required value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-3 py-2.5 rounded-sm border border-rose/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none font-montserrat text-sm bg-white transition-colors">
            <option value="">{content.formAgePlaceholder}</option>
            <option value="25-34">25-34 ans</option>
            <option value="35-44">35-44 ans</option>
            <option value="45-54">45-54 ans</option>
            <option value="55+">55+ ans</option>
          </select>
        </div>
        <div>
          <label htmlFor={`location-${idSuffix}`} className="block font-montserrat text-xs font-medium text-navy mb-1">{content.formLocationLabel}</label>
          <select id={`location-${idSuffix}`} name="location" required value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2.5 rounded-sm border border-rose/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none font-montserrat text-sm bg-white transition-colors">
            <option value="">{content.formLocationPlaceholder}</option>
            <option value="barcelone">Barcelone</option>
            <option value="catalogne">Catalogne</option>
            <option value="espagne">Espagne</option>
            <option value="france">France</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`message-${idSuffix}`} className="block font-montserrat text-xs font-medium text-navy mb-1">{content.formMessageLabel}</label>
        <textarea id={`message-${idSuffix}`} name="message" rows={3} value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 rounded-sm border border-rose/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none font-montserrat text-sm resize-none transition-colors"
          placeholder={content.formMessagePlaceholder} />
      </div>

      {(formState === 'error' || formState === 'network_error' || formState === 'rate_limited') && (
        <div className="bg-red-50 text-red-600 px-3 py-2 rounded-sm font-montserrat text-xs">
          {formState === 'rate_limited'
            ? content.errorRateLimited
            : formState === 'network_error'
              ? content.errorNetwork
              : content.errorGeneric}
        </div>
      )}

      <button type="submit" disabled={formState === 'submitting' || cooldown}
        className="w-full bg-navy text-white py-2.5 px-6 rounded-full font-montserrat font-semibold text-sm hover:bg-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
        {submitLabel}
      </button>
    </>
  );

  const successMessage = (
    <div className="text-center py-10">
      <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-tenor text-xl text-navy mb-2">{content.successTitle}</p>
      <p className="font-montserrat text-sm text-navy/70">{content.successSubtitle}</p>
    </div>
  );

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-blush via-rose/30 to-rose/20 flex flex-col">
      {/* Top gold line transition */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Main content — fills available space */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="container-impulse px-6 md:px-8 py-12 lg:py-0">
          {/* Section header */}
          <div className="mb-8 lg:mb-10 animate-fade-in-up">
            <p className="font-montserrat uppercase tracking-[0.3em] text-navy/70 text-xs lg:text-sm mb-3">
              {content.eyebrow}
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>

          <div className="lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — headline + info */}
            <div className="mb-8 lg:mb-0 animate-fade-in-up">
              <h2 className="font-tenor text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-4">
                {content.headlineLine1}<br />{content.headlineLine2}
              </h2>

              <div className="max-w-md mb-6">
                <p className="font-tenor text-base lg:text-lg text-navy leading-relaxed">
                  <span className="font-montserrat uppercase tracking-wider text-xs">{content.introBrand}</span>{content.introTenor}
                </p>
                <p className="font-script text-lg lg:text-xl text-gold-deep mt-1">
                  {content.introScript}
                </p>
              </div>

              {/* Contact details */}
              <div className="pt-5 border-t border-navy/10">
                <p className="font-tenor text-base text-navy font-semibold mb-2">{content.contactName}</p>
                <a href={`mailto:${content.contactEmail}`} className="font-montserrat text-sm text-navy/70 hover:text-gold transition-colors">
                  {content.contactEmail}
                </a>
                <div className="flex gap-4 mt-3">
                  <a href={content.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-montserrat text-xs text-navy/70 hover:text-gold transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    {content.linkedinLabel}
                  </a>
                  <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-montserrat text-xs text-navy/70 hover:text-gold transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    {content.instagramLabel}
                  </a>
                </div>
              </div>
            </div>

            {/* Right — form card */}
            <div className="bg-white rounded-sm p-6 lg:p-8 shadow-xl animate-fade-in-up delay-100">
              {formState === 'success' ? successMessage : (
                <form onSubmit={handleSubmit} onFocusCapture={handleInteraction} className="space-y-3">
                  {formContent('main')}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mini footer — integrated at bottom */}
      <div className="bg-navy/5 border-t border-navy/10">
        {/* Discreet community colophon — members drift past in a single muted ink */}
        {members.length > 0 && (
          <div className="py-3 md:py-3.5 border-b border-navy/10">
            <MemberStrip logos={members} />
          </div>
        )}

        <div className="container-impulse flex justify-between items-center py-4 px-6 md:px-8">
          <p className="font-montserrat text-xs text-navy/70">
            © {currentYear} {content.footerCopyright}
          </p>
          <p className="font-script text-gold-deep text-lg">
            {content.footerScript}
          </p>
        </div>
      </div>
    </section>
  );
}
