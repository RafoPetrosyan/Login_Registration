import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentUser } from "../../store/actions";
import styles from './Header.module.css';

const Header = () =>{

    const currentUser = useSelector(state => state.userData.currentUser);
    const dispatch = useDispatch();

    const clickLogout = () =>{
        dispatch(setCurrentUser(null));
    }

    return (
        <div className={styles.header}>
            { !currentUser ?
                <div className={styles.headerMain}>
                    <div className={styles.loginRegistrDiv}>
                        <NavLink to='/auth/login' className={styles.navLink}>Sign in</NavLink>
                        <NavLink to='/auth/registration' className={styles.navLink}>Sign up</NavLink>
                    </div>
                </div>
            :
                <div className={styles.signInHeader}>
                    <div className={styles.pages}>
                        <NavLink to='/home' className={styles.navLink}>Home</NavLink>
                        <NavLink to='/about' className={styles.navLink}>About</NavLink>
                    </div>
                    <NavLink to='/auth' className={styles.navLink} onClick={clickLogout}>Logout</NavLink>
                </div>

            }
            
        </div>
    )
}

export default Header;