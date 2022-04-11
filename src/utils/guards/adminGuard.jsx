import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GET_CURRENT_ADMIN } from "../../store/adminStore/actions/actionType";
import { createAction } from "../../store/adminStore/actions/actions";




const AdminGuard = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    
    useEffect(() =>{
       if(pathname === '/admin'){
           navigate('/admin/events');
       }
       dispatch(createAction(GET_CURRENT_ADMIN))
       
    }, []);

   
    if (localStorage.getItem('accessToken')) {
        return <Outlet/>
    }
    return <Navigate to='/admin/login'/>
  
};

export default AdminGuard;

