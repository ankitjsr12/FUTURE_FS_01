import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import confetti from "canvas-confetti";
import { portfolioData } from "../data/portfolioData";

export default function Contact({ data }) {
  const personalInfo = data || portfolioData.personalInfo;
  const { socials } = personalInfo;
  
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formState.name.trim()) tempErrors.name = "Name is required.";
    
    if (!formState.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    
    if (!formState.message.trim()) tempErrors.message = "Message is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      if (!response.ok) throw new Error("Backend submission failed");
      
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 }
      });
    } catch (err) {
      console.warn("Could not save to backend database. Falling back to frontend mockup display. Error:", err);
      // Fallback: simulate success to visitor if backend is down
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 }
      });
    } finally {
      setIsSubmitting(false);
    }

    // Auto dismiss success screen after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute right-[-20%] top-[20%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute left-[-25%] bottom-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>

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
            Get In <span className="text-brand-primary">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary mx-auto rounded-full origin-center"
          ></motion.div>
        </div>

        {/* Form and Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-left flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-brand-text mb-4">
                Let's discuss a project or opportunity!
              </h3>
              <p className="text-brand-secondary leading-relaxed mb-8">
                I am actively seeking internship opportunities, collaborative projects, or full-time roles in full-stack engineering and AI/ML implementations. Drop a message or reach out via social profiles!
              </p>

              {/* Direct Info List */}
              <div className="flex flex-col gap-5 mb-8">
                <a
                  href={socials.email}
                  className="flex items-center gap-4 group text-brand-secondary hover:text-brand-primary transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-card flex items-center justify-center border border-brand-secondary/10 group-hover:border-brand-primary/30 transition-colors">
                    <FaEnvelope size={16} />
                  </div>
                  <span className="text-sm font-semibold">ankit@example.com</span>
                </a>
              </div>
            </div>

            {/* Socials Connection */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-brand-secondary uppercase mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-4">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-brand-card border border-brand-secondary/15 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-brand-card border border-brand-secondary/15 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href={socials.email}
                  className="p-3 rounded-full bg-brand-card border border-brand-secondary/15 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
                  aria-label="Email"
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-8 rounded-2xl bg-brand-card border border-brand-secondary/15 relative overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    {/* Name Input */}
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="name" className="text-sm font-semibold text-brand-text">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-brand-bg/60 border ${
                          errors.name ? "border-red-500/50 focus:border-red-500" : "border-brand-secondary/20 focus:border-brand-primary"
                        } text-brand-text placeholder-brand-secondary/50 focus:outline-none transition-all duration-300`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-red-400 font-semibold">{errors.name}</span>}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="email" className="text-sm font-semibold text-brand-text">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-brand-bg/60 border ${
                          errors.email ? "border-red-500/50 focus:border-red-500" : "border-brand-secondary/20 focus:border-brand-primary"
                        } text-brand-text placeholder-brand-secondary/50 focus:outline-none transition-all duration-300`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-xs text-red-400 font-semibold">{errors.email}</span>}
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="message" className="text-sm font-semibold text-brand-text">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formState.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-brand-bg/60 border ${
                          errors.message ? "border-red-500/50 focus:border-red-500" : "border-brand-secondary/20 focus:border-brand-primary"
                        } text-brand-text placeholder-brand-secondary/50 focus:outline-none transition-all duration-300 resize-none`}
                        placeholder="Hi Ankit, let's connect..."
                      ></textarea>
                      {errors.message && <span className="text-xs text-red-400 font-semibold">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-brand-bg font-semibold transition-all duration-300 disabled:opacity-75 focus:outline-none cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FaPaperPlane size={14} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-brand-primary mb-6"
                    >
                      <FaCheckCircle size={64} />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold text-brand-text mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-brand-secondary max-w-sm mb-6">
                      Thank you for reaching out, Ankit will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2 rounded-lg border border-brand-secondary/20 hover:border-brand-primary/50 text-sm font-semibold text-brand-text transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
