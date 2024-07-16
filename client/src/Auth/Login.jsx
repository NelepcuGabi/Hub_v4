import React from 'react';
import { Alert, Card, Input, Form, Spin, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
    const { error, loading, loginUser } = useLogin();

    const handleLogin = async (values) => {
        await loginUser(values);
    };

    return (
        <Card className="form-container">
            <div className="form-content">
                <Typography.Title level={3} strong className="title">
                    Sign in
                </Typography.Title>
                <Form
                    layout="vertical"
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email',
                            },
                            {
                                type: 'email',
                                message: 'The input is not a valid Email!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Enter your password" />
                    </Form.Item>
                    {error && (
                        <Alert
                            description={error}
                            type="error"
                            showIcon
                            closable
                            className="alert"
                        />
                    )}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="btn"
                            loading={loading}
                        >
                            {loading ? <Spin /> : 'Sign In'}
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">
                            <Button size="large" className="btn">
                                Create an Account
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
};

export default Login;
