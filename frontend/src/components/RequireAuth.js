import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();


    if (!auth) {
        // This will be caught by Layout's loading state
        return null;
      }

    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        auth?.role

            ? <Outlet />
            // : auth?.user
                :  <Navigate to="/" state={{ from: location }} replace />
                // <Navigate to="/unauthorized" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;