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
        summary: "Implemented designs and components, contributed to layout systems and accessibility.", highlights: ["UI/UX Implementation", "Figma Design"], 
        stack: ["WordPress", "Figma"], 
    }, 
    { 
        role: "WordPress Developer", 
        company: "PT Webcare Digital Indonesia", 
        location: "Sidoarjo, Indonesia", 
        period: "Mar 2023 — Dec 2024 · 1 yr 10 mos", 
        employment: "Freelance", 
        summary: "Delivered client sites with clean UI, performance tuning, and maintainable theme structures.", 
        highlights: ["UI/UX Design", "Figma Prototyping"], 
        stack: ["WordPress", "Figma"], 

    }, 
    { 
        role: "Junior Frontend Web Developer", 
        company: "Yayasan Tangan Pengharapan", 
        location: "Jakarta, Indonesia", 
        period: "Feb 2025 — Present · 8 mos", 
        employment: "Internship", 
        summary: "Contributing to the development and maintenance of the foundation’s digital platforms with a focus on frontend technologies.", 
        highlights: [ "Customized WordPress themes.", "Collaborated with backend developers to integrate Laravel-based features.", ],
        stack: ["WordPress", "Laravel"],

    },
];

export default function Experience() {
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef(null);
  const lineBgRef = useRef(null);
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
      className="relative mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28"
    >
      <SectionHead kicker="Experience" title="Pengalaman kerja & peran." />

      <div className="relative mt-10 md:mt-12 grid md:grid-cols-[1fr,3fr] gap-8 md:gap-12">
        {/* Timeline column */}
        <div className="relative">
          <div
            ref={lineBgRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-neutral-800/60 dark:bg-neutral-200/10"
          />
          <div
            ref={lineFillRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-emerald-400/80 origin-top"
            style={{ transform: "scaleY(0)" }}
          />
          <div className="md:hidden h-1.5 w-20 rounded-full bg-neutral-800/60 dark:bg-neutral-200/10" />
        </div>

        {/* Items */}
        <ol ref={listRef} className="space-y-8 md:space-y-10">
          {EXPERIENCES.map((exp, i) => (
            <li
              key={i}
              ref={(el) => setItemRef(el, i)}
              className="relative rounded-2xl border border-neutral-200/70 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/50 backdrop-blur p-5 md:p-6"
            >
              {/* Dot (desktop) */}
              <span
                ref={(el) => setDotRef(el, i)}
                className="hidden md:block absolute -left-[1.125rem] top-6 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"
              />

              {/* Jika single-role */}
              {!exp.roles && (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                      {exp.role}
                    </h3>
                    {exp.employment && (
                      <>
                        <span className="text-sm text-neutral-500">·</span>
                        <span className="text-sm text-neutral-500">
                          {exp.employment}
                        </span>
                      </>
                    )}
                    <span className="text-sm text-neutral-500">·</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {exp.company} — {exp.location}
                    </span>
                    <span className="ml-auto text-sm text-neutral-500">
                      {exp.period}
                    </span>
                  </div>

                  {exp.summary && (
                    <p className="mt-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {exp.summary}
                    </p>
                  )}

                  {(exp.highlights?.length > 0 || exp.stack?.length > 0) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.highlights?.map((h, idx) => (
                        <span
                          key={`h-${idx}`}
                          className="text-[13px] px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-white/60 dark:bg-neutral-900/60"
                        >
                          {h}
                        </span>
                      ))}
                      {exp.stack?.map((t) => (
                        <span
                          key={t}
                          className="text-[12px] inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-3 py-1.5 text-neutral-700 dark:text-neutral-300"
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Jika multi-role di satu perusahaan */}
              {exp.roles && (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                      {exp.company}
                    </h3>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      — {exp.location}
                    </span>
                    <span className="ml-auto text-sm text-neutral-500">
                      {exp.period}
                    </span>
                  </div>

                  {exp.summary && (
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {exp.summary}
                    </p>
                  )}

                  <div className="mt-4 space-y-4">
                    {exp.roles.map((r, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/50 dark:bg-neutral-900/50"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-medium">{r.title}</span>
                          {r.employment && (
                            <span className="text-sm text-neutral-500">· {r.employment}</span>
                          )}
                          <span className="ml-auto text-sm text-neutral-500">
                            {r.period}
                          </span>
                        </div>

                        {(r.highlights?.length > 0 || r.stack?.length > 0) && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {r.highlights?.map((h, i2) => (
                              <span
                                key={`rh-${i2}`}
                                className="text-[13px] px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-white/60 dark:bg-neutral-900/60"
                              >
                                {h}
                              </span>
                            ))}
                            {r.stack?.map((t) => (
                              <span
                                key={t}
                                className="text-[12px] inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-3 py-1.5 text-neutral-700 dark:text-neutral-300"
                              >
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
