import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

// public
import Home from "../features/public/pages/Home";

// auth
import loginPage from "../features/auth/pages/Login";
import registerPage from "../features/auth/pages/Register";
import forgetPasswordPage from "../features/auth/pages/ForgotPassword";

// other
import NotFoundPage from "../features/public/pages/404";

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
          {
            path: "register",
            Component: registerPage,
          },
          {
            path: "forget-password",
            Component: forgetPasswordPage,
          },
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
