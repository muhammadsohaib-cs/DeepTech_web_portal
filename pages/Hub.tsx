import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { BookOpen, Video, FileText, Presentation, Search, PlayCircle } from 'lucide-react';
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

const Hub: React.FC = () => {
    return (
        <div className="bg-black min-h-screen pt-32 pb-24 text-white relative flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Header */}
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-16 space-y-6">
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter">
                        THE LEARNING <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">HUB</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
                        Educational resources for students interested in DeepTech. From basic introductions to advanced research commercialization.
                    </motion.p>
                </motion.div>

                {/* Resources Grid */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {[
                        { title: "Learning Articles", icon: BookOpen, accent: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                        { title: "Recorded Lectures", icon: Video, accent: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                        { title: "Project Guides", icon: FileText, accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                        { title: "Student Presentations", icon: Presentation, accent: "text-amber-400 bg-amber-500/10 border-amber-500/20" }
                    ].map((item, idx) => (
                        <motion.div key={idx} variants={fadeInUp}>
                            <SpotlightCard className="p-6 text-center hover:-translate-y-2 transition-all duration-500" spotlightColor="rgba(255, 255, 255, 0.05)">
                                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 border ${item.accent}`}>
                                    <item.icon size={26} />
                                </div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Topics List with Interactive Design */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-16 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]"></div>

                    <div className="grid lg:grid-cols-2 gap-12 relative z-10 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold">Curated DeepTech Topics</h2>
                            <p className="text-blue-100/60 leading-relaxed font-light">
                                Our hub includes comprehensive material built specifically for interdisciplinary students entering the DeepTech space. Learn what it takes to merge science with industrial execution.
                            </p>
                            <Button variant="primary" className="mt-4">
                                Explore the Library
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {[
                                "Introduction to DeepTech Innovation",
                                "Identifying Real-World Problems",
                                "Interdisciplinary Collaboration",
                                "Prototyping and Experimentation",
                                "Research Commercialization",
                                "Entrepreneurship for Scientists"
                            ].map((topic, index) => (
                                <motion.div key={index} variants={fadeInUp} className="flex items-center space-x-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                        {index + 1}
                                    </div>
                                    <span className="font-medium text-blue-100 group-hover:text-white transition-colors">{topic}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Featured Video (Placeholder) */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center space-y-8">
                    <h2 className="text-2xl md:text-4xl font-display font-bold">Featured Masterclass</h2>
                    <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative aspect-video border border-white/10 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200" alt="Lecture" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/20">
                                <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hub;
