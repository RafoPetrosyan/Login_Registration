import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Collapse, Switch, Button, Popover, Radio  } from 'antd';
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import { CloseCircleOutlined, CheckCircleTwoTone, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import 'antd/dist/antd.css';
import styles from '../Admin.module.css';



const { Panel } = Collapse;


const Users = () =>{

    const rows = useSelector(state => state.adminData.userList);

    // useState
    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    // useCallback
    const reload = useCallback(() => {
        console.log('reload');
    }, []);

    const selectedElement = useCallback((selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
        selectedRowKeys.length ? setDisablet(false) : setDisablet(true);
    }, []);

    const searchChange = useCallback((value) =>{
        setSearchValue(value);
    }, []);

    const addElement = useCallback(() =>{
        console.log('add');
    }, []);

    const dleteElement = useCallback(() =>{
        console.log('delete');
    }, []);


     // changeFunction
    const swichChange = value =>{
        console.log(value);
    }

    const dateChange = e =>{
        console.log(e.target.value);
    }


    console.log(searchValue);
    
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
            width: 150,
            render: (record) => (
                <Popover content={record.email} className={styles.textPopover}>
                    {record.email}
                </Popover>
            )
        },
        { 
            title: 'Date', 
            width: 150,
            sorter: (a, b) => a.age - b.age,
            render: (record) => (
                <Popover content={record.date} className={styles.textPopover}>
                    {record.date}
                </Popover>
            )
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
              <div className={styles.renderDiv}>
                <Button type="primary" className={styles.btn}>
                    <EditOutlined /> Edite
                </Button>
                <Button type="primary" danger className={styles.btn}>
                    <DeleteOutlined />  Delete
                </Button>
                <Popover content={record.active ? 'Acount active' : 'Acount is not active'} >
                    <Button className={styles.isActiveBtn}>
                        {
                            record.active ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : 
                            <CloseCircleOutlined style={{color: 'red'}}/> 
                        }
                    </Button>
                </Popover>
              </div>
            )
          }
        },
    ];
      

    // propsComponents
    const propsTable = { columns, rows, selection: true, selectedElement};
    const propsCollapse = { 
            disabled, 
            buttonText: '+ Add User',
            tableLength: `${rows.length}  Users`,
            reload,
            searchChange,
            addElement,
            dleteElement,
        };

    return (
        <div className={styles.main}>


            <div className={styles.header}>

                <Collapse bordered={false} className={styles.collapse}>
                    <Panel 
                        header={<CollapsePanel propsCollapse={propsCollapse}/>} 
                        className={styles.panel} 
                    >
                        <div className={styles.childPnel}>
                            <span className={styles.span}>Active acounts</span>
                            <Switch defaultChecked onChange={swichChange} className={styles.switch}/>
                            <span className={styles.span}>Date filtering</span>
                            <div className={styles.btnDiv}>
                                <Radio.Group defaultValue="defoult" buttonStyle="solid" onChange={dateChange}>
                                    <Radio.Button value="rise">To rise</Radio.Button>
                                    <Radio.Button value="down">To go down</Radio.Button>
                                    <Radio.Button value="defoult">Defoult</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>

                    </Panel>
                </Collapse>
            </div>


            <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>
        </div>
    )
}

export default Users;