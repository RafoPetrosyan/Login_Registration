import React from "react";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from  '@ant-design/icons';
import { LOGAUTH_ADMIN } from "../../../../store/adminStore/actions/actionType";
import { createAction } from "../../../../store/adminStore/actions/actions";
import styles from './AdminHeader.module.css';


const AdminHeader = () =>{

    const dispath = useDispatch();

    const logauthAdmin = () =>{
        dispath(createAction(LOGAUTH_ADMIN));
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>Admin</div>

            <div className={styles.logauth} onClick={logauthAdmin}>
                <LogoutOutlined />
            </div>
        </div>
    )
}

export default AdminHeader;