import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Users, FileText, CheckCircle, Shield, Award, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
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
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; spotlightColor?: string }> = ({ children, className = "", spotlightColor = "rgba(56, 189, 248, 0.25)" }) => {
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
                style={{
                    background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

const Society: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    
    const playlist = [
        { title: "Step 1: Deep-Tech Societies Are Not Event Clubs", id: "kNwtu95df3I" },
        { title: "Step 2: Start With Problems, Not Technologies", id: "TVO9OQ27fTQ" },
        { title: "Step 3: Build Small, Build Fast, Build Often", id: "_c39lqm1auw" },
        { title: "Step 4: Multidisciplinary Teams Win in Deep-Tech", id: "x5H4d_9EW6A" },
        { title: "Step 5: Document Everything You Build", id: "kIedZk7TN-A" },
        { title: "Step 6: Seek Mentors, Not Just Sponsors", id: "rCIakYM6UqY" },
        { title: "Step 7: Focus on Local Problems First", id: "zOHxkvijXdw" },
        { title: "Step 8: Share Progress Publicly", id: "YLvvoXxHdEw" },
        { title: "Step 9: Deep-Tech Requires Patience", id: "sHlQDRmJcIA" },
        { title: "Step 10: Build Publicly, Build a Movement", id: "Vg0POP301Yg" }
    ];

    const handleNext = () => {
        if (currentVideoIndex < playlist.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };

    return (
        <div className="bg-black min-h-screen pt-32 pb-24 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-20 space-y-6">
                    <motion.h4 variants={fadeInUp} className="text-sky-400 font-medium tracking-widest uppercase text-sm md:text-base">
                        University Ecosystem
                    </motion.h4>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                        START A DEEPTECH SOCIETY
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/60 font-light max-w-3xl mx-auto">
                        A DeepTech Society is a student-led organization within a university that promotes innovation in science and technology. We encourage students to explore emerging technologies, collaborate across disciplines, and develop research projects.
                    </motion.p>
                </motion.div>

                {/* Video Playlist Section */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-24">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-display font-bold">DeepTech Society Masterclass</h2>
                        <p className="text-blue-100/60 mt-4">Watch our 10-step guide to successfully launching and running your society.</p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="aspect-video w-full bg-black">
                            <iframe 
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${playlist[currentVideoIndex].id}?rel=0&modestbranding=1`} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        
                        <div className="p-6 bg-black/40 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{playlist[currentVideoIndex].title}</h3>
                                <p className="text-sm text-gray-400 mt-1">Video {currentVideoIndex + 1} of {playlist.length}</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handlePrev}
                                    disabled={currentVideoIndex === 0}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Previous
                                </button>
                                <button 
                                    onClick={handleNext}
                                    disabled={currentVideoIndex === playlist.length - 1}
                                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/30 text-black font-bold rounded-lg text-sm transition-colors"
                                >
                                    Next Video
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Steps to Start */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-display font-bold">Steps to Start a Society</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: "Form Team", desc: "Form a founding team of at least 5 students.", icon: Users },
                            { title: "Faculty Advisor", desc: "Identify a faculty advisor who supports innovation.", icon: Shield },
                            { title: "Register", desc: "Register your society on the DeepTech Student Network platform.", icon: FileText },
                            { title: "Activity Plan", desc: "Submit a simple annual activity plan.", icon: Calendar }
                        ].map((step, idx) => (
                            <motion.div key={idx} variants={fadeInUp} className="h-full">
                                <SpotlightCard className="p-8 text-center h-full hover:-translate-y-2 transition-transform duration-500" spotlightColor="rgba(56, 189, 248, 0.15)">
                                    <div className="w-16 h-16 mx-auto bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/20 text-sky-400">
                                        <step.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{idx + 1}. {step.title}</h3>
                                    <p className="text-blue-100/60 text-sm leading-relaxed">{step.desc}</p>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* University Societies Overview */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-24 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold">University Societies</h2>
                            <p className="text-blue-100/60 leading-relaxed text-lg">
                                Each participating university will have its own society page, which highlights the leadership team, organizing programs (workshops, research meetups, technology talks), and ongoing DeepTech projects.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sky-400 uppercase tracking-widest text-xs">Leadership Team</h4>
                                    <ul className="text-blue-100/70 text-sm space-y-1">
                                        <li>• President & Vice President</li>
                                        <li>• Technical Lead</li>
                                        <li>• Research Coordinator</li>
                                        <li>• Industry Liaison</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-purple-400 uppercase tracking-widest text-xs">Typical Activities</h4>
                                    <ul className="text-blue-100/70 text-sm space-y-1">
                                        <li>• Technology Seminars</li>
                                        <li>• Research Discussions</li>
                                        <li>• Project Demonstrations</li>
                                        <li>• Innovation Challenges</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full" />
                            <div className="relative border border-white/10 rounded-[2rem] p-8 bg-black/50 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                                    <Award className="text-amber-400" />
                                    Monthly Society Activities
                                </h3>
                                <p className="text-blue-100/60 font-light text-sm leading-relaxed mb-6">
                                    Each society should aim to organize at least one activity every month, inviting guest lecturers from industry experts, presenting projects, and engaging in research discussions.
                                </p>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 bg-white/10 rounded-full flex justify-center items-center text-white font-bold">1</div>
                                    <div className="h-10 w-10 bg-white/10 rounded-full flex justify-center items-center text-white font-bold">2</div>
                                    <div className="h-10 w-10 bg-white/10 rounded-full flex justify-center items-center text-white font-bold">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Constitution */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-display font-bold">Constitution</h2>
                        <p className="text-blue-100/60 mt-4 max-w-2xl mx-auto">The DeepTech Society governing structure and rules establishing an interdisciplinary culture of scientific innovation.</p>
                    </div>
                    <div className="bg-black border border-white/10 rounded-[2rem] p-8 md:p-12 prose prose-invert max-w-none">

                        <h3 className="text-sky-400">Article 1 – Name</h3>
                        <p>The name of the organization shall be: <strong>DeepTech Society</strong>. Each university chapter shall operate under the name: <strong>DeepTech Society – [University Name]</strong> (e.g., DeepTech Society – Salim Habib University).</p>

                        <h3 className="text-sky-400">Article 2 – Vision</h3>
                        <p>To build a community of students dedicated to scientific innovation, advanced technologies, and interdisciplinary collaboration in order to solve real-world problems and contribute to technological progress.</p>

                        <h3 className="text-sky-400">Article 3 – Mission</h3>
                        <ul className="list-disc pl-5">
                            <li>Promote awareness of DeepTech fields (AI, biotechnology, robotics, climate tech, advanced materials).</li>
                            <li>Encourage interdisciplinary collaboration between students from different academic backgrounds.</li>
                            <li>Support the development of innovative student projects.</li>
                            <li>Connect students with industry, research institutions, and entrepreneurs.</li>
                            <li>Encourage students to apply science and engineering knowledge back to society.</li>
                            <li>Develop products, solutions, and services to solve the problems of the masses.</li>
                        </ul>

                        <h3 className="text-sky-400">Article 4 & 5 – Objectives and Membership</h3>
                        <p>Develop a culture of innovation, organize seminars/workshops, build DeepTech prototypes, and facilitate mentorship. Membership is open to all university students across Biosciences, Computer Science, Engineering, Medicine, Environmental Sciences, Business, and Social Sciences. Roles include General, Active, and Executive members.</p>

                        <h3 className="text-sky-400">Article 6 & 7 – Executive Committee & Faculty Advisor</h3>
                        <p><strong>President:</strong> Overall leadership and coordination. <br /><strong>Vice President:</strong> Internal operations and events. <br /><strong>Technical Lead:</strong> Technical programs and projects. <br /><strong>Research Coordinator:</strong> Research and academic collaboration. <br /><strong>Industry Liaison:</strong> Industry engagement and internships.</p>
                        <p>Each society must also have an officially appointed Faculty Advisor to provide strategic guidance.</p>

                        <h3 className="text-sky-400">Article 8, 9, 10 & 11 – Meetings, Activities, Projects, Collaboration</h3>
                        <p>Monthly general meetings, regular seminars, project development, and national collaboration. A core activity is developing and presenting DeepTech projects monthly on the national platform.</p>

                        <div className="mt-12 p-6 bg-sky-500/10 border border-sky-500/20 rounded-xl text-center">
                            <p className="italic text-lg">"The DeepTech Society exists to encourage students to explore the frontiers of science and technology. Through curiosity, collaboration, and innovation, students can contribute to solving the most important challenges facing society today."</p>
                        </div>
                    </div>
                </motion.section>
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mt-16 text-center">
                    <Link to="/register-society" className="inline-block">
                        <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-black font-bold text-lg rounded-full overflow-hidden transition-all shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:shadow-[0_0_60px_rgba(14,165,233,0.6)]">
                            <span className="relative z-10">Register Your Society Now</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.section>

            </div>
        </div>
    );
};

export default Society;
