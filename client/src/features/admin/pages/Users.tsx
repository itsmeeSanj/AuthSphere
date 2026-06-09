import React from "react";
import { Badge, Button, Input, Popconfirm, Table, Tag, message } from "antd";
import type { TableProps } from "antd";

import { useAuth } from "../../auth/hooks/useAuth";
import AdminTitle from "../components/AdminTitle";
import AdminBreadcrumb from "../components/AdminBreadcrumb";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isAccountVerified: boolean;
  createdAt: string;
}

const { Search } = Input;

function Users() {
  const { backendUrl } = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);
  const [filtered, setFiltered] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  // ── fetch all users ──────────────────────────────
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/user/all`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setUsers(data.users);
      setFiltered(data.users);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  // ── search ───────────────────────────────────────
  const handleSearch = (value: string) => {
    const query = value.toLowerCase();
    const result = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query),
    );
    setFiltered(result);
  };

  // ── delete user ──────────────────────────────────
  const handleDelete = async (userId: string) => {
    try {
      const res = await fetch(`${backendUrl}/api/user/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      message.success("User deleted");
      fetchUsers(); // refresh list
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to delete user");
    }
  };

  // ── table columns ────────────────────────────────
  const columns: TableProps<User>["columns"] = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div style={{ fontWeight: 600 }}>{record.name}</div>
      ),
    },
    {
      title: "Email",
      key: "user",
      render: (_, record) => <div>{record.email}</div>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => (
        <Tag color={role === "admin" ? "purple" : "blue"}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isAccountVerified",
      key: "isAccountVerified",
      filters: [
        { text: "Verified", value: true },
        { text: "Unverified", value: false },
      ],
      onFilter: (value, record) => record.isAccountVerified === value,
      render: (verified) =>
        verified ? (
          <Badge status='success' text='Verified' />
        ) : (
          <Badge status='warning' text='Unverified' />
        ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title='Delete user'
          description={`Are you sure you want to delete ${record.name}?`}
          onConfirm={() => handleDelete(record._id)}
          okText='Delete'
          okButtonProps={{ danger: true }}
          cancelText='Cancel'
        >
          <Button danger size='small'>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <AdminBreadcrumb
        breadcrumbs={[{ title: "Home", path: "/admin" }, { title: "Users" }]}
      />
      <AdminTitle title='Users' />

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <Search
          size='large'
          placeholder='Search by name or email'
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey='_id'
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          showTotal: (total) => `Total ${total} users`,
        }}
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />
    </>
  );
}

export default Users;
