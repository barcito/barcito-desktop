import { lazy } from "react";
import { QueryClient } from "react-query";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import MainLayout from "@/layout/MainLayout";
import MinimalLayout from "@/layout/MinimalLayout";

const PublicRoute = Loadable(lazy(() => import("./PublicRoute")));
const PrivateRoute = Loadable(lazy(() => import("./PrivateRoute")));
const NotFound = Loadable(lazy(() => import("@/pages/NotFound")));
const NotAuthorized = Loadable(lazy(() => import("@/pages/NotAuthorized")));
const DashboardDefault = Loadable(lazy(() => import("@/pages/dashboard")));
const SamplePage = Loadable(lazy(() => import("@/pages/demos/SamplePage")));
const ReactQueryDemo = Loadable(
  lazy(() => import("@/pages/demos/ReactQueryDemo"))
);
const AuthLogin = Loadable(lazy(() => import("@/pages/authentication/Login")));
const AuthRegister = Loadable(
  lazy(() => import("@/pages/authentication/Register"))
);
const Barcitos = Loadable(lazy(() => import("@/pages/admin/barcitos")));
const Users = Loadable(lazy(() => import("@/pages/admin/users")));
const Account = Loadable(lazy(() => import("@/pages/profile/Account")));
const Associates = Loadable(lazy(() => import("@/pages/manager/associates")));
const ProductList = Loadable(lazy(() => import("@/pages/manager/stock/products")));
const NewProduct = Loadable(lazy(() => import("@/pages/manager/stock/products/NewProduct")));
const EditProduct = Loadable(lazy(() => import("@/pages/manager/stock/products/EditProduct")));
const Supplies = Loadable(lazy(() => import("@/pages/manager/stock/supplies")));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <PrivateRoute role="all" />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardDefault />,
          },
          {
            path: "usuarios",
            element: <Users />,
          },
          {
            path: "barcitos",
            element: <Barcitos />,
          },
          {
            path: "perfil",
            element: <Account />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute role="manager" />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardDefault />,
          },
          {
            path: "socios",
            element: <Associates />,
          },
          {
            path: "stock",
            children: [
              {
                path: "productos",
                element: <ProductList />
              },
              {
                path: "insumos",
                element: <Supplies />
              },
              {
                path: "producto/nuevo",
                element: <NewProduct />
              },
              {
                path: "producto/editar/:productId",
                element: <EditProduct />
              }
            ]
          },
          

        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <MinimalLayout />,
        children: [
          {
            path: "login",
            element: <AuthLogin />,
          },
          {
            path: "registro",
            element: <AuthRegister />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
