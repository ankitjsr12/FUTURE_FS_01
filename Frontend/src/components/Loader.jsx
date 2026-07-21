import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/Ankit.jpg";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Smooth loading increment logic
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Slightly random increments
        const step = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Exit trigger
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 1000); // Allow slide up animation to complete
      }, 600);
    }
  }, [progress, onComplete]);

  // Circumference of loader circle (2 * PI * r)
  // r = 45 -> circumference = 282.7
  const strokeDashoffset = 282.7 - (282.7 * progress) / 100;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 bg-[#090d16] flex flex-col justify-between p-10 md:p-16 loader-container ${
        isDone ? "loader-container-closed" : ""
      }`}
    >
      {/* Header Info */}
      <div className="flex justify-between items-center text-[10px] font-mono text-brand-secondary/40 tracking-widest uppercase">
        <span>PORTFOLIO INITIALIZATION</span>
        <span>AWARDS VER. 2026</span>
      </div>

      {/* Main Center Cinematic Content */}
      <div className="flex flex-col items-center justify-center self-center my-auto relative">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Pulsing ambient backdrop */}
          <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-xl animate-pulse"></div>

          {/* SVG Progress Circle Ring */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="2"
            />
            {/* Animated Glow Progress Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#loaderProgressGrad)"
              strokeWidth="2.5"
              strokeDasharray="282.7"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="loaderProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Profile Avatar (will fly into Hero section) */}
          <motion.div
            layoutId="profileAvatar"
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden relative z-10 border-2 border-brand-primary/20 shadow-xl"
          >
            <img
              src={profileImg}
              alt="Ankit Kumar"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>

        {/* Text reveals below image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-brand-text uppercase">
            Ankit Kumar
          </h2>
          <div className="text-[10px] font-mono text-brand-primary uppercase tracking-widest mt-1.5 flex items-center gap-2 justify-center">
            <span>Loading Workspace</span>
            <span className="font-bold">{progress}%</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-end text-[10px] font-mono text-brand-secondary/40 tracking-wider">
        <span>AI/ML - FULL STACK</span>
        <span>SYSTEMS OK</span>
      </div>
    </motion.div>
  );
}
