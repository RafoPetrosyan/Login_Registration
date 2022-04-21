import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const AuthGuardHome  = () => {

  const currentUser = useSelector(state => state.userData.currentUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();

    if (currentUser) {
      if(pathname === '/') navigate('/home');
        return <Outlet/>
    }
    return <Navigate to="/auth" replace/>;
  
};

export default AuthGuardHome;

