import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import loginPage from "../pages/Login";
import NotFoundPage from "../pages/404";

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

      // auth routes
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: loginPage,
          },
          // {
          //   path: "register",
          //   Component: registerPage,
          // },
          // {
          //   path: "forget-password",
          //   Component: forgetPasswordPage,
          // },
          // {
          //   path: "reset-password",
          //   Component: resetPasswordPage,
          // },
          // {
          //   path: "verify-otp",
          //   Component: otpVerifyPage,
          // },
        ],
      },
    ],
  },
]);

export default router;
