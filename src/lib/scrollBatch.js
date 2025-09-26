import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function setupRevealBatch(selector = ".reveal-batch") {
  const items = gsap.utils.toArray(selector);
  if (!items.length) return;
  gsap.set(items, { y: 24, opacity: 0 });
  ScrollTrigger.batch(items, {
    start: "top 85%",
    onEnter: (batch) => gsap.to(batch, {
      y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06
    }),
  });
}
