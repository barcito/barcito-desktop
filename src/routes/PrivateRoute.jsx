import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import eventBus from "@/utils/eventBus";
import axios from "axios";

const PrivateRoute = ({ children, role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    eventBus.on("logout", async () => {
      try {
        const response = await axios.get("http://192.168.0.6:3000/api/auth/refresh", { withCredentials: true });
        console.log(response);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("email");
          localStorage.removeItem("roles");
          navigate("/login");
        }
      }
    });
  }, []);

  if (localStorage.getItem("email") != null) {
    if (localStorage.getItem("roles").includes(role) || role === "all") {
      return children ? children : <Outlet />;
    }
    return <Navigate to="/unauthorized" replace />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
