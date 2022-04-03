import React, { useEffect, useState } from "react";
import { Button, Input, Space, Popover } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './CollapsePanel.module.css';

const { Search } = Input;

const CollapsePanel = ({propsCollapse}) =>{    

    const { 
            disabled, buttonText, tableLength, searchChange, 
            deleteSelected, reload, create, searchParams,
        } = propsCollapse;


    const [value, setValue] = useState('');

    useEffect(() =>{
        if(searchParams.get('search')) setValue(searchParams.get('search'));
    }, []);

    useEffect(() =>{
        let timeouth = setTimeout(() =>{
            searchChange(value)
        }, 200)
        return () =>{
            clearTimeout(timeouth);
        }
    }, [value]);

   
    return (
        <div className={styles.collapsePanel}>
            <div className={styles.btnPanel}>
                <Popover content='Reload' >
                    <div className={styles.reload} onClick={() => reload()}>
                        <SyncOutlined className={styles.reloadIcon}/>    
                    </div>
                </Popover>
                <div className={styles.quantity}>{tableLength}</div>

                {disabled ? 
                    <Button type="primary" disabled danger className={styles.btn}>
                         Delete Selected
                    </Button>
                :
                    <Button type="primary" danger className={styles.btn} onClick={() => deleteSelected()}>
                        Delete Selected
                    </Button>
                }

                <Button type="primary" className={styles.btn} onClick={() => create()}>
                    {buttonText}
                </Button>
            </div>
            
            <Space direction="vertical">
                <Search 
                    value={value}
                    placeholder="Search text..."
                    onChange={(e) => setValue(e.target.value)}  
                    className={styles.search} 
                />
            </Space>
            
        </div>
    )
}

export default CollapsePanel;