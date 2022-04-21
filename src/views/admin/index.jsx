import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout, notification, Button } from 'antd';
import NavBar from "./AdminComponents/NavBar/NavBar";
import AdminHeader from "./AdminComponents/AdminHeader/AdminHeader";
import styles from './index.module.css';
import { clientSocket } from "../../store/adminStore/clientSocket";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;


  
const Admin = () => {

  const notificationInfo = useSelector(state => state.adminNotification.notificationInfo);

  console.log(notificationInfo);

  useEffect(() =>{
      clientSocket.connectSocket();
      clientSocket.getSocketData();

      return () =>{
          clientSocket.disConnectSoccket();
      }
  }, []);


    const close = () => {
      console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.',
      );
    };

    const openNotification = () => {
      const key = `open${Date.now()}`;
      const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
        </Button>
    );
    notification.open({
        message: 'Notification Title',
        description:
          'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
        btn,
        key,
        onClose: close,
      });
    };

    useEffect(() =>{
        if(notification.length) openNotification();
        console.log(notification.length);
    }, [notificationInfo])

    return (
        <Layout>

            <NavBar/>

          <Layout className={styles.siteLayout}>
            <Header className={styles.header}> <AdminHeader/> </Header>

            <Content className={styles.content}>
              <div className={styles.siteLayoutBackground}>
                   <Outlet />  
              </div>
            </Content>

            <Footer className={styles.footer}>Admin Footer</Footer>
          </Layout>
      </Layout>
    )
}

export default Admin;