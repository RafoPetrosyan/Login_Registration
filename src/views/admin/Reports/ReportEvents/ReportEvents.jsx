import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, createSearchParams } from "react-router-dom";
import { Button, Popover } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from "moment";
import AdminTable from "../../AdminComponents/AdminTable/AdminTable";
import { approveReportEvent, getreportEvents } from "../../../../store/adminStore/actions/reportEventActions";
import styles from '../Report.module.css';
import { setTableList } from "../../../../store/adminStore/actions/mainActions";



const ReportEvents = () =>{

    const data = useSelector(state => state.adminData);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

        dispatch(getreportEvents(url));
    }

    useEffect(() =>{
        let timeout = setTimeout(() =>{
            getData();
        }, 100);

        return () =>{
            clearTimeout(timeout);
        }
    }, [page]);

    const selectedElement = useCallback((selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
    }, []);

    const hendleReload = () =>{
        console.log('reload');
    }

    const pageChange = (page) =>{
        setPage(page)
    }

    const approve = (record) =>{
        dispatch(approveReportEvent({type: record.event.type, id: record._id}))
    }

        
    const columns = [
        { 
            title: 'Report',
            width: 160,
            fixed: 'left',  
            render: (record) => (
                <Popover content={record.content} className={styles.textPopover}>
                    {record.content}
                </Popover>
            )
        },
        { 
            title: 'image', 
            width: 150,
            render: (record) => <img src={record.event.image[0].url} className={styles.img}/>
        },
        { 
            title: 'Description', 
            width: 150,
            render: (record) => (
                <Popover content={record.event.description} className={styles.textPopover}>
                    {record.event.description}
                </Popover>
            ) 
        },
        { 
            title: 'Title', 
            width: 150,
            render: (record) => (
                <Popover content={record.event.title} className={styles.textPopover}>
                    {record.event.title}
                </Popover>
            )
        },
        { 
            title: 'Date', 
            width: 150,
            render: (record) => (
                <Popover content={moment(record.event.createdAt).format('llll')} className={styles.textPopover}>
                    {moment(record.event.createdAt).format('LL')}
                </Popover>
            )
        },
        { 
            title: 'Location', 
            width: 150,
            render: (record) => (
                <Popover content={record.event.location.name} className={styles.textPopover}>
                    {`${record.event.location.name.substring(0, 15)}...`}
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
                <Button type="primary" className={styles.btn} onClick={() => approve(record)}>
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
    console.log(data.tableCount);
   
    const propsTable = { 
        columns, 
        page,
        rows: data.tableList,
        dataCount: data.tableCount, 
        selection: true, 
        selectedRowKeys,
        pageChange,
        selectedElement 
    };

    return (
        <div className={styles.reportEvents}>
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

export default ReportEvents;