import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCurrent } from "../../store/adminStore/actions";

const AdminGuard = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    
    useEffect(() =>{
       if(pathname === '/admin'){
           navigate('/admin/events');
       }
       dispatch(getCurrent())
       
    }, []);

   
    if (localStorage.getItem('accessToken')) {
        return <Outlet/>
    }
    return <Navigate to='/admin/login'/>
  
};

export default AdminGuard;

