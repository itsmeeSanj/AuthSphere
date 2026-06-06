import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
// import UserLayout from "../layouts/UserLayout";

import ProtectedRoute from "./ProtectedRoute";

// public
import Home from "../features/public/pages/Home";
import Unauthorized from "../features/public/pages/Unauthorized";
import NotFoundPage from "../features/public/pages/404";

// auth
import loginPage from "../features/auth/pages/Login";
import registerPage from "../features/auth/pages/Register";
import resetPasswordPage from "../features/auth/pages/ResetPassword";

// admin pages
import AdminDashboard from "../features/admin/pages/Dashboard";
import Profile from "../features/admin/pages/Profile";
import ChangePassword from "../features/admin/pages/changePassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "unauthorized", Component: Unauthorized },
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: loginPage,
          },
          {
            path: "register",
            Component: registerPage,
          },

          {
            path: "reset-password",
            Component: resetPasswordPage,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            Component: AdminLayout,
            children: [
              { path: "dashboard", Component: AdminDashboard },
              { path: "profile", Component: Profile },
              { path: "change-password", Component: ChangePassword },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
