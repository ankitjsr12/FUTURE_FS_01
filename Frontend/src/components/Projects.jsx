import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFilm, FaShip, FaUserShield, FaLaptopCode, FaTasks, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";

const projectVisuals = {
  "Movie Recommendation System": { icon: <FaFilm size={24} />, gradient: "from-purple-500/20 to-indigo-500/20" },
  "Titanic Survival Prediction": { icon: <FaShip size={24} />, gradient: "from-blue-500/20 to-cyan-500/20" },
  "Fake Job Detection using NLP": { icon: <FaUserShield size={24} />, gradient: "from-red-500/20 to-amber-500/20" },
  "Personal Portfolio Website": { icon: <FaLaptopCode size={24} />, gradient: "from-sky-500/20 to-teal-500/20" },
  "Future Interns Tasks": { icon: <FaTasks size={24} />, gradient: "from-emerald-500/20 to-green-500/20" },
  "Movie Ticket Booking System": { icon: <FaFilm size={24} />, gradient: "from-pink-500/20 to-rose-500/20" }
};

export default function Projects({ data }) {
  const projects = data || portfolioData.projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);

  // Monitor resize for correct translation metrics
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-brand-bg relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute left-[-10%] top-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
          >
            Featured <span className="text-brand-primary">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary mx-auto rounded-full origin-center"
          ></motion.div>
        </div>

        {/* 3D Perspective Stage Container */}
        <div className="relative w-full flex flex-col items-center justify-center py-6">
          <div 
            className="relative flex items-center justify-center w-full h-[460px] md:h-[500px] overflow-hidden"
            style={{ perspective: "1200px" }}
          >
            {projects.map((project, idx) => {
              const offset = idx - activeIndex;
              const isActive = offset === 0;
              
              // Spacing translation factors
              const translationSpacing = isMobile ? 220 : 420;
              const rotateY = isActive ? 0 : offset < 0 ? 32 : -32;
              const translateZ = isActive ? 0 : -180;
              const translateX = offset * translationSpacing;
              const scale = isActive ? 1.0 : 0.82;
              
              // Only display active and immediate neighbors
              const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1.0 : 0.45;
              const zIndex = 20 - Math.abs(offset);

              const visual = projectVisuals[project.title] || {
                icon: <FaLaptopCode size={24} />,
                gradient: "from-brand-primary/20 to-blue-500/20"
              };

              return (
                <motion.div
                  key={project.title || idx}
                  animate={{
                    x: translateX,
                    scale: scale,
                    rotateY: rotateY,
                    z: translateZ,
                    opacity: opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 20
                  }}
                  style={{
                    zIndex: zIndex,
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className="absolute w-[290px] sm:w-[340px] md:w-[380px] h-[380px] md:h-[420px] flex flex-col rounded-2xl bg-brand-card/90 border border-brand-secondary/15 hover:border-brand-primary/35 shadow-2xl overflow-hidden transition-colors duration-300 transform-gpu cursor-pointer text-left backdrop-blur-md"
                >
                  {/* Card Image / Mock Visual */}
                  <div className="h-44 relative border-b border-brand-secondary/10 overflow-hidden flex items-center justify-center">
                    {project.photoUrl ? (
                      <img
                        src={project.photoUrl.startsWith("http") ? project.photoUrl : `http://localhost:8000${project.photoUrl}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${visual.gradient} flex items-center justify-center absolute inset-0`}>
                        <div className="absolute inset-0 bg-brand-bg/10"></div>
                        
                        {/* Orbit rings background mock */}
                        <div className="absolute w-24 h-24 rounded-full border border-brand-secondary/5"></div>
                        
                        <div className="p-4 rounded-xl bg-brand-card/85 text-brand-primary border border-brand-secondary/15 shadow-md">
                          {visual.icon}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-display font-bold text-brand-text mb-2 text-gradient">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-brand-secondary leading-relaxed mb-4 flex-1 overflow-hidden text-ellipsis line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-bg/70 text-brand-secondary border border-brand-secondary/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Links */}
                    <div className="flex items-center justify-between border-t border-brand-secondary/10 pt-4 mt-auto">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-brand-secondary hover:text-brand-text transition-colors"
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                      
                      <a
                        href={project.liveUrl}
                        onClick={(e) => {
                          if (project.liveUrl === "#") {
                            e.preventDefault();
                            alert(`Demo for "${project.title}" will be configured upon deployment!`);
                          }
                        }}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
                      >
                        Live Demo
                        <FaExternalLinkAlt size={11} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-brand-card/80 border border-brand-secondary/20 hover:border-brand-primary hover:text-brand-primary text-brand-secondary shadow-lg transition-all cursor-pointer"
              aria-label="Previous Project"
            >
              <FaChevronLeft size={14} />
            </button>

            {/* Carousel dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex 
                      ? "w-6 bg-brand-primary" 
                      : "w-2 bg-brand-secondary/35 hover:bg-brand-secondary/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-brand-card/80 border border-brand-secondary/20 hover:border-brand-primary hover:text-brand-primary text-brand-secondary shadow-lg transition-all cursor-pointer"
              aria-label="Next Project"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
