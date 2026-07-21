import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaPrint, FaEnvelope, FaGithub, FaLinkedin, FaGraduationCap, FaBriefcase, FaCode, FaAward } from "react-icons/fa";

export default function ResumeModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const personalInfo = data?.personalInfo || {
    name: "Ankit Kumar",
    title: "AIML Student & Future Full Stack Developer",
    subtitle: "B.Tech CSE (AI & ML) Student passionate about Full Stack Development, AI/ML, and Problem Solving.",
    resumeUrl: "#",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:ankit@example.com"
    }
  };

  const education = data?.education || [
    {
      institution: "Brainware University",
      degree: "B.Tech CSE (AI & ML)",
      duration: "Present",
      description: "Specializing in Artificial Intelligence and Machine Learning."
    },
    {
      institution: "Government Polytechnic Dumka",
      degree: "Diploma in Computer Science",
      duration: "Completed",
      description: "Database management, software development paradigms, network protocols."
    }
  ];

  const projects = data?.projects || [];
  const skills = data?.skills || [];
  const certifications = data?.certifications || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click to close */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={onClose}
        />

        {/* Resume Modal Wrapper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-brand-card border border-brand-secondary/20 rounded-2xl shadow-2xl overflow-y-auto flex flex-col z-10 text-brand-text"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-brand-card/90 border-b border-brand-secondary/15 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-primary animate-pulse"></span>
              <h3 className="text-lg font-display font-bold">Interactive Curriculum Vitae</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.print()}
                className="p-2 text-xs font-semibold rounded-lg bg-brand-bg/80 border border-brand-secondary/20 hover:border-brand-primary text-brand-secondary hover:text-brand-primary transition-all flex items-center gap-1.5"
                title="Print Resume"
              >
                <FaPrint /> <span className="hidden sm:inline">Print</span>
              </button>

              <a 
                href={personalInfo.resumeUrl !== "#" ? personalInfo.resumeUrl : "#"}
                download="Ankit_Kumar_Resume.pdf"
                className="p-2 text-xs font-semibold rounded-lg bg-brand-primary text-slate-950 font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-1.5 shadow-lg shadow-brand-primary/20"
              >
                <FaDownload /> <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button 
                onClick={onClose}
                className="p-2 text-brand-secondary hover:text-brand-text rounded-lg hover:bg-brand-secondary/10 transition-colors ml-2"
                aria-label="Close Resume Modal"
              >
                <FaTimes size={18} />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-6 sm:p-10 space-y-8 print:p-0 print:text-black">
            
            {/* Header Section */}
            <div className="border-b border-brand-secondary/20 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-black text-brand-text">{personalInfo.name}</h1>
                <p className="text-brand-primary font-semibold text-sm mt-1">{personalInfo.title}</p>
                <p className="text-xs text-brand-secondary max-w-xl mt-2 leading-relaxed">{personalInfo.subtitle}</p>
              </div>

              <div className="space-y-1.5 text-xs text-brand-secondary">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-brand-primary shrink-0" />
                  <a href={personalInfo.socials.email} className="hover:underline text-brand-text">ankit@example.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <FaGithub className="text-brand-primary shrink-0" />
                  <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:underline text-brand-text">github.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <FaLinkedin className="text-brand-primary shrink-0" />
                  <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-brand-text">linkedin.com</a>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-lg font-display font-bold text-brand-text flex items-center gap-2 mb-4 border-l-4 border-brand-primary pl-3">
                <FaGraduationCap className="text-brand-primary" /> Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-brand-bg/40 border border-brand-secondary/15 flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-brand-text">{edu.degree}</h3>
                      <p className="text-xs text-brand-primary font-medium">{edu.institution}</p>
                      <p className="text-xs text-brand-secondary mt-1">{edu.description}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-secondary shrink-0 bg-brand-bg px-2.5 py-1 rounded-md h-fit">
                      {edu.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skills & Competencies */}
            <div>
              <h2 className="text-lg font-display font-bold text-brand-text flex items-center gap-2 mb-4 border-l-4 border-brand-primary pl-3">
                <FaCode className="text-brand-primary" /> Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((cat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-brand-bg/40 border border-brand-secondary/15">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary block mb-2">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items?.map((item, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-brand-card border border-brand-secondary/20 text-brand-text">
                          {item.name} ({item.level}%)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Highlights */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-lg font-display font-bold text-brand-text flex items-center gap-2 mb-4 border-l-4 border-brand-primary pl-3">
                  <FaBriefcase className="text-brand-primary" /> Project Portfolio
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((p, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-brand-bg/40 border border-brand-secondary/15 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-brand-text">{p.title}</h3>
                        <p className="text-xs text-brand-secondary mt-1 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {p.tags?.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-mono font-semibold">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-display font-bold text-brand-text flex items-center gap-2 mb-4 border-l-4 border-yellow-400 pl-3">
                  <FaAward className="text-yellow-400" /> Certifications & Achievements
                </h2>
                <div className="space-y-3">
                  {certifications.map((c, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-brand-bg/40 border border-yellow-500/20 flex justify-between items-center text-xs">
                      <div>
                        <h3 className="font-bold text-brand-text">{c.title}</h3>
                        <p className="text-brand-secondary">{c.issuingOrganization} ({c.issueDate})</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 font-mono font-bold rounded">
                        VERIFIED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-brand-bg/60 border-t border-brand-secondary/15 text-center text-xs text-brand-secondary">
            Generated dynamically from Portfolio REST API &bull; Verified Candidate Record
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
