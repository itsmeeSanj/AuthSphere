import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import NotFoundPage from "../pages/404";
import RootLayout from "../layouts/RootLayout";

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
    ],
  },
]);

export default router;
