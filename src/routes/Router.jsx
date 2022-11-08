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
const ReceiptList = Loadable(lazy(() => import("@/pages/manager/stock/receipts")));
const NewReceipt = Loadable(lazy(() => import("@/pages/manager/stock/receipts/NewReceipt")));
const ProductList = Loadable(lazy(() => import("@/pages/manager/stock/products")));
const NewProduct = Loadable(lazy(() => import("@/pages/manager/stock/products/NewProduct")));
const EditProduct = Loadable(lazy(() => import("@/pages/manager/stock/products/EditProduct")));
const Supplies = Loadable(lazy(() => import("@/pages/manager/stock/supplies")));
const NewSupply = Loadable(lazy(() => import("@/pages/manager/stock/supplies/NewSupply")));
const EditSupply = Loadable(lazy(() => import("@/pages/manager/stock/supplies/EditSupply")));
const CategoriesList = Loadable(lazy(() => import("@/pages/manager/stock/categories")));
const Orders = Loadable(lazy(() => import("@/pages/manager/orders")));
const OrderDetails = Loadable(lazy(() => import("@/pages/manager/orders/OrderDetails")));

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
            element: <DashboardDefault />
          },
          {
            path: "perfil",
            element: <Account />,
          },
          {
            element: <PrivateRoute role="admin" />,
            children: [
              {
                path: "usuarios",
                element: <Users />,
              },
              {
                path: "barcitos",
                element: <Barcitos />,
              }
            ]
          },
          {
            element: <PrivateRoute role="manager" />,
            children: [
              {
                path: "barcito",
                element: <Barcito />
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
                    path: "productos/nuevo",
                    element: <NewProduct />
                  },
                  {
                    path: "productos/editar/:productId",
                    element: <EditProduct />
                  },
                  {
                    path: "insumos",
                    element: <Supplies />
                  },
                  {
                    path: "insumos/nuevo",
                    element: <NewSupply />
                  },
                  {
                    path: "insumos/editar/:supplyId",
                    element: <EditSupply />
                  },
                  {
                    path: "categorias",
                    element: <CategoriesList />
                  },
                  {
                    path: "recibos",
                    element: <ReceiptList />
                  },
                  {
                    path: "recibos/nuevo",
                    element: <NewReceipt />
                  }
                ]
              },
              {
                path: "pedidos",
                children: [
                  {
                    index: true,
                    element: <Orders />
                  },
                  {
                    path: ":orderCode",
                    element: <OrderDetails />
                  }
                ]
              },
            ],
          },
        ]
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
    element: <Unauthorized />
  }
]);

export default router;
