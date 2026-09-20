import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export type CourseDetails = {
  code: string;
  eyebrow: string;
  title: string;
  tagline: string;
  overview: string;
  image: string;
  imageAlt: string;
  topics: Array<{ title: string; description: string }>;
  outcomes: string[];
  audience: string[];
  project: {
    label: string;
    title: string;
    description: string;
    deliverables: string[];
  };
};

const courseLinks = [
  { label: "Networking & CCNA", to: "/courses/networking-ccna" as const },
  { label: "Azure Cloud", to: "/courses/azure-cloud" as const },
  { label: "Cyber Security", to: "/courses/cyber-security" as const },
  { label: "Generative AI", to: "/courses/generative-ai" as const },
  { label: "AI Agents", to: "/courses/ai-agents" as const },
];

export function CourseDetailPage({ course }: { course: CourseDetails }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 70 });
    AOS.refresh();
  }, []);

  return (
    <div className="page-wash min-h-screen overflow-hidden text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border bg-glass/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <a href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="grid size-9 place-items-center rounded-lg bg-brand font-display text-sm font-extrabold text-brand-foreground">L</span>
            <span className="font-display text-base font-extrabold">Luna<span className="text-accent"> Solutions</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex" aria-label="Course navigation">
            <a href="/" className="transition-colors hover:text-ink">Home</a>
            <div className="group relative">
              <span className="flex cursor-default items-center gap-1 py-5">Courses <ChevronDown className="size-4" /></span>
              <div className="invisible absolute right-0 top-full w-60 translate-y-2 rounded-lg border border-glass-border bg-background/95 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {courseLinks.map((item) => <a key={item.to} href={item.to} className="block rounded-md px-3 py-2.5 text-sm hover:bg-secondary hover:text-ink">{item.label}</a>)}
              </div>
            </div>
            <a href="#curriculum" className="transition-colors hover:text-ink">Curriculum</a>
            <a href="#project" className="transition-colors hover:text-ink">Project</a>
          </nav>
          <Button asChild size="sm" className="hidden rounded-full bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent/90 sm:inline-flex">
            <a href="/#contact">Book free counselling</a>
          </Button>
          <Button aria-label={menuOpen ? "Close menu" : "Open menu"} variant="ghost" size="icon" className="sm:hidden" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="glass-panel mx-4 mb-4 grid gap-1 rounded-lg p-3 sm:hidden" aria-label="Mobile course navigation">
            <a href="/" className="rounded-md px-3 py-2 text-sm font-semibold" onClick={() => setMenuOpen(false)}>Home</a>
            {courseLinks.map((item) => <a key={item.to} href={item.to} className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary" onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          </nav>
        )}
      </header>

      <main>
        <section className="px-5 pb-20 pt-28 sm:px-6 lg:pb-24 lg:pt-32">
          <div className="mx-auto max-w-7xl">
            <a href="/#courses" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent">
              <ArrowLeft className="size-4" /> All programmes
            </a>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6" data-aos="fade-up">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-accent/15 font-display text-sm font-extrabold text-accent">{course.code}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{course.eyebrow}</span>
                </div>
                <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] text-balance sm:text-6xl">{course.title}</h1>
                <p className="mt-5 max-w-2xl font-display text-xl font-semibold leading-relaxed text-accent">{course.tagline}</p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{course.overview}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-full bg-brand px-6 font-semibold text-brand-foreground hover:bg-brand/90">
                    <a href="/#contact">Book free counselling <ArrowRight /></a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="glass-panel rounded-full border-glass-border px-6 font-semibold text-ink">
                    <a href="#curriculum">View curriculum</a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-6" data-aos="fade-left" data-aos-delay="100">
                <div className="relative overflow-hidden rounded-lg border border-glass-border bg-glass p-2 shadow-2xl shadow-brand/10">
                  <img src={course.image} alt={course.imageAlt} width={1600} height={1008} className="aspect-[8/5] w-full rounded-md object-cover" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-lg border border-glass-border bg-background/85 p-4 backdrop-blur-xl">
                    <Sparkles className="size-5 shrink-0 text-accent" />
                    <p className="text-sm font-semibold">Learn through guided labs, practical exercises and a portfolio-ready project.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum" className="scroll-mt-20 border-y border-glass-border bg-glass/35 px-5 py-20 sm:px-6" aria-labelledby="curriculum-heading">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl" data-aos="fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">What you will learn</p>
              <h2 id="curriculum-heading" className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">A practical, career-focused curriculum.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Build your understanding step by step, then apply each concept through structured exercises and real scenarios.</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
              {course.topics.map((topic, index) => (
                <article key={topic.title} className="bg-background/90 p-6" data-aos="fade-up" data-aos-delay={index * 60}>
                  <div className="mb-5 font-display text-sm font-extrabold text-accent">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-lg font-bold">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6" aria-labelledby="outcomes-heading">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div data-aos="fade-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Course outcomes</p>
              <h2 id="outcomes-heading" className="mt-2 font-display text-3xl font-extrabold">Build skills you can demonstrate.</h2>
              <div className="mt-7 grid gap-4">
                {course.outcomes.map((outcome) => <div key={outcome} className="flex items-start gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Check className="size-4" /></span><span className="text-sm font-semibold leading-relaxed">{outcome}</span></div>)}
              </div>
            </div>
            <div className="border-l border-border pl-0 lg:pl-12" data-aos="fade-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Who this is for</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold">A strong next step for ambitious learners.</h2>
              <div className="mt-7 flex flex-wrap gap-3">
                {course.audience.map((item) => <span key={item} className="rounded-full border border-border bg-background/70 px-4 py-2.5 text-sm font-semibold">{item}</span>)}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">You do not need to know everything before you begin. The learning path starts with foundations and progresses through guided practice.</p>
            </div>
          </div>
        </section>

        <section id="project" className="scroll-mt-20 px-5 pb-20 sm:px-6" aria-labelledby="project-heading">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-brand text-brand-foreground" data-aos="fade-up">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{course.project.label}</p>
                <h2 id="project-heading" className="mt-3 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">{course.project.title}</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-brand-foreground/70">{course.project.description}</p>
              </div>
              <div className="grid content-center gap-3">
                {course.project.deliverables.map((item) => <div key={item} className="flex items-center gap-3 border-b border-brand-foreground/15 pb-3 text-sm font-semibold"><Check className="size-4 shrink-0 text-accent" />{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-glass-border px-5 py-16 text-center sm:px-6" data-aos="fade-up">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold">Ready to start {course.title}?</h2>
            <p className="mt-3 text-muted-foreground">Talk to a counsellor about your goals and find the right learning path.</p>
            <Button asChild size="lg" className="mt-7 rounded-full bg-accent px-7 font-semibold text-accent-foreground hover:bg-accent/90">
              <a href="/#contact">Request free counselling <ArrowRight /></a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-glass-border px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <a href="/" className="font-display font-extrabold text-ink">Luna<span className="text-accent"> Solutions</span></a>
          <p>Practical training for the careers shaping tomorrow.</p>
          <a href="/#courses" className="font-semibold text-accent">Explore all courses</a>
        </div>
      </footer>

      <a href="/#contact" aria-label="Start an enquiry" title="Start an enquiry" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-2xl shadow-accent/35 transition-transform hover:scale-105">
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}