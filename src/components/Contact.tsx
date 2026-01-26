'use client';

import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    age: '',
    location: '',
    message: ''
  });
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormState('success');
        setFormData({
          name: '',
          email: '',
          profession: '',
          age: '',
          location: '',
          message: ''
        });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="snap-section bg-gradient-to-br from-cream via-beige/30 to-rose/20">
      {/* Mobile layout - fills viewport */}
      <div className="lg:hidden flex-1 flex flex-col py-[2vh]">
        <div className="flex-1 container-impulse px-4 flex flex-col">
          {/* Header compact */}
          <div className="animate-fade-in-up flex-shrink-0 mb-[2vh] text-center">
            <p className="font-montserrat uppercase tracking-[0.2em] text-navy text-xs mb-1">
              Contact
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-[1.5vh]"></div>

            <h2 className="font-cormorant text-[3.5vh] text-navy leading-tight mb-[0.5vh]">
              Rejoignez nous.
            </h2>
            <p className="font-cormorant text-[1.8vh] text-navy">
              <span className="font-montserrat uppercase tracking-wider text-[1.2vh]">Impulse</span> n&apos;est pas un réseau de contacts.
            </p>
            <p className="font-greatvibes text-[2.5vh] text-gold">
              C&apos;est un espace de travail et de croissance.
            </p>
          </div>

          {/* Contact info compact */}
          <div className="bg-beige/30 rounded-lg p-[1.5vh] text-center mb-[2vh] flex-shrink-0">
            <p className="font-cormorant text-[2vh] text-navy font-semibold mb-[0.5vh]">Marina Serr</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a href="tel:+33620688314" className="font-source text-[1.4vh] text-navy/80 flex items-center gap-1">
                <svg className="w-[1.8vh] h-[1.8vh] text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +33 6 20 68 83 14
              </a>
              <a href="mailto:marina@marinaserr.com" className="font-source text-[1.4vh] text-navy/80 flex items-center gap-1">
                <svg className="w-[1.8vh] h-[1.8vh] text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                marina@marinaserr.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 mt-[0.5vh]">
              <a href="https://linkedin.com/in/marinaclergetserr" target="_blank" rel="noopener noreferrer" className="text-navy/70 hover:text-gold transition-colors flex items-center gap-1">
                <svg className="w-[2vh] h-[2vh]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span className="font-source text-[1.3vh]">LinkedIn</span>
              </a>
              <a href="https://instagram.com/impulse_lerdv" target="_blank" rel="noopener noreferrer" className="text-navy/70 hover:text-gold transition-colors flex items-center gap-1">
                <svg className="w-[2vh] h-[2vh]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span className="font-source text-[1.3vh]">Instagram</span>
              </a>
            </div>
          </div>

          {/* Form - takes remaining space */}
          <div className="bg-white rounded-2xl p-[2vh] shadow-xl animate-fade-in-up flex flex-col flex-1">
            {formState === 'success' ? (
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="w-[6vh] h-[6vh] mx-auto mb-[1.5vh] bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-[3vh] h-[3vh] text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-cormorant text-[2.5vh] text-navy mb-[0.5vh]">Message envoyé !</p>
                <p className="font-source text-[1.6vh] text-navy/70">
                  Nous vous recontacterons bientôt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div className="space-y-[1.5vh]">
                  <div className="grid grid-cols-2 gap-[1.5vh]">
                    <div>
                      <label htmlFor="name" className="block font-source text-[1.4vh] font-medium text-navy mb-[0.5vh]">
                        Prénom et nom *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-[1.5vh] py-[1.2vh] rounded-lg border border-beige focus:border-gold outline-none font-source text-[1.5vh]"
                        placeholder="Marie Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-source text-[1.4vh] font-medium text-navy mb-[0.5vh]">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-[1.5vh] py-[1.2vh] rounded-lg border border-beige focus:border-gold outline-none font-source text-[1.5vh]"
                        placeholder="marie@exemple.com"
                      />
                    </div>
                  </div>

                  {/* Profession, Age, Location - 3 columns on mobile */}
                  <div className="grid grid-cols-3 gap-[1vh]">
                    <div>
                      <label htmlFor="profession" className="block font-source text-[1.3vh] font-medium text-navy mb-[0.5vh]">
                        Profession *
                      </label>
                      <select
                        id="profession"
                        name="profession"
                        required
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        className="w-full px-[1vh] py-[1.2vh] rounded-lg border border-beige focus:border-gold outline-none font-source text-[1.3vh] bg-white"
                      >
                        <option value="">Choisir...</option>
                        <option value="entrepreneure">Entrepreneure</option>
                        <option value="dirigeante">Dirigeante</option>
                        <option value="cadre">Cadre</option>
                        <option value="independante">Indépendante</option>
                        <option value="consultante">Consultante</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="age" className="block font-source text-[1.3vh] font-medium text-navy mb-[0.5vh]">
                        Âge *
                      </label>
                      <select
                        id="age"
                        name="age"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-[1vh] py-[1.2vh] rounded-lg border border-beige focus:border-gold outline-none font-source text-[1.3vh] bg-white"
                      >
                        <option value="">Choisir...</option>
                        <option value="25-34">25-34 ans</option>
                        <option value="35-44">35-44 ans</option>
                        <option value="45-54">45-54 ans</option>
                        <option value="55+">55+ ans</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="block font-source text-[1.3vh] font-medium text-navy mb-[0.5vh]">
                        Localisation *
                      </label>
                      <select
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-[1vh] py-[1.2vh] rounded-lg border border-beige focus:border-gold outline-none font-source text-[1.3vh] bg-white"
                      >
                        <option value="">Choisir...</option>
                        <option value="barcelone">Barcelone</option>
                        <option value="catalogne">Catalogne</option>
                        <option value="espagne">Espagne</option>
                        <option value="france">France</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="message" className="block font-source text-[1.4vh] font-medium text-navy mb-[0.5vh]">
                      Votre message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full h-[12vh] px-[1.5vh] py-[1.2vh] rounded-lg border border-beige focus:border-gold outline-none font-source text-[1.5vh] resize-none"
                      placeholder="Parlez-nous de vous et de vos attentes..."
                    ></textarea>
                  </div>
                </div>

                {formState === 'error' && (
                  <div className="bg-red-50 text-red-600 px-[1.5vh] py-[1vh] rounded-lg font-source text-[1.3vh] mt-[1vh]">
                    Une erreur est survenue.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-navy text-white py-[1.5vh] px-6 rounded-full font-source font-semibold text-[1.6vh] hover:bg-navy/90 transition-all disabled:opacity-50 mt-[1.5vh]"
                >
                  {formState === 'submitting' ? 'Envoi...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer compact */}
        <div className="bg-navy/5 border-t border-navy/10 py-[1.5vh] px-4 flex-shrink-0 mt-[2vh]">
          <div className="container-impulse flex justify-between items-center">
            <p className="font-source text-[1.3vh] text-navy/50">
              © {currentYear} Impulse
            </p>
            <p className="font-greatvibes text-gold text-[2vh]">
              Ensemble, plus loin
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex lg:flex-col lg:min-h-screen">
        <div className="container-impulse px-4 flex-1 flex flex-col justify-center py-6">
          {/* Section header */}
          <div className="mb-8 animate-fade-in-up">
            <p className="font-montserrat uppercase tracking-[0.3em] text-navy text-sm lg:text-xl mb-2">
              Contact
            </p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
          </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10">
          {/* Left - Big headline + closing statement */}
          <div className="flex flex-col justify-center animate-fade-in-up">
            <h2 className="font-cormorant text-6xl text-navy leading-tight mb-6">
              Rejoignez<br />nous.
            </h2>

            {/* Closing statement */}
            <div className="max-w-md">
              <p className="font-cormorant text-xl text-navy leading-relaxed">
                <span className="font-montserrat uppercase tracking-wider text-xs">Impulse</span> n&apos;est pas un réseau de contacts.
              </p>
              <p className="font-greatvibes text-2xl text-gold mt-1">
                C&apos;est un espace de <span className="text-navy">travail</span> et de <span className="text-gold">croissance</span>.
              </p>
            </div>

            {/* Contact details */}
            <div className="mt-6 pt-6 border-t border-navy/10">
              <p className="font-cormorant text-base text-navy font-semibold mb-3">
                Marina Serr
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <a href="tel:+33620688314" className="font-source text-navy/70 hover:text-gold transition-colors">
                  +33620688314
                </a>
                <a href="mailto:marina@marinaserr.com" className="font-source text-navy/70 hover:text-gold transition-colors">
                  marina@marinaserr.com
                </a>
              </div>
              <div className="flex gap-4 mt-3">
                <a
                  href="https://linkedin.com/in/marinaclergetserr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-source text-xs text-navy/70 hover:text-gold transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  /marinaclergetserr
                </a>
                <a
                  href="https://instagram.com/impulse_lerdv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-source text-xs text-navy/70 hover:text-gold transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @impulse_lerdv
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form (Desktop) */}
          <div className="bg-white rounded-2xl p-6 shadow-xl animate-fade-in-up delay-100">
            {formState === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-cormorant text-xl text-navy mb-2">Message envoyé !</p>
                <p className="font-source text-sm text-navy/70">
                  Nous vous recontacterons très bientôt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name-desktop" className="block font-source text-xs font-medium text-navy mb-1.5">
                      Prénom et nom *
                    </label>
                    <input
                      type="text"
                      id="name-desktop"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-beige focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-source text-sm"
                      placeholder="Marie Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-desktop" className="block font-source text-xs font-medium text-navy mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email-desktop"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-beige focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-source text-sm"
                      placeholder="marie@exemple.com"
                    />
                  </div>
                </div>

                {/* Profession, Age, Location - 3 columns */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="profession-desktop" className="block font-source text-xs font-medium text-navy mb-1.5">
                      Profession *
                    </label>
                    <select
                      id="profession-desktop"
                      name="profession"
                      required
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-beige focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-source text-sm bg-white"
                    >
                      <option value="">Choisir...</option>
                      <option value="entrepreneure">Entrepreneure</option>
                      <option value="dirigeante">Dirigeante</option>
                      <option value="cadre">Cadre</option>
                      <option value="independante">Indépendante</option>
                      <option value="consultante">Consultante</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="age-desktop" className="block font-source text-xs font-medium text-navy mb-1.5">
                      Âge *
                    </label>
                    <select
                      id="age-desktop"
                      name="age"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-beige focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-source text-sm bg-white"
                    >
                      <option value="">Choisir...</option>
                      <option value="25-34">25-34 ans</option>
                      <option value="35-44">35-44 ans</option>
                      <option value="45-54">45-54 ans</option>
                      <option value="55+">55+ ans</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location-desktop" className="block font-source text-xs font-medium text-navy mb-1.5">
                      Localisation *
                    </label>
                    <select
                      id="location-desktop"
                      name="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-beige focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-source text-sm bg-white"
                    >
                      <option value="">Choisir...</option>
                      <option value="barcelone">Barcelone</option>
                      <option value="catalogne">Catalogne</option>
                      <option value="espagne">Espagne</option>
                      <option value="france">France</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message-desktop" className="block font-source text-xs font-medium text-navy mb-1.5">
                    Votre message
                  </label>
                  <textarea
                    id="message-desktop"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-beige focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-source text-sm resize-none"
                    placeholder="Parlez-nous de vous et de vos attentes..."
                  ></textarea>
                </div>

                {formState === 'error' && (
                  <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg font-source text-xs">
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-navy text-white py-2.5 px-6 rounded-full font-source font-semibold text-sm hover:bg-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Envoi...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
        </div>

        {/* Desktop footer */}
        <div className="bg-navy/5 border-t border-navy/10 py-4 px-4">
          <div className="container-impulse flex justify-between items-center">
            <p className="font-source text-xs text-navy/50">
              © {currentYear} Impulse
            </p>
            <p className="font-greatvibes text-gold text-lg">
              Ensemble, plus loin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
