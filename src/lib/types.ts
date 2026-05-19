// src/lib/types.ts

export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  social: {
    linkedin?: string;
    instagram?: string;
  };
};

export type EventGuest = {
  name?: string;
  role?: string;
  photo?: string;
  bio?: string;
};

export type ProgrammeItem = {
  time: string;
  label: string;
};

export type ImpulseEvent = {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  location: string;
  tagline?: string;
  time?: string;
  price?: string;
  reservationUrl?: string;
  coverPhoto?: string;
  description?: string;
  guest?: EventGuest;
  programme?: ProgrammeItem[];
  gallery?: string[];
  summary?: string;
};
