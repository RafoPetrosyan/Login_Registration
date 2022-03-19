import React, { useState } from "react";
import { Collapse, Switch, Button, Popover } from 'antd';
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import { CloseCircleOutlined, CheckCircleTwoTone, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './Users.module.css';
import eventStyles from '../Events/Events.module.css';
import { useSelector } from "react-redux";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";

const { Panel } = Collapse;


const columns = [
    { 
        title: 'Image',
        width: 160,
        fixed: 'left',  
        render: record => (
            <>
              {record.image ? 
                    <div style={{backgroundImage: `url(${record.image})`}} className={styles.img}/> 
                    : 
                    <div className={styles.avatarName}>{record.name[0]}</div>
                }
            </>
        )
    },
    { 
        title: 'Name', 
        dataIndex: 'name',
        width: 150,
    },
    { 
        title: 'Acount Name',
        dataIndex: 'acountName',
        width: 150,
    },
    { 
        title: 'Phone', 
        dataIndex: 'phone',
        width: 150,
    },
    { 
        title: 'Email',
        dataIndex: 'email',
        width: 150,
    },
    { 
        title: 'Date', 
        dataIndex: 'date',
        width: 150,
    },
    { 
        title: 'Role',
        dataIndex: 'role',
        width: 150,
    },
    { 
        title: 'About',
        width: 150,
        render: (record) => record.about ? record.about : 'No Data',
    },
    { 
      title: 'Action',
      width: 300,
      fixed: 'right',
      render: (record) =>{
        return (
          <div className={eventStyles.renderDiv}>
            <Button type="primary" style={{width: 100}}>
                <EditOutlined /> Edite
            </Button>
            <Button type="primary" danger style={{width: 100}}>
                <DeleteOutlined />  Delete
            </Button>
            <Popover content={record.active ? 'Acount active' : 'Acount is not active'} >
                <Button className={styles.isActiveBtn}>
                    {record.active ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleOutlined style={{color: 'red'}}/> }
                </Button>
            </Popover>
          </div>
        )
      }
    },
];
  

const Users = () =>{

    const rows = useSelector(state => state.adminData.userList);

    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const swichChange = e =>{
        console.log(e);
    }

    const selection = true;
    const propsTable = { columns, rows, selection };
    const propsCollapse = { disabled, searchValue, buttonText: {text: '+ Add User'} };

    return (
        <div className={styles.users}>


            <div className={eventStyles.header}>

                <Collapse bordered={false} className={eventStyles.collapse}>
                    <Panel 
                        header={<CollapsePanel propsCollapse={propsCollapse}/>} 
                        className={styles.panel} 
                    >
                        <div className={styles.childPnel}>
                            <span className={eventStyles.span}>Active acounts</span>
                            <Switch defaultChecked onChange={swichChange} className={styles.switch}/>
                            <span className={eventStyles.span}>Date filtering</span>
                            <div className={styles.btnDiv}>
                                <Button className={styles.btn}>To rise</Button>
                                <Button className={styles.btn}>To go down</Button>
                                <Button type="primary" className={styles.btn}>Defoult</Button>
                            </div>
                        </div>

                    </Panel>
                </Collapse>
            </div>


            <div className={eventStyles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>
        </div>
    )
}

export default Users;