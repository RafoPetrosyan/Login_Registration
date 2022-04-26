import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Input, Form, Spin } from 'antd';
import moment from "moment";
import { SendOutlined } from '@ant-design/icons';
import { createAction } from "../../../../store/adminStore/actions/actions";
import { GET_MESSAGES, SEND_MESSAGE, SET_MESSAGES } from "../../../../store/adminStore/actions/actionType";
import styles from './Chat.module.css';

const Chat = () =>{

    // GET STATE STORE
    const messages = useSelector(state => state.chatList.messages);
    const socketMessages = useSelector(state => state.chatList.socketMessages);
    const userId = useSelector(state => state.adminData.currentAdmin?._id);

    // useState
    const [messagesState, setMessagesState] = useState(messages);
    const [inputValue, setInputValue] = useState('');
    const [loader, setLoader] = useState(false);

    const messagesEndRef = useRef(null);
    const { id } = useParams();
    const dispatch = useDispatch();


    
    useEffect(() =>{
        dispatch(createAction(GET_MESSAGES, id));
        setLoader(false);
        return () =>{
            dispatch(createAction(SET_MESSAGES, null));
        }
    }, [id]);

    // SCROLL TO BOTTOM
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }

    useEffect(() =>{
        if(loader){
            scrollToBottom();
        }
        window.scrollTo(0, 0);
    }, [messagesState, loader]);


    // SET SOCKET MESSAGE
    useEffect(() =>{
        socketMessages.map(item => {
            if(item.chatId === id){
                setMessagesState(prev => [...prev, item]);
            }
        })
    }, [socketMessages]);


    useEffect(() => {
        if(messages){
            setMessagesState(messages);
            setLoader(true);
        }
    }, [messages]);

    // const fields = useMemo(() => (
    //     [{ name: ['message'], value: inputValue }]
    // ), [inputValue]);

    const fields = [{ name: ['message'], value: inputValue }];

    const onFinish = (value) => {

        if(value.message.trim()){
            value.chatId = id;
            value.senderId = userId;
            dispatch(createAction(SEND_MESSAGE, value));

            // ADD MY MESSAGE
            const myMessage = value;
            myMessage.createdAt = moment()._d;
            setMessagesState(prev => [...prev, myMessage]);
            setInputValue(''); 
        }
    }

    return (
   
        <div className={styles.main}>

            {loader ? 
            <>
                <div className={styles.content}>

                    { messagesState.map(item => (
                            
                        <div ref={messagesEndRef}
                             className={item.senderId === userId ? styles.mymessageDiv : styles.theirMessageDiv} 
                             key={item._id ? item._id : Date.now() + item.message}
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
                    <Form onFinish={onFinish} className={styles.form} fields={fields}>
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
