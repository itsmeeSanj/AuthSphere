import React from "react";
import { Button, Form, Input, Card, message, Avatar } from "antd";

import { GoMail } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";

import { useAuth } from "../../auth/hooks/useAuth";
import AdminBreadcrumb from "../components/AdminBreadcrumb";
import AdminTitle from "../components/AdminTitle";

interface ProfileFormValues {
  name: string;
  email: string;
}

export default function Profile() {
  const { user, login, backendUrl } = useAuth();
  const [form] = Form.useForm<ProfileFormValues>();
  const [loading, setLoading] = React.useState(false);

  // ── pre-fill form with current user data ──────────
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // ── update context + localStorage with new name/email ──
      login({ ...user!, ...values });
      message.success("Profile updated successfully!");
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminBreadcrumb
        breadcrumbs={[
          { title: "Home", path: "/admin/dashboard" },
          { title: "Profile" },
        ]}
      />

      <AdminTitle title='Profile' />

      <div style={{ maxWidth: 480 }}>
        <Card
          style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Avatar
              size={72}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#6367FF", marginBottom: 8 }}
            />
            <p style={{ fontWeight: 600, fontSize: 16, margin: 0 }}>
              {user?.name}
            </p>
            <p style={{ color: "#888", fontSize: 13, margin: 0 }}>
              {user?.role ?? "admin"}
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            autoComplete='off'
          >
            <Form.Item
              name='name'
              label='Full Name'
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input prefix={<FaUser />} placeholder='Full Name' size='large' />
            </Form.Item>

            <Form.Item name='email' label='Email address'>
              <Input
                prefix={<GoMail />}
                placeholder='john@example.com'
                size='large'
                disabled
              />
            </Form.Item>

            <Form.Item label='Role'>
              <Input
                value={user?.role ?? "admin"}
                size='large'
                disabled // ← role is not editable
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
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
