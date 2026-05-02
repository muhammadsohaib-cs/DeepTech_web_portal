import React, { useState, useEffect } from 'react';
import { Building2, Search, CheckCircle, XCircle, Clock, Eye, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

interface SocietyData {
    _id: string;
    instituteName: string;
    province: string;
    district?: string;
    tehsil?: string;
    
    presidentName?: string;
    presidentEmail?: string;
    vpName?: string;
    vpEmail?: string;
    techLeadName?: string;
    techLeadEmail?: string;
    researchCoordName?: string;
    researchCoordEmail?: string;
    industryLiaisonName?: string;
    industryLiaisonEmail?: string;

    advisorName?: string;
    advisorEmail?: string;
    advisorDepartment?: string;

    activityPlan?: string;

    username?: string;
    accountEmail: string;
    
    status: 'Pending' | 'Verified' | 'Rejected';
    createdAt: string;
}

const AdminSocieties: React.FC = () => {
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [societies, setSocieties] = useState<SocietyData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSociety, setSelectedSociety] = useState<SocietyData | null>(null);

    // Helper to get admin ID from auth context or localStorage fallback
    const getAdminId = (): string => {
        if (user?._id) return user._id;
        try {
            const stored = localStorage.getItem('user');
            if (stored) {
                const parsed = JSON.parse(stored);
                return parsed?.user?._id || parsed?._id || '';
            }
        } catch(e) { /* ignore */ }
        return '';
    };

    const fetchSocieties = async () => {
        setLoading(true);
        setError(null);
        const adminId = getAdminId();
        if (!adminId) {
            setError('Admin ID not found. Please log in again.');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/api/admin/societies`, {
                headers: { 'adminid': adminId }
            });
            if (res.ok) {
                const data = await res.json();
                setSocieties(data);
            } else {
                const errData = await res.json().catch(() => ({}));
                setError(errData.message || `Server error: ${res.status}`);
            }
        } catch (err) {
            console.error('Fetch societies error:', err);
            setError('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocieties();
    }, [user]);

    const handleVerify = async (id: string, newStatus: 'Verified' | 'Rejected') => {
        if (!window.confirm(`Are you sure you want to mark this society as ${newStatus}?`)) return;
        
        try {
            const res = await fetch(`${API_URL}/api/admin/societies/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'adminid': getAdminId()
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setSocieties(prev => prev.map(soc => 
                    soc._id === id ? { ...soc, status: newStatus } : soc
                ));
            } else {
                let data;
                try {
                    data = await res.json();
                } catch(e) {
                    data = { message: 'Server error (possibly 404)' };
                }
                alert(data.message || 'Verification failed');
            }
        } catch (e) {
            console.error(e);
            alert('Failed to connect to the server.');
        }
    };

    const filteredSocieties = societies.filter(s =>
        (s.instituteName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.accountEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.presidentName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Society Registrations</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search societies..."
                        className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 w-64 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400 min-w-max">
                        <thead className="bg-zinc-800/50 text-gray-200 font-medium border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Institute & Focal Person</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Applied On</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Verification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSocieties.map((soc) => (
                                <tr key={soc._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/20">
                                            <Building2 className="w-5 h-5 text-sky-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{soc.instituteName}</p>
                                            <p className="text-xs text-gray-500">Pres: {soc.presidentName || 'N/A'} • {soc.accountEmail}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-300">{soc.province}</span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">
                                        {format(new Date(soc.createdAt), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        {soc.status === 'Verified' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <CheckCircle className="w-3.5 h-3.5" /> Verified
                                            </span>
                                        ) : soc.status === 'Rejected' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                                <XCircle className="w-3.5 h-3.5" /> Rejected
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                <Clock className="w-3.5 h-3.5" /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 items-center">
                                            <button
                                                onClick={() => setSelectedSociety(soc)}
                                                className="p-1.5 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            {soc.status === 'Pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleVerify(soc._id, 'Verified')}
                                                        className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium transition-colors border border-emerald-500/20 hover:border-emerald-500/40"
                                                    >
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleVerify(soc._id, 'Rejected')}
                                                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium transition-colors border border-red-500/20 hover:border-red-500/40"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-gray-500 italic ml-2">Action Complete</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {loading && (
                    <div className="p-8 text-center text-gray-500 animate-pulse">Loading societies data...</div>
                )}
                {error && (
                    <div className="p-8 text-center">
                        <p className="text-red-400 mb-3">{error}</p>
                        <button onClick={fetchSocieties} className="px-4 py-2 bg-sky-500/20 text-sky-400 rounded-lg text-sm hover:bg-sky-500/30 transition-colors">Retry</button>
                    </div>
                )}
                {!loading && !error && filteredSocieties.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No society registrations found.</div>
                )}
            </div>

            {/* View Details Modal */}
            {selectedSociety && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedSociety(null)}
                    ></div>
                    <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-sky-400" />
                                Society Details
                            </h2>
                            <button 
                                onClick={() => setSelectedSociety(null)}
                                className="text-gray-400 hover:text-white transition-colors p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-6">
                            
                            <div>
                                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">Institute Information</h3>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-xs text-gray-500">Institute Name</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.instituteName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Province</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.province}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">District</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.district || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Tehsil</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.tehsil || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Leadership Team</h3>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-xs text-gray-500">President</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.presidentName}</p>
                                        <p className="text-xs text-gray-500">{selectedSociety.presidentEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Vice President</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.vpName}</p>
                                        <p className="text-xs text-gray-500">{selectedSociety.vpEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Technical Lead</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.techLeadName}</p>
                                        <p className="text-xs text-gray-500">{selectedSociety.techLeadEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Research Coordinator</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.researchCoordName}</p>
                                        <p className="text-xs text-gray-500">{selectedSociety.researchCoordEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Industry Liaison</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.industryLiaisonName}</p>
                                        <p className="text-xs text-gray-500">{selectedSociety.industryLiaisonEmail}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Faculty Advisor</h3>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-xs text-gray-500">Advisor Name</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.advisorName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.advisorEmail}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-500">Department</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.advisorDepartment}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3">Activity Plan</h3>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{selectedSociety.activityPlan || 'No plan provided.'}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">Account Information</h3>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-xs text-gray-500">Username</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.username || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Account Email</p>
                                        <p className="text-sm font-medium text-white">{selectedSociety.accountEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Applied On</p>
                                        <p className="text-sm font-medium text-white">{format(new Date(selectedSociety.createdAt), 'PPpp')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Current Status</p>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium border ${
                                            selectedSociety.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                            selectedSociety.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        }`}>
                                            {selectedSociety.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
                            <button 
                                onClick={() => setSelectedSociety(null)}
                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                Close
                            </button>
                            {selectedSociety.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => {
                                            handleVerify(selectedSociety._id, 'Rejected');
                                            setSelectedSociety(null);
                                        }}
                                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleVerify(selectedSociety._id, 'Verified');
                                            setSelectedSociety(null);
                                        }}
                                        className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Verify Society
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSocieties;
