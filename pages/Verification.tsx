import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { CircuitNode } from '../components/AnimatedTech';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Verification: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // State
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const email = location.state?.email;

    // Effects
    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    useEffect(() => {
        // Safe focus attempt
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    if (!email) return null;

    // Handlers
    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (index > 0 && code[index] === '') {
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        const newCode = [...code];
        pastedData.forEach((char, index) => {
            if (index < 6 && /^\d$/.test(char)) {
                newCode[index] = char;
            }
        });
        setCode(newCode);
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const fullCode = code.join('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await fetch(`${API_URL}/api/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: fullCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            console.log('Verification successful:', data);
            navigate('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden p-6">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <motion.div
                className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-white/10 p-4 rounded-2xl shadow-xl">
                    <CircuitNode className="w-10 h-10 text-sky-400" />
                </div>

                <div className="mt-8 mb-8">
                    <h2 className="text-3xl font-display font-bold text-white mb-3">Verify Email</h2>
                    <p className="text-gray-400">
                        We've sent a 6-digit verification code to <br />
                        <span className="text-sky-400 font-medium">{email || 'user@example.com'}</span>
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 mb-8">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => { if (el) inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 bg-black/40 border border-white/10 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all caret-sky-500"
                            />
                        ))}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg active:scale-[0.98]"
                        disabled={loading || code.join('').length !== 6}
                    >
                        {loading ? 'Verifying...' : 'Verify Account'}
                    </Button>
                </form>

                <div className="mt-8 text-sm text-gray-500">
                    Didn't receive the code?{' '}
                    <button className="text-sky-400 hover:text-sky-300 font-medium hover:underline transition-all">
                        Resend Code
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <Link to="/signup" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Sign Up
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Verification;
