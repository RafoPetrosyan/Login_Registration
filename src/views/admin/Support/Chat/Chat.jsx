import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Input, Form, Spin } from 'antd';
import moment from "moment";
import { SendOutlined } from '@ant-design/icons';
import { createAction } from "../../../../store/adminStore/actions/actions";
import { GET_MESSAGES, SEND_MESSAGE } from "../../../../store/adminStore/actions/actionType";
import styles from './Chat.module.css';

const Chat = () =>{

    const messages = useSelector(state => state.chatList.messages);
    const userId = useSelector(state => state.adminData.currentAdmin?._id);
    const [loader, setLoader] = useState(false);
    const messagesEndRef = useRef(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(createAction(GET_MESSAGES, id));
        setLoader(false);
    }, [id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }

    useEffect(() => {
        if(messages) setLoader(true);
    }, [messages]);

    useEffect(() =>{
        if(loader) scrollToBottom();
        window.scrollTo(0, 0);
    }, [loader])


    const onFinish = (value) => {
        if(value.message.trim()){
              value.chatId = id;
              value.senderId = userId;
              dispatch(createAction(SEND_MESSAGE, value));
        }
    }

    return (
   
        <div className={styles.main}>

            {loader ? 
            <>
                <div className={styles.content}>

                    { messages.map(item => (
                            
                        <div ref={messagesEndRef}
                             className={item.senderId === userId ? styles.mymessageDiv : styles.theirMessageDiv} 
                             key={item._id}
                        >
                            <div className={styles.message}>
                                <div className={styles.text}>{item.message}</div>
                                <div className={styles.date}>
                                    {moment(item.createdAt).format("HH:mm")}
                                </div>
                            </div>
                        </div>
                    )) }

                </div>   

                <div className={styles.inputDiv}>
                    <Form onFinish={onFinish} className={styles.form}>
                        <Form.Item name={['message']} className={styles.formItem}>
                            <Input 
                                placeholder="Enter your message" 
                                className={styles.input} 
                                suffix={<SendOutlined className={styles.sendIcon}/>}
                            />
                        </Form.Item>
                    </Form>
                </div> 
            </>
            :
            <Spin tip="Loading..." size="large" className={styles.spin}/>}
        </div>
    )
}

export default Chat;
