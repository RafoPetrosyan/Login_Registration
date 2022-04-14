import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import {
    FileDoneOutlined, CommentOutlined, GoldOutlined,
    UserOutlined, AppstoreOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './NavBar.module.css';

const { Sider } = Layout;
const { SubMenu } = Menu;


const pages = [
    {
        icon: <AppstoreOutlined/>,
        to: '/admin/events',
        title: 'Events',
    },
    {
        icon: <UserOutlined/>,
        to: '/admin/users',
        title: 'Users',
    },
    {
        icon: <GoldOutlined />,
        to: '/admin/types',
        title: 'Types',
    },
    {
        icon: <CommentOutlined />,
        to: '/admin/support',
        title: 'Support',
    },
    {
        icon: <FileDoneOutlined/>,
        title: 'Reports',
        child: [
            {
                to: '/admin/reports',
                title: 'Reports'
            },
            {
                to: '/admin/reports/users',
                title: 'Users'
            },
            {
                to: '/admin/reports/events',
                title: 'Events'
            },
            {
                to: '/admin/reports/comments',
                title: 'Comments'
            },
        ]
    }
];


const NavBar = () => {

    const [collapsed, setColapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState('');
    const { pathname } = useLocation();

    useEffect(() =>{
        if(pathname.split('/').length > 3){
            setSelectedKeys(pathname.split('/').splice(0, 4).join('/'));
        }else{
            setSelectedKeys(pathname.split('/').splice(0, 3).join('/'));
        }
    }, [pathname]);
    
    const onCollapse = collapsed  =>{
        setColapsed(!collapsed);
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(collapsed)}>
          <div className={styles.logo}>Logo</div>

          <Menu 
            theme="dark" 
            defaultSelectedKeys={['/admin/events']}   
            selectedKeys={selectedKeys}
            openKeys={'Reports'}
            mode="inline"
           >
                {
                    pages.map((item, index) =>(
                        item.child ?
                        <SubMenu 
                            key={item.title} 
                            icon={item.icon} 
                            title={item.title}
                        >
                            {
                                item.child.map(item =>(
                                    <Menu.Item key={item.to}>
                                        <NavLink to={item.to}>
                                            {item.title}
                                        </NavLink>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                        :
                        <Menu.Item key={item.to} icon={item.icon}>  
                            <NavLink to={item.to}>{item.title}</NavLink>
                        </Menu.Item>
                    ))
                }
          </Menu>

        </Sider>
    );
}

export default NavBar;