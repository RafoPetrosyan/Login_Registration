import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { Button, Popover, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { GET_TYPES, DELETE_TYPE, DELETE_SELECTED_TYPE } from "../../../store/adminStore/actions/actionType";
import { createAction } from "../../../store/adminStore/actions/actions";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import moment from 'moment';
import styles from '../Admin.module.css';



const Types = () =>{

    const data = useSelector(state => state.adminTypes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // useState
    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() =>{
        if(searchParams.get('page')) setPage(searchParams.get('page'));
        if(searchParams.get('search')) setSearchValue(searchParams.get('search'));
        window.scrollTo(0, 0);
    }, []);

    const getData = () =>{
        setSearchParams(
            createSearchParams({
                page: page,
                search: searchValue,
            })
        );

        const url = `?search=${searchValue}&page=${page}&limit=${7}&`;

        dispatch(createAction(GET_TYPES, url));
    }

    useEffect(() =>{
        let timeout = setTimeout(() =>{
            getData();
        }, 100)
        return () =>{
            clearTimeout(timeout)
        }
    }, [page, searchValue]);


     const reload = () =>{
        getData();
     }

    const selectedElement = useCallback((selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
        selectedRowKeys.length ? setDisablet(false) : setDisablet(true);
    }, []);

    const searchChange = useCallback((value) =>{
        setSearchValue(prev =>{
            if(prev !== value) {
                setPage(1);
                return value
            }
            return prev;
        });
    }, []);

    const pageChange = (page) =>{
        setPage(page);
    }

    const dleteElement = (id) =>{
        dispatch(createAction(DELETE_TYPE, id));
        setTimeout(() =>{
            getData();
        }, 100);
    }

    const deleteSelected = () =>{
        dispatch(createAction(DELETE_SELECTED_TYPE, {data: {typesArray: selectedRowKeys}}));
        setTimeout(() =>{
            getData();
        }, 100)
    }

    const columns = [
        { 
            title: 'Image',
            width: 160,
            fixed: 'left',  
            render: record => (
                <>
                    { record.image.url ? 
                         <div style={{backgroundImage: `url(${record.image.url})`}} className={styles.userImg}/> 
                         : 
                         <Avatar size={70} icon={<UserOutlined />} />
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
                <Popover content={moment(record.createdAt).format('llll')} className={styles.textPopover}>
                    {moment(record.createdAt).format('LL')}
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
                <Button type="primary" className={styles.btn} onClick={() => navigate(`edite/${record._id}`)}>
                    <EditOutlined /> Edite
                </Button>
                <Button type="primary" danger className={styles.btn} onClick={() => dleteElement(record._id)}>
                    <DeleteOutlined />  Delete
                </Button>
              </div>
            )
          }
        },
    ];
      
    // propsComponents
    const propsTable = { 
        columns,
        rows: data.typeList,
        selection: true,
        page,
        dataCount: data.typeCount,
        selectedRowKeys,
        selectedElement,
        pageChange,
    };

    const propsCollapse = { 
        disabled, 
        buttonText: '+ Add Type',
        tableLength: `${data.typeCount} Types`,
        searchParams,
        reload,
        searchChange,
        deleteSelected,
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