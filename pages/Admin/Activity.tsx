
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Activity, Clock, User, ShieldAlert } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityLog {
    _id: string;
    action: string;
    userId: string;
    userName?: string;
    details: string;
    timestamp: string;
}

const AdminActivity: React.FC = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await fetch(`${API_URL}/api/admin/activity`, {
                    headers: { 'adminid': user?._id || '' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setActivities(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) fetchActivity();
    }, [user]);

    if (loading) return <div>Loading activity...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-6">System Activity</h1>

            <div className="relative border-l border-white/10 ml-4 space-y-8 pb-8">
                {activities.map((act, index) => (
                    <div key={index} className="relative pl-8 group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-1.5 top-1 w-3 h-3 bg-zinc-800 border border-zinc-600 rounded-full group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors"></div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900/50 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-white text-sm">{act.action}</span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                                        {formatDistanceToNow(new Date(act.timestamp), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">{act.details}</p>
                            </div>

                            <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-xs text-gray-500 bg-black/20 px-2 py-1 rounded-lg">
                                <User className="w-3 h-3" />
                                <span>{act.userName || 'System'}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {activities.length === 0 && (
                    <div className="text-gray-500 pl-8">No recent activity found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminActivity;
