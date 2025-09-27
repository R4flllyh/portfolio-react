// src/components/About.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Ubah sesuai tinggi navbar-mu (px)
const NAV_H = 64;

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin ABOUT sampai #experience berada di posisi top (di bawah navbar)
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: `top top+=${NAV_H}`,
        endTrigger: "#experience",
        end: `top top+=${NAV_H}`,
        pin: true,
        pinSpacing: false,      // penting: biar Experience benar-benar menimpa
        anticipatePin: 1,
      });

      // (opsional) animasi masuk About saat pertama kali terlihat
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 16, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom-=10%",
            once: true,
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="relative z-10 bg-black text-white">
      {/* tinggi viewport − navbar supaya pas di bawah nav */}
      <div className="min-h-[calc(100vh-64px)] pt-16 md:pt-20 pb-16 grid place-items-center">
        <div className="w-full max-w-6xl px-4 md:px-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 mb-4">
            About
          </p>

          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
            Building interfaces that feel effortless.
          </h2>

          <div className="mt-5 space-y-4 text-[21px] leading-relaxed text-neutral-300">
            <p>
              I’m <span className="font-semibold">Muhammad Rafly Hidayahtullah</span>, a passionate junior developer based in Surabaya, Indonesia. I love building web and mobile applications with Flutter & Laravel, designing clean interfaces with Tailwind, and exploring UI/UX using Figma.
            </p>
            <p>
              I enjoy turning ideas into functional products and am always excited to collaborate and learn something new.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
