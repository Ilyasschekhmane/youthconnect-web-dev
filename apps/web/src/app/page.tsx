'use client';

import Link from 'next/link';
import { type MouseEvent, type KeyboardEvent, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, Moon, Sun, X, ShieldCheck, Server } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@youthconnect/ui';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Platform', href: '#overview' },
  { label: 'Youth Centers', href: '#centers' },
  { label: 'Programs', href: '#platform' },
  { label: 'Training', href: '#training' },
  { label: 'Employment', href: '#employment' },
  { label: 'Entrepreneurship', href: '#entrepreneurship' },
  { label: 'Cities', href: '#cities' },
  { label: 'Partners', href: '#partners' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const landingStats = [
  { value: '25,000+', label: 'Applicants' },
  { value: '185', label: 'Centers' },
  { value: '500', label: 'Programs' },
  { value: '98%', label: 'Satisfaction' },
];

const onboardingSteps = [
  'Create Account',
  'Apply',
  'Review',
  'Interview',
  'Approval',
  'Training',
  'Funding',
];

const programCards = [
  {
    title: 'Founder Launchpad',
    description: 'A modern accelerator for youth-led ventures with mentoring, grants, and market readiness.',
  },
  {
    title: 'Community Studio',
    description: 'Local innovation labs for civic projects, digital skills, and neighborhood impact.',
  },
  {
    title: 'Capital Readiness',
    description: 'Structured funding pathways for proposals, pitches, and investor readiness.',
  },
];

const centerCards = [
  {
    title: 'Center operations',
    description: 'Manage appointments, staffing, and resources across every neighborhood.',
  },
  {
    title: 'Community outreach',
    description: 'Coordinate local events, registration, and youth communications with clarity.',
  },
  {
    title: 'Impact reporting',
    description: 'Track participation, completion, and funding outcomes in one view.',
  },
];

const featureModules = [
  {
    title: 'Applications',
    description: 'Track submissions, approvals, and requests through secure workflows.',
  },
  {
    title: 'Programs',
    description: 'Run cohorts, curriculum, and funding streams with clarity.',
  },
  {
    title: 'Appointments',
    description: 'Schedule youth sessions, mentor meetings, and center bookings.',
  },
  {
    title: 'Documents',
    description: 'Manage forms, certificates, and policy documents centrally.',
  },
  {
    title: 'Calendar',
    description: 'Synchronize events, deadlines, and program milestones in one view.',
  },
  {
    title: 'Analytics',
    description: 'Surface outcomes, utilization, and program performance dashboards.',
  },
  {
    title: 'Notifications',
    description: 'Deliver timely alerts to staff, participants, and partners.',
  },
  {
    title: 'AI Insights',
    description: 'Use AI-driven recommendations for priority actions and resource allocation.',
  },
];

const aiInsights = [
  {
    title: 'AI Recommendation',
    description: 'Automated guidance for program allocation, staffing, and youth outreach priorities.',
  },
  {
    title: 'Youth unemployment',
    description: 'Real-time risk signals and opportunity zones for jobless youth.',
  },
  {
    title: 'Programs popularity',
    description: 'Trend insights that highlight the most in-demand services.',
  },
  {
    title: 'Risk analysis',
    description: 'Predictive alerts for enrollment, funding, and operational risks.',
  },
  {
    title: 'Funding suggestions',
    description: 'AI-sourced recommendations for grants, partnerships, and investment.',
  },
  {
    title: 'Participation trends',
    description: 'Engagement patterns across centers, cities, and service lines over time.',
  },
];

// Additional curated content sections requested: Training, Employment, Entrepreneurship
const trainingPrograms = [
  {
    title: 'Digital Upskill Bootcamp',
    description: 'Short intensive courses in web development, UX, and e-commerce tailored to youth job market needs.',
  },
  {
    title: 'Soft Skills & CV Workshop',
    description: 'Practical workshops that prepare candidates for interviews and workplace expectations.',
  },
  {
    title: 'Sector-specific Trainings',
    description: 'Hospitality, agri-tech, and renewable energy tracks offered in partnership with local employers.',
  },
];

const employmentPrograms = [
  {
    title: 'Job Placement Support',
    description: 'Connections to local employers and structured placement pathways.',
  },
  {
    title: 'Micro-Enterprise Grants',
    description: 'Seed grants for microbusinesses with mentoring and market access.',
  },
  {
    title: 'Internship Pipeline',
    description: 'Short-term employer internships that convert to hires when successful.',
  },
];

const entrepreneurshipPrograms = [
  {
    title: 'Founders Studio',
    description: 'Incubation for early-stage youth ventures with mentorship and pilot funding.',
  },
  {
    title: 'Pitch Days & Demo',
    description: 'Regular investor-ready pitch sessions and demo days to surface promising teams.',
  },
  {
    title: 'Legal & Finance Clinics',
    description: 'Practical support for registering, accounting, and managing micro-enterprises.',
  },
];

const faqItems = [
  {
    question: 'Can YouthConnect operate across multiple Moroccan cities?',
    answer: 'Yes. The platform is built for multi-city rollout with local center views, shared analytics, and configurable program workflows.',
  },
  {
    question: 'Is YouthConnect secure enough for public sector deployment?',
    answer: 'Absolutely. The platform supports role-based access, audit logs, encryption, and governance-ready controls.',
  },
  {
    question: 'Can we launch entrepreneurship, training, and employment services together?',
    answer: 'Yes. YouthConnect supports parallel service streams so teams can coordinate multiple pathways within one cohesive system.',
  },
];

const testimonials = [
  {
    quote: 'YouthConnect gives our teams a premium, government-ready platform to deliver youth services with confidence.',
    author: 'Nour El Amine',
    role: 'National Programs Director',
  },
  {
    quote: 'The platform feels polished, accessible, and built for public sector scale.',
    author: 'Sofia Benomar',
    role: 'Youth Center Operations Lead',
  },
  {
    quote: 'We now show clear outcomes for training, entrepreneurship, and employment programs across every region.',
    author: 'Youssef Charki',
    role: 'Government Innovation Advisor',
  },
];

const partners = [
  'INDH',
  'OFPPT',
  'Universities',
  'Municipalities',
  'NGOs',
  'Incubators',
  'Private Partners',
];

const regionMap = [
  {
    id: 'tanger',
    name: 'Tanger-Tétouan',
    centers: '22',
    programs: '14',
    applicants: '1,120',
    d: 'M100 52 L200 56 L236 118 L204 150 L154 136 Z',
  },
  {
    id: 'rabat',
    name: 'Rabat-Salé-Kénitra',
    centers: '24',
    programs: '18',
    applicants: '1,360',
    d: 'M130 150 L190 150 L214 196 L172 222 L130 200 Z',
  },
  {
    id: 'casa',
    name: 'Casablanca-Settat',
    centers: '38',
    programs: '26',
    applicants: '2,140',
    d: 'M196 168 L290 152 L324 210 L280 222 L232 212 Z',
  },
  {
    id: 'fes',
    name: 'Fès-Meknès',
    centers: '18',
    programs: '12',
    applicants: '980',
    d: 'M250 140 L310 132 L348 186 L320 230 L270 198 Z',
  },
  {
    id: 'marrakech',
    name: 'Marrakech-Safi',
    centers: '20',
    programs: '16',
    applicants: '1,480',
    d: 'M170 238 L252 214 L318 294 L248 344 L184 316 Z',
  },
  {
    id: 'agadir',
    name: 'Souss-Massa',
    centers: '16',
    programs: '11',
    applicants: '1,020',
    d: 'M96 322 L184 304 L220 364 L146 406 L102 360 Z',
  },
  {
    id: 'ouarzazate',
    name: 'Drâa-Tafilalet',
    centers: '10',
    programs: '8',
    applicants: '760',
    d: 'M314 282 L404 264 L464 338 L378 394 L320 352 Z',
  },
];

export default function HomePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState(regionMap[0].id);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const shouldReduceMotion = useReducedMotion();

  const parallaxStyle = (strength: number) => ({
    transform: `translate3d(${mousePosition.x * strength}px, ${mousePosition.y * strength}px, 0)`,
  });

  const handleHeroMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - left) / width - 0.5) * 32,
      y: ((event.clientY - top) / height - 0.5) * 32,
    });
  };

  const selectedRegionData = regionMap.find((region) => region.id === selectedRegion) ?? regionMap[0];
  const hoveredRegionData = hoveredRegion ? regionMap.find((region) => region.id === hoveredRegion) : null;
  const activeRegion = hoveredRegionData ?? selectedRegionData;

  const handleRegionHover = (regionId: string, event: MouseEvent<SVGPathElement>) => {
    setHoveredRegion(regionId);
    const { left, top } = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ x: event.clientX - left, y: event.clientY - top });
  };

  const handleRegionMove = (event: MouseEvent<SVGPathElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ x: event.clientX - left, y: event.clientY - top });
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
  };

  const handleRegionKeyDown = (regionId: string, e: KeyboardEvent<SVGPathElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedRegion(regionId);
      setHoveredRegion(regionId);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = (storedTheme as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    setMounted(true);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [mounted, theme]);

  useEffect(() => {
    const sectionIds = ['home', 'overview', 'cities', 'platform', 'security', 'app-preview', 'partners', 'faq', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const scrollY = window.scrollY + 180;
      const nextSection = sections.reduce((current, section) => {
        return section.offsetTop <= scrollY ? section : current;
      }, sections[0]);

      if (nextSection?.id) {
        setActiveSection(`#${nextSection.id}`);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [mounted]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_18%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl transition duration-300 dark:border-slate-800/70 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-slate-200/40 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100">
              YouthConnect
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeSection === item.href
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Open navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200/80 bg-white/95 px-6 py-5 shadow-xl shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/95 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    activeSection === item.href
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section
        id="home"
        className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.16),transparent_20%),linear-gradient(180deg,#0f172a_0%,#111827_35%,#0b1121_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute left-10 top-10 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" style={parallaxStyle(0.16)} />
          <div className="absolute right-14 top-28 h-60 w-60 rounded-full bg-amber-400/20 blur-3xl" style={parallaxStyle(-0.16)} />
          <div className="absolute left-1/2 top-56 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" style={parallaxStyle(-0.12)} />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/35 bg-white/10 px-4 py-2 text-sm font-semibold text-amber-100 shadow-xl shadow-amber-300/10 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-sm shadow-amber-300/40" />
              Moroccan GovTech for youth centers, cities, and digital trust.
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
              className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Modernize youth opportunity across Morocco with a premium government digital platform.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="max-w-xl text-lg leading-8 text-slate-300 sm:text-xl"
            >
              YouthConnect brings secure center operations, regional insights, and enterprise workflows together in one polished service delivery system.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20 hover:bg-amber-300 transition-transform duration-300 hover:-translate-y-0.5">
                <Link href="/signup">Start pilot</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/10 text-white shadow-sm shadow-white/10 hover:bg-white/15 transition-transform duration-300 hover:-translate-y-0.5">
                <Link href="#overview">See platform</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.75, ease: 'easeOut' }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {landingStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/10 backdrop-blur"
                >
                  <p className="text-4xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" style={parallaxStyle(-0.14)} />
            <div className="absolute right-4 top-36 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" style={parallaxStyle(0.14)} />
            <div className="absolute -right-12 bottom-16 h-28 w-28 rounded-full bg-white/10 blur-3xl" style={parallaxStyle(-0.1)} />

            <div className="relative rounded-[36px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.35)] backdrop-blur-xl" style={parallaxStyle(0.08)}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.18),transparent_35%)]" />
              <div className="relative rounded-[30px] border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80">Operations</p>
                    <p className="mt-2 text-2xl font-semibold">Leadership dashboard</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200">Secure</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Centers', value: '184' },
                    { label: 'Programs', value: '92' },
                    { label: 'Impact', value: '94%' },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-3xl bg-slate-900/90 p-4">
                      <p className="text-sm text-slate-400">{metric.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-[220px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/95 p-4">
                  <div className="h-full w-full rounded-[24px] bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                      <span>Morocco city network</span>
                      <span>Live</span>
                    </div>
                    <div className="mt-5 h-[120px] rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/95 p-4">
                      <div className="h-full w-full rounded-[20px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_40%)]" />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                      <span>Active centers</span>
                      <span>184</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="absolute -right-10 bottom-10 h-[340px] w-[190px] overflow-hidden rounded-[36px] border border-white/15 bg-slate-950/95 shadow-2xl shadow-black/30"
              style={parallaxStyle(0.22)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,100,24,0.22),transparent_40%)]" />
              <div className="relative flex h-full flex-col border border-white/10 bg-slate-950/95 p-4">
                <div className="mb-4 flex items-center justify-between rounded-3xl bg-slate-900/90 px-3 py-2 text-xs text-slate-300">
                  <span>YouthConnect App</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-200">BETA</span>
                </div>
                <div className="mb-4 h-12 rounded-3xl bg-slate-900/80" />
                <div className="grid gap-3">
                  <div className="h-14 rounded-3xl bg-slate-900/80 p-3 text-sm text-slate-300">
                    <div className="mb-2 h-2.5 w-2/3 rounded-full bg-slate-800" />
                    <div className="h-2 w-1/2 rounded-full bg-slate-800" />
                  </div>
                  <div className="h-14 rounded-3xl bg-slate-900/80 p-3 text-sm text-slate-300">
                    <div className="mb-2 h-2.5 w-1/2 rounded-full bg-slate-800" />
                    <div className="h-2 w-1/3 rounded-full bg-slate-800" />
                  </div>
                  <div className="h-20 rounded-[28px] bg-gradient-to-br from-amber-400/20 to-emerald-400/15 p-3 text-sm text-slate-100">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-300">
                      <span>Alerts</span>
                      <span>3 new</span>
                    </div>
                    <div className="h-7 rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="overview"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="grid gap-10 xl:grid-cols-[0.95fr_0.75fr] xl:items-start">
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Overview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A responsive operating system for service delivery, civic trust, and city performance.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              YouthConnect unites programs, centers, and analytics in a single experience that is accessible, polished, and built for government-scale adoption.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Unified center management', 'Configurable workflows', 'Secure data controls', 'Shared city reporting'].map((feature) => (
                <div key={feature} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-emerald-100 bg-emerald-50/80 p-6">
              <CardHeader>
                <CardTitle>Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700">Curate multi-track offerings that support founders, teams, and community partners.</p>
                <div className="mt-6 grid gap-4">
                  {programCards.map((program) => (
                    <div key={program.title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-base font-semibold text-slate-950">{program.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{program.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-950/95 p-6 text-white">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">Measure participation, outcomes, and citywide progress with elegant clarity.</p>
                <div className="mt-6 grid gap-4">
                  {[
                    { label: 'Completion rate', value: '87%' },
                    { label: 'Service adoption', value: '94%' },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-[28px] bg-slate-900/90 p-4">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{metric.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="cities"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Morocco map</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Explore regional youth impact with an interactive map.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Click or hover a region to reveal youth centers, programs, and applicants in a premium national dashboard.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {regionMap.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region.id)}
                  className={`group rounded-[28px] border px-5 py-4 text-left transition duration-300 ${
                    selectedRegion === region.id
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-200/40'
                      : 'border-slate-200 bg-slate-50 text-slate-900 hover:shadow-lg hover:shadow-slate-300/20'
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.25em]">{region.name}</p>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-900">Centers:</span> {region.centers}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Programs:</span> {region.programs}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-slate-700 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">Selected region</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{activeRegion.name}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Centers</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">{activeRegion.centers}</p>
                </div>
                <div className="rounded-[24px] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Programs</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">{activeRegion.programs}</p>
                </div>
                <div className="rounded-[24px] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Applicants</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">{activeRegion.applicants}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.14),_transparent_25%)]" />
            <div className="relative rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 text-white shadow-2xl">
              <div className="mb-6 rounded-[24px] bg-slate-950/90 p-5 text-white shadow-inner">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Interactive map</p>
                <p className="mt-3 text-2xl font-semibold">Tap a region to inspect youth services</p>
              </div>
              <div className="relative h-[520px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.14),_transparent_32%),linear-gradient(180deg,_#0b1320_0%,_#0f172a_100%)]">
                <svg viewBox="0 0 560 520" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="moroccoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="55%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                    <radialGradient id="mapGlow" cx="50%" cy="30%" r="80%">
                      <stop offset="0%" stopColor="#ecfccb" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="560" height="520" fill="url(#mapGlow)" rx="28" />
                  <g opacity="0.95">
                    {regionMap.map((region) => (
                      <motion.path
                        key={region.id}
                        d={region.d}
                        role="button"
                        aria-label={`Select region ${region.name}`}
                        tabIndex={0}
                        onKeyDown={(e: any) => handleRegionKeyDown(region.id, e)}
                        fill={selectedRegion === region.id ? 'url(#moroccoGradient)' : 'rgba(16,185,129,0.22)'}
                        stroke={selectedRegion === region.id ? '#84cc16' : '#ffffff33'}
                        strokeWidth="3"
                        className="cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        onMouseEnter={(event) => handleRegionHover(region.id, event)}
                        onMouseMove={handleRegionMove}
                        onMouseLeave={handleRegionLeave}
                        onClick={() => setSelectedRegion(region.id)}
                        style={{ transformOrigin: 'center center' }}
                      />
                    ))}
                  </g>
                  <g opacity="0.85">
                    {regionMap.map((region) => {
                      const coords = {
                        tanger: { cx: 160, cy: 82 },
                        rabat: { cx: 176, cy: 178 },
                        casa: { cx: 280, cy: 184 },
                        fes: { cx: 300, cy: 186 },
                        marrakech: { cx: 248, cy: 286 },
                        agadir: { cx: 148, cy: 352 },
                        ouarzazate: { cx: 380, cy: 328 },
                      };
                      return (
                        <circle
                          key={`${region.id}-dot`}
                          cx={coords[region.id as keyof typeof coords].cx}
                          cy={coords[region.id as keyof typeof coords].cy}
                          r="8"
                          fill="rgba(255,255,255,0.85)"
                          stroke="rgba(16,185,129,0.9)"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </g>
                </svg>
                {hoveredRegionData ? (
                  <div
                    className="pointer-events-none absolute z-20 rounded-3xl border border-white/20 bg-slate-950/95 p-4 text-sm text-white shadow-2xl shadow-black/50 backdrop-blur"
                    style={{
                      left: tooltipPosition.x + 24,
                      top: tooltipPosition.y - 12,
                      transform: 'translate(-50%, -100%)',
                      minWidth: 212,
                    }}
                  >
                    <p className="font-semibold text-white">{hoveredRegionData.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">Region snapshot</p>
                    <div className="mt-3 space-y-2">
                      <p>
                        <span className="font-semibold text-slate-100">Centers:</span> {hoveredRegionData.centers}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-100">Programs:</span> {hoveredRegionData.programs}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-100">Applicants:</span> {hoveredRegionData.applicants}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="platform"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] xl:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Platform suite</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Core modules for operations, engagement, and impact.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                YouthConnect brings all of the workflows your teams need into one polished platform: from intake and schedules to reporting and AI-driven insights.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featureModules.map((module) => (
                <Card key={module.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-200/20">
                  <CardHeader>
                    <CardTitle>{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="training"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Training</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Short courses and upskilling for employability</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Focused tracks designed for rapid job-market entry and digital livelihoods.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {trainingPrograms.map((t) => (
              <div key={t.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-base font-semibold text-slate-900">{t.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="employment"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Employment</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Pathways to jobs and micro-enterprises</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Practical placement, internship pipelines, and microgrant programs to turn training into work.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {employmentPrograms.map((e) => (
              <div key={e.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-base font-semibold text-slate-900">{e.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="entrepreneurship"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Entrepreneurship</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Support for youth ventures and small businesses</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Incubation, legal clinics, and funding pathways to help startups scale.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {entrepreneurshipPrograms.map((p) => (
              <div key={p.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-base font-semibold text-slate-900">{p.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="security"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Security</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Public-sector security, privacy, and governance built in.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              YouthConnect supports role-based controls, audit-ready oversight, and trusted policy workflows for government deployments.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Super Admin', 'City Admin', 'Youth Center', 'Staff', 'Mentor', 'Citizen'].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[32px] border border-slate-200 bg-slate-950/95 p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-emerald-300">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>Trusted controls</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold">Institutional transparency and compliance</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Youth engagements', value: '5,420' },
                  { label: 'Program completion', value: '78%' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-900/90 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-emerald-700">
                <Server className="h-4 w-4 text-emerald-700" />
                <span>Enterprise-grade</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">City-wide performance at a glance</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Visualize adoption, demand, and impact with intuitive charts and comparison panels.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12" id="app-preview">
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">App preview</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Native screens for center managers, applicants, and policy teams.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Showcase polished mobile experiences that reinforce trust, speed, and operational clarity for every user.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {['Intake portal', 'Center feed', 'Program dashboard', 'Impact alerts'].map((label) => (
                  <div key={label} className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-slate-950 p-4 text-white shadow-xl">
                <div className="absolute left-1/2 top-4 h-1.5 w-14 -translate-x-1/2 rounded-full bg-slate-700" />
                <div className="absolute right-4 top-5 h-3 w-3 rounded-full bg-emerald-400/80" />
                <div className="flex h-[520px] flex-col rounded-[32px] border border-slate-800 bg-slate-900 p-5">
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>iPhone</span>
                    <span>Live demo</span>
                  </div>
                  <div className="space-y-4 overflow-hidden rounded-[28px] bg-slate-950 p-4">
                    <div className="rounded-[24px] bg-slate-900 p-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Applications</p>
                      <p className="mt-3 text-lg font-semibold text-white">New candidate portal</p>
                      <p className="mt-2 text-sm text-slate-400">Review forms, statuses, and approvals in one place.</p>
                    </div>
                    <div className="rounded-[24px] bg-slate-900 p-4">
                      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                        <span>Center feed</span>
                        <span>2m ago</span>
                      </div>
                      <div className="space-y-3">
                        {['Intake review', 'Mentor booking', 'Program alert'].map((item) => (
                          <div key={item} className="rounded-3xl bg-slate-950 p-3 text-sm text-slate-300">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[24px] bg-slate-900 p-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
                      <div className="mt-3 flex items-center justify-between rounded-3xl bg-slate-950 p-3 text-sm text-white">
                        <span>Funding ready</span>
                        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-200">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-slate-950 p-4 text-white shadow-xl">
                <div className="absolute left-1/2 top-4 h-1.5 w-14 -translate-x-1/2 rounded-full bg-slate-700" />
                <div className="absolute right-4 top-5 h-3 w-3 rounded-full bg-cyan-400/80" />
                <div className="flex h-[520px] flex-col rounded-[32px] border border-slate-800 bg-slate-900 p-5">
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>Android</span>
                    <span>Overview</span>
                  </div>
                  <div className="space-y-4 overflow-hidden rounded-[28px] bg-slate-950 p-4">
                    <div className="rounded-[24px] bg-slate-900 p-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Programs</p>
                      <p className="mt-3 text-lg font-semibold text-white">Cohort dashboard</p>
                      <p className="mt-2 text-sm text-slate-400">Track progress, attendance, and outcomes at a glance.</p>
                    </div>
                    <div className="rounded-[24px] bg-slate-900 p-4">
                      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                        <span>Tasks</span>
                        <span>Today</span>
                      </div>
                      <div className="space-y-3">
                        {['Mentor session', 'Documentation', 'Impact report'].map((item) => (
                          <div key={item} className="rounded-3xl bg-slate-950 p-3 text-sm text-slate-300">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[24px] bg-slate-900 p-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Engagement</p>
                      <div className="mt-3 flex items-center justify-between rounded-3xl bg-slate-950 p-3 text-sm text-white">
                        <span>Active centers</span>
                        <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-cyan-200">38</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="border-slate-200 bg-white/95 p-6 shadow-sm">
              <CardContent>
                <p className="text-base leading-8 text-slate-700">“{testimonial.quote}”</p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-950">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <motion.section
        id="partners"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div key={partner} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700 shadow-sm">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="faq" className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Questions for city leaders, program directors, and government teams.
            </h2>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <details key={item.question} className="group rounded-[28px] border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300">
                  <summary className="cursor-pointer text-base font-semibold text-slate-950">{item.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div id="contact" className="rounded-[32px] border border-slate-200 bg-slate-950/95 p-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Get started</p>
            <h3 className="mt-4 text-3xl font-semibold">Bring YouthConnect to your city network.</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Launch a premium public-sector platform that empowers youth centers, entrepreneurship services, and employment pathways.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Link href="/signup">Book a demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-300 text-white hover:bg-slate-800/90">
                <Link href="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-14 text-sm text-slate-300 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <p className="font-semibold uppercase tracking-[0.3em] text-emerald-300">YouthConnect</p>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Professional GovTech for Moroccan youth services, entrepreneurship, and city-wide impact.
            </p>
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 shadow-lg shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Newsletter</p>
              <p className="mt-3 text-lg font-semibold text-white">Get updates on new features, city launches, and impact insights.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                />
                <Button size="lg" className="min-w-[10rem] bg-emerald-600 text-white hover:bg-emerald-500">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 text-slate-300 shadow-lg shadow-black/10">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Contact</p>
              <p className="mt-4 text-base text-white">hello@youthconnect.ma</p>
              <p className="mt-2 text-sm text-slate-400">+212 5 22 00 00 00</p>
            </div>
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 text-slate-300 shadow-lg shadow-black/10">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Social</p>
              <div className="mt-4 flex flex-col gap-3 text-white">
                <a href="https://github.com" className="transition hover:text-emerald-300">GitHub</a>
                <a href="https://linkedin.com" className="transition hover:text-emerald-300">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
