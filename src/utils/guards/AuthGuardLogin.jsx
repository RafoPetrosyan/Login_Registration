import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuardLogin  = () => {
  
  const currentUser = useSelector(state => state.userData.currentUser);
  

    if (currentUser) {
      
        return <Navigate to='/home' replace/>
    }
    return <Outlet/>;
  

};

export default AuthGuardLogin;