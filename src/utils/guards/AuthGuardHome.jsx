import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuardHome  = () => {

  const currentUser = useSelector(state => state.userData.currentUser);

    if (currentUser) {
        return <Outlet/>
    }
    return <Navigate to="/auth" replace/>;
  
};

export default AuthGuardHome;

