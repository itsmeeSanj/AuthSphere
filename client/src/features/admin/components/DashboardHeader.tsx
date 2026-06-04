import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Space,
  theme,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { useAuth } from "../../auth/hooks/useAuth";

const { Header } = Layout;
const { Text } = Typography;

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardHeader({ collapsed, onToggle }: Props) {
  const { user, logout } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },

    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 24px 0 0",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* Left — collapse toggle */}
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{ fontSize: 16, width: 64, height: 64 }}
      />

      {/* Right — user avatar + dropdown */}
      <Dropdown menu={{ items: dropdownItems }} placement='bottomRight' arrow>
        <Space style={{ cursor: "pointer", paddingRight: 8 }}>
          <Avatar
            size='small'
            icon={<UserOutlined />}
            style={{ backgroundColor: "#6367FF" }}
          />
          <Text strong style={{ fontSize: 14 }}>
            {user?.name}
          </Text>
        </Space>
      </Dropdown>
    </Header>
  );
}
