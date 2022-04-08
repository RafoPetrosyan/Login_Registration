import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EDITE_USER } from "../../../../store/adminStore/actions/actionType";
import { Form, Input, Button, Radio, Upload } from "antd";
import { createAction } from "../../../../store/adminStore/actions/createAction";
import { ArrowLeftOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import './styles.css';


const { TextArea } = Input;


const EditeUser = () =>{

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState([]);

    const onFinish = (values) =>{
        values.deletePictures = [''];
        dispatch(createAction(EDITE_USER, {id, data: JSON.stringify(values)}))
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
            name: ['data', 'name'],
            value: ''
        },
        {
            name: ['data', 'nickName'],
            value: ''
        },
        {
            name: ['data', 'aboutMe'],
            value: ''
        },
        {
            name: ['data', 'links', 'favebook'],
            value: ''
        },
        {
            name: ['data', 'links', 'instragram'],
            value: ''
        },
        {
            name: ['data', 'links', 'vk'],
            value: ''
        },
        {
            name: ['data', 'birthDate'],
            value: ''
        },
        {
            name: ['data', 'gender'],
            value: ''
        },
        {
            name: ['data', 'imageOptions'],
            value: fileList[0] ? fileList[0] : {}
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
                        label="Name" name={['data', 'name']}
                        rules={[{ required: true, message: 'Please input your username!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nickname" name={['data', 'nickName']}
                        rules={[{ required: true, message: 'Please input your username!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="About me" name={['data', 'aboutMe']}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Facebook" name={['data', 'links', 'favebook']}>
                        <Input addonBefore="https://www.facebook/" />
                    </Form.Item>

                    <Form.Item label="Instagram" name={['data', 'links', 'instragram']}>
                        <Input addonBefore="https://www.instagram/" />
                    </Form.Item>

                    <Form.Item label="Vkontakte" name={['data', 'links', 'vk']}>
                        <Input addonBefore="https://www.vk/" />
                    </Form.Item>
                </div>
                <div className="rightDivEditeForm">
                    <Form.Item label="Role" name={['data', 'birthDate']}>
                        <Radio.Group buttonStyle="solid" >
                            <Radio.Button value="admin">Admin</Radio.Button>
                            <Radio.Button value="user">User</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Gender" name={['data', 'gender']}>
                        <Radio.Group buttonStyle="solid" >
                            <Radio.Button value="male">Male</Radio.Button>
                            <Radio.Button value="female">Female</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Uload image" name={['data', 'imageOptions']}>
                        <ImgCrop rotate >
                            <Upload 
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChangeImage}
                                // onPreview={onPreview}
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