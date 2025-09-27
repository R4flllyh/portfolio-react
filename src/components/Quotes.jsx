// src/components/Quotes.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

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

  // SVG
  const mainPath = useRef(null);
  const secondPath = useRef(null);

  // helper assign
  const setSwitchItem = (el, i) => (switchRefs.current[i] = el || switchRefs.current[i]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // split chars util
      const splitToChars = (el) => {
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

      // SWITCHER (inline-grid, bisa wrap)
      // Semua item ditaruh di grid-area yang sama (1/1). Container jadi sebesar item aktif dan teks bisa wrap.
      gsap.set(switchRefs.current, { opacity: 0, y: 8, scale: 0.96 });
      if (switchRefs.current[0]) {
        gsap.set(switchRefs.current[0], { opacity: 1, y: 0, scale: 1 });
      }

      const switchTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      // urutan animasi antar item
      const idxOrder = [0, 1, 2]; // Learning -> Improving -> building better things
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

      // SVG draw + morph
      const p2 = "M 0 100 C 200 0 400 200 600 100 S 1000 0 1200 100";
      const p3 = "M 0 100 C 140 40 320 160 600 100 S 1060 160 1200 100";

      const drawTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", end: "top 30%", scrub: 1 },
      });
      drawTl.fromTo(mainPath.current, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "none" });

      gsap.fromTo(
        secondPath.current,
        { drawSVG: "0%", strokeDasharray: "12 8", strokeDashoffset: 140 },
        {
          drawSVG: "100%",
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 66%", end: "top 36%", scrub: 1 },
        }
      );

      const morphTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "center bottom", end: "bottom top", scrub: 1 },
      });
      morphTl
        .to(mainPath.current, { morphSVG: p2, duration: 1.6, ease: "power2.inOut" })
        .to(mainPath.current, { morphSVG: p3, duration: 1.6, ease: "power2.inOut" });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="quotes" className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Headline – biarkan teks bebas wrapping di mobile */}
        <h2 className="text-[clamp(1.9rem,6vw,4.6rem)] font-bold leading-[1.1] tracking-tight">
          <span ref={partARef} className="text-white">Every line</span>{" "}
          <span ref={partBRef} className="text-neutral-400">of code</span>{" "}
          <span ref={partCRef} className="text-white">is a step</span>{" "}
          <span ref={partDRef} className="text-neutral-400">forward</span>{" "}
          <span className="inline-block align-[-0.12em]">
            <img
              ref={wheelRef}
              src="/src/assets/wheel_5.svg"
              alt="wheel"
              className="h-[1.1em] w-auto select-none pointer-events-none mt-4"
              draggable="false"
            />
          </span>{" "}
          {/* SWITCH: inline-grid supaya bisa wrap ke baris berikut saat sempit */}
          <span
            ref={switchWrapRef}
            className="inline-grid align-baseline whitespace-normal text-[#d1f48b]"
            style={{ gridTemplateAreas: '"stack"', gridAutoFlow: "row" }}
          >
            <span ref={(el) => setSwitchItem(el, 0)} className="[grid-area:stack]">
              Learning
            </span>
            <span ref={(el) => setSwitchItem(el, 1)} className="[grid-area:stack]">
              Improving
            </span>
            <span ref={(el) => setSwitchItem(el, 2)} className="[grid-area:stack]">
              building better things
            </span>
          </span>
        </h2>

        {/* SVG underline – full width & responsif */}
        <div className="relative mt-10 md:mt-14">
          <svg
            ref={null}
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
