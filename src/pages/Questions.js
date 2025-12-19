import React, { useState } from 'react';
import {
    Table,
    Button,
    Space,
    Input,
    Modal,
    Form,
    Select,
    Input as AntInput,
    message,
    Popconfirm,
    Card,
    Row,
    Col,
    Tag,
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import AddQuestionModal from '../components/Questions/AddQuestionModal';

const { TextArea } = AntInput;
const { Search } = Input;

const Questions = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: 'React是什么？',
            options: ['框架', '库', '语言', '工具'],
            answer: 1,
            category: '前端',
            difficulty: '简单',
            createdAt: '2024-12-01',
        },
        {
            id: 2,
            text: 'Vue的核心特性是什么？',
            options: ['响应式系统', '组件化', '虚拟DOM', '状态管理'],
            answer: [0, 1],
            category: '前端',
            difficulty: '中等',
            createdAt: '2024-12-02',
        },
    ]);
    const [searchText, setSearchText] = useState('');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
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
            title: '题目内容',
            dataIndex: 'text',
            key: 'text',
            ellipsis: true,
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            width: 100,
        },
        {
            title: '难度',
            dataIndex: 'difficulty',
            key: 'difficulty',
            width: 100,
            render: (difficulty) => {
                const color = difficulty === '简单' ? 'green' : difficulty === '中等' ? 'orange' : 'red';
                return <Tag color={color}>{difficulty}</Tag>;
            },
        },
        {
            title: '选项',
            key: 'options',
            render: (_, record) => (
                <div>
                    {record.options.map((option, index) => (
                        <div key={index}>
                            {String.fromCharCode(65 + index)}. {option}
                            {record.answer.includes(index) && ' ✓'}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确定要删除这道题吗？"
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

    const handleAddQuestion = (values) => {
        const newQuestion = {
            id: questions.length + 1,
            ...values,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setQuestions([...questions, newQuestion]);
        message.success('题目添加成功');
        setIsAddModalVisible(false);
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setIsEditModalVisible(true);
    };

    const handleUpdateQuestion = (values) => {
        const updatedQuestions = questions.map(q =>
            q.id === editingQuestion.id ? { ...q, ...values } : q
        );
        setQuestions(updatedQuestions);
        message.success('题目更新成功');
        setIsEditModalVisible(false);
        setEditingQuestion(null);
    };

    const handleDelete = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
        message.success('题目删除成功');
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredQuestions = questions.filter(q =>
        q.text.toLowerCase().includes(searchText.toLowerCase()) ||
        q.category.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Card
            title="题目管理"
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddModalVisible(true)}
                >
                    添加题目
                </Button>
            }
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={8}>
                    <Search
                        placeholder="搜索题目..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        onSearch={handleSearch}
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredQuestions}
                rowKey="id"
                pagination={{
                    ...pagination,
                    total: filteredQuestions.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条`,
                }}
            />

            <AddQuestionModal
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onOk={handleAddQuestion}
                title="添加题目"
            />

            <AddQuestionModal
                visible={isEditModalVisible}
                onCancel={() => {
                    setIsEditModalVisible(false);
                    setEditingQuestion(null);
                }}
                onOk={handleUpdateQuestion}
                title="编辑题目"
                initialValues={editingQuestion}
            />
        </Card>
    );
};

export default Questions;