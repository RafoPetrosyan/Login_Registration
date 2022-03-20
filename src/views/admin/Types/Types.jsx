import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Popover } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import styles from '../Admin.module.css';



const Types = () =>{

    const rows = useSelector(state => state.adminData.typeList);

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
            title: 'EN', 
            dataIndex: 'en',
            width: 150,
        },
        { 
            title: 'RU',
            dataIndex: 'ru',
            width: 150,
        },
        { 
            title: 'Date', 
            sorter: (a, b) => a.age - b.age,
            width: 150,
            render: (record) => (
                <Popover content={record.date} className={styles.textPopover}>
                    {record.date}
                </Popover>
            )
        },
        { 
          title: 'Action',
          width: 180,
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
              </div>
            )
          }
        },
    ];
      
    // propsComponents
    const propsTable = { columns, rows, selection: true, selectedElement };
    const propsCollapse = { 
            disabled, 
            buttonText: '+ Add Type',
            tableLength: `${rows.length}  Types`,
            reload,
            searchChange,
            addElement,
            dleteElement,
        };

    return (
        <div >
           <div className={styles.headerTypes}>
                <CollapsePanel propsCollapse={propsCollapse}/>
           </div>
           <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
           </div>
        </div>
    )
}

export default Types;