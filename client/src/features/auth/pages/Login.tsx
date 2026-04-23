import React from "react";
import { Link } from "react-router";
import { Button, Form, Input, message } from "antd";

import { useAuth } from "../hooks/useAuth";

import { GoMail } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import AuthHeader from "../components/AuthHeader";

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const { login, backendUrl } = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<LoginFormValues>();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);

      console.log("Login values:", values);

      const res = await fetch(`${backendUrl}/api/auth/login`, {
        // ✅ uses context URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user); // ✅ stores user globally in context

      message.success("Welcome back!");

      form.resetFields();

      //  navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader title='Login' subtitle='Welcome back. Please sign in.' />

      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <Form.Item
          name='email'
          label='Email address'
          rules={[
            { required: true, message: "Please enter your email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input
            prefix={<GoMail />}
            placeholder='john@example.com'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password
            prefix={<IoIosLock />}
            placeholder='Min. 8 characters'
            size='large'
          />
        </Form.Item>

        <div className='flex justify-end mb-4'>
          <Link
            to='/reset-password'
            className='text-sm text-blue-600 hover:underline'
          >
            Forgot password?
          </Link>
        </div>

        <Form.Item className='mb-4'>
          <Button
            block
            type='primary'
            htmlType='submit'
            size='large'
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>

        <div className='text-center text-sm text-gray-600'>
          Don&apos;t have an account?{" "}
          <Link to='/register' className='text-blue-600 hover:underline'>
            Sign Up
          </Link>
        </div>
      </Form>
    </>
  );
}

export default Login;
