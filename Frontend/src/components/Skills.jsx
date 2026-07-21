import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaReact, FaAngular, FaJs, FaJava, FaNodeJs, FaPython, 
  FaBrain, FaGitAlt, FaDocker, FaDatabase,
  FaAward, FaCertificate, FaHtml5, FaCss3, FaExternalLinkAlt
} from "react-icons/fa";
import { SiDjango, SiTensorflow, SiPostgresql, SiMongodb, SiMysql } from "react-icons/si";

// Visual metadata for skill & certification nodes
const skillMetadata = {
  "HTML": { icon: <FaHtml5 />, color: "text-[#e34f26] hover:shadow-[#e34f26]/40" },
  "CSS": { icon: <FaCss3 />, color: "text-[#1572b6] hover:shadow-[#1572b6]/40" },
  "React": { icon: <FaReact />, color: "text-[#61dafb] hover:shadow-[#61dafb]/40" },
  "Angular": { icon: <FaAngular />, color: "text-[#dd0031] hover:shadow-[#dd0031]/40" },
  "JavaScript": { icon: <FaJs />, color: "text-[#f7df1e] hover:shadow-[#f7df1e]/40" },
  "Django": { icon: <SiDjango />, color: "text-[#092e20] hover:shadow-[#092e20]/40" },
  "Java": { icon: <FaJava />, color: "text-[#007396] hover:shadow-[#007396]/40" },
  "Node.js": { icon: <FaNodeJs />, color: "text-[#339933] hover:shadow-[#339933]/40" },
  "Express.js": { icon: <FaNodeJs />, color: "text-[#68a063] hover:shadow-[#68a063]/40" },
  "Python": { icon: <FaPython />, color: "text-[#3776ab] hover:shadow-[#3776ab]/40" },
  "TensorFlow": { icon: <SiTensorflow />, color: "text-[#ff6f00] hover:shadow-[#ff6f00]/40" },
  "NLP": { icon: <FaBrain />, color: "text-[#ec4899] hover:shadow-[#ec4899]/40" },
  "PostgreSQL": { icon: <SiPostgresql />, color: "text-[#4169e1] hover:shadow-[#4169e1]/40" },
  "MongoDB": { icon: <SiMongodb />, color: "text-[#47a248] hover:shadow-[#47a248]/40" },
  "MySQL": { icon: <SiMysql />, color: "text-[#00758f] hover:shadow-[#00758f]/40" },
  "Git": { icon: <FaGitAlt />, color: "text-[#f05032] hover:shadow-[#f05032]/40" },
  "GitHub": { icon: <FaGitAlt />, color: "text-[#6e5494] hover:shadow-[#6e5494]/40" },
  "Docker": { icon: <FaDocker />, color: "text-[#2496ed] hover:shadow-[#2496ed]/40" },
  "Certifications": { icon: <FaAward />, color: "text-[#eab308] hover:shadow-[#eab308]/40" }
};

