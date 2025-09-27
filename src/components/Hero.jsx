// src/components/Hero.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const reduce = usePrefersReducedMotion();

  // refs
  const stageRef  = useRef(null);   // elemen yang dipin
  const kickerRef = useRef(null);   // kicker
  const line1ARef = useRef(null);   // "Hi, I’m"
  const line1BRef = useRef(null);   // "Muhammad Rafly Hidayahtullah"
  const line2Ref  = useRef(null);   // subheadline
  const subRef    = useRef(null);   // optional subcopy kecil
  const ctaRef    = useRef(null);   // CTA row
  const maskRef   = useRef(null);   // clip reveal wrapper
  const panelRef  = useRef(null);   // panel isi

  // helper: ubah textNode -> <span.char> (space -> &nbsp;)
  const splitLineToChars = (el) => {
    if (!el) return [];
    const text = el.textContent || "";
    el.textContent = "";
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = "char inline-block will-change-transform";
      span.textContent = text[i] === " " ? "\u00A0" : text[i];
      el.appendChild(span);
      chars.push(span);
    }
    return chars;
  };

  useEffect(() => {
    if (reduce) {
      // Fallback minimal (tanpa pin)
      gsap.fromTo(
        [line1ARef.current, line1BRef.current, line2Ref.current, subRef.current, ctaRef.current, maskRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const chars1a = splitLineToChars(line1ARef.current);
      const chars1b = splitLineToChars(line1BRef.current);
      const chars2  = splitLineToChars(line2Ref.current);

      const mm = gsap.matchMedia();

      const buildScene = (endVal = "+=170%") => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: endVal,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "expo.out" },
        });

        // setup awal
        gsap.set([chars1a, chars1b, chars2].flat(), {
          yPercent: 120, rotateX: 25, skewY: 6, opacity: 0,
        });

        // 1) headline baris 1 lalu baris 2
        tl.to(chars1a, {
          yPercent: 0, rotateX: 0, skewY: 0, opacity: 1,
          duration: 0.85, stagger: { each: 0.015, from: "start" },
        }, 0.05);

        tl.to(chars1b, {
          yPercent: 0, rotateX: 0, skewY: 0, opacity: 1,
          duration: 0.9, stagger: { each: 0.012, from: "start" },
        }, 0.14);

        // 2) subheadline
        tl.to(chars2, {
          yPercent: 0, rotateX: 0, skewY: 0, opacity: 1,
          duration: 0.8, stagger: { each: 0.01, from: "start" },
        }, 0.22);

        // 3) optional subcopy
        if (subRef.current) {
          tl.fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.30);
        }

        // 4) panel clip reveal + parallax ringan
        gsap.set(maskRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
        tl.to(maskRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }, 0.34);

        tl.fromTo(
          panelRef.current,
          { yPercent: 6, scale: 0.985, opacity: 0.98 },
          { yPercent: 0, scale: 1, opacity: 1, duration: 0.9 },
          0.34
        );

        // 5) CTA
        tl.fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.40);

        // matikan will-change setelah selesai
        tl.eventCallback("onComplete", () => gsap.set(".char", { willChange: "auto" }));

        return tl;
      };

      mm.add("(max-width: 768px)", () => buildScene("+=120%"));
      mm.add("(min-width: 769px)", () => buildScene("+=180%"));
    }, stageRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="hero" className="relative bg-black text-white">
      {/* background grid subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
                              linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:48px_48px]"
        />
      </div>

      {/* pinned scene */}
      <div ref={stageRef} className="relative h-screen overflow-hidden pt-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 h-full flex flex-col justify-center">
          {/* kicker */}
          {/* <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-400 mb-6">
            Let me introduce myself
          </p> */}

          {/* H1 berisi dua baris (masing2 akan di-split ke char) */}
          <h1 className="font-semibold tracking-tight leading-[1.06]">
            <p ref={kickerRef} className="text-[11px] uppercase tracking-[0.28em] text-neutral-400 mb-6">
              Let me introduce myself
            </p>
            <span
              ref={line1ARef}
              className="block text-[clamp(2.2rem,6vw,4.2rem)] font-bold"
            >
              Hi, I’m
            </span>
            <span
              ref={line1BRef}
              className="block text-[clamp(3rem,6vw,7rem)] mt-1 font-bold text-[#d1f48b]"
            >
              Muhammad Rafly Hidayahtullah
            </span>
          </h1>

          {/* Subheadline (H2) */}
          <h2
            ref={line2Ref}
            className="mt-3 text-[clamp(1.05rem,2.2vw,1.4rem)] leading-[1.3] text-neutral-300"
          >
            A Junior Frontend Developer based in Surabaya, Indonesia.
          </h2>

          {/* Optional subcopy */}
          <p
            ref={subRef}
            className="mt-6 max-w-2xl text-neutral-400 text-[15px] leading-relaxed"
          >
            A Software Engineer passionate about building modern and scalable web applications.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center h-12 px-6 rounded-lg text-[15px] font-medium 
                        border border-white/80 text-white bg-transparent 
                        hover:bg-white hover:text-black transition-all duration-300 ease-out 
                        shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.25)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center h-12 px-6 rounded-lg text-[15px] font-medium 
                        border border-white/30 text-white/80 bg-transparent 
                        hover:border-white hover:text-white hover:bg-white/10 
                        transition-all duration-300 ease-out"
            >
              Contact
            </a>
          </div>


          {/* Panel preview + clip reveal */}
          <div ref={maskRef} className="mt-10 rounded-2xl overflow-hidden border border-white/10">
            <div
              ref={panelRef}
              className="aspect-[16/7] bg-gradient-to-b from-neutral-900 to-neutral-800 grid place-items-center"
            >
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
