import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import NavBar from "./AdminComponents/NavBar/NavBar";
import AdminHeader from "./AdminComponents/AdminHeader/AdminHeader";
import 'antd/dist/antd.css';
import styles from './index.module.css';


const { Header, Content, Footer } = Layout;

  
const Admin = () => {

  

    return (
        <Layout>

            <NavBar/>

          <Layout className={styles.siteLayout}>
            <Header className={styles.header}> <AdminHeader/> </Header>

            <Content className={styles.content}>
              <div className={styles.siteLayoutBackground}>
                    <Outlet/>
              </div>
            </Content>

            <Footer className={styles.footer}>Admin Footer</Footer>
          </Layout>
      </Layout>
    )
}

export default Admin;