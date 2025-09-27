import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee({
  text = "Junior Frontend • Web Development • Flutter Development • UI/UX •",
  speed = 30, // durasi loop (semakin tinggi semakin lambat)
}) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // 🔄 Animasi horizontal berjalan terus
    const tween = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: speed,
      ease: "none",
    });

    // ✨ Fade-in saat awal
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    return () => tween.kill();
  }, [speed]);

  return (
    <div
      className="overflow-hidden relative border-y border-neutral-200 dark:border-neutral-800 bg-[#d1f48b] text-black dark:via-white/5 select-none"
      onMouseEnter={() => gsap.globalTimeline.pause()}
      onMouseLeave={() => gsap.globalTimeline.resume()}
    >
      <div className="whitespace-nowrap relative py-5 md:py-6">
        <div
          ref={marqueeRef}
          className="flex gap-2 text-xl md:text-2xl font-semibold tracking-wide uppercase opacity-80"
          style={{ willChange: "transform" }}
        >
          {/* 🌀 Render teks dua kali supaya looping mulus */}
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
