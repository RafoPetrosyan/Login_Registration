import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const AdminGuardLogin = () => {

    if (localStorage.getItem('accessToken')) {
        return <Navigate to='/admin/events'/>
    }
    return (
        <div style={{zIndex: 1, display: 'flex'}}>
            <Outlet/>
        </div>
    )
};

export default AdminGuardLogin;

