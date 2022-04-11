import React from "react";
import styles from './AdminHeader.module.css';
import { LogoutOutlined } from  '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGAUTH_ADMIN } from "../../../../store/adminStore/actions/actionType";
import { createAction } from "../../../../store/adminStore/actions/actions";


const AdminHeader = () =>{

    const dispath = useDispatch();
    const navigate = useNavigate()

    const logauthAdmin = () =>{
        dispath(createAction(LOGAUTH_ADMIN));
        navigate('/admin/login');
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