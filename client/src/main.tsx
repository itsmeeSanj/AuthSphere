import React from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

// router
import { AuthProvider } from "./features/auth/context/AuthContext";
import router from "./router";

// css
import "./App.css";
import "./index.css";

const root = document.getElementById("root");

createRoot(root!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6367FF",
          // colorBgContainer:
        },
        components: {
          Form: {
            itemMarginBottom: 12,
          },
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
