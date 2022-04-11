import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';
import { Collapse, Switch, Button, Popover, Radio, Avatar } from 'antd';
import { CloseCircleOutlined, CheckCircleTwoTone, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { GET_USERS, DELETE_USER, DELETE_SELECTED_USERS } from "../../../store/adminStore/actions/actionType";
import { createAction } from "../../../store/adminStore/actions/actions";
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import moment from 'moment';
import styles from '../Admin.module.css';

const { Panel } = Collapse;

const Users = () =>{

    const data = useSelector(state => state.adminUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useState
    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [page, setPage] = useState(1);
    const [date, setDate] = useState('');
    const [onlyInActive, setOnlyInActive] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() =>{
        if(searchParams.get('page')) setPage(searchParams.get('page'));
        if(searchParams.get('search')) setSearchValue(searchParams.get('search'));
        if(searchParams.get('date')) setDate(searchParams.get('date'));
    }, []);

    const getData = () => {

        setSearchParams(
            createSearchParams({
                page: page,
                search: searchValue,
                // onlyInActive: onlyInActive,
                date: date,
            })
        );

        const url = `?page=${page}&search=${searchValue}&limit=${7}&onlyInActive=${onlyInActive ? 'disable' : 'enable'}&date=${date}&`;
        dispatch(createAction(GET_USERS, url))

    }

    useEffect(() =>{
        let timeout = setTimeout(() =>{
            getData();
        }, 100);
        return () =>{
            clearTimeout(timeout);
        }
    }, [searchValue, page, onlyInActive, date]);


    // useCallback
    const reload = () =>{
       getData();
    }
    const pageChange = (page) =>{
        setPage(page)
    }

    const selectedElement = (selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
        selectedRowKeys.length ? setDisablet(false) : setDisablet(true);
    }

    const searchChange = useCallback((value) =>{
        setSearchValue(prev =>{
            if(prev !== value) {
                setPage(1);
                return value
            }
            return prev;
        });
        
    }, []);

    const deleteSelected = () =>{ 
        dispatch(createAction(DELETE_SELECTED_USERS, {usersId: selectedRowKeys}))
    }

    const userEdite = (id) =>{
        navigate(`edite/${id}`)
    }

    const switchChange = (e) =>{
        setPage(1);
        setOnlyInActive(e)
    }

    const userDelete = (id) =>{
        dispatch(createAction(DELETE_USER, id))
        getData();
    }
    
    const columns = [
        { 
            title: 'Image',
            width: 160,
            fixed: 'left',  
            render: record => (
                <>
                  {record.picture.length ? 
                        <div style={{backgroundImage: `url(${record.picture[0].url})`}} className={styles.userImg}/> 
                        : 
                        <Avatar size={70} icon={<UserOutlined />} />
                    }
                </>
            )
        },
        { 
            title: 'Name', 
            dataIndex: 'name',
            width: 150,
        },
        { 
            title: 'Nickname',
            dataIndex: 'nickname',
            width: 150,
        },
        { 
            title: 'Phone', 
            width: 150,
            render: (record) => record.phone ? record.phone : 'No info',
        },
        { 
            title: 'Email',
            width: 150,
            render: (record) => (
                <Popover content={record.email} className={styles.textPopover}>
                    {record.email.length > 15 ? `${record.email.substring(0, 12)}...` : record.email}
                </Popover>
            )
        },
        { 
            title: 'Date', 
            width: 150,
            sorter: (a, b) => a.age - b.age,
            render: (record) => (
                <Popover content={moment(record.date).format('llll')} className={styles.textPopover}>
                    {moment(record.date).format('LL')}
                </Popover>
            )
        },
        { 
            title: 'Role',
            dataIndex: 'role',
            width: 150,
        },
        { 
            title: 'About',
            width: 150,
            render: (record) => record.about ? record.about : 'No info',
        },
        { 
          title: 'Action',
          width: 300,
          fixed: 'right',
          render: (record) =>{
            return (
              <div className={styles.renderDiv}>
                <Button type="primary" className={styles.btn} onClick={() => userEdite(record._id)}>
                    <EditOutlined /> Edite
                </Button>
                <Button type="primary" danger className={styles.btn} onClick={() => userDelete(record._id)}>
                    <DeleteOutlined />  Delete
                </Button>
                <Popover content={record.active ? 'Acount active' : 'Acount is not active'} >
                    <Button className={styles.isActiveBtn}>
                        {
                            record.active ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : 
                            <CloseCircleOutlined style={{color: 'red'}}/> 
                        }
                    </Button>
                </Popover>
              </div>
            )
          }
        },
    ];
      
    // propsComponents
    const propsTable = { 
        columns,
        rows: data.userList,
        selection: true, 
        page, 
        selectedRowKeys,
        dataCount: data.userCount,
        pageChange, 
        selectedElement
    };

    const propsCollapse = { 
            searchParams,
            disabled, 
            buttonText: '+ Add User',
            tableLength: `${data.userCount}  Users`,
            selectedRowKeys,
            reload,
            searchChange,
            deleteSelected,
        };

    return (
        <div className={styles.main}>


            <div className={styles.header}>

                <Collapse bordered={false} className={styles.collapse}>
                    <Panel 
                        header={<CollapsePanel propsCollapse={propsCollapse}/>} 
                        className={styles.panel} 
                    >
                        <div className={styles.childPnel}>

                            <span className={styles.span}>Active acounts</span>
                            <Switch
                                defaultChecked={onlyInActive}
                                onChange={(e) => switchChange(e)}
                                className={styles.switch}
                            />
                               
                            <span className={styles.span}>Date filtering</span>
                            <div className={styles.btnDiv}>
                                <Radio.Group defaultValue="" buttonStyle="solid"
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)}
                                >
                                    <Radio.Button value="asc">To rise</Radio.Button>
                                    <Radio.Button value="desc">To go down</Radio.Button>
                                    <Radio.Button value="">Defoult</Radio.Button>
                                </Radio.Group>

                            </div>
                        </div>

                    </Panel>
                </Collapse>
            </div>


            <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>



        </div>
    )
}

export default Users;