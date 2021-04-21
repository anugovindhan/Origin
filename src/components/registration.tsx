import React from 'react';
import {Alert, Button, Card, Col, Form, Input, Row} from "antd";
import 'antd/dist/antd.css';
function RegisterUser (props: any , state: any) {
    const [form] = Form.useForm();
    const layout: any = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout: any = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card >
            <Row className={'vh-100'} align="middle">
                <Col span={12} offset={6}>
                    <Form
                        form={form}
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="First Name"
                            name="firstname"
                            rules={[{ required: true, message: 'Please input your First Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            rules={[{ required: true, message: 'Please input your Last Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="userEmail"
                            rules={[{ required: true, type: 'email',message: 'Please input your Email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button className="ml-2" type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button className="ml-2" onClick={onReset}> Cancel </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );

}
export default RegisterUser;