import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";

export default function Timeline({ data }) {
  const education = data || portfolioData.education;

  return (
    <section id="education" className="py-24 bg-brand-card/30 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-[-20%] bottom-[-20%] w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
          >
            Education <span className="text-brand-primary">Timeline</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary mx-auto rounded-full origin-center"
          ></motion.div>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative border-l-2 border-brand-secondary/20 ml-4 sm:ml-8 flex flex-col gap-16">
          {/* Animated vertical track progression */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[-2px] top-0 w-[2px] bg-brand-primary origin-top"
          />

          {education.map((item, index) => (
            <div key={item.institution} className="relative pl-8 sm:pl-12 text-left">
              {/* Timeline Dot with Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="absolute left-[-17px] top-0.5 w-8 h-8 rounded-full bg-brand-bg border-2 border-brand-primary text-brand-primary flex items-center justify-center shadow-lg"
              >
                <FaGraduationCap size={14} />
              </motion.div>

              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-brand-card border border-brand-secondary/15 hover:border-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 relative group"
              >
                {/* Visual arrow pointing to the timeline dot */}
                <div className="absolute left-[-6px] top-3.5 w-3 h-3 bg-brand-card border-b border-l border-brand-secondary/15 group-hover:border-brand-primary/25 rotate-45 transition-colors"></div>

                <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary mb-3">
                  {item.duration}
                </span>

                <h3 className="text-xl font-display font-bold text-brand-text mb-1 group-hover:text-brand-primary transition-colors">
                  {item.degree}
                </h3>

                <h4 className="text-sm font-semibold text-brand-secondary mb-4">
                  {item.institution}
                </h4>

                <p className="text-sm text-brand-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
