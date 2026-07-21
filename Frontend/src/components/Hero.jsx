import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaEnvelope, FaReact, FaPython, FaBrain, FaJava, FaAngular } from "react-icons/fa";
import { SiDjango } from "react-icons/si";
import { HiDownload } from "react-icons/hi";
import gsap from "gsap";
import { portfolioData } from "../data/portfolioData";
import profileImg from "../assets/Ankit.jpg";
import Magnetic from "./Magnetic";

const roles = [
  "Full Stack Developer",
  "AI/ML Engineer",
  "Django Developer",
  "React Developer",
  "Problem Solver"
];

export default function Hero({ data, onOpenResume }) {
  const personalInfo = data || portfolioData.personalInfo;
  const { name, subtitle, socials, photoUrl } = personalInfo;
  
  const avatarRef = useRef(null);

  // Typewriter loop states
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = roles[loopIndex % roles.length];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(95);

        if (displayedText === currentRole) {
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(45);

        if (displayedText === "") {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
          setTypingSpeed(550);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopIndex, typingSpeed]);

  // Helper to safely format media URLs (absolute or relative)
  const getPhotoUrl = () => {
    if (!photoUrl) return profileImg;
    if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) return photoUrl;
    return `http://localhost:8000${photoUrl}`;
  };

  // Mouse move 3D tilt tracking logic
  const handleHeroMouseMove = (e) => {
    const avatar = avatarRef.current;
    if (!avatar) return;
    const { left, top, width, height } = avatar.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(avatar, {
      x: x * 0.06,
      y: y * 0.06,
      rotateX: -y * 0.04,
      rotateY: x * 0.04,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleHeroMouseLeave = () => {
    const avatar = avatarRef.current;
    if (!avatar) return;
    gsap.to(avatar, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6
    });
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden bg-brand-bg/50"
    >
      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-left order-2 lg:order-1">
            
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/80 border border-brand-primary/20 text-brand-primary text-xs font-mono font-medium mb-6 backdrop-blur-md shadow-lg shadow-brand-primary/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Available for Full-Stack & AIML Opportunities
            </motion.div>

            {/* Main Greeting */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-brand-text tracking-tight leading-[1.1] mb-4"
            >
              Hi, I&apos;m <span className="text-gradient">{name}</span>
            </motion.h1>

            {/* Dynamic Typewriter Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 sm:h-12 flex items-center mb-6"
            >
              <span className="text-xl sm:text-3xl font-mono font-semibold text-brand-secondary">
                I am a{" "}
                <span className="text-brand-primary border-b-2 border-brand-primary pb-0.5">
                  {displayedText}
                </span>
                <span className="animate-pulse text-brand-primary font-light">|</span>
              </span>
            </motion.div>

            {/* Subtitle intro description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-brand-secondary text-base sm:text-lg max-w-2xl leading-relaxed mb-8"
            >
              {subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Magnetic>
                <button
                  onClick={onOpenResume}
                  className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-brand-bg font-semibold transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/30 text-sm flex items-center gap-2 cursor-pointer"
                >
                  <HiDownload /> View Interactive CV
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-secondary/20 hover:bg-brand-card hover:border-brand-secondary/40 text-brand-text font-semibold transition-all duration-300 text-sm"
                >
                  Contact Me
                </a>
              </Magnetic>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-4"
            >
              <Magnetic>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-brand-card border border-brand-secondary/15 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-brand-card border border-brand-secondary/15 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub size={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={socials.email}
                  className="p-3 rounded-full bg-brand-card border border-brand-secondary/15 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
                  aria-label="Email"
                >
                  <FaEnvelope size={16} />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Concentric Orbiting Avatar Layout */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 my-8 lg:my-0 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center animate-slow-float"
            >
              {/* Pulsing ambient backdrop circle */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-brand-primary/10 blur-3xl animate-pulse-slow"></div>

              {/* NEON RING BACKGROUNDS */}
              <div className="absolute w-[84%] h-[84%] rounded-full border border-dashed border-brand-primary/20 animate-orbit-slow -z-10 shadow-[0_0_20px_rgba(56,189,248,0.15)]"></div>
              <div className="absolute w-[68%] h-[68%] rounded-full border border-brand-secondary/15 animate-counter-orbit-fast -z-10"></div>

              {/* OUTER ORBIT TRACK: counter-clockwise, slow (AI/ML, Java, Angular) */}
              <div className="absolute w-[84%] h-[84%] animate-counter-orbit-slow pointer-events-none z-20">
                
                {/* Outer Icon 1: AI/ML (Top: 90 deg) */}
                <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-brand-text bg-brand-bg/85 backdrop-blur-md border border-brand-secondary/20 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap z-30">
                    AI/ML
                  </span>
                  <div className="p-2.5 rounded-full bg-brand-card border border-brand-secondary/20 shadow-lg text-purple-400 animate-orbit-slow group-hover:scale-110 transition-transform shadow-purple-400/20">
                    <FaBrain size={20} />
                  </div>
                </div>

                {/* Outer Icon 2: Java (Bottom-Right: 210 deg) */}
                <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-brand-text bg-brand-bg/85 backdrop-blur-md border border-brand-secondary/20 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap z-30">
                    Java
                  </span>
                  <div className="p-2.5 rounded-full bg-brand-card border border-brand-secondary/20 shadow-lg text-orange-400 animate-orbit-slow group-hover:scale-110 transition-transform shadow-orange-400/20">
                    <FaJava size={20} />
                  </div>
                </div>

                {/* Outer Icon 3: Angular (Bottom-Left: 330 deg) */}
                <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-brand-text bg-brand-bg/85 backdrop-blur-md border border-brand-secondary/20 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap z-30">
                    Angular
                  </span>
                  <div className="p-2.5 rounded-full bg-brand-card border border-brand-secondary/20 shadow-lg text-red-500 animate-orbit-slow group-hover:scale-110 transition-transform shadow-red-500/20">
                    <FaAngular size={20} />
                  </div>
                </div>
              </div>

              {/* INNER ORBIT TRACK: clockwise, fast (React, Python, Django) */}
              <div className="absolute w-[68%] h-[68%] animate-orbit-fast pointer-events-none z-20">
                {/* Inner Icon 1: React (Bottom: 270 deg) */}
                <div className="absolute top-[100%] left-[50%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-brand-text bg-brand-bg/85 backdrop-blur-md border border-brand-secondary/20 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap z-30">
                    React
                  </span>
                  <div className="p-2 rounded-full bg-brand-card border border-brand-secondary/20 shadow-md text-cyan-400 animate-counter-orbit-fast group-hover:scale-110 transition-transform shadow-cyan-400/20">
                    <FaReact size={18} />
                  </div>
                </div>

                {/* Inner Icon 2: Python (Top-Right: 30 deg) */}
                <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-brand-text bg-brand-bg/85 backdrop-blur-md border border-brand-secondary/20 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap z-30">
                    Python
                  </span>
                  <div className="p-2 rounded-full bg-brand-card border border-brand-secondary/20 shadow-md text-yellow-400 animate-counter-orbit-fast group-hover:scale-110 transition-transform shadow-yellow-400/20">
                    <FaPython size={18} />
                  </div>
                </div>

                {/* Inner Icon 3: Django (Top-Left: 150 deg) */}
                <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-brand-text bg-brand-bg/85 backdrop-blur-md border border-brand-secondary/20 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap z-30">
                    Django
                  </span>
                  <div className="p-2 rounded-full bg-brand-card border border-brand-secondary/20 shadow-md text-emerald-500 animate-counter-orbit-fast group-hover:scale-110 transition-transform shadow-emerald-500/20">
                    <SiDjango size={18} />
                  </div>
                </div>
              </div>

              {/* Main Interactive Circle Photo Frame */}
              <motion.div
                ref={avatarRef}
                layoutId="profileAvatar"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-66 lg:h-66 rounded-full p-[3px] bg-gradient-to-tr from-brand-primary via-indigo-500 to-purple-500 overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.35)] flex items-center justify-center cursor-pointer z-10"
              >
                {/* Photo frame Content */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-brand-card">
                  <img
                    src={getPhotoUrl()}
                    alt={name}
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Visual Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent opacity-60"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-brand-secondary/50 text-[9px] font-mono tracking-widest uppercase select-none">
        <span>Scroll Down</span>
        <div className="w-5 h-8 rounded-full border border-brand-secondary/25 flex justify-center p-1.5">
          <div className="w-1 h-1.5 rounded-full bg-brand-primary animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
