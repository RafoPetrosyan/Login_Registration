import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Popover } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GET_REPORTS, DELETE_REPORT } from "../../../../store/adminStore/actions/actionType"; 
import { createAction } from "../../../../store/adminStore/actions/actions";
import moment from 'moment';
import _ from 'lodash';
import styles from '../Report.module.css';



const Report = () =>{

    const reportMessages = useSelector(state => state.adminReport.reportList);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(reportMessages);

    useEffect(() =>{
        dispatch(createAction(GET_REPORTS));
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() =>{
        let data;
        if(reportMessages){
            data = _.cloneDeep(reportMessages).map((item, index) =>{
                item.key = reportMessages[index]._id;
                return item;
            })
            setData(data);
        }
    }, [reportMessages])

    const deleteReportMessage = (id) =>{
        dispatch(createAction(DELETE_REPORT, id))
    }

    const createAndEdite = (id) =>{
        navigate(`${id}`)
    }



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
                <Popover content={moment(record.createdAt).format('llll')} className={styles.textPopover}>
                     {moment(record.createdAt).format('LL')}
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
                <Button type="primary" className={styles.btn} onClick={() => createAndEdite(record._id)}>
                    <EditOutlined /> Edite
                </Button>
                <Button type="primary" danger className={styles.btn} onClick={() => deleteReportMessage(record._id)}>
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
          const data = _.cloneDeep(record.messages).map((item, index) =>{
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