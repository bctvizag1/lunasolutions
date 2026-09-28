import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";

export function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 70 });
    AOS.refresh();
  }, []);

  return (
    <div className="page-wash min-h-screen text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border bg-glass/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-sm font-extrabold text-brand-foreground">L</span>
            <span className="font-display text-base font-extrabold">Luna<span className="text-accent"> Solutions</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="Primary navigation">
            <a href="/" className="transition-colors hover:text-ink">Home</a>
            <a href="/#courses" className="transition-colors hover:text-ink">Courses</a>
            <a href="/#pathways" className="transition-colors hover:text-ink">Pathways</a>
            <a href="/contact" aria-current="page" className="font-semibold text-accent">Contact</a>
          </nav>
          <Button asChild size="sm" className="hidden rounded-full bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent/90 md:inline-flex"><a href="#contact">Book free counselling</a></Button>
          <Button aria-label={menuOpen ? "Close menu" : "Open menu"} variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="glass-panel mx-4 mb-4 grid gap-1 rounded-lg p-3 md:hidden" aria-label="Mobile navigation">
          <a href="/" className="rounded-md px-3 py-2 text-sm font-semibold">Home</a>
          <a href="/#courses" className="rounded-md px-3 py-2 text-sm font-semibold">Courses</a>
          <a href="/#pathways" className="rounded-md px-3 py-2 text-sm font-semibold">Pathways</a>
          <a href="#contact" className="rounded-md px-3 py-2 text-sm font-semibold text-accent" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>}
      </header>

      <main className="px-5 pb-20 pt-32 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Luna Solutions</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Contact us</h1>
            <p className="mt-4 text-lg text-muted-foreground">Let’s talk about your next step in technology training.</p>
          </div>
          <ContactForm id="contact" />
        </div>
      </main>
      <footer className="border-t border-glass-border px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <a href="/" className="font-display font-extrabold text-ink">Luna<span className="text-accent"> Solutions</span></a>
          <p>Practical training for the careers shaping tomorrow.</p>
          <a href="/#courses" className="font-semibold text-accent">Explore courses</a>
        </div>
      </footer>
    </div>
  );
}