
import React from 'react';
import { ArrowRight, Calendar, Target, Rocket, ShieldCheck, Cpu, Atom, Dna, Bot, BatteryCharging, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Button from '../components/Button';
import { BLOG_POSTS, TEAM_MEMBERS } from '../constants';
import InteractiveBackground from '../components/InteractiveBackground';
import { TechCore, DataStream, CircuitNode, DeepVisionGraphic } from '../components/AnimatedTech';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const deepTechDomains = [
  {
    name: 'Artificial Intelligence',
    desc: 'Foundation models, autonomous systems, and cognitive infrastructure.',
    icon: Cpu,
    accent: 'from-cyan-400/40 to-blue-500/10',
  },
  {
    name: 'Nanotechnology',
    desc: 'Molecular-scale engineering for sensors, chips, and smart surfaces.',
    icon: Atom,
    accent: 'from-purple-400/40 to-fuchsia-500/10',
  },
  {
    name: 'Biotechnology',
    desc: 'Synthetic biology, therapeutics, and programmable living systems.',
    icon: Dna,
    accent: 'from-emerald-400/40 to-teal-500/10',
  },
  {
    name: 'Robotics',
    desc: 'Human-centric automation, mechatronics, and intelligent machines.',
    icon: Bot,
    accent: 'from-amber-400/40 to-orange-500/10',
  },
  {
    name: 'Clean Energy',
    desc: 'Next‑gen storage, grids, and climate‑positive technologies.',
    icon: BatteryCharging,
    accent: 'from-lime-400/40 to-emerald-500/10',
  },
  {
    name: 'Advanced Materials',
    desc: 'Meta‑materials, composites, and extreme‑performance substrates.',
    icon: Layers,
    accent: 'from-sky-400/40 to-indigo-500/10',
  },
];

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
                DEEPTECH GLOBAL <br />
                <span className="text-white/90 uppercase italic">Organization</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base text-blue-100/60 max-w-2xl leading-relaxed font-light tracking-wide">
                Establishing a structured innovation ecosystem globally. We bridge the critical gap between academic excellence and commercialization pathways across the deep technology landscape.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
                <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto group/btn">
                    Join Community
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
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
              A HUB FOR RESEARCH IMPACT
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base text-blue-100/60 max-w-3xl leading-relaxed font-light tracking-wide mx-auto">
              Breaking the boundaries of traditional academia. DeepTech Global is dedicated to ensuring that groundbreaking research translates into real-world solutions, startups, and economic impact.
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

      {/* 🔹 BEYOND SOFTWARE SECTION */}
      <motion.section
        className="py-24 bg-black relative overflow-hidden border-b border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center space-y-6"
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase"
            >
              Beyond Software
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white leading-[1.1]"
            >
              BEYOND SOFTWARE
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-blue-100/70 max-w-3xl leading-relaxed font-light tracking-wide"
            >
              Driving breakthrough innovations grounded in hard science and advanced engineering
              across the global landscape.
            </motion.p>
          </motion.div>

          {/* Sliding domains rail */}
          <div className="mt-12 w-full">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/0 to-white/5 px-2 py-4">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/60 to-transparent" />
              <motion.div
                className="flex gap-4 md:gap-6 min-w-max py-1"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              >
                {[...deepTechDomains, ...deepTechDomains].map((domain, index) => {
                  const Icon = domain.icon;
                  return (
                    <div
                      key={`${domain.name}-${index}`}
                      className="group relative min-w-[210px] md:min-w-[260px] rounded-2xl border border-white/10 bg-black/40 px-5 py-4 flex flex-col gap-2 hover:border-sky-500/40 hover:bg-black/70 transition-all duration-500"
                    >
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${domain.accent}`}
                      />
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-inner shadow-sky-500/20">
                          <Icon className="w-5 h-5 text-sky-300 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                            {domain.name}
                          </p>
                        </div>
                      </div>
                      <p className="relative z-10 text-[11px] md:text-xs text-blue-100/70 leading-relaxed font-light">
                        {domain.desc}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🔹 ECOSYSTEM ARCHITECTURE SECTION */}
      <motion.section
        className="py-24 bg-black relative overflow-hidden border-b border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16">
            <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">
              The Protocol
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
              ECOSYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600">ARCHITECTURE</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-blue-100/60 max-w-2xl mx-auto text-base font-light tracking-wide">
              We operate at the convergence of three critical domains, transforming theoretical science into dominant market forces.
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Excellence",
                desc: "Sourcing breakthrough IP from top-tier research institutions and scientific laboratories.",
                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                icon: <Atom className="w-6 h-6 text-sky-400" />
              },
              {
                title: "Industrial Execution",
                desc: "Applying hardcore engineering and operational supremacy to scale deep-tech ventures globally.",
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
                icon: <Cpu className="w-6 h-6 text-purple-400" />
              },
              {
                title: "Institutional Capital",
                desc: "Deploying strategic venture funding to ensure continuous momentum and market dominance.",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                icon: <Rocket className="w-6 h-6 text-emerald-400" />
              }
            ].map((pillar, i) => (
              <motion.div variants={fadeInUp} key={i} className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/50 hover:border-white/30 transition-all duration-500 aspect-[4/5]">
                <img src={pillar.img} alt={pillar.title} className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.8] contrast-125 opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/10 opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="mb-6 p-4 bg-white/5 backdrop-blur-md rounded-2xl w-fit border border-white/10 group-hover:-translate-y-2 transition-transform duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300 transform group-hover:-translate-y-2">
                    {pillar.title}
                  </h3>
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-blue-100/70 text-sm font-light leading-relaxed whitespace-pre-line">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 🔹 OUR TEAM SECTION: Vector-led presentation */}
      {/* <motion.section
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
      </motion.section> */}

      {/* 🔹 DEEPTECH INTELLIGENCE SECTION */}
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
                DEEPTECH INTELLIGENCE
              </h2>
              <p className="text-blue-100/60 max-w-xl text-base font-light tracking-wide">
                Stay informed on the scientific breakthroughs shaping Pakistan's future.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="px-5 py-2.5">
                  Join WhatsApp Hub
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <motion.article
                variants={fadeInUp}
                key={post.id}
                className="group relative bg-black/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-sky-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Image with zoom & overlay */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/20 px-2.5 py-1 rounded-full border border-sky-500/30 backdrop-blur-sm">
                      {post.category}
                    </span>
                    <div className="flex items-center text-[10px] text-white/80 font-medium">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                      {post.date}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold leading-tight text-white group-hover:text-sky-300 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center pt-2 text-sky-400 text-xs font-semibold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                    <span>Read Research</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
                {/* Make the entire card a clickable link to external research or /research */}
                {post.link ? (
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-30" />
                ) : (
                  <Link to="/research" className="absolute inset-0 z-30" />
                )}
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
          <h2 className="font-display font-extrabold text-2xl md:text-4xl tracking-tighter text-white">
            READY TO JOIN DEEPTECH
          </h2>
          <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl font-light tracking-wide mx-auto">
            The largest gathering of Pakistani DeepTech minds is coming. Don't just watch the future—build it.
          </p>
          <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer" className="block pt-6">
            <Button variant="primary" size="lg" className="px-10 py-4">
              Join the Movement
            </Button>
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
