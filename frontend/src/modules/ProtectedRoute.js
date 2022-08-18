import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/loginSlice";

const ProtectedRoute = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (Object.keys(user).length === 0)
            navigate('/sign-in');
    }, [navigate, user]);
    return <Outlet />
}
export default ProtectedRoute;