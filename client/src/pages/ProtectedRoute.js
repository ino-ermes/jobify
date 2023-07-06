import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function ProtectedRoute({children}) {
    const {user} = useAppContext();
    if(user) {
        return children;
    } else {
        return <Navigate to='/landing'/>
    }
}

export default ProtectedRoute;