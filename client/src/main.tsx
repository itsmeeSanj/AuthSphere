import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";

import router from "./router";

const root = document.getElementById("root");

createRoot(root!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
