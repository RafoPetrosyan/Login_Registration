import React, { useState } from "react";
import { Button, Input, Space, Popover } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './CollapsePanel.module.css';

const { Search } = Input;



const CollapsePanel = ({propsCollapse}) =>{    

    const { 
        disabled, 
        buttonText, 
        tableLength, 
        searchChange, 
        dleteElement, 
        reload, 
        addElement 
    } = propsCollapse;

    const hendleReload = () =>{
        reload();
    }

    const onSearch = value =>{
        searchChange(value);
    }

    const hendleDelete = () =>{
        dleteElement();
    }

    const addChange = () =>{
        addElement();
    }
   
    return (
        <div className={styles.collapsePanel}>
            <div className={styles.btnPanel}>
                <Popover content='Reload' >
                    <div className={styles.reload} onClick={hendleReload}>
                        <SyncOutlined className={styles.reloadIcon}/>    
                    </div>
                </Popover>
                <div className={styles.quantity}>{tableLength}</div>

                {disabled ? 
                    <Button type="primary" disabled danger className={styles.btn}>
                         Delete Selected
                    </Button>
                :
                <Button type="primary" danger className={styles.btn} onClick={hendleDelete}>
                    Delete Selected
                </Button>
                }

                <Button type="primary" className={styles.btn} onClick={addChange}>
                    {buttonText}
                </Button>
            </div>
            
            <Space direction="vertical">
                <Search 
                    placeholder="Search text..."
                    onSearch={onSearch}  
                    className={styles.search} 
                />
            </Space>
            
        </div>
    )
}

export default CollapsePanel;