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
    <>
      <Breadcrumb
        // style={{ marginBottom: 8 }}
        items={breadcrumbs.map((item) => ({
          title: item.path ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            item.title
          ),
        }))}
      />

      {/*  */}

      <div
        className='rounded-sm my-4 p-4'
        style={{
          background: "linear-gradient(135deg, #6367FF 0%, #33369b 100%)",
        }}
      >
        <h5 className='text-white font-bold capitalize'>{title} </h5>
        {/* <Title level={3} style={{ color: "#fff", margin: 0 }}>
          Welcome back, {user?.name}! 👋
        </Title>
        <Text style={{ color: "rgba(255,255,255,0.75)" }}>
          {user?.email} · {user?.role ?? "admin"}
        </Text> */}
      </div>

      {/* <Title level={4} style={{ margin: "16px 0 " }}>
        {title}
      </Title> */}
    </>
  );
}
