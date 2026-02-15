
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, LayoutDashboard, LogOut, Users, ShieldAlert, Menu, X } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user || !user.isAdmin) {
        return null; // Or a loading spinner
    }

    const navItems = [
        { path: '/admin', label: 'Overview', icon: LayoutDashboard },
        { path: '/admin/users', label: 'User Management', icon: Users },
        { path: '/admin/activity', label: 'Activity Logs', icon: Activity },
    ];

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-white/5 flex items-center px-4 z-40">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-400 hover:text-white"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="ml-4 flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    <span className="text-lg font-bold tracking-tight">Admin<span className="text-red-500">Panel</span></span>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-white/5 flex items-center space-x-3 hidden md:flex">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                    <span className="text-xl font-bold tracking-tight">Admin<span className="text-red-500">Panel</span></span>
                </div>

                <div className="md:hidden p-6 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xl font-bold tracking-tight">Menu</span>
                    <button onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold ring-2 ring-zinc-700">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full mt-2 text-xs text-gray-500 hover:text-white text-center"
                    >
                        Back to Website
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-black relative pt-16 md:pt-0">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="relative z-10 p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
