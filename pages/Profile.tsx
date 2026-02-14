import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { User, Mail, Camera, Save, Lock } from 'lucide-react';
import { TechCore } from '../components/AnimatedTech';

const Profile: React.FC = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || ''); // Usually readonly
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(user?.profileImage || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('userId', user?._id || '');
        formData.append('name', name);
        if (currentPassword && newPassword) {
            formData.append('currentPassword', currentPassword);
            formData.append('newPassword', newPassword);
        }
        if (fileInputRef.current?.files?.[0]) {
            formData.append('profileImage', fileInputRef.current.files[0]);
        }

        try {
            const response = await fetch('http://localhost:5000/api/user/update', {
                method: 'PUT',
                body: formData, // Don't set Content-Type header manually for FormData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Update failed');
            }

            // Update local user context
            login(data.user);
            setMessage({ type: 'success', text: 'Profile updated successfully! Redirecting...' });

            // Clear password fields
            setCurrentPassword('');
            setNewPassword('');

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="text-white text-center mt-20">Please log in to view this page.</div>;

    return (
        <div className="min-h-screen bg-black pt-28 pb-20 px-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row gap-12 items-start">

                        {/* Profile Image Section */}
                        <div className="w-full md:w-1/3 flex flex-col items-center space-y-6">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative bg-black/50">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <User className="w-16 h-16" />
                                        </div>
                                    )}

                                    {/* Overlay on Hover */}
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-display font-bold text-white">{user.name}</h2>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-2/3 space-y-8">
                            <div>
                                <h3 className="text-xl font-display font-bold text-white mb-6 border-b border-white/10 pb-2">Edit Profile</h3>

                                {message && (
                                    <div className={`mb-6 p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                        {message.text}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder-gray-600/50"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    disabled
                                                    className="w-full bg-black/20 border border-white/5 text-gray-400 rounded-xl py-3.5 pl-12 pr-4 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <h4 className="text-lg font-display font-semibold text-white mb-4">Change Password</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Current Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input
                                                        type="password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder-gray-600/50"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1 mb-2 block">New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder-gray-600/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-2"
                                        >
                                            {loading ? 'Saving...' : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
