// src/components/Experience.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "./sectionHead";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * DATA pengalaman — sudah diadaptasi dari screenshot kamu.
 * Kamu bisa mengubah period/summary/highlights kapan saja.
 */
const EXPERIENCES = [
    { 
        role: "WordPress Developer",
        company: "PT Webcare Digital Indonesia", 
        location: "Sidoarjo, Indonesia", 
        period: "Oct 2022 — Mar 2023 · 6 mos", 
        employment: "Internship", 
        summary: "Implemented designs and components, contributed to layout systems and accessibility.",
        stack: ["WordPress", "Figma", "UI/UX"], 
    }, 
    { 
        role: "WordPress Developer", 
        company: "PT Webcare Digital Indonesia", 
        location: "Sidoarjo, Indonesia", 
        period: "Mar 2023 — Dec 2024 · 1 yr 10 mos", 
        employment: "Freelance", 
        summary: "Delivered client sites with clean UI, performance tuning, and maintainable theme structures.",  
        stack: ["WordPress", "Figma"], 

    }, 
    { 
        role: "Junior Frontend Web Developer", 
        company: "Yayasan Tangan Pengharapan", 
        location: "Jakarta, Indonesia", 
        period: "Feb 2025 — Present · 8 mos", 
        employment: "Internship", 
        summary: "Contributing to the development and maintenance of the foundation’s digital platforms with a focus on frontend technologies.", 
        stack: ["WordPress", "Laravel", "Tailwind CSS", "Figma", "Flutter", "Dart", "Git", "Filament"],

    },
];

export default function Experience() {
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef(null);
  const lineFillRef = useRef(null);
  const listRef = useRef(null);
  const itemsRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Progress line
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
              end: "bottom 25%",
              scrub: true,
            },
          }
        );
      }

      // Reveal items
      gsap.set(itemsRef.current, { y: 24, opacity: 0, filter: "blur(3px)" });
      gsap.set(dotsRef.current, { scale: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(itemsRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.45,
        stagger: 0.12,
      }).to(
        dotsRef.current,
        { scale: 1, duration: 0.3, stagger: 0.12 },
        "<+0.05"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  const setItemRef = (el, i) => (itemsRef.current[i] = el || itemsRef.current[i]);
  const setDotRef = (el, i) => (dotsRef.current[i] = el || dotsRef.current[i]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28"
    >
        <SectionHead
        kicker="Experience"
        title={
            <>
            Work <span className="text-[#d1f48b]">Experience & Roles</span>
            </>
        }
        />

      <div className="relative mt-10 md:mt-12 grid md:grid-cols-[1fr,3fr] gap-8 md:gap-12">
        {/* TIMELINE (kolom kiri) */}
        <div className="relative">
        {/* garis background */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
        {/* garis progress */}
        <div
            ref={lineFillRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top bg-[#d1f48b]"
            style={{ transform: "scaleY(0)" }}
        />
        {/* mobile hint */}
        <div className="md:hidden h-1.5 w-20 rounded-full bg-white/10" />
        </div>

        {/* LIST KARTU */}
        <ol ref={listRef} className="space-y-6 md:space-y-8">
        {EXPERIENCES.map((exp, i) => (
            <li
            key={i}
            ref={(el) => setItemRef(el, i)}
            className={`
                relative rounded-3xl border border-white/10 
                bg-gradient-to-b from-white/[0.06] to-white/[0.03] 
                dark:from-white/[0.04] dark:to-white/[0.02]
                p-6 md:p-7
                shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_12px_30px_-12px_rgba(0,0,0,0.45)]
                hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_40px_-10px_rgba(0,0,0,0.6)]
                transition-shadow duration-300
            `}
            >
            {/* dot timeline */}
            <span
                ref={(el) => setDotRef(el, i)}
                className="hidden md:block absolute -left-[38px] top-7 h-2.5 w-2.5 rounded-full bg-[#d1f48b]
                        ring-4 ring-[#d1f48b]/25 shadow-[0_0_24px_0_rgba(209,244,139,0.45)]"
            />

            {/* header */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <h3 className="text-[18px] md:text-[19px] font-semibold tracking-tight">
                {exp.role}
                </h3>

                {exp.employment && (
                <span className="text-sm text-white/60">· {exp.employment}</span>
                )}

                <span className="ml-auto text-sm text-white/60">
                {exp.period}
                </span>
            </div>
            <span className="text-sm text-white/70">
                {exp.company} — {exp.location}
            </span>

            {/* summary */}
            {exp.summary && (
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-300/90">
                {exp.summary}
                </p>
            )}

            {/* chips */}
            {(exp.highlights?.length || exp.stack?.length) && (
                <div className="mt-4 flex flex-wrap gap-2.5">
                {/* highlight chips */}
                {exp.highlights?.map((h, idx) => (
                    <span
                    key={`h-${idx}`}
                    className="px-3 py-1.5 text-[13px] rounded-xl
                                bg-white/[0.06] border border-white/10
                                text-neutral-200
                                hover:bg-white/[0.08] transition"
                    >
                    {h}
                    </span>
                ))}

                {/* stack chips (dengan indikator) */}
                {exp.stack?.map((t) => (
                    <span
                    key={t}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] rounded-xl
                                bg-white/[0.05] border border-white/10
                                text-neutral-200"
                    >
                    <span className="relative inline-flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-[#d1f48b]/70" />
                        <span className="absolute inset-0 rounded-full bg-[#d1f48b]/70 blur-[2px] opacity-50" />
                    </span>
                    {t}
                    </span>
                ))}
                </div>
            )}

            {/* decorative subtle gradient edge */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px 
                            bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </li>
        ))}
        </ol>

      </div>
    </section>
  );
}
