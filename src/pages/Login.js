import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const { Title } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const result = login(values.username, values.password);
            if (result.success) {
                message.success('登录成功');
                const from = location.state?.from?.pathname || '/dashboard';
                navigate(from, { replace: true });
            } else {
                message.error(result.message);
            }
        } catch (error) {
            message.error('登录失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="login-header">
                    <Title level={2}>Quiz 管理后台</Title>
                    <p className="login-subtitle">管理员登录</p>
                </div>
                <Form
                    name="login"
                    initialValues={{
                        username: 'admin',
                        password: 'admin123',
                    }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="用户名"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="密码"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            登录
                        </Button>
                    </Form.Item>

                    <div className="login-hint">
                        <p>测试账号：admin / admin123</p>
                        <p>提示：只有管理员账号可以登录</p>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;