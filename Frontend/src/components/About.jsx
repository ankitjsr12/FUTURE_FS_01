import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineAcademicCap, HiOutlineCode, HiOutlineLightBulb, HiOutlineUsers,
  HiChevronLeft, HiChevronRight
} from "react-icons/hi";
import { portfolioData } from "../data/portfolioData";

export default function About({ data }) {
  const about = data || portfolioData.about;
  const { description } = about;

  const [rotationY, setRotationY] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const requestRef = useRef();
  const isHovered = useRef(false);

  // requestAnimationFrame continuous slow rotation loop
  useEffect(() => {
    const tick = () => {
      if (!isHovered.current && !isSnapping) {
        setRotationY((prev) => prev - 0.15); // orbit counter-clockwise
      }
      requestRef.current = requestAnimationFrame(tick);
    };
    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isSnapping]);

  // Click handler to snap to closest 90-degree quadrants
  const handlePrev = () => {
    if (isSnapping) return;
    setIsSnapping(true);
    setRotationY((prev) => {
      const target = Math.round(prev / 90) * 90 + 90;
      return target;
    });
    setTimeout(() => setIsSnapping(false), 700);
  };

  const handleNext = () => {
    if (isSnapping) return;
    setIsSnapping(true);
    setRotationY((prev) => {
      const target = Math.round(prev / 90) * 90 - 90;
      return target;
    });
    setTimeout(() => setIsSnapping(false), 700);
  };

  return (
    <section id="about" className="py-24 bg-brand-bg relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute left-[-20%] top-[30%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute right-[-10%] top-[60%] w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
          >
            About <span className="text-brand-primary">Me</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary mx-auto rounded-full origin-center"
          ></motion.div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Text Detail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6 text-left"
          >
            <h3 className="text-2xl font-display font-semibold mb-4 text-brand-text">
              Bridging Intelligent Systems & Web Architectures
            </h3>
            <p className="text-brand-secondary leading-relaxed text-base md:text-lg mb-6">
              {description}
            </p>
            <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
              My academic pursuits in Computer Science with a specialization in Artificial Intelligence and Machine Learning enable me to approach full-stack web applications with intelligent decision-making logic, pattern recognition, and robust algorithmic efficiency.
            </p>
          </motion.div>

          {/* Right Highlights: 3D Cylinder Stage */}
          <div 
            className="md:col-span-6 flex items-center justify-center relative w-full h-[430px] md:h-[460px] overflow-hidden preserve-3d"
            style={{ perspective: "1200px" }}
          >
            {/* Left snapping chevron */}
            <button
              onClick={handlePrev}
              className="absolute left-1 md:left-4 z-30 p-2 md:p-2.5 rounded-full bg-brand-card/85 border border-brand-secondary/20 hover:border-brand-primary text-brand-secondary hover:text-brand-primary shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Previous Highlight"
            >
              <HiChevronLeft size={20} />
            </button>

            {/* Pulsing Core Energy Orb */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-brand-primary via-indigo-500 to-purple-500 absolute shadow-[0_0_50px_rgba(56,189,248,0.45)] flex items-center justify-center animate-pulse z-10">
              <div className="absolute w-36 h-36 rounded-full border border-dashed border-brand-primary/20 animate-orbit"></div>
              <div className="absolute w-30 h-30 rounded-full border border-brand-primary/30 animate-counter-orbit-slow"></div>
            </div>

            {/* 3D Cylinder Carousel Stage with dynamic rotation transforms */}
            <div 
              onMouseEnter={() => { isHovered.current = true; }}
              onMouseLeave={() => { isHovered.current = false; }}
              className={`w-full h-full flex items-center justify-center relative preserve-3d ${isSnapping ? "transition-transform duration-700 ease-out" : ""}`}
              style={{
                transform: `rotateY(${rotationY}deg)`
              }}
            >
              
              {/* Card 1: Education (0 deg) */}
              <div 
                className="absolute w-[190px] h-[190px] md:w-[220px] md:h-[200px] p-5 rounded-xl bg-brand-card/90 border border-brand-secondary/20 hover:border-brand-primary/40 shadow-2xl backface-hidden flex flex-col transition-all duration-300 group cursor-pointer overflow-hidden"
                style={{ transform: "rotateY(0deg) translateZ(190px)" }}
              >
                {/* Holographic scanner sweep */}
                <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent animate-scan-line pointer-events-none"></div>
                
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-3 group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors duration-300">
                  <HiOutlineAcademicCap size={20} />
                </div>
                <h4 className="text-base font-display font-semibold text-brand-text mb-1 text-left">Education</h4>
                <p className="text-xs text-brand-secondary text-left leading-relaxed">
                  Pursuing B.Tech CSE (AI & ML) at Brainware University.
                </p>
              </div>

              {/* Card 2: Development (90 deg) */}
              <div 
                className="absolute w-[190px] h-[190px] md:w-[220px] md:h-[200px] p-5 rounded-xl bg-brand-card/90 border border-brand-secondary/20 hover:border-brand-primary/40 shadow-2xl backface-hidden flex flex-col transition-all duration-300 group cursor-pointer overflow-hidden"
                style={{ transform: "rotateY(90deg) translateZ(190px)" }}
              >
                <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent animate-scan-line pointer-events-none"></div>
                
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-3 group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors duration-300">
                  <HiOutlineCode size={20} />
                </div>
                <h4 className="text-base font-display font-semibold text-brand-text mb-1 text-left">Development</h4>
                <p className="text-xs text-brand-secondary text-left leading-relaxed">
                  Building responsive Full Stack apps using DRF, Python, and React.
                </p>
              </div>

              {/* Card 3: Focus Areas (180 deg) */}
              <div 
                className="absolute w-[190px] h-[190px] md:w-[220px] md:h-[200px] p-5 rounded-xl bg-brand-card/90 border border-brand-secondary/20 hover:border-brand-primary/40 shadow-2xl backface-hidden flex flex-col transition-all duration-300 group cursor-pointer overflow-hidden"
                style={{ transform: "rotateY(180deg) translateZ(190px)" }}
              >
                <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent animate-scan-line pointer-events-none"></div>
                
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-3 group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors duration-300">
                  <HiOutlineLightBulb size={20} />
                </div>
                <h4 className="text-base font-display font-semibold text-brand-text mb-1 text-left">Focus Areas</h4>
                <p className="text-xs text-brand-secondary text-left leading-relaxed">
                  Deep learning, NLP neural networks, and pattern prediction.
                </p>
              </div>

              {/* Card 4: Soft Skills (270 deg) */}
              <div 
                className="absolute w-[190px] h-[190px] md:w-[220px] md:h-[200px] p-5 rounded-xl bg-brand-card/90 border border-brand-secondary/20 hover:border-brand-primary/40 shadow-2xl backface-hidden flex flex-col transition-all duration-300 group cursor-pointer overflow-hidden"
                style={{ transform: "rotateY(270deg) translateZ(190px)" }}
              >
                <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent animate-scan-line pointer-events-none"></div>
                
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-3 group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors duration-300">
                  <HiOutlineUsers size={20} />
                </div>
                <h4 className="text-base font-display font-semibold text-brand-text mb-1 text-left">Team Spirit</h4>
                <p className="text-xs text-brand-secondary text-left leading-relaxed">
                  Fast learner, logical analyst, and effective group collaborator.
                </p>
              </div>

            </div>

            {/* Right snapping chevron */}
            <button
              onClick={handleNext}
              className="absolute right-1 md:right-4 z-30 p-2 md:p-2.5 rounded-full bg-brand-card/85 border border-brand-secondary/20 hover:border-brand-primary text-brand-secondary hover:text-brand-primary shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Next Highlight"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
