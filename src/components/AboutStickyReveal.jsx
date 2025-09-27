// src/components/AboutStickyReveal.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky scene:
 * - Section tinggi ~200% viewport
 * - Container sticky h-screen
 * - Layer ABOUT (atas) → fade/slide out
 * - Layer EXPERIENCE (bawah) → clip + fade/slide in
 */
export default function AboutStickyReveal() {
  const rootRef = useRef(null);
  const stickyRef = useRef(null);
  const aboutRef = useRef(null);
  const expRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // setup awal layer
      gsap.set(aboutRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(expRef.current, {
        opacity: 0,
        yPercent: 12,
        clipPath: "inset(18% 0% 0% 0%)", // reveal dari atas
      });

      // timeline pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=200%",          // durasi scene (boleh 180–260)
          scrub: true,
          pin: stickyRef.current,  // yang dipin hanya container di dalam
          pinSpacing: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.out" }, // smooth, tidak bouncy
      });

      // EXP in, ABOUT out (overlap)
      tl.to(expRef.current, {
        opacity: 1,
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
      }, 0.15)
        .to(aboutRef.current, {
          opacity: 0,
          yPercent: -6,
          duration: 0.7,
        }, 0.2);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative h-[200vh] bg-black text-white">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* background grid halus */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
                              linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:48px_48px]" />

        {/* LAYER: ABOUT (atas) */}
        <div ref={aboutRef} className="absolute inset-0">
          <div className="h-full grid place-items-center">
            <div className="w-full max-w-5xl px-4 md:px-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 mb-4">
                About
              </p>
              <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
                Building interfaces that feel effortless.
              </h2>
              <div className="mt-5 space-y-4 text-[18px] leading-relaxed text-neutral-300">
                <p>
                  I’m <span className="font-semibold">Muhammad Rafly Hidayahtullah</span>, a junior
                  frontend developer based in Surabaya. I build modern web experiences with a focus
                  on clarity, motion, and performance.
                </p>
                <p>
                  I work primarily with <b>React</b>, <b>TailwindCSS</b>, <b>GSAP</b>, and
                  <b> Framer Motion</b> to ship fast, accessible, delightful UI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER: EXPERIENCE (muncul mengambil alih) */}
        <div ref={expRef} className="absolute inset-0">
          <div className="h-full grid place-items-center">
            <div className="w-full max-w-6xl px-4 md:px-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 mb-4">
                Experience
              </p>
              <h2 className="text-[clamp(2rem,6vw,3.2rem)] font-semibold tracking-tight">
                Work Experience & Roles
              </h2>

              {/* 3 kartu pengalaman (ringkas). Kalau mau full, pakai komponen Experience di bawah scene ini */}
              <ol className="mt-8 space-y-6">
                {/* Card 1 */}
                <li className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-semibold">Junior Frontend Web Developer</h3>
                    <span className="text-sm text-white/60">· Internship</span>
                    <span className="text-sm text-white/60">· Yayasan Tangan Pengharapan — Jakarta</span>
                    <span className="ml-auto text-sm text-white/60">
                      Feb 2025 — Present · 8 mos
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] text-neutral-300">
                    Contributing to the foundation’s digital platforms with a focus on frontend technologies.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Customized WP themes & reusable components", "Laravel feature integration"].map((t) => (
                      <span key={t} className="px-3 py-1.5 text-[13px] rounded-lg border border-white/10 bg-white/5">
                        {t}
                      </span>
                    ))}
                    {["WordPress", "Laravel"].map((t) => (
                      <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] rounded-xl border border-white/10 bg-white/5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t}
                      </span>
                    ))}
                  </div>
                </li>

                {/* Card 2 */}
                <li className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-semibold">WordPress Developer</h3>
                    <span className="text-sm text-white/60">· Freelance</span>
                    <span className="text-sm text-white/60">· PT Webcare Digital Indonesia — Sidoarjo</span>
                    <span className="ml-auto text-sm text-white/60">
                      Mar 2023 — Dec 2024 · 1 yr 10 mos
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] text-neutral-300">
                    Delivered client sites with clean UI, performance tuning, and maintainable themes.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["UI/UX Design", "Figma Prototyping"].map((t) => (
                      <span key={t} className="px-3 py-1.5 text-[13px] rounded-lg border border-white/10 bg-white/5">
                        {t}
                      </span>
                    ))}
                    {["WordPress", "Figma"].map((t) => (
                      <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] rounded-xl border border-white/10 bg-white/5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t}
                      </span>
                    ))}
                  </div>
                </li>

                {/* Card 3 */}
                <li className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-semibold">WordPress Developer</h3>
                    <span className="text-sm text-white/60">· Internship</span>
                    <span className="text-sm text-white/60">· PT Webcare Digital Indonesia — Sidoarjo</span>
                    <span className="ml-auto text-sm text-white/60">
                      Oct 2022 — Mar 2023 · 6 mos
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] text-neutral-300">
                    Implemented designs and components; contributed to layouts and accessibility.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["UI/UX Implementation", "Figma Design"].map((t) => (
                      <span key={t} className="px-3 py-1.5 text-[13px] rounded-lg border border-white/10 bg-white/5">
                        {t}
                      </span>
                    ))}
                    {["WordPress", "Figma"].map((t) => (
                      <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] rounded-xl border border-white/10 bg-white/5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t}
                      </span>
                    ))}
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
