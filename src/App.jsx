import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import Loadable from "./components/Loadable";
import MainLayout from "./layout/MainLayout";
import MinimalLayout from "./layout/MinimalLayout";

const PublicRoute = Loadable(lazy(() => import("./routes/PublicRoute")));
const PrivateRoute = Loadable(lazy(() => import("./routes/PrivateRoute")));
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const NotAuthorized = Loadable(lazy(() => import("./pages/NotAuthorized")));
const DashboardDefault = Loadable(lazy(() => import("./pages/dashboard")));
const SamplePage = Loadable(lazy(() => import("./pages/demos/SamplePage")));
const ReactQueryDemo = Loadable(lazy(() => import("./pages/demos/ReactQueryDemo")));
const AuthLogin = Loadable(lazy(() => import("./pages/authentication/Login")));
const AuthRegister = Loadable(lazy(() => import("./pages/authentication/Register")));
const Barcitos = Loadable(lazy(() => import("./pages/admin/barcitos")));
const Users = Loadable(lazy(() => import("./pages/admin/users")));
const Account = Loadable(lazy(() => import("./pages/profile/Account")));

function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<PrivateRoute role="all" />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<DashboardDefault />} />
              <Route path="administracion" element={<DashboardDefault />} />
              <Route path="barcitos" element={<Barcitos />} />
              <Route path="usuarios" element={<Users />} />
              <Route path="sample-page" element={<SamplePage />} />
              <Route path="perfil" element={<Account />} />
              <Route path="react-query" element={<ReactQueryDemo />} />
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route element={<MinimalLayout />}>
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
