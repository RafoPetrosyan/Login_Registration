import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminGuard  = () => {

    const currentAdmin = useSelector(state => state.adminData.currentAdmin);

    if (currentAdmin) { 
        return <Outlet/>
    }
    return <Navigate to='/admin/login'/>
  
};

export default AdminGuard;