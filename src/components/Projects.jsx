import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "./sectionHead";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Realtime Dashboard",
    role: "React • Zustand • Charts",
    year: "2025",
    desc: "Realtime metrics with websocket updates and accessible interactions.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    href: "#",
    repo: "#",
    tags: ["React", "Zustand", "D3/Recharts"],
  },
  {
    title: "Interactive Landing v3",
    role: "Next.js • GSAP",
    year: "2024",
    desc: "Landing page with split-text hero, sticky scenes, and smooth scroll.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop",
    href: "#",
    repo: "#",
    tags: ["Next.js", "GSAP", "SEO"],
  },
  {
    title: "UI Anim Kit",
    role: "Design System • Docs",
    year: "2024",
    desc: "Motion guidelines & ready-to-use components for product teams.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    href: "#",
    repo: "#",
    tags: ["Framer Motion", "Docs", "DX"],
  },
  {
    title: "E-Commerce Micro-interactions",
    role: "Patterns • Accessibility",
    year: "2024",
    desc: "Add-to-cart, price reveal, and keyboard-friendly filters.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    href: "#",
    tags: ["A11y", "Performance"],
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal tiap kartu
      gsap.utils.toArray(".proj-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // garis divider animasi (opsional, cantik!)
      gsap.fromTo(
        ".proj-divider",
        { scaleX: 0, transformOrigin: "0% 50%", opacity: 0.4 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 scroll-mt-24 mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28"
    >
      <SectionHead
        kicker="Projects"
        title="Modern interfaces, production-ready."
        right={<a href="#" className="underline underline-offset-4">All projects</a>}
      />

      {/* Divider tipis */}
      <div className="proj-divider h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 my-8" />

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS.map((p) => (
          <div key={p.title} className="proj-card will-change-transform">
            <ProjectCard item={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
