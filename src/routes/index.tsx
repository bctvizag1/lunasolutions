import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronRight, Menu, MessageCircle, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import classroomImage from "@/assets/luna-classroom.jpg";
import { Button } from "@/components/ui/button";

const courses = [
  {
    code: "CC",
    path: "/courses/networking-ccna" as const,
    title: "Networking & CCNA",
    description: "Build a strong foundation in IP addressing, switching, routing, WAN technologies and troubleshooting.",
    meta: "Networking fundamentals · Routing · Switching",
    tone: "brand",
  },
  {
    code: "AZ",
    path: "/courses/azure-cloud" as const,
    title: "Microsoft Azure Cloud",
    description: "Learn cloud computing, Azure Portal, virtual machines, storage, networking and application hosting.",
    meta: "Cloud computing · Infrastructure · Application hosting",
    tone: "accent",
  },
  {
    code: "CS",
    path: "/courses/cyber-security" as const,
    title: "Cyber Security",
    description: "Explore security fundamentals, OSINT, ethical hacking, security assessment and mobile security.",
    meta: "Ethical hacking · OSINT · Security operations",
    tone: "brand",
  },
  {
    code: "AI",
    path: "/courses/generative-ai" as const,
    title: "Generative AI",
    description: "Create modern AI applications with large language models, prompt engineering, Hugging Face and AI APIs.",
    meta: "LLMs · Prompt engineering · AI applications",
    tone: "accent",
  },
  {
    code: "AG",
    path: "/courses/ai-agents" as const,
    title: "AI Agents",
    description: "Design intelligent workflows using agentic AI, RAG, foundation models, context management and automation.",
    meta: "RAG · Agentic AI · AI workflows",
    tone: "brand",
  },
];

const benefits = [
  "Practical learning",
  "Real project experience",
  "Modern technology training",
  "Industry-oriented curriculum",
  "Career support",
  "Professional mentorship",
  "Portfolio development",
];

const careerPath = ["Student", "Training", "Projects", "Certification", "Interview prep", "Employment"];

