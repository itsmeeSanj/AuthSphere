import React from "react";
// import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import router from "./router";

// import "antd/dist/reset.css";
import "./index.css";

const root = document.getElementById("root");

createRoot(root!).render(
  <React.StrictMode>
    {/* <ConfigProvider> */}
    <RouterProvider router={router} />
    {/* </ConfigProvider> */}
  </React.StrictMode>,
);
