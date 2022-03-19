import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Collapse, DatePicker, Space, Select, Button, Avatar, Popover } from 'antd';
import { EyeTwoTone, HeartTwoTone, TeamOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CollapsePanel from "../AdminComponents/CollapsePanel/CollapsePanel";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import 'antd/dist/antd.css';
import styles from './Events.module.css';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Option } = Select;


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
        dataIndex: 'title',
        width: 150,
    },
    { 
        title: 'Description', 
        dataIndex: 'description',
        width: 150,
    },
    { 
        title: 'Date',
        dataIndex: 'date',
        width: 150,
        sorter: (a, b) => a.age - b.age,
    },
    { 
        title: 'Address', 
        dataIndex: 'address',
        width: 150,
    },
    { 
        title: 'Status',
        dataIndex: 'status',
        width: 150,
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
            <Button type="primary" style={{width: 100}}>
                <EditOutlined /> Edite
            </Button>
            <Button type="primary" danger style={{width: 100}}>
                <DeleteOutlined /> Delete
            </Button>
          </div>
        )
      }
    },
  ];

  

const Events = () => {

    const rows = useSelector(state => state.adminData.eventsList);

    const [disabled, setDisablet] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const selectChange = (value) =>{
        console.log(value);
    }

    const selection = true;

    const propsTable = { columns, rows, selection };
    const propsCollapse = { disabled, searchValue, buttonText: {text: '+ Add Event'} };

    return (
        <div className={styles.events} >

            <div className={styles.header}> 
                <Collapse bordered={false} className={styles.collapse}>
                    <Panel 
                        header={<CollapsePanel propsCollapse={propsCollapse}/>} 
                        className={styles.panel} 
                    >

                        <span className={styles.span}>Date</span>
                        <Space direction="vertical" size={12}>
                            <RangePicker />
                        </Space>
                        <span className={styles.span}>Type</span>
                        <Select
                            className={styles.select}
                            mode="multiple"
                            placeholder="Select a type"
                            optionFilterProp="children"
                            onChange={selectChange}
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