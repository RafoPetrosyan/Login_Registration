import React from "react";
import { useSelector } from "react-redux";
import { Button, Popover } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AdminTable from "../../AdminComponents/AdminTable/AdminTable";
import 'antd/dist/antd.css';
import styles from '../Report.module.css';

 


const ReportUsers = () =>{

    const rows = useSelector(state => state.adminData.reportUsers);

    const columns = [
        { 
            title: 'Report',
            width: 160,
            fixed: 'left',  
            dataIndex: 'report',
        },
        { 
            title: 'Comments', 
            dataIndex: 'comment',
            width: 150,
        },
        { 
            title: 'Date', 
            width: 150,
            render: (record) => (
                <Popover content={record.date} className={styles.textPopover}>
                    {record.date}
                </Popover>
            )
        },
        { 
        title: 'Action',
        width: 200,
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

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <Popover content='Reload' className={styles.popover}>
                    <div className={styles.reload}>
                        <SyncOutlined className={styles.reloadIcon}/>    
                    </div>
                </Popover>
                <div className={styles.quantity}>{rows.length} Report</div>
            </div>
            <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>
        </div>
    )
}

export default ReportUsers;