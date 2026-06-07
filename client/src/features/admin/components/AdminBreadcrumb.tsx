import { Breadcrumb } from "antd";
import { Link } from "react-router";

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ breadcrumbs }: Props) {
  return (
    <>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={breadcrumbs.map((item) => ({
          title: item.path ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            item.title
          ),
        }))}
      />
    </>
  );
}
