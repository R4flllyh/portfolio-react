import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  useEffect(() => {
    // Reset dulu state active saat reload
    document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("text-white"));

    // Observer tiap section
    gsap.utils.toArray("section[id]").forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("text-white", "font-semibold"));
            const active = document.querySelector(`a[data-nav='${sec.id}']`);
            active?.classList.add("text-white", "font-semibold");
          }
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/50 border-b border-white/10 flex justify-center py-4">
      <div className="flex gap-8 text-sm">
        <a data-nav="hero" href="#hero" className="nav-link text-neutral-400 hover:text-white transition">Home</a>
        <a data-nav="about" href="#about" className="nav-link text-neutral-400 hover:text-white transition">About</a>
        <a data-nav="projects" href="#projects" className="nav-link text-neutral-400 hover:text-white transition">Projects</a>
        <a data-nav="contact" href="#contact" className="nav-link text-neutral-400 hover:text-white transition">Contact</a>
      </div>
    </nav>
  );
}
