import React from "react";
import { Outlet } from "react-router-dom";
import styles from './Auth.module.css';


const Auth = () => {
    return (
        <div className={styles.authDiv}>
            <div className={styles.container}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Auth;