import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Trophy, Medal, Star, Video, CheckCircle2, Award } from 'lucide-react';
import Button from '../components/Button';

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
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; spotlightColor?: string }> = ({ children, className = "", spotlightColor = "rgba(168, 85, 247, 0.25)" }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div className={`relative border border-white/10 bg-white/5 overflow-hidden rounded-3xl group ${className}`} onMouseMove={handleMouseMove}>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)` }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

const Projects: React.FC = () => {
    return (
        <div className="bg-black min-h-screen pt-32 pb-24 text-white relative">
            {/* Background Glow */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Header */}
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-16 space-y-6">
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter uppercase">
                        Student Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Showcase</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
                        Highlighting innovative DeepTech projects developed by students globally and locally. Learn from peers across different universities.
                    </motion.p>
                </motion.div>

                {/* Project Anatomy / Template */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 mb-24 relative overflow-hidden backdrop-blur-sm">
                    <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-display font-bold">Showcase Details</h2>
                            <p className="text-blue-100/60 leading-relaxed font-light">
                                Each project page is designed to highlight the core impact of the student's work.
                                We go beyond the code to uncover exactly what problem is being solved and what technologies were engineered.
                            </p>
                            <Button variant="primary" className="mt-4">
                                Submit Project
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                "Project Title", "University", "Team Members", "Faculty Mentor",
                                "Problem Being Solved", "Technology Used", "Prototype / Concept Description", "Short Presentation Video"
                            ].map((topic, index) => (
                                <motion.div key={index} variants={fadeInUp} className="flex items-center space-x-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                                    <CheckCircle2 className="w-5 h-5 text-sky-400/70 group-hover:text-sky-400 transition-colors" />
                                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-100 group-hover:text-white transition-colors">
                                        {topic}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Monthly Project Challenge */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16 space-y-6">
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter uppercase">
                        Monthly DeepTech <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Challenge</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-lg text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
                        Every month, DeepTech societies nominate one project from their university.
                        Members from all societies vote for the best projects.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 mb-24">
                    {[
                        { title: "DeepTech Gold Project", icon: Trophy, accent: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_20px_rgba(250,204,21,0.2)]" },
                        { title: "DeepTech Silver Project", icon: Medal, accent: "text-gray-300 bg-gray-500/10 border-gray-500/30" },
                        { title: "DeepTech Bronze Project", icon: Award, accent: "text-amber-600 bg-amber-700/10 border-amber-700/30" }
                    ].map((item, idx) => (
                        <motion.div key={idx} variants={fadeInUp}>
                            <SpotlightCard className={`p-8 text-center hover:-translate-y-2 transition-all duration-500 ${idx === 0 ? 'border-yellow-500/20' : ''}`} spotlightColor="rgba(255, 255, 255, 0.05)">
                                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 border ${item.accent}`}>
                                    <item.icon size={36} />
                                </div>
                                <h3 className="font-bold text-xl uppercase tracking-wider">{item.title}</h3>
                                <p className="mt-4 text-blue-100/60 font-light text-sm">
                                    Winning projects will be highlighted on the homepage and shared across the network.
                                </p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Process */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto bg-black border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12">
                    <h3 className="text-2xl font-bold mb-8 text-center">Nomination Process</h3>
                    <div className="space-y-6">
                        {[
                            { step: "1", text: "Each society submits one project every month." },
                            { step: "2", text: "The project includes a short video and explanation." },
                            { step: "3", text: "Members from all societies vote for the best projects." },
                            { step: "4", text: "The top three projects are selected for awards." }
                        ].map((item, idx) => (
                            <motion.div key={idx} variants={fadeInUp} className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                                    {item.step}
                                </div>
                                <span className="text-lg font-light text-blue-100/80">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Projects;
