import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import NavBar from "./AdminComponents/NavBar/NavBar";
import AdminHeader from "./AdminComponents/AdminHeader/AdminHeader";
import styles from './index.module.css';
import { clientSocket } from "../../store/adminStore/clientSocket";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../store/adminStore/actions/actions";
import { GET_CURRENT_ADMIN } from "../../store/adminStore/actions/actionType";

const { Header, Content, Footer } = Layout;


const Admin = () => {

  const currentUser = useSelector(state => state.adminData.currentAdmin);
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(createAction(GET_CURRENT_ADMIN))
    }, []);
  
  useEffect(() => {
    if(currentUser){
      clientSocket.connectSocket();
      clientSocket.connectSupportSocket(currentUser._id);
    }
    return () => {
      if(clientSocket.socket){
          clientSocket.disConnectSoccket();
      }
      if(clientSocket.supportSocket){
          clientSocket.disConnectSupportSocket();
      }
      
     
    }
  }, [currentUser]);

  

  return (
    <Layout>

      <NavBar />

      <Layout className={styles.siteLayout}>
        <Header className={styles.header}> <AdminHeader /> </Header>

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