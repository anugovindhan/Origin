import React from 'react';
import {Button, Card, Col, Form, Input, Row} from "antd";
import 'antd/dist/antd.css';
import {UserOutlined,MailOutlined,LockOutlined} from "@ant-design/icons";
import {registerUserService} from "../sagas";
import {REGISTER_REQUEST} from "../actions/actionTypes";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function RegisterUser (props: any , state: any) {

    const [form] = Form.useForm();

    const layout: any = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout: any = {
        wrapperCol: {offset: 8, span: 16},
    };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        props.register(values);
        const success = await registerUserService(values);
        if (success) {
            props.history.push('/')
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card>
            <Row className={'vh-100'} align="middle">
                <Col span={12} offset={7}>
                    <h3 className="-align-center">SIGN UP</h3>
                    <Form
                        form={form}
                        {...layout}
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            name="firstName"
                            rules={[{required: true, message: 'Please input your First Name!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="First Name"/>
                        </Form.Item>
                        <Form.Item
                            // label="Last Name"
                            name="lastName"
                            rules={[{required: true, message: 'Please input your Last Name!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Last Name"/>
                        </Form.Item>

                        <Form.Item
                            // label="Email"
                            name="userEmail"
                            rules={[{required: true, type: 'email', message: 'Please input your Email!'}]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            // label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                            placeholder="Password"/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button className="ml-2" type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button className="ml-2" onClick={onReset}> Cancel</Button>
                                <Link className="ml-2" to="/">Login now!</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
    const mapStateToProps = (state: any) => {
        return {
            status: state.register.status,
        };
    }
    const mapDispatchToProps = (dispatch: any) => {
        return {
            register: (form: any) => dispatch(
                {type:REGISTER_REQUEST, register: form.value}),
        };
    }

export default connect(mapStateToProps, mapDispatchToProps)( RegisterUser);