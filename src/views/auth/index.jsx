import React from "react";
import { Outlet } from "react-router-dom";
import styles from './index.module.css';


const Auth = () => {

    return (
        <div className={styles.auth}>
            <Outlet/>
        </div>
    )
}

export default Auth;