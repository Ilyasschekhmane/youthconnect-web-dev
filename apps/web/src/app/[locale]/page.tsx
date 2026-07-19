import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@youthconnect/ui';

const features = [
  {
    title: 'Streamlined intake',
    description: 'Guide applicants from first interest to final enrollment with elegant, guided workflows.',
  },
  {
    title: 'City-scale operations',
    description: 'Coordinate staff, programs, and appointments across every neighborhood from one control center.',
  },
  {
    title: 'Trusted documents',
    description: 'Collect, review, and sign required files without leaving the platform.',
  },
  {
    title: 'Clear reporting',
    description: 'Surface outcomes, participation trends, and funding readiness in real time.',
  },
];

const cities = ['Rabat', 'Agadir', 'Marrakech', 'Oujda', 'Berkane', 'Fes'];

const programs = [
  {
    name: 'Founder Launchpad',
    detail: 'A 10-week accelerator for early-stage founders building a first revenue stream.',
  },
  {
    name: 'Community Studio',
    detail: 'Hands-on design and prototyping support for neighborhood-based teams.',
  },
  {
    name: 'Capital Readiness',
    detail: 'A structured path to grants, pitch prep, and investor introductions.',
  },
];

const testimonials = [
  {
    quote:
      'YouthConnect helped us reduce applicant admin by 60% while giving our team a calmer, more human experience.',
    author: 'Maya Alvarez',
    role: 'Director of Workforce Programs',
  },
  {
    quote:
      'The platform feels as polished as the services we deliver, and our city partners adopted it in days.',
    author: 'Daniel Brooks',
    role: 'Program Operations Lead',
  },
];

const partners = ['City of Chicago', 'Northstar Labs', 'BrightPath Capital', 'FutureWorks', 'NextGen Fund'];

export default function LocalizedHomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_42%),linear-gradient(135deg,_#f8fafc_0%,_#eef5ff_100%)] text-slate-900">
      <section className="mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-8 sm:px-8 lg:px-12 lg:pt-10">
        <header className="mb-10 flex items-center justify-between rounded-full border border-slate-200/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
          <Link href="/" className="text-base font-semibold tracking-[0.2em] text-slate-900 uppercase">
            Atlas-V1-Oujda
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <a href="#Royal initiatives" className="transition hover:text-slate-900">
              Royal initiatives
            </a>
            <a href="#features" className="transition hover:text-slate-900">
              Features
            </a>
            <a href="#cities" className="transition hover:text-slate-900">
              Cities
            </a>
            <a href="#programs" className="transition hover:text-slate-900">
              Programs
            </a>
            <a href="#testimonials" className="transition hover:text-slate-900">
              Testimonials
            </a>
          </nav>
        </header>

        <div className="grid items-center gap-10 rounded-[32px] border border-slate-200/80 bg-slate-950 px-6 py-10 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-16">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              Built for modern youth entrepreneurship centers
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                A calm, modern operating system for public and nonprofit innovation programs.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Unify applications, appointments, and citywide delivery into one elegant platform designed for speed, trust, and measurable outcomes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                <Link href="/signup">Start free demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-700 bg-transparent text-white hover:bg-slate-900">
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>
            <dl className="grid gap-4 pt-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-sm text-slate-400">Programs launched</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">120+  0</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-sm text-slate-400">Cities served</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">28  0</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-sm text-slate-400">Applicant satisfaction</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">4.9/5</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-inner backdrop-blur">
            <div className="rounded-[24px] bg-slate-900 p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="text-sm font-medium text-cyan-300">Operations view</p>
                  <p className="text-lg font-semibold text-white">Spring cohort overview</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
                  Live
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ['Applications', '184 new', 'text-cyan-300'],
                  ['Appointments', '36 today', 'text-violet-300'],
                  ['Documents', '92 verified', 'text-emerald-300'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <span className="text-sm text-slate-300">{label}</span>
                    <span className={`text-sm font-semibold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
  <Image
    src="/images/hero.png"
    alt="YouthConnect platform"
    width={1250}
    height={3000}
    className="rounded-3xl object-cover"
  />
</div>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Every workflow designed to feel effortless for staff and applicants.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200/90 bg-white/80">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-slate-200/90 bg-white/80 p-8 shadow-sm sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A simple path from program creation to measured impact.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              ['01', 'Create a program', 'Define eligibility, cohort size, and key milestones in minutes.'],
              ['02', 'Review applicants', 'Collect documents, schedule appointments, and coordinate staff decisions in one workspace.'],
              ['03', 'Measure outcomes', 'Track participation, satisfaction, and results for each city and funding cycle.'],
            ].map(([step, title, description]) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{step}</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center">
  <Image
    src="/images/hero2.png"
    alt="YouthConnect platform"
    width={1250}
    height={3000}
    className="rounded-3xl object-cover"
  />
</div>

      <section id="cities" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Cities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Launch once, adapt everywhere.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Local staff can manage services independently while shared reporting keeps leadership aligned across every city.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cities.map((city) => (
            <div key={city} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <p className="text-lg font-semibold text-slate-900">{city}</p>
              <p className="mt-2 text-sm text-slate-600">Neighborhood-based program delivery with real-time scheduling, staffing, and outcome visibility.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-slate-200/90 bg-slate-950 p-8 text-white shadow-[0_28px_90px_rgba(2,8,23,0.12)] sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Programs</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Flexible programming for founders, teams, and communities.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {programs.map((program) => (
              <div key={program.name} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <h3 className="text-xl font-semibold">{program.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{program.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by leaders building better opportunity systems.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="border-slate-200/90 bg-white/80">
                <CardContent>
                  <p className="text-base leading-8 text-slate-700">“{testimonial.quote}”</p>
                  <div className="mt-6">
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-slate-200/90 bg-white/80 p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Partners</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {partners.map((partner) => (
              <div key={partner} className="rounded-2xl border border-slate-200/90 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
