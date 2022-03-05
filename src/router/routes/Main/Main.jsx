import React from "react";
import { Outlet } from "react-router-dom";
import styles from './Main.module.css';

const Main = () => {
    return (    
       <div className={styles.mainDiv}>
            <Outlet/>
        </div>
    )
}

export default Main;

