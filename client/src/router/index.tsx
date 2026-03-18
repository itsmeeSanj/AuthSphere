import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

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
