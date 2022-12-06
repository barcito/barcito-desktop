import { lazy } from "react";
import { QueryClient } from "react-query";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import MainLayout from "@/layout/MainLayout";
import MinimalLayout from "@/layout/MinimalLayout";

const PublicRoute = Loadable(lazy(() => import("./PublicRoute")));
const PrivateRoute = Loadable(lazy(() => import("./PrivateRoute")));
const NotFound = Loadable(lazy(() => import("@/pages/NotFound")));
const Unauthorized = Loadable(lazy(() => import("@/pages/NotAuthorized")));
const DashboardDefault = Loadable(lazy(() => import("@/pages/dashboard")));
const AuthLogin = Loadable(lazy(() => import("@/pages/authentication/Login")));
const AuthRegister = Loadable(lazy(() => import("@/pages/authentication/Register")));
const Barcitos = Loadable(lazy(() => import("@/pages/admin/barcitos")));
const Barcito = Loadable(lazy(() => import("@/pages/manager/barcito")));
const Users = Loadable(lazy(() => import("@/pages/admin/users")));
const Account = Loadable(lazy(() => import("@/pages/profile/Account")));
const Associates = Loadable(lazy(() => import("@/pages/manager/associates")));

const ReceiptList = Loadable(lazy(() => import("@/pages/manager/receipts")));
const NewReceipt = Loadable(lazy(() => import("@/pages/manager/receipts/NewReceipt")));

const ProductList = Loadable(lazy(() => import("@/pages/manager/products")));
const NewProduct = Loadable(lazy(() => import("@/pages/manager/products/NewProduct")));
const EditProduct = Loadable(lazy(() => import("@/pages/manager/products/EditProduct")));

const StockList = Loadable(lazy(() => import("@/pages/manager/stock")));
const NewStock = Loadable(lazy(() => import("@/pages/manager/stock/NewStock")));
const EditStock = Loadable(lazy(() => import("@/pages/manager/stock/EditStock")));

const CategoriesList = Loadable(lazy(() => import("@/pages/manager/categories")));
const NewCategory = Loadable(lazy(() => import("@/pages/manager/NewCategory")));
const EditCategory = Loadable(lazy(() => import("@/pages/manager/EditCategory")));

const Orders = Loadable(lazy(() => import("@/pages/manager/orders")));
const OrderDetails = Loadable(lazy(() => import("@/pages/manager/orders/OrderDetails")));
const NewOrder = Loadable(lazy(() => import("@/pages/manager/orders/NewOrder")));

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
            path: "perfil",
            element: <Account />,
          },
          {
            element: <PrivateRoute role="Admin" />,
            children: [
              {
                path: "usuarios",
                element: <Users />,
              },
              {
                path: "barcitos",
                element: <Barcitos />,
              },
            ],
          },
          {
            element: <PrivateRoute role="Gerente" />,
            children: [
              {
                path: "barcito",
                element: <Barcito />,
              },
              {
                path: "socios",
                element: <Associates />,
              },
              {
                path: "productos",
                children: [
                  {
                    index: true,
                    element: <ProductList />,
                  },
                  {
                    path: "nuevo",
                    element: <NewProduct />,
                  },
                  {
                    path: "editar/:productId",
                    element: <EditProduct />,
                  },
                ],
              },
              {
                path: "stock",
                children: [
                  {
                    element: <StockList />,
                    index: true,
                  },
                  {
                    path: "nuevo",
                    element: <NewStock />,
                  },
                  {
                    path: "editar/:stockId",
                    element: <EditStock />,
                  },
                ],
              },
              {
                path: "categorias",
                children: [
                  {
                    element: <CategoriesList />,
                    index: true,
                  },
                  {
                    path: "nueva",
                    element: <NewCategory />,
                  },
                  {
                    path: "editar/:categoryId",
                    element: <EditCategory />,
                  },
                ],
              },
              {
                path: "recibos",
                children: [
                  {
                    element: <ReceiptList />,
                    index: true,
                  },
                  {
                    path: "nuevo",
                    element: <NewReceipt />,
                  },
                ],
              },
              {
                path: "pedidos",
                children: [
                  {
                    index: true,
                    element: <Orders />,
                  },
                  {
                    path: "detalle/:orderCode",
                    element: <OrderDetails />,
                  },
                  {
                    path: "nuevo",
                    element: <NewOrder />,
                  },
                ],
              },
            ],
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
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

export default router;
