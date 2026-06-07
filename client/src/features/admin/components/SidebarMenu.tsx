import {
  AppstoreOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import { useNavigate, useLocation } from "react-router";

const menuItems = [
  {
    key: "/admin/dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  {
    key: "/admin/users",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "sub1",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      {
        key: "/admin/profile",
        icon: <UserOutlined />,
        label: "Profile",
      },
      {
        key: "/admin/change-password",
        label: "Change Password",
      },
    ],
  },
];

function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        defaultOpenKeys={["sub1"]}
      />
    </>
  );
}

export default SidebarMenu;
