import React from "react";
import { Outlet } from "react-router-dom";
import styles from './Report.module.css';

const Reports = () => {
    return (
        <div className={styles.main}>
            <Outlet/>
        </div>
    )
}

export default Reports;