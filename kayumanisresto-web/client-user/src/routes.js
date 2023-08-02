import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
import Detail from "./views/Detail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router
