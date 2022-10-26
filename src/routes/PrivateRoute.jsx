import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    if(localStorage.getItem("email") != null){
        if(localStorage.getItem("roles").includes(role) || role === "all"){
            return children ? children : <Outlet />;
        }
        return <Navigate to="/unauthorized" replace />
    }
    return <Navigate to="/login" />;
};

export default PrivateRoute;