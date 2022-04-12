import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EDITE_USER, GET_EDITE_USER, SET_ERROR_MESSAGE_USERS } from "../../../../store/adminStore/actions/actionType";
import { Form, Input, Button, Radio, Upload } from "antd";
import { createAction } from "../../../../store/adminStore/actions/actions";
import { ArrowLeftOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import './styles.css';

const { TextArea } = Input;


const EditeUser = () =>{

    const user = useSelector(state => state.adminUser.editeUser);
    const errorMessege = useSelector(state => state.adminUser.errorMessege);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState([]);

    console.log(user);

    useEffect(() =>{
        dispatch(createAction(GET_EDITE_USER, id));
    }, []);

    useEffect(() =>{
        if(errorMessege) alert(errorMessege);
        return () =>{
            dispatch(createAction(SET_ERROR_MESSAGE_USERS, ''));
        }
    }, [errorMessege]);

    const onFinish = (values) =>{
        values.deletePictures = [''];
        dispatch(createAction(EDITE_USER, {id, data: {data: JSON.stringify(values)}}))
    }

    const onFinishFailed = (errorInfo) =>{
        console.log(errorInfo);
    }

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
    };

    const onChangeImage = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };

    const fields = [
        {
            name: ['name'],
            value: user ? user.user_data.name : '',
        },
        {
            name: ['nickname'],
            value: user ? user.user_data.nickname : '',
        },
        {
            name: ['aboutMe'],
            value: user ? user.user_data?.aboutMe : '',
        },
        {
            name: ['links', 'favebook'],
            value: user ? user.user_data.links?.facebook : '',
        },
        {
            name: ['links', 'instragram'],
            value: user ? user.user_data.links?.instagram : '',
        },
        {
            name: ['links', 'vkontakte'],
            value: user ? user.user_data.links?.vkontakte : '',
        },
        {
            name: ['role'],
            value: user ? user.user_data?.role : '',
        },
        {
            name: ['gender'],
            value: user ? user.user_data?.gender : '',
        },
        {
            name: ['imageOptions'],
            value: fileList[0] ? fileList[0] : {},
        },
    ]
  

    return (
        <>
            <div className='title'>
                <Button type="primary" onClick={() => navigate(-1)}>
                    <ArrowLeftOutlined />
                </Button>
               <h2>Edite user</h2>
            </div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='editeForm'
                fields={fields}
                // autoComplete="off"
            >
                <div className="leftDivEditeForm">
                    <Form.Item
                        label="Name" name={['name']}
                        rules={[{ required: true, message: 'Please input your username!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nickname" name={['nickname']}
                        rules={[{ required: true, message: 'Please input your username!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="About me" name={['aboutMe']}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Facebook" name={['links', 'favebook']}>
                        <Input addonBefore="https://www.facebook/" />
                    </Form.Item>

                    <Form.Item label="Instagram" name={['links', 'instragram']}>
                        <Input addonBefore="https://www.instagram/" />
                    </Form.Item>

                    <Form.Item label="Vkontakte" name={['links', 'vkontakte']}>
                        <Input addonBefore="https://www.vk/" />
                    </Form.Item>
                </div>
                <div className="rightDivEditeForm">
                    <Form.Item label="Role" name={['role']}>
                        <Radio.Group buttonStyle="solid" >
                            <Radio.Button value="admin">Admin</Radio.Button>
                            <Radio.Button value="user">User</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Gender" name={['gender']}>
                        <Radio.Group buttonStyle="solid" >
                            <Radio.Button value="Male">Male</Radio.Button>
                            <Radio.Button value="Female">Female</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Uload image" name={['imageOptions']}>
                        <ImgCrop rotate >
                            <Upload 
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChangeImage}
                                customRequest={dummyRequest}      
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="reset" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}

export default EditeUser;