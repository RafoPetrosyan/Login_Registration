import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import 'antd/dist/antd.css';
import styles from './AdminTable.module.css';


const AdminTable = ({propsTable}) => {

    const {columns, rows} = propsTable;

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState(null);
    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() =>{
      let data =  _.cloneDeep(rows).map((item, index) =>{
          item.key = rows[index].id;
          return item;
      })
      setData(data);
    }, [rows])


    
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    return (
      <div className={styles.table}>
        <div style={{ marginBottom: 16 }}>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={propsTable.selection ? rowSelection : false} 
          columns={columns}
          dataSource={data} 
          scroll={{ x: 1000 }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    );
}
export default AdminTable;



