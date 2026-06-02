import React from "react";
import { Link, useNavigate } from "react-router";
import { Button, Form, Input, message } from "antd";

import { GoMail } from "react-icons/go";
import { IoIosLock } from "react-icons/io";

import { useAuth } from "../hooks/useAuth";
import AuthHeader from "../components/AuthHeader";

type Step = "email" | "otp" | "password";

function ResetPassword() {
  const [step, setStep] = React.useState<Step>("email");
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const { backendUrl } = useAuth();
  const navigate = useNavigate();

  const [emailForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // ── Step 1: Send OTP ──────────────────────────────
  const handleSendOtp = async (values: { email: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/send-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setEmail(values.email); // save for next steps
      message.success("OTP sent to your email!");
      setStep("otp"); // move to step 2
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false); // ← always stop loading
    }
  };

  // ── Step 2: Verify OTP ────────────────────────────
  const handleVerifyOtp = async (values: { otp: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp: values.otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setOtp(values.otp); // save for step 3
      message.success("OTP verified!");
      setStep("password"); // move to step 3
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Reset Password ────────────────────────
  const handleResetPassword = async (values: { newPassword: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp, newPassword: values.newPassword }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      message.success("Password reset successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* steps */}
      {step === "email" && (
        <>
          <AuthHeader
            title='Forgot Password'
            subtitle='Enter your registered email address.'
          />
          <Form
            form={emailForm}
            layout='vertical'
            onFinish={handleSendOtp}
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
            <Form.Item className='mb-4'>
              <Button
                block
                type='primary'
                htmlType='submit'
                size='large'
                loading={loading}
              >
                Send OTP
              </Button>
            </Form.Item>
            <div className='text-center text-sm text-gray-600'>
              Remember your password?{" "}
              <Link to='/login' className='text-blue-600 hover:underline'>
                Sign In
              </Link>
            </div>
          </Form>
        </>
      )}

      {/* ── Step 2: OTP ── */}
      {step === "otp" && (
        <>
          <AuthHeader
            title='Enter OTP'
            subtitle={`A 6-digit code was sent to ${email}`}
          />
          <Form
            form={otpForm}
            layout='vertical'
            onFinish={handleVerifyOtp}
            autoComplete='off'
          >
            <Form.Item
              name='otp'
              label='OTP Code'
              rules={[
                { required: true, message: "Please enter the OTP" },
                { len: 6, message: "OTP must be 6 digits" },
              ]}
            >
              <Input
                placeholder='Enter 6-digit code'
                size='large'
                maxLength={6}
                className='text-center tracking-widest text-lg'
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
                Verify OTP
              </Button>
            </Form.Item>
            <div className='text-center text-sm text-gray-600'>
              Didn&apos;t receive it?{" "}
              <button
                type='button'
                onClick={() => setStep("email")}
                className='text-blue-600 hover:underline'
              >
                Resend OTP
              </button>
            </div>
          </Form>
        </>
      )}

      {/* ── Step 3: New Password ── */}
      {step === "password" && (
        <>
          <AuthHeader
            title='New Password'
            subtitle='Enter your new password below.'
          />
          <Form
            form={passwordForm}
            layout='vertical'
            onFinish={handleResetPassword}
            autoComplete='off'
          >
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
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
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
              <Input.Password
                prefix={<IoIosLock />}
                placeholder='Re-enter new password'
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
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}

export default ResetPassword;
