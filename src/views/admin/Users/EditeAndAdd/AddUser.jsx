import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER, SET_ERROR_MESSAGE_USERS } from "../../../../store/adminStore/actions/actionType";
import { createAction } from "../../../../store/adminStore/actions/actions";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.css';


const AddUser = () =>{

    const errorMessege = useSelector(state => state.adminUser.errorMessege);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
        if(errorMessege) alert(errorMessege);
        return () =>{
            dispatch(createAction(SET_ERROR_MESSAGE_USERS, ''));
        }
    }, [errorMessege]);


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        if(values.confirm !== values.password){
            alert('confirm');
        }else{
            delete values.confirm;
            dispatch(createAction(ADD_USER, values));
        }
    };

    const back = () =>{
        navigate(-1);
    };

    return (
        <>
            <div className='title'>
                <Button type="primary" onClick={back}>
                    <ArrowLeftOutlined />
                </Button>
               <h2>Add user</h2>
            </div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label="Name" name={['name']}
                    rules={[{ required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Nickname" name={['nickname']}
                    rules={[{ required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item label="Phone" name={['phone']}>
                    <Input/>
                </Form.Item>

                <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input/>
                </Form.Item>

                <Form.Item label="Password" name={['password']}
                    rules={[{ required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item label="Confirm" name={['confirm']} 
                    rules={[{ required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button htmlType="reset" onClick={back}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddUser;