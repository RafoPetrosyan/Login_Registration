import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Select, Button, DatePicker, Slider, Upload } from 'antd';
import moment from 'moment';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createEvent, getEditeEvent, setEditeEvent } from '../../../../store/adminStore/actions';
import ImgCrop from 'antd-img-crop';
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

    const editeEvent = useSelector(state => state.adminData.editeEvent);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(editeEvent);

    const [searchParams, setSearchParams] = useSearchParams();
    const [members, setMembers] = useState(0);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [age, setAge] = useState(0);
    const [fileList, setFileList] = useState([]);
    
    console.log(fileList, 'fileList');

    useEffect(() =>{
        if(searchParams.get('id')){
            dispatch(getEditeEvent(searchParams.get('id')))
        }
    }, []);

    useEffect(() =>{
        if(editeEvent){
            setSearchParams(
                createSearchParams({id: editeEvent._id})
            );

            setMembers(editeEvent.criteria.members);
            setMale(editeEvent.criteria.male);
            setFemale(editeEvent.criteria.female);
            setAge(editeEvent.criteria.age);
        }
    }, [editeEvent]);


    const backEvent = () =>{
        navigate('/admin/events');
        if(editeEvent) dispatch(setEditeEvent(null));
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

    const onFinish = (values) => {
        values.data.date = moment(values.data.date).format('llll');
        values.data.imageCount = fileList.length;
        values.data.imageOptions = fileList[0] ? fileList[0] : {};
        // values.data.imageOptions = {};
        dispatch(createEvent(JSON.stringify(values)));
        console.log(values);
    };

    const fields = useMemo(() =>(
        [
            {
                name: ['data', 'location'],
                value: editeEvent ? editeEvent.location.name : '',
            },
            {
                name: ['data', 'title'],
                value: editeEvent ? editeEvent.title : '',
            },
            {
                name: ['data', 'types'],
                value: editeEvent ? editeEvent.type : '',
            },
            {
                name: ['data', 'status'],
                value: editeEvent ? editeEvent.status : '',
            },
            {
                name: ['data', 'date'],
                value: editeEvent ? moment(editeEvent.date) : moment(),
            },
            {
                name: ['data', 'description'],
                value: editeEvent ? editeEvent.description : '',
            },
            {
                name: ['data', 'criteria', 'members'],
                value: members,
            },
            {
                name: ['data', 'criteria', 'age'],
                value: age,
            },
            {
                name: ['data', 'criteria', 'male'],
                value: male,
            },
            {
                name: ['data', 'criteria', 'female'],
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
                onFinish={onFinish} 
                validateMessages={validateMessages}
                fields={fields}
            >   
                <Form.Item>
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

                <Form.Item
                    name={['data', 'location']}
                    label="Location"
                    rules={[{required: true}]}
                > 
                    <Input placeholder='Please input location' />
                </Form.Item>

                <Form.Item
                    name={['data', 'title']}
                    label="Title"
                    rules={[{required: true}]}
                > 
                    <Input placeholder='Please input title' />
                </Form.Item>


                <Form.Item
                    name={['data', 'types']}
                    label="Types"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select event type!'}]}
                >
                    <Select placeholder="Please select a type">
                        {types.map(item =>(
                            <Option value={item.value} key={item.value}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={["data", "status"]}
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

                <Form.Item 
                    name={["data", "date"]} 
                    label="Date"
                    rules={[{required: true, message: 'Please select event date!'}]}
                 >
                    <DatePicker showTime/>
                </Form.Item>

                <Form.Item name={['data', 'description']} label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'members']} label="Members">
                    <Slider onAfterChange={value => setMembers(value)}/>
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'age']} label="Age">
                    <Slider onAfterChange={value => setAge(value)}/>
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'male']} label="Male">
                    <Slider onAfterChange={value => setMale(value)} max={members - female}/>
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'female']} label="Female">
                    <Slider onAfterChange={value => setFemale(value)} max={members - male}/>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button htmlType="reset">
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