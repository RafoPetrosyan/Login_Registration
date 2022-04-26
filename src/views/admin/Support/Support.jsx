import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Popover, Empty } from 'antd';
import { createAction } from "../../../store/adminStore/actions/actions";
import { GET_CHATS, SET_MESSAGES } from "../../../store/adminStore/actions/actionType";
import { MailFilled } from '@ant-design/icons';
import styles from './Suport.module.css';
import Chat from "./Chat/Chat";

const Support = () =>{

    const chats = useSelector(state => state.chatList.chats);
    const userId = useSelector(state => state.adminData.currentAdmin?._id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() =>{
        if(userId){
            dispatch(createAction(GET_CHATS, userId));
        }
    }, [userId]);

   

    return (
        <div className={styles.main}>

            <div className={styles.chatList}>

                { chats ? 
                    chats.map(item => (
                        <div 
                            className={item._id === id ? styles.activeChat : styles.chatListItem} 
                            key={item._id}
                            onClick={() => navigate(`/admin/support/${item._id}`)}
                        >
                            <div className={styles.chatListItemName}>
                                <p className={styles.userName}>{item.userData.name}</p>
                                <p className={styles.myMessages}>
                                    {item.senderId ? `You: ${item.message.substring(0, 15)}` : `${item.message.substring(0, 15)}`}
                                </p>
                            </div>
                            <div className={styles.emailMessages}>
                                <Popover content='Send message to mail' className={styles.popover}>
                                    <MailFilled className={styles.emailIcon}/>
                                </Popover>
                            </div>
                        </div>
                    ))
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={styles.empty}/>
                }

            </div>


            {/* CHAT COMPONENT */}
            { id ? 
                <div className={styles.messages}>
                    <Chat/>
                </div>
                :
                <div className={styles.noMessage}></div>
            }
            
        </div>
    )
}

export default Support;
