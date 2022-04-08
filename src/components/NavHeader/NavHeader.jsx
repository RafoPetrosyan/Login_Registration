import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SET_CURRENT_ADMIN } from '../../store/adminStore/actions/actionType';
import { createAction } from '../../store/adminStore/actions/createAction';
import styles from './NavHeader.module.css';

const pages = [
    {title: 'Home', to: '/home'}, 
    {title: 'About', to: '/about'},
];

const authPages = [
    {title: 'Sign in', to: '/auth/login'},
    {title: 'Sign up', to: '/auth/registration'},
];


const NavHeader = () => {

    const currentUser = useSelector(state => state.userData.currentUser);
    const dispatch = useDispatch();

    const logauth = () =>{
        dispatch(createAction(SET_CURRENT_ADMIN, null));
    }


    return (
        <div className={styles.navBar}>
            {
                currentUser ?
                <div className={styles.loginNavBar}>
                    <div>
                        {
                            pages.map(item =>(
                                <NavLink 
                                    to={item.to}
                                    key={item.to}
                                    className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
                                >
                                    {item.title}
                                </NavLink>
                            ))
                        }
                    </div>
                    
                    <div>
                        <button className={styles.logauth} onClick={logauth}>
                            Logauth
                        </button>
                    </div>
                </div>
                :
                <div className={styles.authNavBar}>
                    {
                        authPages.map(item =>(
                            <NavLink
                                to={item.to}
                                key={item.to}
                                className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
                            >
                                {item.title}
                            </NavLink>
                        ))  
                    }
                </div>
            }
        </div>
    )

};

export default NavHeader;
