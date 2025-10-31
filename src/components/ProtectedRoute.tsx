import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../hooks/reduxHooks";

export const ProtectedRoute = () => {
    const user = useAppSelector(s => s.auth.user);
    return user ? <Outlet/> : <Navigate to="/login" replace/>;
};
