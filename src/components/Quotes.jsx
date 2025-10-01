// src/components/Quotes.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ⚠️ Plugin Club GreenSock bisa tidak tersedia saat build. Kita guard di runtime.
let DrawSVGPlugin = null;
let MorphSVGPlugin = null;

import wheelSvg from "../assets/wheel_5.svg"; // ✅ pastikan file ada di src/assets/

gsap.registerPlugin(ScrollTrigger);

export default function Quotes() {
  const sectionRef = useRef(null);

  // Headline parts
  const partARef = useRef(null);
  const partBRef = useRef(null);
  const partCRef = useRef(null);
  const partDRef = useRef(null);
  const wheelRef = useRef(null);

  // Switch area
  const switchWrapRef = useRef(null);
  const switchRefs = useRef([]); // [Learning, Improving, building better things]
  const setSwitchItem = (el, i) => (switchRefs.current[i] = el || switchRefs.current[i]);

  // SVG
  const mainPath = useRef(null);
  const secondPath = useRef(null);

  useEffect(() => {
    // === Guard dynamic import untuk plugin premium ===
    (async () => {
      try {
        if (!DrawSVGPlugin) {
          const mod = await import("gsap/DrawSVGPlugin");
          DrawSVGPlugin = mod.DrawSVGPlugin;
          gsap.registerPlugin(DrawSVGPlugin);
        }
      } catch (_) {
        // plugin tidak tersedia – biarkan tanpa drawSVG
      }
      try {
        if (!MorphSVGPlugin) {
          const mod = await import("gsap/MorphSVGPlugin");
          MorphSVGPlugin = mod.MorphSVGPlugin;
          gsap.registerPlugin(MorphSVGPlugin);
        }
      } catch (_) {
        // plugin tidak tersedia – biarkan tanpa morphSVG
      }

      const ctx = gsap.context(() => {
        // split chars util
        const splitToChars = (el) => {
          if (!el) return [];
          const t = el.textContent || "";
          el.textContent = "";
          return t.split("").map((ch) => {
            const s = document.createElement("span");
            s.className = "qchar inline-block will-change-transform";
            s.textContent = ch === " " ? "\u00A0" : ch;
            el.appendChild(s);
            return s;
          });
        };

        const groups = [partARef, partBRef, partCRef, partDRef].map((r) =>
          splitToChars(r.current)
        );

        gsap.set(groups.flat(), {
          opacity: 0,
          rotateX: -80,
          y: 22,
          scale: 0.96,
          transformOrigin: "50% 50% -12px",
        });

        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "top 38%",
            scrub: 1,
          },
          defaults: { ease: "power3.out" },
        });

        groups.forEach((chars, idx) => {
          introTl.to(
            chars,
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: { each: 0.02, from: "start" },
            },
            idx * 0.08
          );
        });

        // wheel
        if (wheelRef.current) {
          gsap.fromTo(
            wheelRef.current,
            { opacity: 0, y: 10, rotate: -20 },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
            }
          );
          gsap.to(wheelRef.current, { rotate: 360, duration: 24, repeat: -1, ease: "none" });
        }

        // SWITCHER (inline-grid, wrapping)
        gsap.set(switchRefs.current, { opacity: 0, y: 8, scale: 0.96 });
        if (switchRefs.current[0]) {
          gsap.set(switchRefs.current[0], { opacity: 1, y: 0, scale: 1 });
        }

        const switchTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        const idxOrder = [0, 1, 2]; // urutan
        for (let i = 0; i < idxOrder.length; i++) {
          const cur = idxOrder[i];
          const nxt = idxOrder[(i + 1) % idxOrder.length];
          switchTl
            .to(switchRefs.current[cur], {
              opacity: 0,
              y: -8,
              scale: 0.97,
              duration: 0.22,
              ease: "power2.in",
            })
            .to(
              switchRefs.current[nxt],
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.6)",
              },
              "<0.02"
            )
            .to({}, { duration: 0.8 });
        }

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => switchTl.play(),
          onEnterBack: () => switchTl.play(),
          onLeave: () => switchTl.pause(),
          onLeaveBack: () => switchTl.pause(),
        });

        // SVG draw + morph (jalan hanya jika plugin ada)
        const p2 = "M 0 100 C 200 0 400 200 600 100 S 1000 0 1200 100";
        const p3 = "M 0 100 C 140 40 320 160 600 100 S 1060 160 1200 100";

        if (DrawSVGPlugin) {
          const drawTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "top 30%",
              scrub: 1,
            },
          });
          drawTl.fromTo(
            mainPath.current,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 1.6, ease: "none" }
          );

          gsap.fromTo(
            secondPath.current,
            { drawSVG: "0%", strokeDasharray: "12 8", strokeDashoffset: 140 },
            {
              drawSVG: "100%",
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 66%",
                end: "top 36%",
                scrub: 1,
              },
            }
          );
        }

        if (MorphSVGPlugin) {
          const morphTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
          morphTl
            .to(mainPath.current, { morphSVG: p2, duration: 1.6, ease: "power2.inOut" })
            .to(mainPath.current, { morphSVG: p3, duration: 1.6, ease: "power2.inOut" });
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, sectionRef);

      return () => ctx.revert();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quotes"
      className="relative bg-black text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Headline */}
        <h2 className="text-[clamp(1.5rem,5vw,4.6rem)] font-bold leading-tight sm:leading-[1.12] tracking-tight">
          <div className="flex flex-wrap items-baseline gap-x-1 sm:gap-x-2">
            {/* bagian kiri (no wrap) */}
            <span className="shrink-0 whitespace-nowrap flex items-baseline gap-x-1 sm:gap-x-2">
              <span ref={partARef} className="text-white">Every line</span>
              <span ref={partBRef} className="text-neutral-400">of code</span>
              <span ref={partCRef} className="text-white">is a step</span>
              <span ref={partDRef} className="text-neutral-400">forward</span>
              <span className="inline-block align-baseline">
                <img
                  ref={wheelRef}
                  src={wheelSvg}
                  alt="wheel"
                  className="h-[0.9em] sm:h-[1em] w-auto inline-block align-[-0.15em] select-none pointer-events-none"
                  draggable="false"
                />
              </span>
            </span>

            {/* bagian kanan (switch & bisa wrap per kata) */}
            <span
              ref={switchWrapRef}
              className="min-w-0 inline-grid align-baseline text-[#d1f48b] whitespace-normal [grid-template-areas:'stack']"
            >
              <span ref={(el) => setSwitchItem(el, 0)} className="[grid-area:stack] break-words">
                {" "}Learning
              </span>
              <span ref={(el) => setSwitchItem(el, 1)} className="[grid-area:stack] break-words">
                {" "}Improving
              </span>
              <span ref={(el) => setSwitchItem(el, 2)} className="[grid-area:stack] break-words">
                {" "}building better things
              </span>
            </span>
          </div>
        </h2>

        {/* SVG underline – full width & responsif */}
        <div className="relative mt-10 md:mt-14">
          <svg
            className="w-full h-[90px] md:h-[120px] lg:h-[160px] block"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="qgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1f48b" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>

            <path
              ref={mainPath}
              d="M 0 100 Q 300 50 600 100 T 1200 100"
              stroke="url(#qgrad)"
              strokeWidth="6"
              fill="none"
            />
            <path
              ref={secondPath}
              d="M 0 120 Q 300 70 600 120 T 1200 120"
              stroke="#4ade80"
              strokeWidth="2"
              fill="none"
              opacity="0.45"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
