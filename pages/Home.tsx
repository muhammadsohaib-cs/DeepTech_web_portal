
import React from 'react';
import { ArrowRight, Calendar, User, Target, Rocket, ShieldCheck, Zap, Beaker, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Button from '../components/Button';
import { BLOG_POSTS, TEAM_MEMBERS } from '../constants';
import InteractiveBackground from '../components/InteractiveBackground';
import { TechCore, DataStream, CircuitNode, DeepVisionGraphic } from '../components/AnimatedTech';

const fadeInUp = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}> = ({ children, className = "", spotlightColor = "rgba(56, 189, 248, 0.25)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-white/10 bg-white/5 overflow-hidden rounded-3xl group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col bg-black">
      {/* 🔹 HERO SECTION: Professional Premium Layout */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black pt-24 lg:pt-32 pb-20">
        <InteractiveBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Typography & CTA */}
            <motion.div
              className="md:col-span-12 lg:col-span-10 flex flex-col items-start text-left space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >

              <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl leading-[1.0] tracking-tighter text-white max-w-4xl">
                FROM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-gradient-x">
                  IDEAS
                </span> <br />
                <span className="text-white/90">TO INDUSTRY</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base text-blue-100/60 max-w-2xl leading-relaxed font-light tracking-wide">
                Connecting researchers, startups, and investors to transform scientific ideas into scalable global businesses. From lab to market, we are the catalyst for Pakistan's future.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
                <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="relative overflow-hidden w-full sm:w-auto px-7 py-3 text-sm font-bold bg-[#38bdf8] text-black hover:bg-[#0ea5e9] border border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.25)] rounded-full group transition-all transform hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(56,189,248,0.4)]">
                    <span className="relative z-10 flex items-center">
                      Join Community
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
                  </Button>
                </a>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-7 py-3 text-sm font-medium border-white/10 hover:bg-white/5 hover:border-white/20 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-105 active:scale-95">
                    Our Vision
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🔹 OUR VISION SECTION: Refined visual and professional layout */}
      <motion.section
        className="py-24 bg-black relative overflow-hidden border-y border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 z-0 opacity-10">
          <DataStream className="w-full h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-10">

            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-medium text-sky-400 backdrop-blur-md">
              <Target className="w-3 h-3" />
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white max-w-4xl leading-[1.1]">
              A PERMANENT CATALYST FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-gradient-x">
                SCIENTIFIC WEALTH
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base text-blue-100/60 max-w-3xl leading-relaxed font-light tracking-wide mx-auto">
              Pakistan's universities are powerhouses of raw intelligence. Our vision is to ensure no breakthrough remains a dusty thesis. We are building the infrastructure that transforms laboratory successes into market-dominating industries.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6 pt-6 w-full max-w-4xl">
              <motion.div variants={fadeInUp} className="h-full">
                <SpotlightCard className="h-full p-6 text-left hover:-translate-y-1 transition-transform duration-500" spotlightColor="rgba(56, 189, 248, 0.15)">
                  <div className="mb-5 p-3.5 bg-blue-500/10 rounded-2xl w-fit group-hover:bg-blue-500/20 transition-colors relative z-10">
                    <Rocket className="text-sky-400 w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 relative z-10">Accelerated Commercialization</h4>
                  <p className="text-gray-400 font-light leading-relaxed text-sm relative z-10">Reducing the time-to-market for deep science products from years to months through structured pipelines.</p>
                </SpotlightCard>
              </motion.div>

              <motion.div variants={fadeInUp} className="h-full">
                <SpotlightCard className="h-full p-6 text-left hover:-translate-y-1 transition-transform duration-500" spotlightColor="rgba(168, 85, 247, 0.15)">
                  <div className="mb-5 p-3.5 bg-purple-500/10 rounded-2xl w-fit group-hover:bg-purple-500/20 transition-colors relative z-10">
                    <ShieldCheck className="text-purple-400 w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 relative z-10">Intellectual Property Shield</h4>
                  <p className="text-gray-400 font-light leading-relaxed text-sm relative z-10">Helping researchers protect and monetize their unique scientific contributions on a global scale.</p>
                </SpotlightCard>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 🔹 OUR TEAM SECTION: Vector-led presentation */}
      <motion.section
        className="py-24 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 animate-gradient-x">DEEPTECH</span> CORE
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-blue-100/60 max-w-2xl mx-auto text-base font-light tracking-wide">
              A diverse team of visionaries bridging the gap between complexity and commerce.
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div variants={fadeInUp} key={i} className="group relative flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-sky-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="relative w-20 h-20 bg-black border border-white/20 rounded-full flex items-center justify-center group-hover:border-sky-500/50 transition-all duration-500 shadow-xl">
                    {React.cloneElement(member.icon as React.ReactElement<any>, { className: "w-8 h-8 text-sky-400 group-hover:scale-110 transition-transform duration-500" })}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">{member.name}</h3>
                <p className="text-sky-500/80 font-mono uppercase tracking-widest text-[10px] mb-4">{member.role}</p>
                <p className="text-gray-400 leading-relaxed text-sm font-light">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 🔹 NEWS SECTION */}
      <motion.section
        className="py-24 bg-black relative overflow-hidden border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
                DEEPTECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 animate-gradient-x">INTELLIGENCE</span>
              </h2>
              <p className="text-blue-100/60 max-w-xl text-base font-light tracking-wide">
                Stay informed on the scientific breakthroughs shaping Pakistan's future.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-6 py-2.5 text-xs border-white/10 hover:bg-white/5 hover:border-white/20 text-white backdrop-blur-md transition-all">
                  Join WhatsApp Hub
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <motion.article variants={fadeInUp} key={post.id} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-sky-500/30 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1">
                <div className="aspect-video bg-black/40 flex items-center justify-center p-8 overflow-hidden relative border-b border-white/5">
                  <div className="absolute inset-0 opacity-10 scale-150 pointer-events-none">
                    <DataStream />
                  </div>
                  <div className="relative z-10 w-16 h-16 text-sky-500/80 group-hover:scale-110 transition-transform duration-500 group-hover:text-sky-400">
                    {post.id === '1' ? <Beaker size={56} strokeWidth={1} /> : post.id === '2' ? <Zap size={56} strokeWidth={1} /> : <Globe size={56} strokeWidth={1} />}
                  </div>
                </div>
                <div className="p-6 space-y-3 flex-grow flex flex-col">
                  <div className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest text-sky-400">
                    <span className="bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-white group-hover:text-sky-400 transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-3">{post.excerpt}</p>
                  <div className="pt-5 mt-auto border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-sky-500" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 🔹 FINAL CTA */}
      <motion.section
        className="py-24 relative flex flex-col items-center text-center px-4 overflow-hidden bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05] pointer-events-none scale-150">
          <TechCore />
        </div>
        <motion.div variants={fadeInUp} className="relative z-10 space-y-6">
          <h2 className="font-display font-extrabold text-4xl md:text-7xl tracking-tighter text-white">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 animate-gradient-x">DISRUPT?</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl font-light tracking-wide mx-auto">
            The largest gathering of Pakistani DeepTech minds is coming. Don't just watch the future—build it.
          </p>
          <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer" className="block pt-6">
            <Button size="lg" className="relative overflow-hidden px-10 py-4 text-base font-bold bg-[#38bdf8] text-black hover:bg-[#0ea5e9] border border-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.3)] rounded-full group transition-all transform hover:scale-105 active:scale-95 hover:shadow-[0_0_50px_rgba(56,189,248,0.5)]">
              <span className="relative z-10 flex items-center">
                Join the Movement
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
            </Button>
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
