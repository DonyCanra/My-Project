import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import TableMenu from "./views/TableMenu";
import TableCategory from "./views/TableCategory";
import Layout from "./components/Layout";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import CreateMenu from "./views/CreateMenu"
import UpdateMenu from "./views/UpdateMenu"
import CreateCategory from "./views/CreateCategory"
import UpdateCategory from "./views/UpdateCategory"

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        throw redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/product",
        element: <TableMenu />,
      },
      {
        path: "/category",
        element: <TableCategory />,
      },
      {
        path: "/register-admin",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add-product",
        element: <CreateMenu />,
      },
      {
        path: "/add-category",
        element: <CreateCategory />,
      },
      {
        path: "/edit-product/:id",
        element: <UpdateMenu />,
      },
      {
        path: "/edit-category/:id",
        element: <UpdateCategory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        throw redirect("/product");
      }
      return null;
    },
  },
]);

export default router;
