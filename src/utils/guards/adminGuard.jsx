import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminGuard  = () => {

    const currentAdmin = useSelector(state => state.adminData.currentAdmin);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() =>{
       if(pathname === '/admin'){
           navigate('/admin/events');
       }
    }, []);

    if (currentAdmin) {
        return <Outlet/>
    }
    return <Navigate to='/admin/login'/>
  
};

export default AdminGuard;