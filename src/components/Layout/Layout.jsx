import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import NavHeader from "../NavHeader/NavHeader";
import 'antd/dist/antd.css';
import styles from './Layout.module.css';

const { Header, Content, Footer } = Layout;



const LayoutComponent = () =>{

    return (
        <Layout className={styles.layout}>

            <Header className={styles.header}> <NavHeader/> </Header>


            <Content className={styles.content}>
                <div className={styles.siteLayoutContent}> <Outlet/> </div>
            </Content>


        <Footer className={styles.footer}>Footer</Footer>

      </Layout>
    )
}

export default LayoutComponent;
