import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_TYPE, UPDATE_TYPE, GET_TYPE_BY_ID, SET_EDITE_TYPE, SET_ERROR_MESSAGE_TYPE } from "../../../../store/adminStore/actions/actionType";
import { createAction } from "../../../../store/adminStore/actions/actions";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.css';


const EditeAndCreateTypes = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const type = useSelector(state => state.adminTypes.editeItem);
    const errorMessage = useSelector(state => state.adminTypes.errorMessage);

    const [fileList, setFileList] = useState({});
   

    useEffect(() =>{
        if(id) dispatch(createAction(GET_TYPE_BY_ID, id));
    }, []);


    useEffect(() =>{
        if(errorMessage) alert(errorMessage);
        return () =>{
            dispatch(createAction(SET_ERROR_MESSAGE_TYPE, ''));
        }
    }, [errorMessage]);


    const onChangeImage = (ev) => {
        console.log(ev.target.files[0]);
        setFileList(ev.target.files[0]);
    };

    const onFinishCreate = (values) =>{ 
        const formData = new FormData();

        Object.entries(values).map(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('file', fileList);
        console.log(fileList);
        console.log(1111, formData);
        dispatch(createAction(CREATE_TYPE, formData)); 
    }


    const onFinishEdite = (values) =>{
        values.id = id;
        dispatch(createAction(UPDATE_TYPE, values));
    }

    const onFinishFailed = (errorInfo) =>{
        console.log(errorInfo, 'errorInfo');
    }

    const back = () =>{
        navigate(-1);
        if(type) dispatch(createAction(SET_EDITE_TYPE, null));
    }

    const fields = useMemo(() =>{
        return [
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
    }, [type])

    
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
                <Form.Item label="Upload image"
                    rules={[{ required: true, message: 'Please upload image!'}]}
                  
                >
                    {/* <ImgCrop rotate >
                        <Upload  
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChangeImage}
                            customRequest={dummyRequest}      
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop> */}
                    
                        <input type="file" id="img" name="img" 
                            accept="image/*" 
                            onChange={onChangeImage}
                        />
                               
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