import React, { useState } from 'react';
import {
    Table,
    Button,
    Space,
    Input,
    Modal,
    Form,
    Input as AntInput,
    Select,
    message,
    Popconfirm,
    Card,
    Row,
    Col,
    Pagination,
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import AddUserModal from '../components/Users/AddUserModal';

const { Search } = Input;

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', createdAt: '2024-12-01' },
        { id: 2, username: 'user1', email: 'user1@example.com', role: 'user', createdAt: '2024-12-02' },
        { id: 3, username: 'user2', email: 'user2@example.com', role: 'user', createdAt: '2024-12-03' },
        { id: 4, username: 'test1', email: 'test1@example.com', role: 'user', createdAt: '2024-12-04' },
        { id: 5, username: 'test2', email: 'test2@example.com', role: 'user', createdAt: '2024-12-05' },
    ]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <span className={`role-tag ${role}`}>
          {role === 'admin' ? '管理员' : '普通用户'}
        </span>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<ReloadOutlined />}
                        onClick={() => handleResetPassword(record.id)}
                    >
                        重置密码
                    </Button>
                    <Popconfirm
                        title="确定要删除这个用户吗？"
                        onConfirm={() => handleDelete(record.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleAddUser = (values) => {
        const newUser = {
            id: users.length + 1,
            ...values,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setUsers([...users, newUser]);
        message.success('用户添加成功');
        setIsModalVisible(false);
    };

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
        message.success('用户删除成功');
    };

    const handleResetPassword = (id) => {
        message.success(`用户ID ${id} 的密码已重置为 123456`);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    return (
        <Card
            title="用户管理"
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    添加用户
                </Button>
            }
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={8}>
                    <Search
                        placeholder="搜索用户..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        onSearch={handleSearch}
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{
                    ...pagination,
                    total: filteredUsers.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条`,
                }}
                onChange={handleTableChange}
            />

            <AddUserModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleAddUser}
            />
        </Card>
    );
};

export default Users;