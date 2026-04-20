import React from "react";
import { Button, Form, Input } from "antd";
import { FaUser } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import { Link } from "react-router";
import AuthHeader from "../components/AuthHeader";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

function Register() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<RegisterFormValues>();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      setLoading(true);
      console.log("Register values:", values);

      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "Registration failed");
      // }

      form.resetFields();
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader title='Create Account' subtitle='Sign up to get started.' />

      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <Form.Item
          name='name'
          label='Full Name'
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input prefix={<FaUser />} placeholder='Full Name' size='large' />
        </Form.Item>

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

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<IoIosLock />}
            placeholder='Re-enter your password'
            size='large'
          />
        </Form.Item>

        <Form.Item className='mb-4'>
          <Button
            block
            type='primary'
            htmlType='submit'
            size='large'
            loading={loading}
          >
            Sign Up
          </Button>
        </Form.Item>

        <div className='text-center text-sm text-gray-600'>
          Already have an account?{" "}
          <Link to='/login' className='text-blue-600 hover:underline'>
            Sign In
          </Link>
        </div>
      </Form>
    </>
  );
}

export default Register;
