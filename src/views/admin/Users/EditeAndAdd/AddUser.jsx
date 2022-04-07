import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../../../store/adminStore/actions/usersActions";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.css';





const AddUser = () =>{

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const dispatch = useDispatch();




    const onFinish = (values) => {
        if(values.confirm !== values.password){
           setConfirm('');
        }else{
            dispatch(addUser(values))
        }
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    
    const back = () =>{
        navigate(-1)
    }

    const fields = [
        {
            name: ['name'],
            value: ''
        },
        {
            name: ['nickName'],
            value: ''
        },
        {
            name: ['phone'],
            value: ''
        },
        {
            name: ['email'],
            value: ''
        },
        {
            name: ['password'],
            value: password,
        },
        {
            name: ['confirm'],
            value: confirm,
        },
    ]


    return (
        <>
            <div className='title'>
                <Button type="primary" onClick={back}>
                    <ArrowLeftOutlined />
                </Button>
               <h2>Add user</h2>
            </div>
            <Form
                fields={fields}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                // autoComplete="off"
            >

                <Form.Item
                    label="Name" name={['name']}
                    rules={[{ required: true, message: 'Please input your username!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nickname" name={['nickName']}
                    rules={[{ required: true, message: 'Please input your username!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Phone" name={['phone']}>
                    <Input />
                </Form.Item>

                <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name={['password']}
                    rules={[{ required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password onBlur={(e) => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Confirm" name={['confirm']} 
                    rules={[{ required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password onBlur={(e) => setConfirm(e.target.value)} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
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