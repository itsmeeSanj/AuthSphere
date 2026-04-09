import { ConfigProvider, Menu, Space, Typography } from "antd";
import type { CSSProperties } from "react";

const { Title, Paragraph } = Typography;

const styles: Record<string, CSSProperties> = {
  menuItem: {
    borderRadius: 8,
    transition: "all 0.3s",
    cursor: "pointer",
    padding: 8,
  },
  menuItemSpace: {
    width: "100%",
    height: "100%",
  },
  leadingHeader: {
    margin: 0,
    paddingBottom: 8,
    borderBottom: "1px solid #f0f0f0",
  },
  marginLess: {
    margin: 0,
  },
};

type MenuItemProps = {
  title: string;
  description: string;
};

const CustomMenuItem = ({ title, description }: MenuItemProps) => {
  return (
    <div style={styles.menuItem}>
      <Space orientation='vertical' size={4} style={styles.menuItemSpace}>
        <Title level={5} style={styles.marginLess}>
          {title}
        </Title>
        <Paragraph type='secondary' style={styles.marginLess}>
          {description}
        </Paragraph>
      </Space>
    </div>
  );
};

const menuItems = [
  {
    key: "home",
    label: "Home",
  },
  {
    key: "features",
    label: "Features",
    children: [
      {
        key: "getting-started",
        label: (
          <CustomMenuItem
            title='Getting Started'
            description='Quick start guide and learn the basics.'
          />
        ),
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    children: [
      {
        key: "blog",
        label: (
          <CustomMenuItem
            title='Blog'
            description='Latest updates and articles.'
          />
        ),
      },
    ],
  },
];

const Navbar = () => {
  return (
    <>
      <Menu mode='horizontal' items={menuItems} />
    </>
  );
};

export default Navbar;
