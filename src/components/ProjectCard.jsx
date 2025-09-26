import { motion } from "framer-motion";

export default function ProjectCard({ item }) {
  return (
    <motion.article
      whileHover={{ y: -6, rotateX: 2 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group rounded-2xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
    >
      {/* Cover */}
      <a href={item.href || "#"} target={item.href ? "_blank" : "_self"} rel="noreferrer noopener" className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 right-3 text-[11px] px-2 py-1 rounded-full bg-black/70 text-white tracking-wider">
            {item.year}
          </div>
        </div>
      </a>

      {/* Body */}
      <div className="p-5 md:p-6">
        <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 mb-1">
          {item.role}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold leading-snug">
          {item.title}
        </h3>
        {item.desc && (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {item.desc}
          </p>
        )}

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA row */}
        <div className="mt-4 flex items-center gap-3">
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm underline underline-offset-4 hover:opacity-70"
              aria-label={`Open ${item.title}`}
            >
              Visit
            </a>
          )}
          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-neutral-500 hover:text-current"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