export function LunaHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 70 });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page-wash min-h-screen overflow-hidden text-ink">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-glass-border bg-glass/75 shadow-[inset_0_1px_0_color-mix(in_oklab,white_90%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <a href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-sm font-extrabold text-brand-foreground">L</span>
            <span className="font-display text-base font-extrabold tracking-tight">Luna<span className="text-accent"> Solutions</span></span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="Primary navigation">
            <a href="#courses" className="transition-colors hover:text-ink">Courses</a>
            <a href="#pathways" className="transition-colors hover:text-ink">Pathways</a>
            <a href="#stories" className="transition-colors hover:text-ink">Stories</a>
            <a href="#contact" className="transition-colors hover:text-ink">Contact</a>
          </nav>

          <Button asChild size="sm" className="hidden rounded-full bg-accent px-5 font-semibold text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90 md:inline-flex">
            <a href="#contact">Book free counselling</a>
          </Button>
          <Button aria-label={menuOpen ? "Close menu" : "Open menu"} variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="glass-panel mx-4 mb-4 grid gap-1 rounded-2xl p-3 md:hidden" aria-label="Mobile navigation">
            {[
              ["Courses", "#courses"],
              ["Pathways", "#pathways"],
              ["Stories", "#stories"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-ink">{label}</a>
            ))}
          </nav>
        )}
      </div>

      <main>
        <header className="px-5 pb-20 pt-32 sm:px-6 lg:pb-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7" data-aos="fade-up">
              <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-muted-foreground">
                <span className="size-2 rounded-full bg-accent" />
                Visakhapatnam · Practical IT training
              </span>
              <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
                Turn curiosity into a <span className="text-accent">career in tech.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Master Networking, Azure Cloud, Cyber Security, Generative AI and AI Agents through hands-on training and real-world projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-brand px-6 font-semibold text-brand-foreground shadow-lg shadow-brand/25 hover:bg-brand/90">
                  <a href="#contact">Book free counselling <ArrowRight /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-panel rounded-full border-glass-border px-6 font-semibold text-ink hover:bg-glass/90">
                  <a href="#courses">Explore courses</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-7 text-sm text-muted-foreground sm:gap-8">
                <div><div className="font-display text-2xl font-extrabold text-ink">5</div><div>career tracks</div></div>
                <div className="h-10 w-px bg-border" />
                <div><div className="font-display text-2xl font-extrabold text-ink">100%</div><div>hands-on focus</div></div>
                <div className="h-10 w-px bg-border" />
                <div><div className="font-display text-2xl font-extrabold text-ink">1:1</div><div>career guidance</div></div>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="100">
              <div className="glass-panel rounded-3xl p-3">
                <img src={classroomImage} alt="Students collaborating on cloud technology projects in a Luna Solutions classroom" width={912} height={1136} className="aspect-[4/5] w-full rounded-2xl object-cover" />
                <div className="flex items-center gap-3 p-4">
                  <div className="grid size-11 place-items-center rounded-xl bg-accent/15 font-display font-extrabold text-accent">AI</div>
                  <div><div className="font-semibold text-sm">Emerging technology tracks</div><div className="text-xs text-muted-foreground">Labs · projects · career mentorship</div></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="courses" className="scroll-mt-24 px-5 py-16 sm:px-6" aria-labelledby="courses-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-5" data-aos="fade-up">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Learn by doing</p><h2 id="courses-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight">Featured programmes</h2></div>
              <a href="#contact" className="hidden items-center gap-1 text-sm font-semibold text-accent sm:flex">Talk to a counsellor <ChevronRight className="size-4" /></a>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <article key={course.code} className="glass-panel group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay={index * 70}>
                  <div className={`mb-5 grid size-12 place-items-center rounded-2xl font-display font-extrabold ${course.tone === "accent" ? "bg-accent/15 text-accent" : "bg-brand/10 text-brand"}`}>{course.code}</div>
                  <h3 className="font-display text-lg font-bold">{course.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
                  <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-medium text-muted-foreground"><Check className="size-4 text-accent" />{course.meta}</div>
                  <a href={course.path} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent">Explore course <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6" aria-labelledby="why-heading">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="glass-panel rounded-3xl p-8" data-aos="fade-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Built for employability</p>
              <h2 id="why-heading" className="mt-3 font-display text-3xl font-extrabold leading-tight">Skills that move with the industry.</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Luna Solutions helps engineering and diploma students build the practical confidence employers look for — from first lab to portfolio.</p>
              <Button asChild className="mt-7 rounded-full bg-brand text-brand-foreground hover:bg-brand/90"><a href="#contact">Find your pathway <ArrowRight /></a></Button>
            </div>
            <div className="glass-panel grid gap-4 rounded-3xl p-8 sm:grid-cols-2" data-aos="fade-left">
              {benefits.map((benefit) => <div key={benefit} className="flex items-start gap-3 text-sm font-semibold"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Check className="size-3.5" /></span>{benefit}</div>)}
            </div>
          </div>
        </section>

        <section id="pathways" className="scroll-mt-24 border-y border-glass-border bg-glass/35 px-5 py-16 sm:px-6" aria-labelledby="pathways-heading">
          <div className="mx-auto max-w-7xl" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Your next chapter</p>
            <h2 id="pathways-heading" className="mt-2 max-w-xl font-display text-3xl font-extrabold tracking-tight">From classroom to career, one clear pathway.</h2>
            <div className="relative mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-6">
              <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-brand/20 via-accent to-brand/20 lg:block" />
              {careerPath.map((step, index) => <div key={step} className="relative flex items-center gap-3 lg:block" data-aos="fade-up" data-aos-delay={index * 80}><div className="grid size-10 shrink-0 place-items-center rounded-full border border-glass-border bg-background font-display text-sm font-extrabold text-accent shadow-sm">{index + 1}</div><h3 className="mt-0 font-display text-sm font-bold lg:mt-4">{step}</h3></div>)}
            </div>
          </div>
        </section>

        <section id="stories" className="scroll-mt-24 px-5 py-16 sm:px-6" aria-labelledby="stories-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10" data-aos="fade-up"><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Student confidence</p><h2 id="stories-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight">Learn with support at every step.</h2></div>
            <div className="grid gap-6 lg:grid-cols-2">
              <figure className="glass-panel rounded-3xl p-8" data-aos="fade-up">
                <div className="font-display text-2xl font-extrabold tracking-widest text-accent">★★★★★</div>
                <blockquote className="mt-4 font-display text-lg font-semibold leading-relaxed">“The practical projects helped me understand what I was learning and gave me the confidence to discuss my skills.”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-brand/10 font-bold text-brand">ES</span><span><span className="block text-sm font-semibold">Engineering student</span><span className="block text-xs text-muted-foreground">Luna Solutions learner</span></span></figcaption>
              </figure>
              <figure className="glass-panel rounded-3xl p-8" data-aos="fade-up" data-aos-delay="100">
                <div className="font-display text-2xl font-extrabold tracking-widest text-accent">★★★★★</div>
                <blockquote className="mt-4 font-display text-lg font-semibold leading-relaxed">“The mentorship made advanced topics feel approachable. I could see a real career path, not just a list of technologies.”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-accent/15 font-bold text-accent">FG</span><span><span className="block text-sm font-semibold">Fresh graduate</span><span className="block text-xs text-muted-foreground">Luna Solutions learner</span></span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 py-20 sm:px-6" aria-labelledby="contact-heading">
          <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-7 text-center sm:p-10" data-aos="zoom-in">
            {submitted ? (
              <div className="py-8"><div className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent"><Check /></div><h2 className="mt-5 font-display text-3xl font-extrabold">Thanks — we’ll be in touch.</h2><p className="mt-3 text-muted-foreground">Your counselling request has been noted. Our team will help map the right track for you.</p></div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Start with a conversation</p>
                <h2 id="contact-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight">Not sure where to start?</h2>
                <p className="mt-3 text-muted-foreground">Book a free counselling session and we’ll map the right pathway for your goals.</p>
                <form className="mt-8 grid gap-3 text-left sm:grid-cols-2" onSubmit={handleSubmit}>
                  <label className="text-sm font-semibold">Full name<input required name="name" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Your name" /></label>
                  <label className="text-sm font-semibold">Mobile number<input required name="phone" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Your mobile number" /></label>
                  <label className="text-sm font-semibold">Email address<input required type="email" name="email" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="you@example.com" /></label>
                  <label className="text-sm font-semibold">Qualification<input name="qualification" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Engineering, diploma, graduate..." /></label>
                  <label className="text-sm font-semibold sm:col-span-2">Course interested in<select name="course" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2"><option>Networking & CCNA</option><option>Microsoft Azure Cloud</option><option>Cyber Security</option><option>Generative AI</option><option>AI Agents</option></select></label>
                  <Button type="submit" size="lg" className="mt-2 rounded-xl bg-accent font-semibold text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90 sm:col-span-2">Request free counselling <ArrowRight /></Button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-glass-border px-5 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="font-display font-extrabold text-ink">Luna<span className="text-accent"> Solutions</span></div>
          <p>Practical training for the careers shaping tomorrow.</p>
          <a href="#contact" className="font-semibold text-accent hover:underline">Contact admissions</a>
        </div>
      </footer>

      <a href="#contact" aria-label="Start a WhatsApp enquiry" title="Start a WhatsApp enquiry" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-2xl shadow-accent/35 transition-transform hover:scale-105">
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}