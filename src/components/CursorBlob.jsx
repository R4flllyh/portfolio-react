import { useEffect, useRef } from "react";
export default function CursorBlob() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let x = innerWidth/2, y = innerHeight/2, tx = x, ty = y;
    const onMove = e => { tx = e.clientX; ty = e.clientY; };
    const loop = () => { x += (tx-x)*0.12; y += (ty-y)*0.12; el.style.transform = `translate(${x-150}px, ${y-150}px)`; requestAnimationFrame(loop); };
    loop(); addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed top-0 left-0 z-[5] h-[300px] w-[300px] rounded-full blur-3xl opacity-25 dark:opacity-15"
      style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.45), transparent 70%)" }}/>
  );
}
