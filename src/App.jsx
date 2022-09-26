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
const Testing = Loadable(lazy(() => import("./pages/dashboard/testing")));

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
              <Route path="barcitos" element={<DashboardDefault />} />
              <Route path="usuarios" element={<DashboardDefault />} />
              <Route path="sample-page" element={<SamplePage />} />
              <Route path="react-query" element={<ReactQueryDemo />} />
              <Route path="testing" element={<Testing />} />
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
