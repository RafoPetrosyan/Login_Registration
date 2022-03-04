import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateCurrentUser } from "../../store/actions";
import styles from './Header.module.css';

const Header = () =>{

    const currentUser = useSelector(state => state.userList.currentUser);
    const dispatch = useDispatch();

    const clickLogout = () =>{
        dispatch(updateCurrentUser(null));
    }

    return (
        <div className={styles.header}>
            { !currentUser ?
                <div className={styles.headerMain}>
                    <div className={styles.loginRegistrDiv}>
                        <NavLink to='/login' className={styles.navLink}>Sign in</NavLink>
                        <NavLink to='/registration' className={styles.navLink}>Sign up</NavLink>
                    </div>
                </div>
            :
                <div className={styles.signInHeader}>
                    <NavLink to='/home' className={styles.navLink}>Home</NavLink>
                    <NavLink to='/login' className={styles.navLink} onClick={clickLogout}>Logout</NavLink>
                </div>

            }
            
        </div>
    )
}

export default Header;