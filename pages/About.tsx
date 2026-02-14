import React from 'react';
import { Target, Lightbulb, Users, Globe, Rocket } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { TechCore, DNAAnimation } from '../components/AnimatedTech';

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

const About: React.FC = () => {
  return (
    <div className="flex flex-col bg-black">
      {/* 🔹 HERO SECTION: Consisent with Home Page */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black pt-24 lg:pt-32 pb-20">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            className="flex flex-col items-center text-center space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-medium text-sky-400 backdrop-blur-md">
              <span className="uppercase tracking-widest">Our Mission</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl leading-[1.0] tracking-tighter text-white max-w-5xl">
              ENGINEERING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-gradient-x">
                FUTURE OF PAKISTAN
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base text-blue-100/60 max-w-3xl leading-relaxed font-light tracking-wide mx-auto">
              Pakistan is full of brilliant scientists and researchers whose work never leaves the library.
              We are here to ensure that groundbreaking science moves beyond the lab and into the
              multi-million dollar market.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 🔹 MISSION DETAIL SECTION */}
      <motion.section
        className="py-24 bg-black relative overflow-hidden border-y border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-8 w-full">

            {/* The WHY Card */}
            <motion.div variants={fadeInUp} className="h-full">
              <SpotlightCard className="h-full p-10 text-left hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]" spotlightColor="rgba(56, 189, 248, 0.15)">
                <div className="absolute top-0 right-0 p-32 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl w-fit group-hover:bg-blue-500/20 transition-colors relative z-10">
                  <Target className="text-sky-400 w-8 h-8" />
                </div>

                <h4 className="text-3xl font-display font-bold text-white mb-4 relative z-10">The "WHY"</h4>

                <p className="text-gray-400 font-light leading-relaxed text-base relative z-10">
                  We are accelerating the DeepTech Movement in Pakistan. This Summit is not just a seminar; it is a <span className="text-sky-400 font-medium">catalyst</span> to turn theses and ideas into "ten-figure businesses." We are moving beyond software and code, and into the world of atoms, innovation, and deep tech.
                </p>
              </SpotlightCard>
            </motion.div>

            {/* The VISION Card */}
            <motion.div variants={fadeInUp} className="h-full">
              <SpotlightCard className="h-full p-10 text-left hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" spotlightColor="rgba(168, 85, 247, 0.15)">
                <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="mb-6 p-4 bg-purple-500/10 rounded-2xl w-fit group-hover:bg-purple-500/20 transition-colors relative z-10">
                  <Lightbulb className="text-purple-400 w-8 h-8" />
                </div>

                <h4 className="text-3xl font-display font-bold text-white mb-4 relative z-10">The Vision</h4>

                <p className="text-gray-400 font-light leading-relaxed text-base relative z-10">
                  When the lights go down at the end of the Summit, we want every attendee to feel supported.
                  <span className="text-purple-400 font-medium"> Investors</span> will find their next big bet, and <span className="text-purple-400 font-medium">students</span> will find their path to CEO. We are building the ecosystem that builds the future.
                </p>
              </SpotlightCard>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 🔹 STATS/PILLARS SECTION */}
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
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 animate-gradient-x">IMPACT</span>
            </motion.h2>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users />, label: "Community", desc: "Building the first-ever DeepTech Hub in Pakistan." },
              { icon: <Globe />, label: "Global Impact", desc: "Connecting local talent with international markets." },
              { icon: <Target />, label: "Precision", desc: "Focusing on atoms, hardware, and deep science." },
              { icon: <Rocket />, label: "Scale", desc: "Transforming startups into multi-million dollar entities." },
            ].map((stat, i) => (
              <motion.div variants={fadeInUp} key={i} className="group relative flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-sky-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="relative w-16 h-16 bg-black border border-white/20 rounded-full flex items-center justify-center group-hover:border-sky-500/50 transition-all duration-500 shadow-xl">
                    {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform duration-500" })}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{stat.label}</h3>
                <p className="text-gray-400 leading-relaxed text-xs font-light">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
