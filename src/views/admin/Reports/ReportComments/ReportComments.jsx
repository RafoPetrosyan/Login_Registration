import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { Button, Popover } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminTable from "../../AdminComponents/AdminTable/AdminTable";
import { APPROVE_REPORT_COMMENT, GET_REPORTS_COMMENT } from "../../../../store/adminStore/actions/actionType";
import { createAction } from "../../../../store/adminStore/actions/actions";
import moment from 'moment';
import styles from '../Report.module.css';


const ReportComments = () =>{

    const data = useSelector(state => state.adminReportComment);
    const dispatch = useDispatch();


    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);

    useEffect(() =>{
        if(searchParams.get('page')) setPage(searchParams.get('page'));
    }, []);

    const getData = () =>{
        setSearchParams(
            createSearchParams({
                page: page,
            })
        );
        const url = `?page=${page}&limit=${7}&`;

        dispatch(createAction(GET_REPORTS_COMMENT, url))
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
        getData();
    }

    const pageChange = (page) =>{
        setPage(page)
    }

    const approve = (record) =>{
        dispatch(createAction(APPROVE_REPORT_COMMENT, {type: '', id: record._id}))
    }

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
            render: (record) => <p>{record.comment ? record.comment.comment : 'No Data'}</p>,
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
                <Button type="primary" className={styles.btn} onClick={() => approve(record)}>
                    Confirm
                </Button>
                <Button type="primary" danger className={styles.btn} onClick={() => approve(record)}>
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
        rows: data.reportCommentList,
        dataCount: data.reportCommentCount, 
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
                <div className={styles.quantity}>{data.reportCommentCount} Report</div>
            </div>
            <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>
        </div>
    )
}

export default ReportComments;