import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function BridgeToExperience() {
  const reduce = usePrefersReducedMotion();

  const rootRef = useRef(null);      // section (untuk pin)
  const stageRef = useRef(null);     // wrapper sticky
  const kickerRef = useRef(null);    // "Next · Experience"
  const lineRef = useRef(null);      // garis sweeping
  const titleRef = useRef(null);     // judul besar
  const wipeRef = useRef(null);      // gradient wipe bg

  // helper split chars
  const splitToChars = (el) => {
    if (!el) return [];
    const text = el.textContent || "";
    el.textContent = "";
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = "bridge-char inline-block will-change-transform";
      span.textContent = text[i] === " " ? "\u00A0" : text[i];
      el.appendChild(span);
      chars.push(span);
    }
    return chars;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([kickerRef.current, lineRef.current, titleRef.current], { opacity: 1, scale: 1, x: 0 });
        return;
      }

      // split title → chars
      const chars = splitToChars(titleRef.current);

      // timeline pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top+=64",   // offset utk navbar fixed ~64px
          end: "+=140%",
          scrub: true,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      // initial states
      gsap.set(kickerRef.current, { y: 16, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      gsap.set(wipeRef.current, { clipPath: "inset(0% 100% 0% 0%)" }); // tertutup dari kanan

      // 1) kicker muncul
      tl.to(kickerRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.02);

      // 2) sweep line
      tl.to(lineRef.current, { scaleX: 1, duration: 0.6 }, 0.10);

      // 3) title per huruf
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: { each: 0.012, from: "start" },
      }, 0.16);

      // 4) background gradient wipe (kanan→kiri)
      tl.to(wipeRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, 0.26);

      // matikan will-change
      tl.eventCallback("onComplete", () => gsap.set(".bridge-char", { willChange: "auto" }));
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={rootRef} className="relative bg-black text-white">
      {/* grid halus */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
                              linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:48px_48px]" />
        {/* gradient wipe */}
        <div
          ref={wipeRef}
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent"
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        />
      </div>

      {/* pinned stage */}
      <div ref={stageRef} className="relative h-[75vh] md:h-[85vh] grid place-items-center">
        <div className="w-full max-w-6xl px-4 md:px-6">
          <p ref={kickerRef} className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Next · Experience
          </p>

          <div className="h-0.5 w-full rounded bg-white/15 overflow-hidden mb-5">
            <span ref={lineRef} className="block h-full bg-white/70 origin-left" />
          </div>

          <h2
            ref={titleRef}
            className="text-[clamp(1.8rem,5.2vw,3.2rem)] font-semibold tracking-tight"
          >
            Work Experience & Roles
          </h2>
        </div>
      </div>
    </section>
  );
}
