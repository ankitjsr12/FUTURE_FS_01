import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaSun, FaMoon, FaFileAlt } from "react-icons/fa";
import logoSvg from "../assets/vite.svg";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Timeline", href: "#education" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar({ theme = "dark", onToggleTheme, onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.href.replace("#", "")));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Center Navbar (Pill shape) */}
      <motion.header
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] max-w-fit rounded-full border shadow-2xl ${
          scrolled 
            ? "bg-brand-bg/85 border-brand-primary/25 backdrop-blur-lg py-2.5 px-6" 
            : "bg-brand-card/60 border-brand-secondary/15 backdrop-blur-md py-3 px-7"
        }`}
      >
        <div className="flex items-center justify-between gap-6 sm:gap-8">
          {/* Logo brand */}
          <a href="#home" className="flex items-center gap-1.5 text-sm font-display font-black tracking-tighter hover:scale-105 transition-transform duration-300 shrink-0">
            <img src={logoSvg} alt="Logo" className="w-5 h-5" />
            <span className="text-brand-text">Ankit<span className="text-brand-primary">.dev</span></span>
          </a>

          {/* Nav Items List - Desktop only */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-brand-bg" : "text-brand-secondary hover:text-brand-text"
                  }`}
                >
                  {hoveredTab === item.name && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 rounded-full bg-brand-secondary/10 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 rounded-full bg-brand-primary -z-10 shadow-md shadow-brand-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Quick Actions (Resume Modal + Theme Toggle) */}
          <div className="flex items-center gap-2">
            {/* Interactive Resume Trigger */}
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-slate-950 text-xs font-bold transition-all duration-300 cursor-pointer"
              title="Open Interactive Resume"
            >
              <FaFileAlt size={12} />
              <span>CV</span>
            </button>

            {/* Theme Toggle Sun / Moon */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-brand-bg/80 border border-brand-secondary/20 hover:border-brand-primary text-brand-primary transition-all duration-300 cursor-pointer"
              aria-label="Toggle Dark/Light Mode"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === "dark" ? <FaSun size={14} className="text-yellow-400" /> : <FaMoon size={14} className="text-brand-primary" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 text-brand-text hover:text-brand-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full screen mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center gap-8"
          >
            <div className="flex flex-col gap-5 text-center">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: idx * 0.06, ease: "easeOut" }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-display font-extrabold tracking-wide uppercase ${
                    activeSection === item.href.replace("#", "")
                      ? "text-brand-primary"
                      : "text-brand-secondary hover:text-brand-text"
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume?.();
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-brand-primary text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
              >
                <FaFileAlt /> Open Interactive CV
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
