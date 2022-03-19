import React from "react";
import { Button, Input, Space, Popover } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './CollapsePanel.module.css';

const { Search } = Input;



const CollapsePanel = ({propsCollapse}) =>{    

    const { disabled, searchValue, buttonText } = propsCollapse;
   
   
    return (
        <div className={styles.collapsePanel}>
            <div className={styles.btnPanel}>
                <Popover content='Reload'>
                    <div className={styles.reload}>
                        <SyncOutlined className={styles.reloadIcon}/>    
                    </div>
                </Popover>
                <div className={styles.quantity}>67</div>

                {disabled ? <Button type="primary" disabled danger className={styles.btn}>
                    Delete Selected
                </Button>
                :
                <Button type="primary" danger className={styles.btn}>
                    Delete Selected
                </Button>
                }

                <Button type="primary" className={styles.btn}>
                    {buttonText.text}
                </Button>
            </div>
            
            <Space direction="vertical">
                <Search placeholder="Search text..." onSearch={null} className={styles.search} />
            </Space>
            
        </div>
    )
}

export default CollapsePanel;