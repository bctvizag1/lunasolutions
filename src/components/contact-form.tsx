import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactForm({ id }: { id?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id={id} className="scroll-mt-24" aria-labelledby="contact-heading">
      <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-7 text-center sm:p-10" data-aos="zoom-in">
        {submitted ? (
          <div className="py-8">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent"><Check /></div>
            <h2 id="contact-heading" className="mt-5 font-display text-3xl font-extrabold">Thanks for your interest.</h2>
            <p className="mt-3 text-muted-foreground">Your details are not sent yet. Please contact Luna Solutions directly to arrange your counselling session.</p>
            <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Back to form</Button>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Start with a conversation</p>
            <h2 id="contact-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight">Not sure where to start?</h2>
            <p className="mt-3 text-muted-foreground">Book a free counselling session and we’ll map the right pathway for your goals.</p>
            <form className="mt-8 grid gap-3 text-left sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="text-sm font-semibold">Full name<input required name="name" autoComplete="name" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Your name" /></label>
              <label className="text-sm font-semibold">Phone number<input required type="tel" name="phone" autoComplete="tel" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Your phone number" /></label>
              <label className="text-sm font-semibold">WhatsApp number<input type="tel" name="whatsapp" autoComplete="tel" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Your WhatsApp number" /></label>
              <label className="text-sm font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="you@example.com" /></label>
              <label className="text-sm font-semibold sm:col-span-2">Qualification<input name="qualification" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2" placeholder="Engineering, diploma, graduate..." /></label>
              <label className="text-sm font-semibold sm:col-span-2">Course interested in<select name="course" className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2"><option>Networking &amp; CCNA</option><option>Microsoft Azure Cloud</option><option>Cyber Security</option><option>Generative AI</option><option>AI Agents</option></select></label>
              <Button type="submit" size="lg" className="mt-2 rounded-xl bg-accent font-semibold text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90 sm:col-span-2">Request free counselling <ArrowRight /></Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}