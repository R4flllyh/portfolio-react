export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/50 border-b border-white/10 flex justify-center py-4">
      <div className="flex gap-8 text-sm">
        <a
          href="#hero"
          className="text-neutral-400 hover:text-white transition"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-neutral-400 hover:text-white transition"
        >
          About
        </a>
        <a
          href="#projects"
          className="text-neutral-400 hover:text-white transition"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-neutral-400 hover:text-white transition"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
