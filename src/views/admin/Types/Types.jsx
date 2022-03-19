import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import styles from '../Admin.module.css';



const Types = () =>{

    const rows = useSelector(state => state.adminData.typeList);

    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');



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
            dataIndex: 'date',
            width: 150,
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
      


    const selection = true;
    const propsTable = { columns, rows, selection };
    const propsCollapse = { disabled, searchValue, buttonText: { text: '+ Add Type' } };

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