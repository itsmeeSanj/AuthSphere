import React from "react";
import { Col, Layout, Row, theme, Typography, Spin, Alert } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../auth/hooks/useAuth";
import StatsCard from "../components/StatsCard";
import AdminBreadcrumb from "../components/AdminBreadcrumb";

const { Footer } = Layout;
const { Title, Text } = Typography;

interface Stats {
  totalUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
}

export default function Dashboard() {
  const { user, backendUrl } = useAuth();
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/user/stats`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setStats(data.stats); // ← data.stats not data
      } catch (err) {
        const e = err as Error;
        setError(e.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [backendUrl]);

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0, // ← real data
      icon: <TeamOutlined />,
      color: "#6367FF",
    },
    {
      title: "Verified Accounts",
      value: stats?.verifiedUsers ?? 0, // ← real data
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "Unverified Accounts",
      value: stats?.unverifiedUsers ?? 0, // ← real data
      icon: <CloseCircleOutlined />,
      color: "#fa8c16",
    },
    {
      title: "Your Role",
      value: user?.role ?? "admin",
      icon: <UserOutlined />,
      color: "#1677ff",
    },
  ];

  return (
    <>
      <AdminBreadcrumb
        breadcrumbs={[
          { title: "Home", path: "/admin" },
          { title: "Dashboard" },
        ]}
      />

      {/* Welcome banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #6367FF 0%, #33369b 100%)",
          borderRadius: borderRadiusLG,
          padding: "24px 32px",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          Welcome back, {user?.name}! 👋
        </Title>
        <Text style={{ color: "rgba(255,255,255,0.75)" }}>
          {user?.email} · {user?.role ?? "admin"}
        </Text>
      </div>

      {/* Error */}
      {error && (
        <Alert
          message={error}
          type='error'
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Stats grid */}
      <Spin spinning={loading}>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {statCards.map((stat) => (
            <Col xs={24} sm={12} lg={6} key={stat.title}>
              <StatsCard {...stat} />
            </Col>
          ))}
        </Row>
      </Spin>

      {/* Main content */}
      <div
        style={{
          padding: 32,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text type='secondary'>
          Your dashboard content goes here — tables, charts, activity feed, etc.
        </Text>
      </div>

      <Footer style={{ textAlign: "center", color: "#aaa" }}>
        AuthSphere ©{currentYear}
      </Footer>
    </>
  );
}
