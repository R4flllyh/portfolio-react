import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, className="", ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15 });
  const sy = useSpring(my, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    mx.set(x * 0.2); my.set(y * 0.2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x: sx, y: sy }}
      className={`px-5 h-11 rounded-full border border-neutral-900 dark:border-white transition bg-transparent hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
