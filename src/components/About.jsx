// src/components/About.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const accentRef = useRef(null);
  const wordsRef = useRef([]);      // span per-kata
  const parasRef = useRef([]);      // paragraf
  const bgRef = useRef(null);       // bg parallax

  // helper: split text node -> <span class="about-word">word</span>
  const splitToWords = (el) => {
    if (!el) return [];
    const text = (el.textContent || "").trim();
    const parts = text.split(/\s+/);      // handle banyak spasi
    el.textContent = "";

    const spans = [];
    parts.forEach((w, i) => {
      const s = document.createElement("span");
      s.className = "about-word inline-block align-baseline will-change-transform";
      s.textContent = w;                  // ⬅️ TANPA spasi di dalam span
      el.appendChild(s);
      spans.push(s);

      if (i < parts.length - 1) {
        // ⬅️ spasi sebagai text node di antara span
        el.appendChild(document.createTextNode(" "));
      }
    });
    return spans;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // split headline (hanya teks sebelum span "effortless")
      const headline = h2Ref.current.querySelector("[data-head-text]");
      wordsRef.current = splitToWords(headline);

      // staging awal
      gsap.set(wordsRef.current, { yPercent: 110, opacity: 0.001, skewY: 6 });
      gsap.set(parasRef.current, { y: 18, opacity: 0.001 });
      if (accentRef.current) gsap.set(accentRef.current, { clipPath: "inset(0 100% 0 0)" });
      if (bgRef.current) gsap.set(bgRef.current, { yPercent: -6, opacity: 0.6 });

      // 1) Entry timeline (play once ketika section terlihat)
      const enterTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      enterTl
        .to(wordsRef.current, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.6,
          stagger: 0.05,
        })
        .to(
          accentRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 0.45 },
          "-=0.35"
        )
        .to(
          parasRef.current,
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.15"
        )
        .add(() => gsap.set(".about-word", { willChange: "auto" }));

      // 2) Parallax halus untuk background saat scroll melewati section
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 6,
          opacity: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // jaga ukuran/posisi setelah mount
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-black text-white overflow-hidden">
      {/* subtle bg mesh/parallax */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 10%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(60% 60% at 80% 20%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(60% 60% at 50% 90%, rgba(236,72,153,0.10), transparent 60%)",
        }}
      />
      {/* grid halus */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-24 md:py-32">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 mb-4">About</p>

        {/* Headline: bagian awal di-split, kata 'effortless' diberi accent sweep */}
        <h2
          ref={h2Ref}
          className="text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.08] tracking-tight"
        >
          <span data-head-text>Building interfaces that feel</span>
          {" "}
          <span className="relative inline-block align-baseline">
            <span className="relative z-10 text-[#d1f48b]">effortless</span>
            <span
              ref={accentRef}
              className="absolute left-0 right-0 bottom-1 h-[8px] bg-[#d1f48b]/30 rounded-full"
              aria-hidden
            />
          </span>
          .
        </h2>


        <div className="mt-6 space-y-4 text-[18px] md:text-[21px] leading-relaxed text-neutral-300">
          <p ref={(el) => (parasRef.current[0] = el)}>
            I’m <span className="font-semibold">Muhammad Rafly Hidayahtullah</span>, a passionate junior developer based in Surabaya, Indonesia. I love building web and mobile applications with Flutter & Laravel, designing clean interfaces with Tailwind, and exploring UI/UX using Figma.
          </p>
          <p ref={(el) => (parasRef.current[1] = el)}>
            I enjoy turning ideas into functional products and am always excited to collaborate and learn something new.
          </p>
        </div>
      </div>
    </section>
  );
}
