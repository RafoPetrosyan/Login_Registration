import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute  = ({ element }) => {

  const currentUser = useSelector(state => state.userList.currentUser);

  console.log(currentUser, 'rout');
    if (currentUser[0]) {
        return element;
    }
    return <Navigate to="/" replace/>;
  };

export default ProtectedRoute;