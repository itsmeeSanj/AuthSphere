import React from "react";
import { IoIosLock } from "react-icons/io";
import { Button, Form, Input, Card, message } from "antd";

import { useAuth } from "../../auth/hooks/useAuth";
import AdminBreadcrumb from "../components/AdminBreadcrumb";
import AdminTitle from "../components/AdminTitle";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirm: string;
}

export default function ChangePassword() {
  const { backendUrl } = useAuth();
  const [form] = Form.useForm<ChangePasswordValues>();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: ChangePasswordValues) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/user/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← sends cookie
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      message.success("Password updated successfully!");
      form.resetFields(); // ← clear form after success
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to update password");
    } finally {
      setLoading(false); // ← always stop loading
    }
  };

  return (
    <>
      <AdminBreadcrumb
        breadcrumbs={[
          { title: "Home", path: "/admin" },
          { title: "Change Password" },
        ]}
      />

      <AdminTitle title='Change Passwords' />

      <div style={{ maxWidth: 480 }}>
        <Card
          title='Change Password'
          style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <Form
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            autoComplete='off'
          >
            {/* Current Password */}
            <Form.Item
              name='currentPassword'
              label='Current Password'
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                prefix={<IoIosLock />}
                placeholder='Enter current password'
                size='large'
              />
            </Form.Item>

            {/* New Password */}
            <Form.Item
              name='newPassword'
              label='New Password'
              rules={[
                { required: true, message: "Please enter a new password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<IoIosLock />}
                placeholder='Min. 8 characters'
                size='large'
              />
            </Form.Item>

            {/* Confirm New Password */}
            <Form.Item
              name='confirm'
              label='Confirm New Password'
              dependencies={["newPassword"]} // ← re-validates when newPassword changes
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your new password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              npm
              <Input.Password
                prefix={<IoIosLock />}
                placeholder='Re-enter new password'
                size='large'
              />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Button
                block
                type='primary'
                htmlType='submit'
                size='large'
                loading={loading}
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
