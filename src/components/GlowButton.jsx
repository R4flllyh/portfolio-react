import { motion } from "framer-motion";
export default function GlowButton({ children, className="", ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center h-11 px-5 rounded-full text-sm
                  border border-neutral-900 dark:border-white overflow-hidden transition
                  hover:text-white dark:hover:text-neutral-900 ${className}`}
      {...props}
    >
      <span className="absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition"
            style={{ background:"linear-gradient(90deg,#10b981,#3b82f6,#ec4899)" }} />
      <span className="relative z-10"> {children} </span>
    </motion.button>
  );
}
