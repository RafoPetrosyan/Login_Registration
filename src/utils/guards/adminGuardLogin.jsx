import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminGuardLogin  = () => {

    const currentAdmin = useSelector(state => state.adminData.currentAdmin);

    if (currentAdmin) {
        return <Navigate to='/admin/events'/>
    }
    return (
        <div style={{zIndex: 1, display: 'flex'}}>
            <Outlet/>
        </div>
    )
  
};

export default AdminGuardLogin;