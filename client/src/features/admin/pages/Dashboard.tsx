import React from "react";
import { Breadcrumb, Col, Layout, Row, theme, Typography } from "antd";

import {
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../auth/hooks/useAuth";
import StatsCard from "../components/StatsCard";
import AdminBreadcrumb from "../components/AdminBreadcrumb";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const { user, backendUrl } = useAuth();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();

  //
  React.useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${backendUrl}/api/user/stats`, {
          credentials: "include", // sends cookie automatically
        });

        const data = await res.json();
        setData(data);

        console.log("data", data);
      } catch (err) {
        const e = err as Error;
        setError(e.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [backendUrl]);

  // ── Stats data — replace values with real API data later ──────────────
  const stats = [
    {
      title: "Total Users",
      // value: data?.totalUsers ?? 0,
      icon: <TeamOutlined />,
      color: "#6367FF",
    },
    {
      title: "Active Sessions",
      value: 38,
      icon: <UserOutlined />,
      color: "#52c41a",
    },
    {
      title: "Verified Accounts",
      value: 980,
      icon: <CheckCircleOutlined />,
      color: "#1677ff",
    },
    {
      title: "Growth",
      value: 12,
      icon: <RiseOutlined />,
      color: "#fa8c16",
      suffix: "%",
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      {/* <Breadcrumb
        items={[{ title: "Home" }, { title: "Dashboard" }]}
        style={{ padding: "0 8px 16px" }}
      /> */}

      {/*  */}

      <AdminBreadcrumb
        title='Dashboard'
        breadcrumbs={[
          { title: "Home", path: "/admin/dashboard" },
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

      {/* Stats grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <StatsCard {...stat} />
          </Col>
        ))}
      </Row>

      {/* Main content area — add your tables/charts here later */}
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
