import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p / 100))})`;
    };
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-neutral-200/50 dark:bg-neutral-800/50">
      <div ref={ref} className="h-full origin-left bg-emerald-500 transition-transform duration-75 will-change-transform" />
    </div>
  );
}
