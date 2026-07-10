import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const Blogs: React.FC = () => {
  return (
    <div className="bg-black min-h-screen pt-32 pb-24 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-16 space-y-6">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter uppercase">
            DeepTech <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Blogs</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
            Read the latest articles, founder interviews, and research insights from the DeepTech community.
          </motion.p>
        </motion.div>

        {/* Blogs Grid */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <motion.article
              variants={fadeInUp}
              key={post.id}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col hover:border-sky-500/40 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(56,189,248,0.1)] hover:-translate-y-2 cursor-pointer backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Image with zoom & overlay */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 backdrop-blur-md">
                    {post.category}
                  </span>
                  <div className="flex items-center text-[10px] text-white/80 font-medium">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                    {post.date}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-grow flex flex-col">
                <h3 className="text-xl font-bold leading-tight text-white group-hover:text-sky-300 transition-colors duration-300 line-clamp-2 font-display">
                  {post.title}
                </h3>
                <p className="text-blue-100/60 text-sm leading-relaxed font-light line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center pt-4 text-sky-400 text-xs font-semibold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
              
              {/* Make the entire card a clickable link */}
              {post.link ? (
                post.link.startsWith('http') ? (
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-30" />
                ) : (
                  <Link to={post.link} className="absolute inset-0 z-30" />
                )
              ) : null}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