export default function Skills({ data, certifications }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Handle responsiveness and parallax mouse tracking
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.04;
      const y = (e.clientY - window.innerHeight / 2) * 0.04;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Helper to extract category items from data prop
  const getCategoryItems = (catName) => {
    if (!data || !Array.isArray(data)) return null;
    const cat = data.find(c => c.category?.toLowerCase() === catName.toLowerCase());
    return cat ? cat.items : null;
  };

  // Build orbits list dynamically from props (with robust fallbacks)
  const defaultFrontend = [
    { name: "React", level: 90, desc: "Modular component layouts, state hooks, and Context API.", projects: "Movie Ticket System" },
    { name: "JavaScript", level: 95, desc: "ES6+, async/await loops, event bindings, and DOM canvas.", projects: "Interactive 3D Galaxy background" },
    { name: "HTML/CSS", level: 95, desc: "Semantic structure, responsive Flexbox/Grid, and modern animations.", projects: "Portfolio & Web Apps" }
  ];

  const defaultBackend = [
    { name: "Django", level: 90, desc: "Model-View-Template architecture, ORM queries, REST APIs, and auth.", projects: "Secure Backend API" },
    { name: "Python", level: 95, desc: "Data processing, machine learning models, and system automation scripts.", projects: "Fake Job Detection" },
    { name: "Node.js", level: 75, desc: "Express server routing, async handlers, and API endpoints.", projects: "Telemetry API" }
  ];

  const defaultAIML = [
    { name: "TensorFlow", level: 85, desc: "Neural networks models, linear regressions, and training pipelines.", projects: "Movie Recommendation System" },
    { name: "NLP", level: 80, desc: "Text preprocessing, tokenizers, and sentiment logic classifiers.", projects: "Fake Job Detection" }
  ];

  const defaultDBTools = [
    { name: "PostgreSQL", level: 85, desc: "Relational database schema design, SQL queries, and indexing.", projects: "User Credentials DB" },
    { name: "Git", level: 90, desc: "Branching, staging, merge workflows, and version control.", projects: "GitHub Repositories" },
    { name: "Docker", level: 80, desc: "Containerizing services, environment isolation, and deployment.", projects: "Service Isolation" }
  ];

  const defaultCerts = certifications && certifications.length > 0 ? certifications.map(c => ({
    name: c.title,
    level: 95,
    desc: c.description || `Issued by ${c.issuingOrganization || "Institution"} (${c.issueDate || "2024"})`,
    issuingOrganization: c.issuingOrganization,
    issueDate: c.issueDate,
    credentialUrl: c.credentialUrl,
    isCertification: true
  })) : [
    {
      name: "Machine Learning Specialization",
      level: 95,
      desc: "Supervised learning, deep learning fundamentals, and model evaluation techniques.",
      issuingOrganization: "Coursera / Stanford",
      issueDate: "2024",
      credentialUrl: "#",
      isCertification: true
    },
    {
      name: "Full Stack Dev Certification",
      level: 90,
      desc: "Modern frontend frameworks, RESTful API architecture, and database integrations.",
      issuingOrganization: "Brainware University",
      issueDate: "2023",
      credentialUrl: "#",
      isCertification: true
    }
  ];

  const frontendSkills = getCategoryItems("Frontend")?.map(i => ({ name: i.name, level: i.level, desc: `Proficiency level ${i.level}% in Frontend development.`, projects: "Web Applications" })) || defaultFrontend;
  const backendSkills = getCategoryItems("Backend")?.map(i => ({ name: i.name, level: i.level, desc: `Proficiency level ${i.level}% in Backend development.`, projects: "RESTful APIs & Services" })) || defaultBackend;
  const aimlSkills = getCategoryItems("AI & ML")?.map(i => ({ name: i.name, level: i.level, desc: `Proficiency level ${i.level}% in AI/ML algorithms.`, projects: "ML Models & Data Pipelines" })) || defaultAIML;
  const dbToolsSkills = (getCategoryItems("Database") || getCategoryItems("Tools") || getCategoryItems("Database & Tools"))?.map(i => ({ name: i.name, level: i.level, desc: `Proficiency level ${i.level}% in database & developer tools.`, projects: "Data Infrastructure" })) || defaultDBTools;

  const orbits = [
    {
      name: "Frontend",
      durationClass: "animate-spin-ring-1",
      nodeDurationClass: "animate-spin-node-1",
      radius: isMobile ? 55 : 85,
      skills: frontendSkills
    },
    {
      name: "Backend",
      durationClass: "animate-spin-ring-2",
      nodeDurationClass: "animate-spin-node-2",
      radius: isMobile ? 95 : 155,
      skills: backendSkills
    },
    {
      name: "AI & ML",
      durationClass: "animate-spin-ring-3",
      nodeDurationClass: "animate-spin-node-3",
      radius: isMobile ? 135 : 225,
      skills: aimlSkills
    },
    {
      name: "Database & Tools",
      durationClass: "animate-spin-ring-4",
      nodeDurationClass: "animate-spin-node-4",
      radius: isMobile ? 175 : 295,
      skills: dbToolsSkills
    },
    {
      name: "Certifications",
      durationClass: "animate-spin-ring-1",
      nodeDurationClass: "animate-spin-node-1",
      radius: isMobile ? 215 : 365,
      skills: defaultCerts
    }
  ];

  return (
    <section id="skills" className="py-24 bg-brand-card/30 relative overflow-hidden">
      {/* Background neon dust blobs */}
      <div className="absolute left-[-10%] top-[-10%] w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute right-[-10%] bottom-[-10%] w-[450px] h-[450px] bg-yellow-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
          >
            Skills & <span className="text-brand-primary">Certifications</span> Universe
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary mx-auto rounded-full origin-center"
          ></motion.div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glassmorphic Telemetry Console */}
          <div className="lg:col-span-5 h-[360px] md:h-[420px]">
            <motion.div
              layout
              className="w-full h-full p-6 rounded-2xl bg-brand-card/90 border border-brand-secondary/20 shadow-2xl backdrop-blur-lg flex flex-col justify-center text-left"
            >
              {hoveredSkill ? (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header Details */}
                    <div className="flex items-center justify-between border-b border-brand-secondary/15 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-brand-primary font-bold flex items-center gap-1.5">
                          {hoveredSkill.isCertification && <FaCertificate className="text-yellow-400" />}
                          {hoveredSkill.category} telemetry
                        </span>
                        <h3 className="text-2xl font-display font-black text-brand-text mt-0.5 leading-snug">
                          {hoveredSkill.name}
                        </h3>
                      </div>
                      <div className="text-3xl text-brand-primary p-2.5 rounded-xl bg-brand-bg/60 border border-brand-secondary/10 shrink-0 ml-3">
                        {hoveredSkill.icon}
                      </div>
                    </div>

                    {/* Skill / Certification Proficiency metrics */}
                    <div className="flex flex-col gap-1.5 mb-4">
                      <div className="flex justify-between text-xs font-semibold font-mono text-brand-secondary">
                        <span>{hoveredSkill.isCertification ? "VERIFICATION STATUS" : "PROFICIENCY INDEX"}</span>
                        <span className="text-brand-primary font-bold">
                          {hoveredSkill.isCertification ? "VERIFIED (100%)" : `${hoveredSkill.level}%`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-brand-bg rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: hoveredSkill.isCertification ? "100%" : `${hoveredSkill.level}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full ${hoveredSkill.isCertification ? "bg-gradient-to-r from-yellow-400 to-amber-500" : "bg-gradient-to-r from-brand-primary to-blue-400"}`}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-brand-secondary leading-relaxed mb-4">
                      {hoveredSkill.desc}
                    </p>
                  </div>

                  {/* Linked Project / Credential link footer */}
                  <div className="border-t border-brand-secondary/10 pt-4 mt-auto">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-brand-secondary block mb-1">
                      {hoveredSkill.isCertification ? "Issuing Credentials" : "Target Implementation"}
                    </span>
                    {hoveredSkill.isCertification ? (
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-brand-text flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                          {hoveredSkill.issuingOrganization || "Official Certification Body"}
                        </p>
                        {hoveredSkill.credentialUrl && hoveredSkill.credentialUrl !== "#" && (
                          <a 
                            href={hoveredSkill.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-brand-primary hover:underline flex items-center gap-1"
                          >
                            Verify <FaExternalLinkAlt size={10} />
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs font-semibold text-brand-text flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                        {hoveredSkill.projects || "Core Engineering Stack"}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 text-brand-secondary">
                  <div className="w-16 h-16 rounded-full border border-dashed border-brand-secondary/20 flex items-center justify-center mb-4 text-brand-primary/60 animate-pulse">
                    <FaAward size={26} />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-brand-text mb-2">
                    Neural & Credential Scan
                  </h3>
                  <p className="text-xs leading-relaxed max-w-xs">
                    Hover over any skill or certification node orbiting the core system to synchronize real-time technical telemetry and verification details.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: 3D Orbiting Universe */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[480px] md:h-[540px]">
            
            {/* 3D Perspectived Stage wrapper */}
            <div 
              className="w-full h-full flex items-center justify-center relative preserve-3d"
              style={{
                perspective: "1200px",
                transform: `rotateX(62deg) rotateY(-8deg) translate(${mouseOffset.x}px, ${mouseOffset.y}px)`
              }}
            >
              {/* Pulsing AI Brain center core */}
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-brand-primary to-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.4)] z-25 absolute flex items-center justify-center animate-pulse"
                style={{ transform: "rotateX(-62deg) rotateY(8deg)" }}
              >
                <FaBrain className="text-white text-xl md:text-2xl animate-pulse" />
              </div>

              {/* Render Orbiting Rings */}
              {orbits.map((orbit, orbitIdx) => {
                const stepAngle = 360 / Math.max(orbit.skills.length, 1);
                const isCertRing = orbit.name === "Certifications";
                
                return (
                  <div 
                    key={orbit.name}
                    className={`absolute rounded-full border flex items-center justify-center preserve-3d ${isCertRing ? "border-yellow-500/30" : "border-brand-primary/10"}`}
                    style={{
                      width: `${orbit.radius * 2}px`,
                      height: `${orbit.radius * 2}px`,
                      borderStyle: isCertRing || orbitIdx === 3 ? "dashed" : "solid"
                    }}
                  >
                    {/* Ring orbit rotating container */}
                    <div className={`w-full h-full absolute preserve-3d ${orbit.durationClass}`}>
                      
                      {/* Render Skill/Certification Nodes on Ring */}
                      {orbit.skills.map((skill, skillIdx) => {
                        const angleRad = (skillIdx * stepAngle * Math.PI) / 180;
                        const x = orbit.radius * Math.cos(angleRad);
                        const y = orbit.radius * Math.sin(angleRad);

                        const defaultVisual = skill.isCertification 
                          ? { icon: <FaAward />, color: "text-yellow-400 hover:shadow-yellow-400/50" }
                          : { icon: <FaDatabase />, color: "text-brand-primary" };

                        const visual = skillMetadata[skill.name] || defaultVisual;

                        return (
                          <div
                            key={`${orbit.name}-${skill.name}-${skillIdx}`}
                            className="absolute preserve-3d"
                            style={{
                              left: `calc(50% + ${x}px - 20px)`,
                              top: `calc(50% + ${y}px - 20px)`,
                              width: "40px",
                              height: "40px"
                            }}
                          >
                            {/* Node reverse rotation container to keep upright */}
                            <div 
                              className={`w-full h-full flex items-center justify-center rounded-xl bg-brand-card/90 border ${skill.isCertification ? "border-yellow-500/40 hover:border-yellow-400" : "border-brand-secondary/25 hover:border-brand-primary/60"} text-lg md:text-xl shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer backdrop-blur-md ${visual.color} ${orbit.nodeDurationClass}`}
                              style={{
                                transform: "rotateX(-62deg) rotateY(8deg)"
                              }}
                              onMouseEnter={() => setHoveredSkill({
                                ...skill,
                                category: orbit.name,
                                icon: visual.icon
                              })}
                              onMouseLeave={() => setHoveredSkill(null)}
                            >
                              {visual.icon}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
