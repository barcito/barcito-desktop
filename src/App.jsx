import { lazy, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import Loadable from "./components/Loadable";
import MainLayout from "./layout/MainLayout";
import MinimalLayout from "./layout/MinimalLayout";

const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const DashboardDefault = Loadable(lazy(() => import("./pages/dashboard")));
const SamplePage = Loadable(lazy(() => import("./pages/demos/SamplePage")));
const ReactQueryDemo = Loadable(
  lazy(() => import("./pages/demos/ReactQueryDemo"))
);
const AuthLogin = Loadable(lazy(() => import("./pages/authentication/Login")));
const AuthRegister = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const Testing = Loadable(lazy(() => import("./pages/dashboard/testing")));

const ProtectedRoute = () => {
  const [logged, setLogged] = useState(
    localStorage.getItem("email") != null ? true : false
  );

  return logged ? <ProtectedAdminRoute /> : <Navigate to="/login" />;
};

const ProtectedAdminRoute = () => {
  const [manager, setManager] = useState(localStorage.getItem("roles"));
  let permission = true;

  if (
    !manager.includes("admin") &&
    !manager.includes("manager") &&
    !manager.includes("submanager")
  )
    permission = false;

  return permission ? <Outlet /> : <NotFound replace={true} />;
};

const LoggedProtectedRoute = () => {
  const [logged, setLogged] = useState(
    localStorage.getItem("email") != null ? true : false
  );

  return logged ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<DashboardDefault />} />
              <Route path="administracion" element={<DashboardDefault />} />
              <Route path="barcitos" element={<DashboardDefault />} />
              <Route path="usuarios" element={<DashboardDefault />} />
              <Route path="sample-page" element={<SamplePage />} />
              <Route path="react-query" element={<ReactQueryDemo />} />
              <Route path="testing" element={<Testing />} />
            </Route>
          </Route>
          <Route path="/" element={<LoggedProtectedRoute />}>
            <Route path="/" element={<MinimalLayout />}>
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
            </Route>
          </Route>
        </Routes>
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
