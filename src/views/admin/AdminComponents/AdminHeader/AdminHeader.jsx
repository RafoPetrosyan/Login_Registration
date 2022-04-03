import React from "react";
import styles from './AdminHeader.module.css';
import { LogoutOutlined } from  '@ant-design/icons';
import { useDispatch } from "react-redux";
import { logauth } from "../../../../store/adminStore/events/eventActions";
import { useNavigate } from "react-router-dom";

const AdminHeader = () =>{

    const dispath = useDispatch();
    const navigate = useNavigate()

    const logauthAdmin = () =>{
        dispath(logauth());
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