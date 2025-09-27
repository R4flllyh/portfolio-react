// src/components/Contact.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "./sectionHead";
import GlowButton from "./GlowButton";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const fieldsRef = useRef([]);
  const footerRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      // garis dekor tipis di bawah title (draw-in)
      if (underlineRef.current) {
        gsap.fromTo(
          underlineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "0% 50%",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }

      // form fields stagger
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 40%",
          once: true,
        },
      });

      gsap.set(fieldsRef.current, { y: 18, opacity: 0, filter: "blur(3px)" });

      tl.to(fieldsRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.45,
        stagger: 0.08,
      }).fromTo(
        footerRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        "-=0.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  // helper untuk register ref tiap field
  const setFieldRef = (el, idx) => {
    if (!el) return;
    fieldsRef.current[idx] = el;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28"
    >
      <SectionHead kicker="Contact" title="Let’s build something modern." />
      {/* underline dekor sederhana */}
      <div
        ref={underlineRef}
        className="mt-2 h-px w-24 bg-neutral-200 dark:bg-neutral-800"
        style={{ transform: "scaleX(0)" }}
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-10 grid md:grid-cols-2 gap-4 md:gap-6"
      >
        <input
          ref={(el) => setFieldRef(el, 0)}
          placeholder="Your name"
          className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-4 outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10 focus:border-transparent transition"
        />
        <input
          ref={(el) => setFieldRef(el, 1)}
          type="email"
          placeholder="Email"
          className="h-11 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-4 outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10 focus:border-transparent transition"
        />
        <textarea
          ref={(el) => setFieldRef(el, 2)}
          placeholder="Tell me about your project…"
          className="md:col-span-2 min-h-[130px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-4 outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10 focus:border-transparent transition"
        />

        <div
          ref={footerRef}
          className="md:col-span-2 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        >
          <span className="text-sm text-neutral-500">
            Reply within 1–2 days · GMT+7
          </span>
          <GlowButton type="submit">Send inquiry</GlowButton>
        </div>
      </form>
    </section>
  );
}
