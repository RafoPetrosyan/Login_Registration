import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { Button, Popover } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminTable from "../../AdminComponents/AdminTable/AdminTable";
import { getReportsComment } from "../../../../store/adminStore/actions/reportCommentActions";
import moment from 'moment';
import styles from '../Report.module.css';
import { setTableList } from "../../../../store/adminStore/actions/mainActions";



const ReportComments = () =>{

    const data = useSelector(state => state.adminData);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);

    useEffect(() =>{
        if(searchParams.get('page')) setPage(searchParams.get('page'));
        return () =>{
            dispatch(setTableList(null));
        }
    }, []);

    const getData = () =>{
        setSearchParams(
            createSearchParams({
                page: page,
            })
        );
        const url = `?page=${page}&limit=${7}&`;

        dispatch(getReportsComment(url))
    }

    useEffect(() =>{
        let timeout = setTimeout(() =>{
            getData();
        }, 100);

        return () =>{
            clearTimeout(timeout);
        }
    }, [page]);
    
    const hendleReload = () =>{
        console.log('reload');
    }

    const pageChange = (page) =>{
        setPage(page)
    }

    
    console.log(data.reportComments);

    const columns = [
        { 
            title: 'Report',
            width: 200,
            fixed: 'left',  
            render: (record) => (
                <Popover content={record.content} className={styles.textPopover}>
                    {record.content.substring(0, 28) + '...'}
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
                <Popover content={moment(record.createdAt).format('llll')} className={styles.textPopover}>
                    {moment(record.createdAt).format('LL')}
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
      

    const propsTable = { 
        columns, 
        page,
        rows: data.tableList,
        dataCount: data.tableCount, 
        selection: false, 
        selectedRowKeys: [],
        pageChange,
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <Popover content='Reload' className={styles.popover} onClick={hendleReload}>
                    <div className={styles.reload}>
                        <SyncOutlined className={styles.reloadIcon}/>    
                    </div>
                </Popover>
                <div className={styles.quantity}>{data.tableCount} Report</div>
            </div>
            <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>
        </div>
    )
}

export default ReportComments;