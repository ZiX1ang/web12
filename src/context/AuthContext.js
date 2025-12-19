import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 检查本地存储是否有登录信息
        const savedUser = localStorage.getItem('admin_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // 模拟登录，实际项目中这里应该调用API
        if (username === 'admin' && password === 'admin123') {
            const userData = {
                id: 1,
                username: 'admin',
                role: 'admin',
                email: 'admin@example.com'
            };
            setUser(userData);
            localStorage.setItem('admin_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: '用户名或密码错误' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};