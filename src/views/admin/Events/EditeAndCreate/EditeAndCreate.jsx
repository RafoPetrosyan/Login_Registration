import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Select, Button, DatePicker, Slider, Upload } from 'antd';
import { CREATE_EVENT, GET_EDITE_EVENT, UPDATE_EVENT, SET_EDITE_EVENT } from '../../../../store/adminStore/actions/actionType';
import { createAction } from '../../../../store/adminStore/actions/createAction';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import './EditeAndCreate.css';


const { Option } = Select;

const types = [
    {
        name: 'Кофе/Чай',
        value: 'coffee_tea'
    },
    {
        name: 'Ланч',
        value: 'lunch'
    },
    {
        name: 'Спорт',
        value: 'sport'
    },
    {
        name: 'Кино',
        value: 'cinema'
    },
    {
        name: 'Караоке',
        value: 'karaoke'
    },
    {
        name: 'Онлайн игры',
        value: 'online-games'
    },
    {
        name: 'Oбсуждение',
        value: 'discussion'
    },
    {
        name: 'Вечеринка',
        value: 'party'
    },
    {
        name: 'Другое',
        value: 'other'
    }
];

const status = [
    {
        name: 'In Progress',
        value: 'in_progress'
    },
    {
        name: 'Upcoming',
        value: 'up_coming'
    },
    {
        name: 'Finished',
        value: 'finished'
    }
];

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};
 
const validateMessages = {
    required: '${label} is required!',
    types: {
      location: '${label} is not a valid!',
      title: '${label} is not a valid!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
};

const EditeAndCreateEvent = () =>{

    const editeEvent = useSelector(state => state.adminEvent.editeItem);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(editeEvent);
    const [members, setMembers] = useState(0);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [age, setAge] = useState(0);
    const [fileList, setFileList] = useState([]);
   

    useEffect(() =>{
        if(id) dispatch(createAction(GET_EDITE_EVENT, id))
    }, []);

    useEffect(() =>{
        if(editeEvent){
            setMembers(editeEvent.criteria.members);
            setMale(editeEvent.criteria.male);
            setFemale(editeEvent.criteria.female);
            setAge(editeEvent.criteria.age);
        }
    }, [editeEvent]);


    const backEvent = () =>{
        if(editeEvent) {
            dispatch(createAction(SET_EDITE_EVENT, null));
            navigate(-2);
        }else{
            navigate(-1);
        }
    }

    const onChangeImage = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };


    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };

      const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

    const onFinishCreate = (values) => {
        values.date = moment(values.date).format('llll');
        values.imageCount = fileList.length;
        values.deleteFiles = [];
        values.location.lat = 40.778053856647894;
        values.location.lang = 43.84980394910946;
        values.city = 'Gyumry';
        values.imageOptions = fileList[0] ? fileList[0] : {};
        const payload = {};
        payload.data = JSON.stringify(values);
        dispatch(createAction(CREATE_EVENT, payload));
    };

    const onFinishEdite = (values) => {
        values.date = moment(values.date).format('llll');
        values.imageCount = fileList.length;
        values.deleteFiles = editeEvent.image[0] ? [editeEvent.image[0].name] : [];
        values.location.lat = 40.778053856647894;
        values.location.lang = 43.84980394910946;
        values.city = 'Gyumry';
        values.imageOptions = fileList[0] ? fileList[0] : {};
        const payload = {};
        payload.data = JSON.stringify(values);
        console.log(payload);
        dispatch(createAction(UPDATE_EVENT, {payload, id}));
    }

    const fields = useMemo(() =>(
        [
            {
                name: ['location', 'name'],
                value: editeEvent ? editeEvent.location.name : '',
            },
            {
                name: ['title'],
                value: editeEvent ? editeEvent.title : '',
            },
            {
                name: ['type'],
                value: editeEvent ? editeEvent.type : '',
            },
            {
                name: ['status'],
                value: editeEvent ? editeEvent.status : '',
            },
            {
                name: ['date'],
                value: editeEvent ? moment(editeEvent.date) : moment(),
            },
            {
                name: ['description'],
                value: editeEvent ? editeEvent.description : '',
            },
            {
                name: ['criteria', 'members'],
                value: members,
            },
            {
                name: ['criteria', 'age'],
                value: age,
            },
            {
                name: ['criteria', 'male'],
                value: male,
            },
            {
                name: ['criteria', 'female'],
                value: female,
            },
        ]
    ), [editeEvent]);
    
    return (
        <div>
            <div className='title'>
                <Button type="primary" onClick={backEvent}>
                    <ArrowLeftOutlined />
                </Button>
                { editeEvent ? <h2>Edite event</h2> : <h2>Create Event</h2> }
            </div>

            <Form
                {...layout} 
                name="nest-messages" 
                onFinish={editeEvent ? onFinishEdite : onFinishCreate} 
                validateMessages={validateMessages}
                fields={fields}
            >   
                <Form.Item className='form-item' name={[]}>
                    <ImgCrop rotate >
                        <Upload 
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChangeImage}
                            onPreview={onPreview}
                            customRequest={dummyRequest}      
                        >
                            {fileList.length < 3 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Form.Item>

                <Form.Item className='form-item'
                    name={['location', 'name']}
                    label="Location"
                    rules={[{required: true}]}
                > 
                    <Input placeholder='Please input location' />
                </Form.Item>

                <Form.Item className='form-item'
                    name={['title']}
                    label="Title"
                    rules={[{required: true}]}
                > 
                    <Input placeholder='Please input title' />
                </Form.Item>


                <Form.Item className='form-item'
                    name={['type']}
                    label="Type"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select event type!'}]}
                >
                    <Select placeholder="Please select a type">
                        {types.map(item =>(
                            <Option value={item.value} key={item.value}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item className='form-item'
                    name={["status"]}
                    label="Status"
                    hasFeedback
                    rules={[{message: 'Please select event status!'}]}
                >
                    <Select placeholder="Please select a status">
                        {status.map(item =>(
                            <Option value={item.value} key={item.value}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item className='form-item'
                    name={["date"]} 
                    label="Date"
                    rules={[{required: true, message: 'Please select event date!'}]}
                 >
                    <DatePicker showTime/>
                </Form.Item>

                <Form.Item name={['description']} label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name={['criteria', 'members']} label="Members">
                    <Slider onAfterChange={value => setMembers(value)}/>
                </Form.Item>

                <Form.Item name={['criteria', 'age']} label="Age">
                    <Slider onAfterChange={value => setAge(value)}/>
                </Form.Item>

                <Form.Item name={['criteria', 'male']} label="Male">
                    <Slider onAfterChange={value => setMale(value)} max={members - female}/>
                </Form.Item>

                <Form.Item name={['criteria', 'female']} label="Female">
                    <Slider onAfterChange={value => setFemale(value)} max={members - male}/>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button htmlType="reset" onClick={backEvent}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
           
        </div>
    )
}

export default EditeAndCreateEvent;