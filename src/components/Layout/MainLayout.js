import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    QuestionCircleOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: '仪表板',
        },
        {
            key: '/users',
            icon: <UserOutlined />,
            label: '用户管理',
        },
        {
            key: '/questions',
            icon: <QuestionCircleOutlined />,
            label: '题目管理',
        },
    ];

    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userMenuItems = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: handleLogout,
        },
    ];

    // 如果没有用户，重定向到登录页
    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null; // 或者可以显示一个加载动画
    }

    return (
        <Layout className="main-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={220}
            >
                <div className="logo">
                    <h2>{collapsed ? 'QA' : 'Quiz Admin'}</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header className="header">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <div className="header-right">
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <div className="user-info">
                                <Avatar icon={<UserOutlined />} />
                                <span className="username">{user.username}</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;