import React, { useState, useEffect } from 'react';
import { Card, Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import styles from './login.less';
import 'rc-texty/assets/index.css';

const Login = (props) => {

    useEffect(() => {
        const userInfo  = localStorage.getItem('userInfo');
        userInfo && router.push('/');
    }, []);

    const [showRegister, setShowRegister] = useState(false);

    const { getFieldDecorator } = props.form;

    const handleSubmit = event => {
        event.preventDefault();
        props.form.validateFields((err, values) => {
            !err && props.dispatch({ type: 'common/login', payload: values }).then(token => token && router.push('/'));
        });
    };

    const getEnter = (e) => {
        switch (e.index) {
            case 0:
                return {
                    rotate: 90,
                    opacity: 0,
                    y: -60,
                };
            case 10:
            case 1:
                return {
                    y: -60,
                    x: -10,
                    opacity: 0,
                };
            case 9:
            case 2:
                return {
                    y: -60,
                    x: 20,
                    opacity: 0,
                };
            case 3:
                return {
                    y: 60,
                    opacity: 0,
                };
            case 8:
            case 4:
                return {
                    x: 30,
                    opacity: 0,
                };
            case 5:
                return {
                    enter: [
                        {
                            scale: 2,
                            opacity: 0,
                            type: 'set',
                        },
                        { scale: 1.2, opacity: 1, duration: 300 },
                        { scale: 0.9, duration: 200 },
                        { scale: 1.05, duration: 150 },
                        { scale: 1, duration: 100 },
                    ],
                    leave: {
                        opacity: 0, scale: 0,
                    },
                };
            case 6:
                return {
                    scale: 0.8,
                    x: 30,
                    y: -10,
                    opacity: 0,
                };
            case 7:
                return {
                    scale: 0.8,
                    x: 30,
                    y: 10,
                    opacity: 0,
                };
            default:
                return {
                    opacity: 0,
                };
        }
    };

    return (
        <div className={styles.wrapper}>
            <Texty
                enter={event => getEnter(event)}
                leave={event => getEnter(event)}
                className={styles.title}
            >Login System</Texty>
            <Card key='login' className={styles.loginWrapper}>
                <Form className={styles.loginForm} onSubmit={event => handleSubmit(event)}>
                    <QueueAnim>
                        <Form.Item key="model1">
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item key="model2">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item key="model3">
                            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>Log in</Button>
                            <a onClick={() => setShowRegister(true)}>register now!</a>
                        </Form.Item>
                    </QueueAnim>
                </Form>
            </Card>
        </div>
    );

};

const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = state => ({
    loading: state.loading.effects['common/login'],
});

export default connect(mapStateToProps)(WrappedNormalLoginForm);