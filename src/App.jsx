import Layout from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import MemberList from "./pages/Member/MemberList";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/member-list" element={<MemberList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
