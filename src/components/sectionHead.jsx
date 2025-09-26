import { motion } from "framer-motion";
const ease = [0.22,1,0.36,1];
const reveal = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.7,ease}} };
export default function SectionHead({ kicker, title, right }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once:true }} className="text-xs uppercase tracking-[0.25em] text-neutral-500">{kicker}</motion.div>
        <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once:true }} className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">{title}</motion.h2>
      </div>
      {right && <div className="hidden md:block text-sm text-neutral-500">{right}</div>}
    </div>
  );
}
