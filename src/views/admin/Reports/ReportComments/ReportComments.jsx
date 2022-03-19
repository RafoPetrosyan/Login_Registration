import React from "react";
import { useSelector } from "react-redux";
import { Button, Popover } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminTable from "../../AdminComponents/AdminTable/AdminTable";
import 'antd/dist/antd.css';
import styles from '../Report.module.css';



const ReportComments = () =>{

    const rows = useSelector(state => state.adminData.reportComments);
    


    const columns = [
        { 
            title: 'Report',
            width: 200,
            fixed: 'left',  
            render: (record) => (
                <Popover content={record.report} className={styles.textPopover}>
                    {record.report.substring(0, 28) + '...'}
                </Popover>
            )
        },
        { 
            title: 'Comments', 
            render: (record) => <p>{record.comment ? record.comment : 'No Data'}</p>,
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
          width: 230,
          fixed: 'right',
          render: (record) =>{
            return (
              <div className={styles.renderDiv}>
                <Button type="primary" className={styles.btn} >
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
      

    const propsTable = { columns, rows };

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

export default ReportComments;