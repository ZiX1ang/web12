import React from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import {
    UserOutlined,
    QuestionCircleOutlined,
    RiseOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import './Dashboard.css';

const Dashboard = () => {
    const statsData = [
        {
            title: '总用户数',
            value: 128,
            icon: <UserOutlined />,
            color: '#1890ff',
        },
        {
            title: '总题目数',
            value: 356,
            icon: <QuestionCircleOutlined />,
            color: '#52c41a',
        },
        {
            title: '今日活跃',
            value: 24,
            icon: <RiseOutlined />,
            color: '#faad14',
        },
        {
            title: '平均得分',
            value: 78.5,
            suffix: '分',
            icon: <TeamOutlined />,
            color: '#722ed1',
        },
    ];

    const recentUsers = [
        { id: 1, username: 'user_new1', email: 'user1@test.com', time: '10分钟前' },
        { id: 2, username: 'user_new2', email: 'user2@test.com', time: '30分钟前' },
        { id: 3, username: 'user_new3', email: 'user3@test.com', time: '1小时前' },
        { id: 4, username: 'user_new4', email: 'user4@test.com', time: '2小时前' },
    ];

    const recentQuestions = [
        { id: 1, text: 'JavaScript闭包是什么？', category: '前端', difficulty: '中等' },
        { id: 2, text: 'React Hooks的作用？', category: '前端', difficulty: '简单' },
        { id: 3, text: '数据库索引原理', category: '数据库', difficulty: '困难' },
    ];

    const userColumns = [
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '注册时间', dataIndex: 'time', key: 'time' },
    ];

    const questionColumns = [
        { title: '题目内容', dataIndex: 'text', key: 'text', ellipsis: true },
        { title: '分类', dataIndex: 'category', key: 'category' },
        { title: '难度', dataIndex: 'difficulty', key: 'difficulty' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-stats">
                <Row gutter={[16, 16]}>
                    {statsData.map((stat, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <Card>
                                <Statistic
                                    title={stat.title}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    prefix={stat.icon}
                                    valueStyle={{ color: stat.color }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={12}>
                    <Card title="最近注册用户">
                        <Table
                            columns={userColumns}
                            dataSource={recentUsers}
                            rowKey="id"
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="最新添加题目">
                        <Table
                            columns={questionColumns}
                            dataSource={recentQuestions}
                            rowKey="id"
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="系统信息" style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <p><strong>前端版本：</strong>React 18.2.0</p>
                    </Col>
                    <Col span={8}>
                        <p><strong>UI框架：</strong>Ant Design 5.x</p>
                    </Col>
                    <Col span={8}>
                        <p><strong>后端接口：</strong>Spring Boot</p>
                    </Col>
                    <Col span={8}>
                        <p><strong>数据库：</strong>MySQL 8.0</p>
                    </Col>
                    <Col span={8}>
                        <p><strong>部署方式：</strong>Vercel + Nginx</p>
                    </Col>
                    <Col span={8}>
                        <p><strong>最后更新：</strong>2024-12-15</p>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Dashboard;