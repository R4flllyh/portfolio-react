import SectionHead from "./sectionHead";
import GlowButton from "./GlowButton";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28">
      <SectionHead kicker="Contact" title="Let’s build something modern." />
      <form onSubmit={(e)=>e.preventDefault()} className="grid md:grid-cols-2 gap-6 md:gap-8">
        <input placeholder="Your name" className="h-12 rounded-2xl border border-neutral-300/70 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-4 outline-none focus:ring-2 focus:ring-neutral-900/20" />
        <input type="email" placeholder="Email" className="h-12 rounded-2xl border border-neutral-300/70 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-4 outline-none focus:ring-2 focus:ring-neutral-900/20" />
        <textarea placeholder="Tell me about your project…" className="md:col-span-2 min-h-[140px] rounded-2xl border border-neutral-300/70 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-4 outline-none focus:ring-2 focus:ring-neutral-900/20" />
        <div className="md:col-span-2 flex items-center justify-between">
          <span className="text-sm text-neutral-500">Reply within 1–2 days · GMT+7</span>
          <GlowButton>Send inquiry</GlowButton>
        </div>
      </form>
    </section>
  );
}
