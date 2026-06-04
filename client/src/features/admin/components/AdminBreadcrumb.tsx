import { Breadcrumb, Typography } from "antd";
import { Link } from "react-router";

const { Title } = Typography;

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface Props {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ title, breadcrumbs }: Props) {
  return (
    <div style={{ padding: "0 8px 16px" }}>
      <Breadcrumb
        style={{ marginBottom: 8 }}
        items={breadcrumbs.map((item) => ({
          title: item.path ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            item.title
          ),
        }))}
      />
      {/* <Title level={4} style={{ margin: "0 0 16px" }}>
        {title}
      </Title> */}
    </div>
  );
}
