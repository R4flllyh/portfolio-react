import { motion } from "framer-motion";

export default function WordReveal({ text, delay=0 }) {
  const words = text.split(" ");
  return (
    <span className="inline">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: delay + i*0.04, duration: 0.5, ease: [0.22,1,0.36,1] }}
          className="inline-block will-change-transform"
        >
          {w + (i < words.length-1 ? " " : "")}
        </motion.span>
      ))}
    </span>
  );
}
