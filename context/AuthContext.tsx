import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    isAdmin?: boolean;
    // add other fields as necessary
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check local storage on mount
        const storedData = localStorage.getItem('user');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                const now = new Date().getTime();

                // Check for new session format (with expiry)
                if (parsedData.expiry && parsedData.user) {
                    if (now > parsedData.expiry) {
                        console.log("Session expired");
                        localStorage.removeItem('user');
                        setUser(null);
                    } else {
                        setUser(parsedData.user);
                    }
                } else {
                    // Handle legacy data (no expiry) - Migrate to new format
                    // Expire in 24 hours from now to allow seamless transition
                    const sessionData = {
                        user: parsedData,
                        expiry: now + 24 * 60 * 60 * 1000 // 24 hours
                    };
                    localStorage.setItem('user', JSON.stringify(sessionData));
                    setUser(parsedData);
                }
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        // Store user with 24-hour expiry
        const sessionData = {
            user: userData,
            expiry: new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours
        };
        localStorage.setItem('user', JSON.stringify(sessionData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
