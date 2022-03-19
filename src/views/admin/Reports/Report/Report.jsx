import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from 'lodash';
import { Table, Button, Popover } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../Report.module.css';



const Report = () =>{

    const rows = useSelector(state => state.adminData.reportList)
    const [data, setData] = useState(null);
    
    useEffect(() =>{
        let data = _.cloneDeep(rows).map((item, index) =>{
            item.key = rows[index].id;
            return item;
        })
        setData(data);
    }, [rows])


    const columns = [
        { 
            title: 'Type', 
            dataIndex: 'type',
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
          width: 150,
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

    const expandedRowRender = (record) =>{
          const columns = [
              { 
                title: 'EN', 
                render: (record) => (
                    <Popover content={record.en} className={styles.textPopover}>
                        {record.en}
                    </Popover>
                )
              },
              {
                title: 'RU',
                render: (record) => (
                    <Popover content={record.ru} className={styles.textPopover}>
                        {record.ru}
                    </Popover>
                )
              },
          ]
          const data = _.cloneDeep(record.text).map((item, index) =>{
              item.key = index + record.type;
              return item;
          })
          return <Table columns={columns} dataSource={data} pagination={false} />;
    } 

      
    return (
        <div className={styles.main}>
            <div className={styles.table}>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1000 }}
                    expandable={{expandedRowRender}}
                />
            </div>
        </div>
    )
}

export default Report;