import React, { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import { Collapse, DatePicker, Space, Select, Button, Avatar, Popover } from 'antd';
import { EyeTwoTone, HeartTwoTone, TeamOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import 'antd/dist/antd.css';
import styles from '../Admin.module.css';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Option } = Select;


  

const Events = () => {

    const rows = useSelector(state => state.adminData.eventsList);

    // useState
    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // useCallback
    const reload = useCallback(() => {
        console.log('reload');
    }, []);

    const selectedElement = useCallback((selectedRowKeys) =>{
        setSelectedRowKeys(selectedRowKeys);
        selectedRowKeys.length ? setDisablet(false) : setDisablet(true);
    }, []);

    const searchChange = useCallback((value) =>{
        setSearchValue(value);
    }, []);

    const addElement = useCallback(() =>{
        console.log('add');
    }, []);

    const dleteElement = useCallback(() =>{
        console.log('delete');
    }, []);

    // changeFunction
    const typeChange = value =>{
        console.log(value);
    }

    const dateChange = value =>{
        console.log(value);
    }

    console.log(searchValue, 'events');
    
    const columns = [
        { 
            title: 'Organizer',
            width: 100,
            fixed: 'left',  
            render: record => (
                <Avatar size="large" className={styles.avatar}>
                    {record.organizer[0]}
                </Avatar>
            )
        },
        { 
            title: 'Picture', 
            width: 150,
            render: (record) => <img src={record.picture} className={styles.tablePicture}/>
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
            title: 'Description', 
            width: 150,
            render: (record) => (
                <Popover content={record.description} className={styles.textPopover}>
                    {record.description}
                </Popover>
            )
        },
        { 
            title: 'Date',
            width: 150,
            sorter: (a, b) => a.age - b.age,
            render: (record) => (
                <Popover content={record.date} className={styles.textPopover}>
                    {record.date}
                </Popover>
            )
        },
        { 
            title: 'Address', 
            width: 150,
            render: (record) => (
                <Popover content={record.address} className={styles.textPopover}>
                    {record.address}
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
                    <span className={styles.likeSpan}>{record.likes}</span>
                </>
            )
        },
        { 
            title: 'Views', 
            width: 150,
            render: (record) => (
                <>
                    <EyeTwoTone className={styles.likes}/>
                    <span className={styles.likeSpan}>{record.views}</span>
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
                <Popover content='List of participants'>
                    <Button type="primary" className={styles.popover}><TeamOutlined /></Button>
                </Popover>
                <Button type="primary" className={styles.btn}>
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
    const propsTable = { columns, rows, selection: true, selectedElement };
    const propsCollapse = { 
        disabled, 
        buttonText: '+ Add Event',
        tableLength: `${rows.length}  Events`,
        reload,
        searchChange,
        addElement,
        dleteElement,
    };

    return (
        <div className={styles.main} >

            <div className={styles.header}> 
                <Collapse bordered={false} className={styles.collapse}>
                    <Panel 
                        header={<CollapsePanel propsCollapse={propsCollapse}/>} 
                        className={styles.panel} 
                    >

                        <span className={styles.span}>Date</span>
                        <Space direction="vertical" size={12}>
                            <RangePicker onChange={dateChange}/>
                        </Space>
                        <span className={styles.span}>Type</span>
                        <Select
                            className={styles.select}
                            mode="multiple"
                            placeholder="Select a type"
                            optionFilterProp="children"
                            onChange={typeChange}
                        >
                            <Option value="active">Active</Option>
                            <Option value="upcomig">Upcomig</Option>
                            <Option value="finished">Finished</Option>
                        </Select>

                    </Panel>
                </Collapse>
            </div>


            <div className={styles.table}>
                <AdminTable propsTable={propsTable}/>
            </div>
        </div>
    )
}

export default Events;