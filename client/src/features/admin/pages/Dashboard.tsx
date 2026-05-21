import {
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Row, theme, Typography } from "antd";
import { useAuth } from "../../auth/hooks/useAuth";
import StatsCard from "../components/StatsCard";
// import StatsCard from "../components/StatsCard";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

// ── Stats data — replace values with real API data later ──────────────
const stats = [
  {
    title: "Total Users",
    value: 1240,
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

export default function Dashboard() {
  const { user } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ title: "Home" }, { title: "Dashboard" }]}
          style={{ padding: "16px 8px" }}
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
            Your dashboard content goes here — tables, charts, activity feed,
            etc.
          </Text>
        </div>
      </Content>

      <Footer style={{ textAlign: "center", color: "#aaa" }}>
        AuthSphere ©{currentYear}
      </Footer>
    </>
  );
}
