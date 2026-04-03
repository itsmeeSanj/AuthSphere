import { Col, ConfigProvider, Flex, Menu, Row, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const styles = {
  navigationPopup: {
    padding: 16,
    minWidth: 480,
    background: "#fff",
    borderRadius: 16,
    boxShadow:
      "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
  },
  menuItem: {
    borderRadius: 8,
    transition: "all 0.3s",
    cursor: "pointer",
    padding: 8,
  },
  menuItemSpace: {
    width: "100%",
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

const MenuItem = ({ title, description }: MenuItemProps) => {
  return (
    <div
      style={styles.menuItem}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <Space vertical size={4} style={styles.menuItemSpace}>
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
          <MenuItem
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
          <MenuItem title='Blog' description='Latest updates and articles.' />
        ),
      },
    ],
  },
];

const Navbar = () => {
  const popupRender = (_: React.ReactNode, item: any) => {
    return (
      <Flex style={styles.navigationPopup} vertical gap='middle'>
        <Typography.Title level={3} style={styles.leadingHeader}>
          {item?.title || item?.label}
        </Typography.Title>
      </Flex>
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            popupBg: "#fff",
            horizontalItemSelectedColor: "#1677ff",
            horizontalItemHoverColor: "#1677ff",
          },
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
          },
        },
      }}
    >
      <Menu mode='horizontal' items={menuItems} popupRender={popupRender} />
    </ConfigProvider>
  );
};

export default Navbar;
