import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import CursorBlob from "./components/CursorBlob";
import Hero from "./components/Hero";
import Marquee from "./components/marquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Quotes from "./components/Quotes";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <ScrollProgress />
      <CursorBlob />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <Quotes />
      <Contact />
      <Footer />
    </div>
  );
}
