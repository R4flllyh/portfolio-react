import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "./sectionHead";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi masuk seluruh section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Animasi setiap paragraf dengan stagger
      gsap.utils.toArray(".about-line").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
            },
          }
        );
      });

      // Animasi list poin
      gsap.utils.toArray(".about-bullet").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto max-w-5xl px-4 md:px-6 py-24 md:py-32"
    >
      <SectionHead
        kicker="About"
        title="Building interfaces that feel effortless."
        right={<span>Indonesia · Remote-ready</span>}
      />

      <div className="space-y-6 text-[18px] leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p className="about-line">
          I’m <span className="font-semibold">Muhammad Rafly Hidayahtullah</span>, a passionate junior developer based in Surabaya, Indonesia. I love building web and mobile applications with Flutter & Laravel, designing clean interfaces with Tailwind, and exploring UI/UX using Figma.
        </p>
        <p className="about-line">
          My work focuses on building interfaces that not only look great but also feel intuitive,
          responsive, and alive through motion and subtle interactions.
        </p>
        <p className="about-line">
          I primarily use <strong>React</strong>, <strong>TailwindCSS</strong>,{" "}
          <strong>GSAP</strong>, and <strong>Framer Motion</strong> — tools that help me deliver
          smooth, delightful experiences with precision and scalability.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[1spx] text-neutral-600 dark:text-neutral-400">
        <li className="about-bullet">• Focused on accessibility & user experience</li>
        <li className="about-bullet">• Performance-driven development</li>
        <li className="about-bullet">• Modular, scalable component systems</li>
        <li className="about-bullet">• Micro-interactions & motion-based UX</li>
      </ul>
    </section>
  );
}
