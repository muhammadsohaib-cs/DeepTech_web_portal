import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Users, FileText, Shield, Award, Calendar, ArrowRight, Play, ChevronLeft, ChevronRight, BookOpen, Lightbulb, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const fadeInUp = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; spotlightColor?: string }> = ({
    children, className = "", spotlightColor = "rgba(14, 79, 175, 0.25)"
}) => {
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
                style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)` }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

const Society: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    const playlist = [
        { title: "Deep-Tech Societies Are Not Event Clubs", id: "kNwtu95df3I" },
        { title: "Start With Problems, Not Technologies", id: "TVO9OQ27fTQ" },
        { title: "Build Small, Build Fast, Build Often", id: "_c39lqm1auw" },
        { title: "Multidisciplinary Teams Win in Deep-Tech", id: "x5H4d_9EW6A" },
        { title: "Document Everything You Build", id: "kIedZk7TN-A" },
        { title: "Seek Mentors, Not Just Sponsors", id: "rCIakYM6UqY" },
        { title: "Focus on Local Problems First", id: "zOHxkvijXdw" },
        { title: "Share Progress Publicly", id: "YLvvoXxHdEw" },
        { title: "Deep-Tech Requires Patience", id: "sHlQDRmJcIA" },
        { title: "Build Publicly, Build a Movement", id: "Vg0POP301Yg" }
    ];

    const handleNext = () => { if (currentVideoIndex < playlist.length - 1) setCurrentVideoIndex(c => c + 1); };
    const handlePrev = () => { if (currentVideoIndex > 0) setCurrentVideoIndex(c => c - 1); };

    const steps = [
        { title: "Form Team", desc: "Gather a founding team of at least 5 students passionate about science and technology.", icon: Users, color: "rgba(56, 189, 248, 0.15)", accent: "bg-sky-500/10 border-sky-500/20 text-sky-400" },
        { title: "Faculty Advisor", desc: "Identify a faculty advisor who supports student innovation and technical research.", icon: Shield, color: "rgba(168, 85, 247, 0.15)", accent: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
        { title: "Register", desc: "Register your society on the DeepTech Student Network platform.", icon: FileText, color: "rgba(16, 185, 129, 0.15)", accent: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
        { title: "Activity Plan", desc: "Submit a simple annual activity plan committed to monthly activities.", icon: Calendar, color: "rgba(251, 191, 36, 0.15)", accent: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
    ];

    const constitutionArticles = [
        { label: "Article 1 – Name", content: "The organization shall be: DeepTech Society. Each university chapter operates as DeepTech Society – [University Name].", color: "text-sky-400" },
        { label: "Article 2 – Vision", content: "To build a community of students dedicated to scientific innovation and interdisciplinary collaboration to solve real-world problems.", color: "text-purple-400" },
        { label: "Article 3 – Mission", content: "Promote DeepTech fields (AI, biotech, robotics, climate tech). Encourage interdisciplinary collaboration and develop products that solve real-world problems.", color: "text-emerald-400" },
        { label: "Article 4 & 5 – Membership", content: "Open to all university students across Biosciences, CS, Engineering, Medicine, Environmental Sciences, Business, and Social Sciences.", color: "text-amber-400" },
        { label: "Article 6 & 7 – Leadership & Advisor", content: "President, Vice President, Technical Lead, Research Coordinator, Industry Liaison. Each society must have an officially appointed Faculty Advisor.", color: "text-rose-400" },
        { label: "Article 8–11 – Operations", content: "Monthly general meetings, regular seminars, project development, and national collaboration with monthly DeepTech project presentations.", color: "text-cyan-400" },
    ];

    return (
        <div className="bg-black min-h-screen text-white relative overflow-x-hidden">
            {/* Scroll Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-primary-light origin-left z-[100]" 
                style={{ scaleX }} 
            />

            {/* Parallax Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div 
                    style={{ y: y1, rotate }} 
                    className="absolute top-[10%] -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" 
                />
                <motion.div 
                    style={{ y: y2, rotate: -rotate }} 
                    className="absolute top-[40%] -right-20 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px]" 
                />
                <motion.div 
                    style={{ y: y1 }} 
                    className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" 
                />
            </div>

            {/* ─── HERO ─── */}
            <section className="relative pt-40 pb-28 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center space-y-6 max-w-4xl mx-auto">
                        <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">
                            University Ecosystem
                        </motion.p>
                        <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-tighter text-white">
                            START A DEEPTECH SOCIETY
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-base md:text-lg text-blue-100/60 font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
                            A DeepTech Society is a student-led organization within a university that promotes innovation in science and technology. Explore emerging technologies, collaborate across disciplines, and develop real research projects.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="flex flex-col items-center gap-2 text-white/30 pt-10"
                        >
                            <span className="text-[8px] uppercase tracking-[0.2em]">Scroll</span>
                            <motion.div 
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-px h-8 bg-gradient-to-b from-sky-400 to-transparent"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── MASTERCLASS VIDEO PLAYLIST ─── */}
            <section id="masterclass" className="py-20 md:py-24 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12 space-y-3">
                        <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">10-Part Series</motion.p>
                        <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
                            DEEPTECH SOCIETY MASTERCLASS
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-blue-100/60 font-light max-w-xl mx-auto">
                            Watch our step-by-step guide to launching and running a high-impact society.
                        </motion.p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <div className="bg-zinc-900/80 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60">
                            {/* Video */}
                            <div className="aspect-video w-full bg-black">
                                <iframe
                                    key={currentVideoIndex}
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${playlist[currentVideoIndex].id}?rel=0&modestbranding=1`}
                                    title={playlist[currentVideoIndex].title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>

                            {/* Controls */}
                            <div className="p-5 md:p-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-[10px] font-semibold tracking-[0.25em] text-sky-400 uppercase mb-1">
                                        Step {currentVideoIndex + 1} of {playlist.length}
                                    </p>
                                    <h3 className="text-base md:text-lg font-bold text-white font-display">{playlist[currentVideoIndex].title}</h3>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <Button variant="secondary" size="sm" onClick={handlePrev} disabled={currentVideoIndex === 0} className="gap-1.5">
                                        <ChevronLeft className="w-4 h-4" /> Previous
                                    </Button>
                                    <span className="text-xs text-gray-500 font-mono tabular-nums">
                                        {currentVideoIndex + 1} / {playlist.length}
                                    </span>
                                    <Button variant="primary" size="sm" onClick={handleNext} disabled={currentVideoIndex === playlist.length - 1} className="gap-1.5">
                                        Next <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Episode dots */}
                            <div className="px-5 md:px-6 pb-4 flex gap-1.5 flex-wrap">
                                {playlist.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentVideoIndex(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentVideoIndex ? 'w-8 bg-sky-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── STEPS TO START ─── */}
            <section className="py-24 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        <div className="text-center mb-14 space-y-3">
                            <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">How To Begin</motion.p>
                            <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
                                STEPS TO START A SOCIETY
                            </motion.h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {steps.map((step, idx) => (
                                <motion.div key={idx} variants={fadeInUp} className="h-full">
                                    <SpotlightCard className="p-8 text-left h-full hover:-translate-y-2 transition-transform duration-500" spotlightColor={step.color}>
                                        <div className={`w-14 h-14 mb-6 rounded-2xl flex items-center justify-center border ${step.accent}`}>
                                            <step.icon size={26} />
                                        </div>
                                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Step {idx + 1}</p>
                                        <h3 className="text-xl font-bold font-display text-white mb-3">{step.title}</h3>
                                        <p className="text-blue-100/60 text-sm leading-relaxed font-light">{step.desc}</p>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── UNIVERSITY SOCIETIES ─── */}
            <section className="py-24 border-b border-white/5 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">University Chapters</motion.p>
                                    <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
                                        UNIVERSITY SOCIETIES
                                    </motion.h2>
                                    <motion.p variants={fadeInUp} className="text-blue-100/60 leading-relaxed font-light">
                                        Each participating university will have its own society page, which highlights the leadership team, organizing programs, and ongoing DeepTech projects.
                                    </motion.p>
                                </div>

                                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-6">
                                    <motion.div variants={fadeInUp} className="space-y-3">
                                        <h4 className="font-bold text-sky-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
                                            <Users className="w-3.5 h-3.5" /> Leadership Team
                                        </h4>
                                        <ul className="text-blue-100/70 text-sm space-y-2">
                                            {["President & Vice President", "Technical Lead", "Research Coordinator", "Industry Liaison"].map(r => (
                                                <li key={r} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400/60 shrink-0" />
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                    <motion.div variants={fadeInUp} className="space-y-3">
                                        <h4 className="font-bold text-purple-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
                                            <Lightbulb className="w-3.5 h-3.5" /> Typical Activities
                                        </h4>
                                        <ul className="text-blue-100/70 text-sm space-y-2">
                                            {["Technology Seminars", "Research Discussions", "Project Demonstrations", "Innovation Challenges"].map(a => (
                                                <li key={a} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 shrink-0" />
                                                    {a}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right: Monthly Activity Card */}
                            <motion.div variants={fadeInUp} className="relative">
                                <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full pointer-events-none" />
                                <SpotlightCard className="p-8 md:p-10 relative" spotlightColor="rgba(14, 79, 175, 0.2)">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                            <Award className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <h3 className="text-xl font-bold font-display text-white">Monthly Society Activities</h3>
                                    </div>
                                    <p className="text-blue-100/60 font-light text-sm leading-relaxed mb-8">
                                        Each society should aim to organize at least one activity every month, inviting guest lecturers, presenting projects, and engaging in research discussions.
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { icon: Globe, label: "Seminars", color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
                                            { icon: Cpu, label: "Projects", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                                            { icon: BookOpen, label: "Research", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                                        ].map(item => (
                                            <div key={item.label} className={`rounded-2xl border p-4 text-center ${item.color}`}>
                                                <item.icon className="w-5 h-5 mx-auto mb-2" />
                                                <p className="text-xs font-semibold tracking-wide">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── CONSTITUTION ─── */}
            <section className="py-24 border-b border-white/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        <div className="text-center mb-14 space-y-3">
                            <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">Governing Structure</motion.p>
                            <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
                                CONSTITUTION
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-blue-100/60 font-light max-w-2xl mx-auto">
                                The DeepTech Society governing structure and rules establishing an interdisciplinary culture of scientific innovation.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
                            {constitutionArticles.map((article, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                                >
                                    <h3 className={`font-bold text-sm uppercase tracking-widest mb-3 ${article.color}`}>{article.label}</h3>
                                    <p className="text-blue-100/60 text-sm leading-relaxed font-light">{article.content}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-8 p-8 bg-primary/10 border border-primary/20 rounded-2xl text-center">
                            <p className="italic text-base md:text-lg text-blue-100/80 font-light leading-relaxed max-w-3xl mx-auto">
                                "The DeepTech Society exists to encourage students to explore the frontiers of science and technology. Through curiosity, collaboration, and innovation, students can contribute to solving the most important challenges facing society today."
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/12 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
                        <motion.p variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.3em] text-sky-400 uppercase">Join the Movement</motion.p>
                        <motion.h2 variants={fadeInUp} className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter text-white">
                            READY TO START<br />YOUR CHAPTER?
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-blue-100/60 font-light text-lg max-w-xl mx-auto">
                            Register your university society and become part of Pakistan's national DeepTech Student Network.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <Link to="/register-society">
                                <Button variant="primary" size="lg" className="gap-2 px-10">
                                    Register Your Society <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline" size="lg" className="px-10">
                                    Learn More
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Society;
