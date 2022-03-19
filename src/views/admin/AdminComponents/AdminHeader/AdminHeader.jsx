import React from "react";
import styles from './AdminHeader.module.css';
import { LogoutOutlined } from  '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setCurrentAdmin } from "../../../../store/adminStore/actions";

const AdminHeader = () =>{

    const dispath = useDispatch();

    const logauth = () =>{
        dispath(setCurrentAdmin(null));
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>Admin</div>

            <div className={styles.logauth} onClick={logauth}>
                <LogoutOutlined />
            </div>
        </div>
    )
}

export default AdminHeader;