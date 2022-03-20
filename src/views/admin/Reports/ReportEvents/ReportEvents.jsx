import React, { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Popover } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminTable from "../../AdminComponents/AdminTable/AdminTable";
import 'antd/dist/antd.css';
import styles from '../Report.module.css';



const ReportEvents = () =>{

    const rows = useSelector(state => state.adminData.reportEvents);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const selectedElement = useCallback((selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
    }, []);

    const hendleReload = () =>{
        console.log('reload');
    }
        
    const columns = [
        { 
            title: 'Report',
            width: 160,
            fixed: 'left',  
            render: (record) => (
                <Popover content={record.report} className={styles.textPopover}>
                    {record.report}
                </Popover>
            )
        },
        { 
            title: 'image', 
            width: 150,
            render: (record) => <img src={record.image} className={styles.img}/>
        },
        { 
            title: 'Description', 
            width: 150,
            render: (record) => (
                <Popover content={record.description} className={styles.textPopover}>
                    {record.description}
                </Popover>
            ) 
        },
        { 
            title: 'Title', 
            width: 150,
            render: (record) => (
                <Popover content={record.title} className={styles.textPopover}>
                    {record.title}
                </Popover>
            )
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
            title: 'Location', 
            width: 150,
            render: (record) => (
                <Popover content={record.location} className={styles.textPopover}>
                    {record.location}
                </Popover>
            )
        },
        { 
        title: 'Action',
        width: 350,
        fixed: 'right',
        render: (record) =>{
            return (
            <div className={styles.renderDiv}>
                <Button type="primary" className={styles.btn}>
                    Confirm
                </Button>
                <Button type="primary" danger className={styles.btn}>
                    <DeleteOutlined />  Cancel
                </Button>
            </div>
            )
        }
        },
];

   
    const propsTable = { columns, rows, selection: true, selectedElement };

    return (
        <div className={styles.reportEvents}>
            <div className={styles.header}>
                <Popover content='Reload' className={styles.popover} onClick={hendleReload}> 
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

export default ReportEvents;