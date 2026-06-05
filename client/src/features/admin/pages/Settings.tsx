import React from "react";
import { Button, Form, Input, Card } from "antd";

import AdminBreadcrumb from "../components/AdminBreadcrumb";
import { GoMail } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import { Link } from "react-router";

interface LoginFormValues {
  email: string;
  password: string;
}

function Settings() {
  const [form] = Form.useForm<LoginFormValues>();
  const handleSubmit = async (values: LoginFormValues) => {};
  return (
    <>
      <AdminBreadcrumb
        title='Settings'
        breadcrumbs={[
          { title: "Home", path: "/admin/dashboard" },
          { title: "Settings" },
        ]}
      />
      {/*  */}

      <div>
        <Card
          style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {/*  */}
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
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
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
                // loading={loading}
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
        </Card>
      </div>
    </>
  );
}

export default Settings;
