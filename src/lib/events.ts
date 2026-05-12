// src/lib/events.ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ImpulseEvent } from './types';

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events');

/**
 * Reads all events from content/events/*.md.
 * Slug = filename without .md extension.
 * Build-time only (uses node fs).
 */
export function getAllEvents(): ImpulseEvent[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];

  const files = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.md'));

  return files.map(filename => {
    const fullPath = path.join(EVENTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);
    // gray-matter parses YAML dates (e.g. 2026-06-16) as JS Date objects;
    // normalise to ISO YYYY-MM-DD string so downstream string helpers work.
    const normalizedDate =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? '');

    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
      date: normalizedDate,
    } as ImpulseEvent;
  });
}

export function getEventBySlug(slug: string): ImpulseEvent | null {
  return getAllEvents().find(e => e.slug === slug) ?? null;
}
