import { useEffect, useState } from "react";
export default function usePrefersReducedMotion() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPref(m.matches);
    onChange(); m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return pref;
}
