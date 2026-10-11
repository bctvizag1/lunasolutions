import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-glass-border bg-background/80 px-4 py-3 text-sm font-normal outline-none ring-ring transition focus:ring-2";

export function ContactForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/counselling.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          whatsapp: String(data.get("whatsapp") ?? ""),
          email: String(data.get("email") ?? ""),
          qualification: String(data.get("qualification") ?? ""),
          course: String(data.get("course") ?? ""),
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id={id} className="scroll-mt-24" aria-labelledby="contact-heading">
      <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-7 text-center sm:p-10" data-aos="zoom-in">
        {status === "submitted" ? (
          <div className="py-8">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent"><Check /></div>
            <h2 id="contact-heading" className="mt-5 font-display text-3xl font-extrabold">Thanks for your interest.</h2>
            <p className="mt-3 text-muted-foreground">Your enquiry has been received. The Luna Solutions team will contact you shortly to arrange your counselling session.</p>
            <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Back to form</Button>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Start with a conversation</p>
            <h2 id="contact-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight">Not sure where to start?</h2>
            <p className="mt-3 text-muted-foreground">Book a free counselling session and we’ll map the right pathway for your goals.</p>
            <form className="mt-8 grid gap-3 text-left sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="text-sm font-semibold">Full name<input required name="name" autoComplete="name" className={inputClass} placeholder="Your name" /></label>
              <label className="text-sm font-semibold">Phone number<input required type="tel" name="phone" autoComplete="tel" className={inputClass} placeholder="Your phone number" /></label>
              <label className="text-sm font-semibold">WhatsApp number<input type="tel" name="whatsapp" autoComplete="tel" className={inputClass} placeholder="Your WhatsApp number" /></label>
              <label className="text-sm font-semibold">Email address<input required type="email" name="email" autoComplete="email" className={inputClass} placeholder="you@example.com" /></label>
              <label className="text-sm font-semibold sm:col-span-2">Qualification<input name="qualification" className={inputClass} placeholder="Engineering, diploma, graduate..." /></label>
              <label className="text-sm font-semibold sm:col-span-2">Course interested in<select name="course" className={inputClass}><option>Networking &amp; CCNA</option><option>Microsoft Azure Cloud</option><option>Cyber Security</option><option>Generative AI</option><option>AI Agents</option></select></label>
              {status === "error" && (
                <p className="text-sm font-semibold text-destructive sm:col-span-2">Something went wrong while sending your enquiry. Please try again.</p>
              )}
              <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-2 rounded-xl bg-accent font-semibold text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90 sm:col-span-2">
                {status === "submitting" ? <>Sending… <Loader2 className="animate-spin" /></> : <>Request free counselling <ArrowRight /></>}
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
