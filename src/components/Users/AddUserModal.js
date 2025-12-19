import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const AddUserModal = ({ visible, onCancel, onOk }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onOk(values);
            form.resetFields();
        } catch (error) {
            console.error('验证失败:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="添加用户"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确定"
            cancelText="取消"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ role: 'user' }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 3, message: '用户名至少3个字符' },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                >
                    <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="用户类型"
                    rules={[{ required: true, message: '请选择用户类型' }]}
                >
                    <Select>
                        <Option value="user">普通用户</Option>
                        <Option value="admin">管理员</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="初始密码"
                    rules={[
                        { required: true, message: '请输入初始密码' },
                        { min: 6, message: '密码至少6个字符' },
                    ]}
                >
                    <Input.Password placeholder="请输入初始密码" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请确认密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="请确认密码" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;