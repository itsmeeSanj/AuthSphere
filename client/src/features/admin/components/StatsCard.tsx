// src/features/admin/components/StatsCard.tsx
import { Card, Statistic } from "antd";
import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string; // ← change this line
  icon: ReactNode;
  color?: string;
  suffix?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color = "#6367FF",
  suffix,
}: Props) {
  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Statistic title={title} value={value} suffix={suffix} />
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
