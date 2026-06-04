import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";
import SidebarMenu from "../features/admin/components/SidebarMenu";
import DashboardHeader from "../features/admin/components/DashboardHeader";

const { Sider, Content } = Layout;

function AdminLayout() {
  // const { user, logout } = useAuth();

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            insetInlineStart: 0,
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
        >
          {/*  */}

          {/* Logo area */}
          <div
            style={{
              height: 48,
              margin: "12px 16px",
              borderRadius: 8,
              background: "#6367FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transition: "all 0.2s",
            }}
          >
            {!collapsed && (
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: 1,
                }}
              >
                AuthSphere
              </span>
            )}
            {collapsed && (
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>
                A
              </span>
            )}
          </div>
          {/*  */}

          <SidebarMenu />

          {/*  */}
        </Sider>

        {/*  */}

        {/* Main area */}
        <Layout>
          <DashboardHeader
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
          <Content style={{ margin: "16px" }}>
            {/* Page content rendered here */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
