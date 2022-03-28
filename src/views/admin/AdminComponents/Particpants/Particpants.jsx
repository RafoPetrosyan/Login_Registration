import React from 'react';
import { Modal } from 'antd';
import styles from './Particpants.module.css';


const Particpants = ({propsParticpants}) =>{

    const { showParticpants, closeParticpants } = propsParticpants;


    const handleOk = () => {
        closeParticpants();
    };

    const handleCancel = () => {
        closeParticpants();  
    };
    
    return (
        <>
        <Modal title="Basic Modal" visible={showParticpants} onOk={handleOk} onCancel={handleCancel}>
            
        </Modal>
        </>
    )
}

export default Particpants;