import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import 'antd/dist/antd.css';
import styles from './AdminTable.module.css';


const AdminTable = ({propsTable}) => {

    const { columns, rows, dataCount, selectedElement, pageChange, page, selectedRowKeys } = propsTable;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() =>{
      let timeout;
        if(!rows) {
          setData([]);
          timeout = setTimeout(() =>{
            setLoading(false);
          }, 400)
        }else{

        setLoading(true);

        let data =  _.cloneDeep(rows).map((item, index) =>{
            item.key = rows[index]._id;
            return item;
        })

        timeout = setTimeout(() => {
            setData(data);
            setLoading(false);
        }, 400)
      }

      return () =>{
        clearTimeout(timeout);
      }
    }, [rows])


    const onSelectChange = selectedRowKeys => {
        selectedElement(selectedRowKeys);
    };

    const hasSelected = selectedRowKeys.length > 0;
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
          pagination={{
            pageSize: 7,
            showSizeChanger: false,
            current: page,
            total: dataCount,
              onChange: (pageNum) => pageChange(pageNum)
            }}
          
          loading={loading}
        />
      </div>
    );
}
export default AdminTable;



