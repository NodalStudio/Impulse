import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partitionEvents } from './partition';
import type { ImpulseEvent } from './types';

const make = (slug: string, date: string): ImpulseEvent => ({
  slug, title: slug, date, location: 'Barcelona',
});

test('partitionEvents classe les événements futurs en upcoming, triés par date croissante', () => {
  const today = new Date('2026-05-12T10:00:00Z');
  const events = [
    make('a', '2026-06-16'),
    make('b', '2026-05-13'),
    make('c', '2026-09-01'),
  ];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming.map(e => e.slug), ['b', 'a', 'c']);
  assert.deepEqual(past, []);
});

test('partitionEvents classe les événements passés en past, triés par date décroissante', () => {
  const today = new Date('2026-05-12T10:00:00Z');
  const events = [
    make('a', '2026-01-15'),
    make('b', '2026-04-12'),
    make('c', '2026-03-10'),
  ];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past.map(e => e.slug), ['b', 'c', 'a']);
});

test('partitionEvents : un événement le jour même est considéré comme à venir', () => {
  const today = new Date('2026-05-12T23:59:59Z');
  const events = [make('today', '2026-05-12')];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming.map(e => e.slug), ['today']);
  assert.deepEqual(past, []);
});

test('partitionEvents : un événement de la veille est considéré comme passé', () => {
  const today = new Date('2026-05-12T00:00:00Z');
  const events = [make('yesterday', '2026-05-11')];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past.map(e => e.slug), ['yesterday']);
});

test('partitionEvents : tableau vide', () => {
  const { upcoming, past } = partitionEvents([], new Date());
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past, []);
});
