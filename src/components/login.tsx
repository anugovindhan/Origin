import React, {useEffect, useState} from "react";
import { Form, Input, Button, Checkbox, Card } from 'antd';
import {render} from "react-dom";
import { Row, Col } from 'antd';
import {fakeAuthorize} from "../sagas";
import {Redirect, useHistory} from "react-router";
import {connect} from "react-redux";
import {LOGIN_REQUEST, LOGOUT} from "../actions/actionTypes";
import { dataService} from "../services/shared-component";

function Login (props: any , state: any) {
    useEffect(() => {
        dataService.getData().subscribe((message: any) => {
            if (message.value.logout) {
                return props.logout()
            }
        });
    });

    const layout: any = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout: any = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = async (values: any) => {
            console.log('Success:', values);
             props.login(values);
             fakeAuthorize(values.username, values.password);
             const success = await fakeAuthorize(values.username, values.password);
             if (success) {
                 props.history.push('/home')
                 dataService.setData({logout: false});
             }
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };


            return (
                <Card>
                <Row className={'vh-100'} align="middle">
                    <Col span={12} offset={6}>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
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
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            <p>status: {props.status}</p>
                            <p>token: {props.token || ''}</p>
                        </Form>
                    </Col>
                </Row>
                </Card>
            );

}
const mapStateToProps = (state: any) => {
    return {
        token: state.login.token,
        status: state.login.status,
    };
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (form: any) => dispatch(
            {type:LOGIN_REQUEST, user: form.username, password: form.password}),
        logout: () => dispatch({type:LOGOUT}),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);