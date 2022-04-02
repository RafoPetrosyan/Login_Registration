import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { getEditeEvent, getEvents } from "../../../store/adminStore/actions";
import { Collapse, DatePicker, Space, Select, Button, Popover } from 'antd';
import { EyeTwoTone, HeartTwoTone, TeamOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import Particpants from "../AdminComponents/Particpants/Particpants";
import moment from 'moment';
import styles from '../Admin.module.css';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Option } = Select;



const Events = () => {

    const data = useSelector(state => state.adminData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useState
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const [rangeDate, setRangeDate] = useState({startDate: '', endDate: ''});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [disabled, setDisablet] = useState(true);
    const [showParticpants, setShowParticpants] = useState(false);


    // get data api and query params
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() =>{
        if(searchParams.get('page')) setPage(searchParams.get('page'));
        if(searchParams.get('searchType')) setType(searchParams.get('searchType'));
        if(searchParams.get('searchQuery')) setSearchValue(searchParams.get('searchQuery'));
    }, []);


    const getData = () => {

        setSearchParams(
            createSearchParams({
                page: page,
                searchQuery: searchValue,
                searchType: type,
            })
        );

        const url = `?searchQuery=${searchValue}&page=${page}&limit=${5}&searchType=${type}&`;
        const dateUrl = `&startDate=${rangeDate.startDate}&endDate=${rangeDate.endDate}`;

        dispatch(getEvents({url, dateUrl}))

    }

    useEffect(() =>{
        getData();
    }, [searchValue, page, type, rangeDate]);
    


    // children-function

    const reload = () =>{
        getData();
    }

    const searchChange = useCallback((value) =>{
        setSearchValue(value);
    }, []);

    const dleteElement = () =>{
        console.log('delete');
    }

    const pageChange = (page) =>{
        setPage(page)
    }

    const selectedElement = (selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
        selectedRowKeys.length ? setDisablet(false) : setDisablet(true);
    }

    const create = () =>{
      navigate('create')
    }

    const edite = (id) =>{
        dispatch(getEditeEvent(id));
        console.log(id);
        navigate('edite')
    }

    const closeParticpants = useCallback(() =>{
        setShowParticpants(false);
    }, []);

    
   
    // changeFunction
    const typeChange = value =>{
        setPage(1);
        value ? setType(value) : setType('');
    }

    const dateChange = value =>{
        if(!value) {
            setRangeDate({startDate: '', endDate: ''})
        }else{
            setRangeDate({startDate: value[0]._d, endDate: value[1]._d})
        }
    }

    // columns table
    const columns = [
        { 
            title: 'Organizer',
            width: 100,
            fixed: 'left',  
            render: record => (
                <Popover content={record.createdBy ? record.createdBy.nickname : ''} className={styles.avatarImg}>
                    {record.createdBy && record.createdBy.picture[0] ?
                        <img src={record.createdBy.picture[0].url} className={styles.tablePicture} />
                        :
                        <div className={styles.avtarName}>
                            {record.createdBy ? record.createdBy.name[0].toUpperCase() : ''}
                        </div>
                    }   
                </Popover>
            )
        },
        { 
            title: 'Picture', 
            width: 150,
            render: (record) => <img src={record.image[0].url} className={styles.tablePicture}/>
        },
        { 
            title: 'Title',
            width: 150,
            render: (record) => (
                <Popover content={record.title} className={styles.textPopover}>
                    {record.title.length > 15 ? `${record.title.substring(0, 15)}...` : record.title}
                </Popover>
            )
        },
        { 
            title: 'Description', 
            width: 150,
            render: (record) => (
                <Popover content={record.description} className={styles.textPopover}>
                    {record.description.length > 15 ? `${record.description.substring(0, 15)}...` : record.description}
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
            title: 'Location', 
            width: 150,
            render: (record) => (
                <Popover content={record.location.name} className={styles.textPopover}>
                   {`${record.location.name.substring(0, 15)}...`}
                </Popover>
            )
        },
        { 
            title: 'Status',
            width: 150,
            render: (record) => (
                <Popover content={record.status} className={styles.textPopover}>
                    {record.status}
                </Popover>
            )
        },
        { 
            title: 'Likes',
            width: 150,
            render: (record) =>(
                <>
                    <HeartTwoTone className={styles.likes}/>
                    <span className={styles.likeSpan}>{record.likesCount}</span>
                </>
            )
        },
        { 
            title: 'Views', 
            width: 150,
            render: (record) => (
                <>
                    <EyeTwoTone className={styles.likes}/>
                    <span className={styles.likeSpan}>{record.viewCount}</span>
                </>
            )
        },
        { 
        title: 'Action',
        width: 300,
        fixed: 'right',
        render: (record) =>{
            return (
            <div className={styles.renderDiv}>
                <Popover content='List of participants' onClick={() => setShowParticpants(true)}>
                    <Button type="primary" className={styles.popover}><TeamOutlined /></Button>
                </Popover>
                <Button type="primary" className={styles.btn} onClick={() => edite(record._id)}>
                    <EditOutlined /> Edite
                </Button>
                <Button type="primary" danger className={styles.btn}>
                    <DeleteOutlined /> Delete
                </Button>
            </div>
            )
        }
        },
    ];

  
    // propsComponents
    const propsTable = { 
        columns, 
        rows: data.eventsList, 
        selection: true, 
        dataCount: data.eventsListCount,
        page, 
        selectedElement, 
        pageChange 
    };

    const propsCollapse = { 
        disabled, 
        buttonText: '+ Add Event',
        tableLength: `${data.eventsListCount}  Events`,
        searchParams,
        reload,
        searchChange,
        create,
        dleteElement,
    };
    
    const propsParticpants = { showParticpants, closeParticpants };

    return (
        <div className={styles.main} >
           <div>
             <div className={styles.header}> 
                <Collapse bordered={false} className={styles.collapse}>
                    <Panel 
                        header={<CollapsePanel propsCollapse={propsCollapse}/>} 
                        className={styles.panel} 
                    >

                        <span className={styles.span}>Date</span>
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                allowClear={true}
                                onChange={dateChange}
                            />
                        </Space>
                        <span className={styles.span}>Type</span>
                        <Select
                            className={styles.select}
                            allowClear={true}
                            defaultValue={type}
                            onChange={typeChange}
                            placeholder="Select a type"
                        >
                            <Option value="active">Active</Option>
                            <Option value="upcoming">Upcoming</Option>
                            <Option value="finished">Finished</Option>
                        </Select>

                    </Panel>
                </Collapse>
                </div> 


                <div className={styles.table}>
                    <AdminTable propsTable={propsTable}/>
                </div>
            </div>
            
            <Particpants propsParticpants={propsParticpants}/> 
        </div>
    )
}

export default Events;