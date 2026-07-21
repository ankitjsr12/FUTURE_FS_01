import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaCalendarAlt, FaUserEdit, FaSearch, FaTimes, FaBookOpen } from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";

export default function Blog({ data }) {
  const posts = data || portfolioData.blogPosts || [];
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(posts.flatMap(p => p.tags || [])))];

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesTag = activeTag === "All" || (post.tags && post.tags.includes(activeTag));
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute left-[-10%] top-[30%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[10%] w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold mb-4 text-brand-text"
          >
            Developer <span className="text-brand-primary">Blog & Articles</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary mx-auto rounded-full origin-center"
          />
          <p className="text-xs sm:text-sm text-brand-secondary max-w-xl mx-auto mt-4 leading-relaxed">
            Technical notes, machine learning insights, and full-stack software development tutorials.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Tag Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-brand-primary text-slate-950 shadow-md shadow-brand-primary/20"
                    : "bg-brand-card border border-brand-secondary/20 text-brand-secondary hover:text-brand-text hover:border-brand-primary/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary text-xs" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-brand-card border border-brand-secondary/20 text-brand-text focus:outline-none focus:border-brand-primary placeholder:text-brand-secondary/60 transition-colors"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedPost(post)}
                className="group p-6 rounded-2xl bg-brand-card/80 border border-brand-secondary/20 hover:border-brand-primary/60 shadow-xl backdrop-blur-md flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-brand-secondary mb-3">
                    <span className="flex items-center gap-1.5 text-brand-primary font-bold">
                      <FaCalendarAlt size={11} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock size={11} /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-brand-text group-hover:text-brand-primary transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-brand-secondary leading-relaxed line-clamp-3 mb-4">
                    {post.summary}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags?.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-mono font-semibold">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Read Article Link */}
                  <div className="pt-3 border-t border-brand-secondary/15 flex items-center justify-between text-xs font-semibold text-brand-primary">
                    <span className="flex items-center gap-1.5 group-hover:underline">
                      <FaBookOpen size={12} /> Read Full Article
                    </span>
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-brand-secondary text-sm">
            No articles found matching your filter criteria.
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0"
              onClick={() => setSelectedPost(null)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-brand-card border border-brand-secondary/20 rounded-2xl shadow-2xl overflow-y-auto flex flex-col z-10 text-brand-text p-6 sm:p-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 text-brand-secondary hover:text-brand-text rounded-lg hover:bg-brand-secondary/10 transition-colors"
              >
                <FaTimes size={18} />
              </button>

              {/* Modal Article Content */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-brand-primary font-bold mb-2">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {selectedPost.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <FaClock /> {selectedPost.readTime}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <FaUserEdit /> {selectedPost.author}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-display font-black text-brand-text leading-tight mb-4">
                    {selectedPost.title}
                  </h1>

                  <div className="flex flex-wrap gap-1.5 pb-6 border-b border-brand-secondary/20">
                    {selectedPost.tags?.map((t, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-brand-secondary leading-relaxed space-y-4 font-sans">
                  <p className="font-semibold text-brand-text italic text-sm">
                    {selectedPost.summary}
                  </p>
                  <p>
                    {selectedPost.content}
                  </p>
                  <p>
                    Software engineering and AI/ML methodologies require continuous iteration. Building modular, scalable web services combined with predictive modeling allows developers to deliver reliable real-world technology solutions.
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-secondary/20 flex justify-end">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-primary text-slate-950 hover:bg-brand-primary/90 transition-all"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
