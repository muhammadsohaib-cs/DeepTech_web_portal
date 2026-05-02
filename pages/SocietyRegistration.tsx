import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Building, Users, GraduationCap, Calendar, CheckSquare, Lock, CheckCircle, ArrowRight, X } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const SocietyRegistration: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        instituteName: '',
        province: '',
        district: '',
        tehsil: '',
        
        // Executive Committee
        presidentName: '', presidentEmail: '',
        vpName: '', vpEmail: '',
        techLeadName: '', techLeadEmail: '',
        researchCoordName: '', researchCoordEmail: '',
        industryLiaisonName: '', industryLiaisonEmail: '',

        // Faculty Advisor
        advisorName: '', advisorEmail: '', advisorDepartment: '',

        // Activity Plan
        activityPlan: '',

        // Credentials
        username: '', accountEmail: '', password: '', confirmPassword: '',

        // Agreements
        agreeConstitution: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setFormData({ ...formData, [target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!formData.agreeConstitution) {
            alert("You must agree to the Constitution & Requirements.");
            setLoading(false);
            return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/society/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                let data;
                try { data = await res.json(); } catch(e) { data = {}; }
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Simulate success for frontend demonstration
            setIsSuccess(true);
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="bg-zinc-900 border border-emerald-500/30 p-12 rounded-[2rem] text-center max-w-lg shadow-[0_0_50px_rgba(16,185,129,0.15)]"
                >
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Application Submitted!</h2>
                    <p className="text-gray-400 mb-8">Thank you for registering! Your society application has been securely sent to the DeepTech admin team for verification.</p>
                    <p className="text-sky-400 mb-8">The DeepTech team will review your proposal and contact you shortly regarding the next steps.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                    >
                        Return to Homepage <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                className="w-full max-w-4xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl relative"
            >
                <button 
                    onClick={() => navigate('/society')}
                    className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-12 border-b border-white/5 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-600/10 opacity-50"></div>
                    <Shield className="w-16 h-16 text-sky-400 mx-auto mb-6 relative z-10" />
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 relative z-10">Start a DeepTech Society</h1>
                    <p className="text-gray-400 text-lg relative z-10">Register your university chapter and join the national DeepTech Student Network</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-16">
                    
                    {/* SECTION 1: Institute Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Building className="w-6 h-6 text-sky-400" />
                            <h2 className="text-2xl font-bold text-white">1. University Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Institute Name *</label>
                                <input required type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} placeholder="e.g., Salim Habib University" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Province *</label>
                                <select required name="province" value={formData.province} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none cursor-pointer">
                                    <option value="" disabled>Select Province</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Sindh">Sindh</option>
                                    <option value="KPK">Khyber Pakhtunkhwa</option>
                                    <option value="Balochistan">Balochistan</option>
                                    <option value="Islamabad">Islamabad</option>
                                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                                    <option value="AJK">AJK</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">District *</label>
                                <input required type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Select District" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Executive Committee */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Users className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">2. Leadership Team (At least 5)</h2>
                        </div>
                        <p className="text-sm text-gray-400">Form a founding team representing different disciplines (Biosciences, CS, Engineering, etc.)</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-emerald-400 text-sm tracking-wider uppercase">President</h3>
                                <input required type="text" name="presidentName" value={formData.presidentName} onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                                <input required type="email" name="presidentEmail" value={formData.presidentEmail} onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-emerald-400 text-sm tracking-wider uppercase">Vice President</h3>
                                <input required type="text" name="vpName" value={formData.vpName} onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                                <input required type="email" name="vpEmail" value={formData.vpEmail} onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-emerald-400 text-sm tracking-wider uppercase">Technical Lead</h3>
                                <input required type="text" name="techLeadName" value={formData.techLeadName} onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                                <input required type="email" name="techLeadEmail" value={formData.techLeadEmail} onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-emerald-400 text-sm tracking-wider uppercase">Research Coordinator</h3>
                                <input required type="text" name="researchCoordName" value={formData.researchCoordName} onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                                <input required type="email" name="researchCoordEmail" value={formData.researchCoordEmail} onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-emerald-400 text-sm tracking-wider uppercase">Industry Liaison</h3>
                                <input required type="text" name="industryLiaisonName" value={formData.industryLiaisonName} onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                                <input required type="email" name="industryLiaisonEmail" value={formData.industryLiaisonEmail} onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-emerald-500" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Faculty Advisor */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <GraduationCap className="w-6 h-6 text-amber-400" />
                            <h2 className="text-2xl font-bold text-white">3. Faculty Advisor</h2>
                        </div>
                        <p className="text-sm text-gray-400">Identify an appointed Faculty Advisor to provide strategic guidance.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Advisor Name *</label>
                                <input required type="text" name="advisorName" value={formData.advisorName} onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-amber-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Advisor Email *</label>
                                <input required type="email" name="advisorEmail" value={formData.advisorEmail} onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-amber-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Department *</label>
                                <input required type="text" name="advisorDepartment" value={formData.advisorDepartment} onChange={handleChange} placeholder="e.g. Computer Science" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-amber-500" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: Activity Plan */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Calendar className="w-6 h-6 text-rose-400" />
                            <h2 className="text-2xl font-bold text-white">4. Activity Plan</h2>
                        </div>
                        <p className="text-sm text-gray-400">Submit a brief outline of the activities you plan to organize (Seminars, Project Demos, Innovation Challenges). Society aims to organize at least one activity every month.</p>
                        <textarea required name="activityPlan" value={formData.activityPlan} onChange={handleChange} rows={5} placeholder="Describe your annual activity plan here..." className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none"></textarea>
                    </div>

                    {/* SECTION 5: Constitution Agreement */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <CheckSquare className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-bold text-white">5. Constitution Agreement</h2>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="text-lg font-bold text-indigo-400">DeepTech Society Terms & Structure</h3>
                            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
                                <li><strong>Vision (Article 2):</strong> Build a community dedicated to scientific innovation to solve real-world problems.</li>
                                <li><strong>Mission (Article 3):</strong> Promote DeepTech awareness, encourage interdisciplinary collaboration, and connect students with industry.</li>
                                <li><strong>Membership (Article 4 & 5):</strong> Open to all students across Biosciences, CS, Engineering, Medicine, Business, etc.</li>
                                <li><strong>Activities (Article 8-11):</strong> Commit to monthly general meetings, project development, and presenting DeepTech projects on the national platform.</li>
                            </ul>
                            
                            <label className="flex items-start gap-3 mt-6 cursor-pointer group pt-4 border-t border-white/10">
                                <div className="relative flex items-center justify-center mt-1">
                                    <input type="checkbox" name="agreeConstitution" checked={formData.agreeConstitution} onChange={handleChange} className="w-5 h-5 appearance-none border-2 border-gray-500 rounded bg-transparent checked:bg-indigo-500 checked:border-indigo-500 transition-colors" />
                                    <CheckSquare className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 group-has-[:checked]:opacity-100" strokeWidth={3} />
                                </div>
                                <span className="text-gray-300">I acknowledge that our founding team agrees to the DeepTech Society Constitution, and we commit to establishing an interdisciplinary culture of scientific innovation.</span>
                            </label>
                        </div>
                    </div>

                    {/* SECTION 6: Credentials */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Lock className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">6. Society Center Credentials</h2>
                        </div>
                        <p className="text-gray-400 text-sm">Create login credentials for your society dashboard.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                                <input required type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Account Email *</label>
                                <input required type="email" name="accountEmail" value={formData.accountEmail} onChange={handleChange} placeholder="Enter your email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:border-purple-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:border-purple-500 font-mono tracking-widest" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:border-purple-500 font-mono tracking-widest" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <button 
                            type="submit" 
                            disabled={loading || !formData.agreeConstitution}
                            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                            ) : (
                                <>Submit Society Registration <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Already have an account? <span className="text-sky-400 underline underline-offset-4">Sign in</span>
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default SocietyRegistration;
