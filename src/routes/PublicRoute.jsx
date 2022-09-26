import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    if(localStorage.getItem("email") != null){
        return <Navigate to="/" replace />
    }
    return children ? children : <Outlet />
};

export default PublicRoute;