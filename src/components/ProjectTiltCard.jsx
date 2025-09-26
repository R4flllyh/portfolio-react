import { useRef, useState } from "react";
export default function ProjectTiltCard({ children, className="" }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, g: "" });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 10; const rx = -(py - 0.5) * 10;
    setT({ rx, ry, g: `radial-gradient(400px circle at ${px*100}% ${py*100}%, rgba(255,255,255,0.25), transparent 40%)` });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, g: "" });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transform:`perspective(800px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }} className={`relative transition-transform duration-150 will-change-transform ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ backgroundImage: t.g }} />
      {children}
    </div>
  );
}
