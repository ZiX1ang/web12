import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Login from './pages/Login';
import MainLayout from './components/Layout/MainLayout';
import Users from './pages/Users';
import Questions from './pages/Questions';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Navigate to="/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="users" element={<Users />} />
                            <Route path="questions" element={<Questions />} />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;