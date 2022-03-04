import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthGuard  = ( ) => {

  const currentUser = useSelector(state => state.userList.currentUser);

    if (currentUser) {
        return <Navigate to="/" replace/>;
    }
    return <Navigate to="/login" replace/>;
  };

export default AuthGuard;