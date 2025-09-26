import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AnimatedBorderCard({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.to(el, { backgroundPosition: "200% 0%", duration: 6 });
    return () => tl.kill();
  }, []);
  return (
    <div className={`relative rounded-3xl p-[1px] overflow-hidden ${className}`}
         style={{ backgroundImage:"linear-gradient(90deg,rgba(16,185,129,.6),rgba(59,130,246,.6),rgba(236,72,153,.6))",
                  backgroundSize:"200% 100%" }}
         ref={ref}>
      <div className="rounded-3xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
