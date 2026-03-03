import React from 'react';
import { Target, Lightbulb, Users, Globe, Rocket, Cpu, Atom, Dna, Bot, BatteryCharging, Layers } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { TechCore, DNAAnimation } from '../components/AnimatedTech';
import { TEAM_MEMBERS } from '../constants';

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

const ABOUT_IMAGES = {
  challenge: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  quote: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
  ecosystem: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1200',
  capital: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  sovereignty: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=1200',
  summit: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
  workshop: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
  hackathon: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
};

const About: React.FC = () => {
  return (
    <div className="flex flex-col bg-black min-h-screen relative overflow-hidden">
      {/* Background – same ambient glow as hero across entire page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* 🔹 HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.0] tracking-tighter text-white max-w-4xl mx-auto">
              DEEPTECH GLOBAL
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-blue-100/60 max-w-2xl leading-relaxed font-light tracking-wide mx-auto">
              A sovereign mission dedicated to strengthening the world's deep technology ecosystem by connecting academic excellence, industrial prowess, and venture capital.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 🔹 THE CHALLENGE SECTION */}
      <motion.section
        className="py-24 relative overflow-hidden border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#38bdf8_0.5px,transparent_0.5px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-7 space-y-8">
              {/* Challenge image */}
              <motion.div variants={fadeInUp} className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-[16/10] mb-8">
                <img src={ABOUT_IMAGES.challenge} alt="Innovation and research" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-3">
                <span className="text-sky-500 font-mono text-[10px] uppercase tracking-[0.4em] font-semibold block">The Challenge</span>
                <h2 className="font-display font-extrabold text-2xl md:text-4xl tracking-tighter text-white leading-[1.1]">
                  BRIDGING THE INNOVATION GAP
                </h2>
                <div className="w-16 h-0.5 bg-sky-500/30 rounded-full"></div>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-blue-100/60 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                While scientific talent is abundant, high-potential research often stagnates in laboratories. DeepTech Global systematically addresses these critical failure points to accelerate commercial readiness.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "IP Stagnation", desc: "Unlocking dormant intellectual property in labs." },
                  { title: "Market Scaling", desc: "Defining clear pathways to global commerciality." },
                  { title: "Venture Synergy", desc: "Aligning deep technical talent with industrial need." },
                  { title: "Capital Access", desc: "Connecting founders with specialized deep-tech funding." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-sky-500/20 transition-all group"
                  >
                    <div className="flex items-center space-x-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:scale-125 transition-transform"></div>
                      <h4 className="text-white font-semibold text-[11px] uppercase tracking-widest">{item.title}</h4>
                    </div>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <motion.div variants={fadeInUp} className="relative z-10">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 group">
                  <img src={ABOUT_IMAGES.quote} alt="Strategic vision" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <Lightbulb className="w-8 h-8 text-sky-400 mb-4 opacity-80" />
                    <blockquote className="text-lg md:text-xl font-display font-medium text-white leading-[1.4]">
                      "We don't just facilitate research; we catalyze the conversion of <span className="text-sky-400 font-bold">Human Intelligence</span> into <span className="text-blue-400 font-bold">Global Impact</span>."
                    </blockquote>
                    <div className="mt-6 flex items-center space-x-3">
                      <div className="h-px w-6 bg-sky-500/30"></div>
                      <span className="text-[9px] font-mono text-sky-500/70 uppercase tracking-[0.3em] font-semibold">Sovereign Mission</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 🔹 DEEPTECH DOMAINS – SLIDER */}
      <motion.section
        className="py-24 relative overflow-hidden border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <motion.h2
              variants={fadeInUp}
              className="font-display font-extrabold text-2xl md:text-4xl tracking-tighter text-white leading-[1.1]"
            >
              BEYOND SOFTWARE
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-blue-100/60 text-sm md:text-base max-w-2xl mx-auto font-light tracking-wide"
            >
              Driving breakthrough innovations grounded in hard science and advanced engineering across the global landscape.
            </motion.p>
          </div>

          <div className="mt-4 w-full">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/0 to-white/5 px-2 py-5">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/70 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/70 to-transparent" />
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

      {/* 🔹 OBJECTIVES & ACTIVITIES */}
      <section className="py-24 bg-black/40 backdrop-blur-sm relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            <div className="md:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 space-y-6"
              >
                <h2 className="font-display font-extrabold text-2xl md:text-4xl tracking-tighter text-white leading-[1.1]">
                  THE STRATEGIC ROADMAP
                </h2>
                <p className="text-blue-100/60 text-sm md:text-base font-light leading-relaxed tracking-wide">
                  Building a global framework where scientific breakthroughs meet institutionalized capital and industrial execution.
                </p>
                <div className="pt-6 flex justify-center md:justify-start">
                  <TechCore className="w-40 h-40 opacity-20" />
                </div>
              </motion.div>
            </div>

            <div className="md:w-2/3 grid gap-5">
              {[
                { title: "Global Summit Series", desc: "Orchestrating worldwide events that unite researchers, sovereign wealth funds, and industry leaders.", icon: <Globe />, image: ABOUT_IMAGES.summit },
                { title: "Venture Builder Workshops", desc: "Advanced training in IP protection, commercial modeling, and deep-tech fundraising strategies.", icon: <Rocket />, image: ABOUT_IMAGES.workshop },
                { title: "Cross-Border Hackathons", desc: "High-stakes technical marathons solving trillion-dollar global problems through interdisciplinary collaboration.", icon: <Target />, image: ABOUT_IMAGES.hackathon },
                { title: "Research LP Showcases", desc: "Exclusive platforms for presenting high-TRL research to institutional investors and corporate venture arms.", icon: <Lightbulb />, image: ABOUT_IMAGES.challenge },
                { title: "Strategic Advisory Forums", desc: "Advising governments and organizations on building resilient deep-tech innovation architectures.", icon: <Users />, image: ABOUT_IMAGES.quote }
              ].map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <SpotlightCard className="overflow-hidden p-0 group hover:bg-white/[0.08] transition-all duration-300" spotlightColor="rgba(56, 189, 248, 0.1)">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-32 flex-shrink-0 aspect-video sm:aspect-square overflow-hidden">
                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex items-start space-x-4 p-5 flex-1 min-w-0">
                        <div className="p-2.5 bg-sky-500/10 rounded-lg text-sky-400 group-hover:scale-105 group-hover:bg-sky-500/20 transition-all duration-300 flex-shrink-0">
                          {React.cloneElement(activity.icon as any, { size: 20, strokeWidth: 1.5 })}
                        </div>
                        <div className="space-y-1.5 min-w-0">
                          <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">{activity.title}</h4>
                          <p className="text-blue-100/60 font-light text-sm leading-relaxed">{activity.desc}</p>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 INSTITUTIONAL IMPACT */}
      <motion.section
        className="py-24 relative overflow-hidden border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl tracking-tighter text-white leading-[1.1]">
              GLOBAL IMPACT
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Ecosystem Maturation", desc: "Accelerating the development of deep-tech clusters that rival global innovation hubs.", image: ABOUT_IMAGES.ecosystem },
              { title: "Capital Synergies", desc: "Establishing streamlined conduits between groundbreaking R&D and institutional venture capital.", image: ABOUT_IMAGES.capital },
              { title: "Scientific Sovereignty", desc: "Empowering nations and organizations to lead in the critical technical domains of the next century.", image: ABOUT_IMAGES.sovereignty }
            ].map((benefit, i) => (
              <motion.div key={i} variants={fadeInUp} className="border border-white/10 bg-white/5 rounded-2xl relative group overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-6 relative z-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-sky-500/10 transition-colors duration-500"></div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-blue-100/60 font-light text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🔹 LEADERSHIP & TEAM */}
      <motion.section
        className="py-24 bg-black/40 backdrop-blur-sm border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white leading-[1.1]">
              CORE ARCHITECTS
            </h2>
            <p className="text-blue-100/60 text-base md:text-lg max-w-2xl mx-auto font-light tracking-wide">
              The visionaries formulating the framework for the DeepTech revolution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              '/team/Azher_rizvi.jpeg',
              '/team/neha_img.jpeg',
              '/team/sohaib_img.jpeg',
              '/team/rohaan_img.jpeg',
              '/team/hunzala_img.jpeg',
              '/team/areesha.jpeg'
            ].map((photo, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 aspect-[4/5] hover:border-sky-500/30 shadow-2xl transition-all duration-500"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-sky-500/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src={photo}
                    alt={TEAM_MEMBERS[i].name}
                    className="w-full h-full object-cover filter grayscale-[0.5] contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-10" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-left">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />

                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-sky-300 transition-colors duration-300">
                      {TEAM_MEMBERS[i].name}
                    </h3>

                    <p className="text-sky-400/90 font-mono uppercase tracking-[0.2em] text-[10px] font-semibold">
                      {TEAM_MEMBERS[i].role.replace('(ORIC Director)', '').replace('(Founder)', '')}
                    </p>

                    <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out mt-0 group-hover:mt-4">
                      <p className="text-blue-100/80 text-sm font-light leading-relaxed">
                        {TEAM_MEMBERS[i].desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle outer glow on hover */}
                <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_0_0_0_1px_rgba(56,189,248,0.3),0_0_20px_rgba(56,189,248,0.15)] transition-all duration-500 z-30 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🔹 FINAL CONCLUSION */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-950 border-t border-white/5 relative">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-extrabold text-2xl md:text-4xl tracking-tighter text-white leading-[1.1]">
              A FORWARD IMPERATIVE
            </h2>
          </motion.div>

          <p className="text-blue-100/60 text-base md:text-lg font-light leading-relaxed tracking-wide">
            DeepTech Global is not merely a community; it is a structured initiative to build a futuristic civilization. We are committed to operating with unparalleled transparency and aligning all operations with the highest standards of global scientific excellence.
          </p>

          {/* <div className="pt-6">
            <div className="inline-flex items-center space-x-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-white/60 uppercase tracking-[0.3em] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              AUTHORIZED GLOBAL INITIATIVE — ESTABLISHED 2026
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default About;
