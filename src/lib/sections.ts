// src/lib/sections.ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SECTIONS_DIR = path.join(process.cwd(), 'content', 'sections');

function readSection<T>(name: string): T {
  const fullPath = path.join(SECTIONS_DIR, `${name}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);
  return data as T;
}

// ─── Hero ───
export type HeroContent = {
  headline1: string;
  headline2Prefix: string;
  headline2Gold: string;
  subtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  pillar1: string;
  pillar2: string;
  pillar3: string;
  scrollLabel: string;
  scrollHref: string;
};
export const getHeroContent = () => readSection<HeroContent>('hero');

// ─── Mission ───
export type MissionContent = {
  paragraph1: string;
  paragraph2Before: string;
  paragraph2Gold: string;
  paragraph2After: string;
  paragraph3Before: string;
  paragraph3Gold: string;
  paragraph3After: string;
  paragraph4Gold: string;
  paragraph4After: string;
  tagline: string;
  signature: string;
};
export const getMissionContent = () => readSection<MissionContent>('mission');

// ─── Audience ───
export type AudienceCriterion = {
  text: string;
  highlight?: string;
  textAfter?: string;
  highlight2?: string;
};
export type AudienceContent = {
  eyebrow: string;
  headlinePrefix: string;
  headlineScript: string;
  headlineSuffix: string;
  criteria: AudienceCriterion[];
};
export const getAudienceContent = () => readSection<AudienceContent>('audience');

// ─── Problem ───
export type ProblemItem = {
  text: string;
  highlight: string;
  textAfter?: string;
};
export type ProblemContent = {
  eyebrow: string;
  headlinePrefix: string;
  headlineScript: string;
  headlineSuffix: string;
  problems: ProblemItem[];
};
export const getProblemContent = () => readSection<ProblemContent>('problem');

// ─── Solution ───
export type SolutionContent = {
  intentionEyebrow: string;
  intentionMobileText1Before: string;
  intentionMobileText1Gold: string;
  intentionMobileText1After: string;
  intentionMobileScript: string;
  intentionDesktopBefore: string;
  intentionDesktopGold: string;
  intentionDesktopMiddle1: string;
  intentionDesktopMiddle2: string;
  intentionDesktopScript: string;
  ambitionEyebrow: string;
  ambitionFaireDe: string;
  ambitionBrand: string;
  ambitionScript: string;
  ambitionMobileDesPrefix: string;
  ambitionMobileGold: string;
  ambitionMobileSuffix: string;
  ambitionDesktopDesPrefix: string;
  ambitionDesktopGold: string;
  ambitionDesktopCity: string;
};
export const getSolutionContent = () => readSection<SolutionContent>('solution');

// ─── Pillars ───
export type PillarItem = { title: string; description: string };
export type PillarsContent = {
  eyebrow: string;
  pillars: PillarItem[];
};
export const getPillarsContent = () => readSection<PillarsContent>('pillars');

// ─── HowItWorks ───
export type HowItWorksFeature = {
  text: string;
  highlight: string;
  textAfter?: string;
};
export type HowItWorksContent = {
  eyebrow: string;
  headlineBrand: string;
  headlinePrefix: string;
  headlineScript: string;
  headlineSuffix: string;
  features: HowItWorksFeature[];
};
export const getHowItWorksContent = () => readSection<HowItWorksContent>('howitworks');

// ─── Benefits ───
export type BenefitItem = { title: string; description: string };
export type BenefitsContent = {
  eyebrow: string;
  benefits: BenefitItem[];
};
export const getBenefitsContent = () => readSection<BenefitsContent>('benefits');

// ─── Testimonials ───
export type TestimonialItem = { quote: string; author: string };
export type TestimonialsContent = {
  eyebrow: string;
  mobileHighlightsTitle: string;
  testimonials: TestimonialItem[];
  highlights: string[];
};
export const getTestimonialsContent = () => readSection<TestimonialsContent>('testimonials');

// ─── Team ───
export type FounderItem = {
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
};
export type TeamContent = {
  eyebrow: string;
  founders: FounderItem[];
};
export const getTeamContent = () => readSection<TeamContent>('team');

// ─── Partners ───
export type PartnerItem = {
  name: string;
  logo: string;
  url?: string;
};
export type PartnerBenefit = { text: string };
export type PartnersContent = {
  eyebrow: string;
  intro1: string;
  intro2: string;
  benefits: PartnerBenefit[];
  tagline: string;
  partners: PartnerItem[];
};
export const getPartnersContent = () => readSection<PartnersContent>('partners');

// ─── Contact ───
export type ContactContent = {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  introBrand: string;
  introTenor: string;
  introScript: string;
  contactName: string;
  contactEmail: string;
  linkedinUrl: string;
  linkedinLabel: string;
  instagramUrl: string;
  instagramLabel: string;
  footerCopyright: string;
  footerScript: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formProfessionLabel: string;
  formProfessionPlaceholder: string;
  formAgeLabel: string;
  formAgePlaceholder: string;
  formLocationLabel: string;
  formLocationPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmitDefault: string;
  formSubmitSubmitting: string;
  formSubmitCooldown: string;
  errorRateLimited: string;
  errorNetwork: string;
  errorGeneric: string;
  successTitle: string;
  successSubtitle: string;
};
export const getContactContent = () => readSection<ContactContent>('contact');

// ─── Aggregate (one call for the page) ───
export type AllSectionsContent = {
  hero: HeroContent;
  mission: MissionContent;
  audience: AudienceContent;
  problem: ProblemContent;
  solution: SolutionContent;
  pillars: PillarsContent;
  howitworks: HowItWorksContent;
  benefits: BenefitsContent;
  testimonials: TestimonialsContent;
  team: TeamContent;
  partners: PartnersContent;
  contact: ContactContent;
};
export function getAllSectionsContent(): AllSectionsContent {
  return {
    hero: getHeroContent(),
    mission: getMissionContent(),
    audience: getAudienceContent(),
    problem: getProblemContent(),
    solution: getSolutionContent(),
    pillars: getPillarsContent(),
    howitworks: getHowItWorksContent(),
    benefits: getBenefitsContent(),
    testimonials: getTestimonialsContent(),
    team: getTeamContent(),
    partners: getPartnersContent(),
    contact: getContactContent(),
  };
}
