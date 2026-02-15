
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, FileText, CheckCircle, Database } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Stats {
    totalUsers: number;
    totalPapers: number;
    verifiedUsers: number;
    serverTime: string;
}

const AdminDash: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch stats from backend
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/admin/stats`, {
                    headers: { 'adminid': user?._id || '' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) fetchStats();

        // Refresh every 30s
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, [user]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
            </div>
        );
    }

    if (!stats) return <div className="text-red-500">Failed to load dashboard data. Check database connection.</div>;

    const cards = [
        { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Research Papers', value: stats.totalPapers, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Verified Users', value: stats.verifiedUsers, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'System Status', value: 'Active', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${card.bg}`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Dashboard Content like Charts could go here */}
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Refresh Stats
                    </button>
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
