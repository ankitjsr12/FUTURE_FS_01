import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import GalaxyBackground from "./components/GalaxyBackground";
import ResumeModal from "./components/ResumeModal";
import { portfolioData } from "./data/portfolioData";

export default function App() {
  const [data, setData] = useState(portfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 1024 : false);
  const [theme, setTheme] = useState(() => typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  const cursorRef = useRef(null);

  // Sync theme class to <html> document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Desktop check to toggle custom cursor on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom cursor position and hover classes logic
  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    
    const moveCursor = (e) => {
      if (!cursor) return;
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out"
      });
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };

    const handleMouseOver = (e) => {
      if (!cursor) return;
      const isInteractive = e.target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer");
      if (isInteractive) {
        cursor.classList.add("custom-cursor-hover");
      }
    };

    const handleMouseOut = (e) => {
      if (!cursor) return;
      const isInteractive = e.target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer");
      if (isInteractive) {
        cursor.classList.remove("custom-cursor-hover");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop]);

  // Fetch portfolio content from Django API on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/portfolio-data/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((apiData) => {
        setData(apiData);
      })
      .catch((err) => {
        console.warn("Backend API not reachable. Using local static fallback data. Details:", err);
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-brand-text font-sans overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* Cinematic Loader Cover */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Dynamic Animated Galaxy Constellation Background */}
      <GalaxyBackground />

      {/* Floating Background Wave Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full bg-brand-primary/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[60%] right-[10%] w-[55vw] h-[55vw] max-w-[550px] max-h-[550px] rounded-full bg-indigo-500/5 blur-3xl animate-pulse-slow [animation-delay:2s.5]"></div>
      </div>

      {/* Custom Trailing Cursor */}
      {isDesktop && <div ref={cursorRef} className="custom-cursor hidden lg:block" />}

      {/* Interactive cursor glow overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 radial-glow" />

      {/* Main navigation & components */}
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />
      
      <main className="relative z-10">
        <Hero data={data.personalInfo} onOpenResume={() => setIsResumeOpen(true)} />
        <About data={data.about} />
        <Skills data={data.skills} certifications={data.certifications} />
        <Projects data={data.projects} />
        <Timeline data={data.education} />
        <Blog data={data.blogPosts} />
        <Contact data={data.personalInfo} />
      </main>

      <Footer data={data.personalInfo} />

      {/* Interactive Curriculum Vitae Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        data={data} 
      />
    </div>
  );
}
