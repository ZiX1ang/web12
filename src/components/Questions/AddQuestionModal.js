import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddQuestionModal = ({ visible, onCancel, onOk, title, initialValues }) => {
    const [form] = Form.useForm();
    const [answerType, setAnswerType] = useState('single');

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            const isMultiple = Array.isArray(initialValues.answer) && initialValues.answer.length > 1;
            setAnswerType(isMultiple ? 'multiple' : 'single');
        } else {
            form.resetFields();
            setAnswerType('single');
        }
    }, [initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            // 转换答案格式
            if (answerType === 'single') {
                values.answer = [parseInt(values.answer)];
            } else {
                values.answer = values.answer.map(a => parseInt(a));
            }
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
            title={title}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确定"
            cancelText="取消"
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    category: '前端',
                    difficulty: '简单',
                    options: ['', '', '', ''],
                }}
            >
                <Form.Item
                    name="text"
                    label="题目内容"
                    rules={[{ required: true, message: '请输入题目内容' }]}
                >
                    <TextArea rows={4} placeholder="请输入题目内容" />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="分类"
                    rules={[{ required: true, message: '请选择分类' }]}
                >
                    <Select>
                        <Option value="前端">前端</Option>
                        <Option value="后端">后端</Option>
                        <Option value="数据库">数据库</Option>
                        <Option value="算法">算法</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="difficulty"
                    label="难度"
                    rules={[{ required: true, message: '请选择难度' }]}
                >
                    <Select>
                        <Option value="简单">简单</Option>
                        <Option value="中等">中等</Option>
                        <Option value="困难">困难</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="答案类型" required>
                    <Select
                        value={answerType}
                        onChange={setAnswerType}
                        style={{ width: 120 }}
                    >
                        <Option value="single">单选题</Option>
                        <Option value="multiple">多选题</Option>
                    </Select>
                </Form.Item>

                <Form.List name="options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    key={field.key}
                                    label={`选项 ${String.fromCharCode(65 + index)}`}
                                    required
                                >
                                    <Space style={{ width: '100%' }}>
                                        <Form.Item
                                            {...field}
                                            noStyle
                                            rules={[{ required: true, message: '请输入选项内容' }]}
                                        >
                                            <Input placeholder={`输入选项 ${String.fromCharCode(65 + index)}`} />
                                        </Form.Item>
                                        {fields.length > 2 && (
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        )}
                                    </Space>
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    添加选项
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item
                    label="正确答案"
                    rules={[{ required: true, message: '请选择正确答案' }]}
                >
                    {answerType === 'single' ? (
                        <Form.Item
                            name="answer"
                            noStyle
                            rules={[{ required: true, message: '请选择正确答案' }]}
                        >
                            <Select placeholder="请选择正确答案">
                                {form.getFieldValue('options')?.map((_, index) => (
                                    <Option key={index} value={index}>
                                        {String.fromCharCode(65 + index)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : (
                        <Form.Item
                            name="answer"
                            noStyle
                            rules={[{ required: true, message: '请选择正确答案' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="请选择正确答案"
                            >
                                {form.getFieldValue('options')?.map((_, index) => (
                                    <Option key={index} value={index}>
                                        {String.fromCharCode(65 + index)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddQuestionModal;