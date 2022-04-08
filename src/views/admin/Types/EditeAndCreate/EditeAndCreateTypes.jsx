import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setEditeItem } from "../../../../store/adminStore/actions/mainActions";
import { createType, getTypeById, updateType } from "../../../../store/adminStore/actions/typesActions";
import { Form, Input, Button, Upload } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import './styles.css';



const EditeAndCreateTypes = () =>{

    const type = useSelector(state => state.adminData.editeItem);

    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() =>{
        if(id) dispatch(getTypeById(id));
    }, []);

    const onChangeImage = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
    };


    const onFinishEdite = (values) =>{
        values.id = id;
        dispatch(updateType(values))
    }

    const onFinishCreate = (values) =>{
        dispatch(createType(values))
     }

    const onFinishFailed = (errorInfo) =>{
        console.log(errorInfo);
    }

    const back = () =>{
        navigate(-1);
        if(type) dispatch(setEditeItem(null));
    }

    const fields = [
        {
            name: ['imageOptions'],
            value: type ? type.image : {}
        },
        {
            name: ['en'],
            value: type ? type.en : '',
        },
        {
            name: ['ru'],
            value: type ? type.ru : '',
        },
        {
            name: ['key'],
            value: type ? type.key : '',
        }
    ]

    return (
        <>
            <div className='title'>
                <Button type="primary" onClick={back}>
                    <ArrowLeftOutlined />
                </Button>
               <h2>{id ? 'Edite type' : 'Create type'}</h2>
            </div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={type ? onFinishEdite : onFinishCreate}
                onFinishFailed={onFinishFailed}
                fields={fields}
            >
                <Form.Item label="Uload image" name={['imageOptions']}
                    rules={[{ required: true, message: 'Please upload image!'}]}
                >
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

                <Form.Item
                    label="EN" name={['en']}
                    rules={[{ required: true, message: 'Please input type!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="RU" name={['ru']}
                    rules={[{ required: true, message: 'Please input type!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Key" name={['key']}
                    rules={[{ required: true, message: 'Please input type!'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
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


export default EditeAndCreateTypes;