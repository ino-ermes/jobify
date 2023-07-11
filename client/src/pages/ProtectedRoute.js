import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import {Loading} from '../components';

function ProtectedRoute({children}) {
    const {user, loadingUser} = useAppContext();

    if(loadingUser) {
        return <Loading center/>
    }

    if(user) {
        return children;
    } else {
        return <Navigate to='/landing'/>
    }
}

export default ProtectedRoute;