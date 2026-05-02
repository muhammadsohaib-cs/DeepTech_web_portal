import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Building, User, Lock, Mail, Phone, MapPin, CheckCircle, ArrowRight, X } from 'lucide-react';

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
        focalName: '',
        cnic: '',
        focalEmail: '',
        phone: '',
        username: '',
        accountEmail: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
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

            let data;
            try {
                data = await res.json();
            } catch (e) {
                data = { message: 'Server returned an invalid response (might be 404 HTML)' };
            }
            
            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => navigate('/login'), 4000);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to connect to the server.');
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
                    <p className="text-gray-400 mb-8">Your society registration has been securely sent to the DeepTech admin team for verification. You will be able to log in once approved.</p>
                    <p className="text-sm text-sky-400 animate-pulse">Redirecting to login...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                className="w-full max-w-4xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl relative"
            >
                {/* Close Button */}
                <button 
                    onClick={() => navigate('/society')}
                    className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-12 border-b border-white/5 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-600/10 opacity-50"></div>
                    <Shield className="w-16 h-16 text-sky-400 mx-auto mb-6 relative z-10" />
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 relative z-10">DeepTech Society Registration</h1>
                    <p className="text-gray-400 text-lg relative z-10">Register as a recognized DeepTech chapter in Pakistan</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                    
                    {/* SECTION 1: Institute Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Building className="w-6 h-6 text-sky-400" />
                            <h2 className="text-2xl font-bold text-white">Institute Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Complete Name of Center (Institute Name) *</label>
                                <input required type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} placeholder="Enter your institute name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Select Province *</label>
                                <select required name="province" value={formData.province} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none cursor-pointer">
                                    <option value="" disabled>Select Province</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Sindh">Sindh</option>
                                    <option value="KPK">Khyber Pakhtunkhwa</option>
                                    <option value="Balochistan">Balochistan</option>
                                    <option value="Islamabad">Islamabad Capital Territory</option>
                                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                                    <option value="AJK">Azad Jammu & Kashmir</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Select District *</label>
                                <input required type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Select District" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Select Tehsil *</label>
                                <input required type="text" name="tehsil" value={formData.tehsil} onChange={handleChange} placeholder="Select Tehsil" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Focal Person Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <User className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">Focal Person Details</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                <input required type="text" name="focalName" value={formData.focalName} onChange={handleChange} placeholder="Enter full name" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">CNIC *</label>
                                <input required type="text" name="cnic" value={formData.cnic} onChange={handleChange} placeholder="xxxxx-xxxxxxx-x" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                                <input required type="email" name="focalEmail" value={formData.focalEmail} onChange={handleChange} placeholder="example@domain.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="xxxx-xxxxxxx" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Credentials */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Lock className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">Society Center Credentials</h2>
                        </div>
                        <p className="text-gray-400 text-sm">Please provide the information to create your Society Center login credentials.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                                <input required type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Account Email *</label>
                                <input required type="email" name="accountEmail" value={formData.accountEmail} onChange={handleChange} placeholder="Enter your email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono tracking-widest" />
                                <p className="text-xs text-gray-500 mt-2">Minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono tracking-widest" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                            ) : (
                                <>Submit Registration <ArrowRight className="w-5 h-5" /></>
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
