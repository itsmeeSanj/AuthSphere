import React from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

// router
import router from "./router";

// css
import "./App.css";
import "./index.css";
import { AuthProvider } from "./features/auth/context/AuthProvider";

const root = document.getElementById("root");

createRoot(root!).render(
  <React.StrictMode>
    <AuthProvider>
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
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>,
);
