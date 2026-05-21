import React from "react";
import { Link, useNavigate } from "react-router";
import { Button, Form, Input, message } from "antd";

import { useAuth } from "../hooks/useAuth";

import { GoMail } from "react-icons/go";

import AuthHeader from "../components/AuthHeader";

interface ResetFormValues {
  email: string;
}

function ResetPassword() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<ResetFormValues>();

  function handleSubmit() {
    setLoading(true);
  }
  return (
    <>
      <AuthHeader
        title='Reset Password'
        subtitle='Enter your registered email address'
      />

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

        <Form.Item className='mb-4'>
          <Button
            block
            type='primary'
            htmlType='submit'
            size='large'
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ResetPassword;
