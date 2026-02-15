
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Trash2, Shield, ShieldCheck, Mail, Calendar, Search } from 'lucide-react';
import { format } from 'date-fns';

interface UserData {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    verified: boolean;
}

const AdminUsers: React.FC = () => {
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/users`, {
                headers: { 'adminid': user?._id || '' }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?._id) fetchUsers();
    }, [user]);

    const handleRoleUpdate = async (userId: string, currentStatus: boolean) => {
        if (!window.confirm(`Are you sure you want to ${currentStatus ? 'demote' : 'promote'} this user?`)) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'adminid': user?._id || ''
                },
                body: JSON.stringify({ isAdmin: !currentStatus })
            });

            if (res.ok) {
                fetchUsers(); // Refresh list
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm("Are you sure? This action cannot be undone.")) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'adminid': user?._id || '' }
            });
            if (res.ok) {
                fetchUsers();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading users...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
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
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{u.name}</p>
                                            <p className="text-xs text-gray-500">{u.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.verified ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleRoleUpdate(u._id, u.isAdmin)}
                                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-colors ${u.isAdmin ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20' : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700'}`}
                                        >
                                            {u.isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                                            <span>{u.isAdmin ? 'Admin' : 'User'}</span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">
                                        {u.createdAt ? format(new Date(u.createdAt), 'MMM d, yyyy') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(u._id)}
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
