import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select, Button, DatePicker, Slider, Switch } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from '../Admin.module.css';
import { addEvent } from '../../../store/adminStore/actions';

const { Option } = Select;

const types = ['Кофе/Чай', 'Ланч', 'Спорт', 'Кино', 'Караоке', 'Онлайн игры', 'Oбсуждение', 'Другое'];
const status = ['In Progress', 'Upcoming', 'Finished'];

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

const FormComponent = ({propsFormComponents}) =>{

    const { hendleForm } = propsFormComponents;
    const dispatch = useDispatch();

    const [date, setDate] = useState('');

    const onChange = (date, dateString) => {
        setDate(dateString);
    }

    const onFinish = (values) => {
        values.data.date = date;
        Object.keys(values.data.criteria).forEach(item =>{
            if(values.data.criteria[item] === undefined){
                values.data.criteria[item] = 0;
            }
        })
        values.data.imageCount = 0;
        values.data.imageOptions = {};
        dispatch(addEvent(values));
      };

     
      
    return (
        <div className={styles.formComponent}>
            <Button type="primary" onClick={() => hendleForm()}>
                <ArrowLeftOutlined />
            </Button>
            <Form 
                {...layout} 
                name="nest-messages" 
                onFinish={onFinish} 
                validateMessages={validateMessages} 
                className={styles.inputs}
            >
                <Form.Item
                    name={['data', 'location']}
                    label="Location"
                    rules={[{
                        required: true,
                    },
                    ]}
                >
                    <Input placeholder='Please input location'/>
                </Form.Item>

                <Form.Item
                    name={['data', 'title']}
                    label="Title"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input placeholder='Please input title'/>
                </Form.Item>

                <Form.Item
                    name={['data', 'types']}
                    label="Types"
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please select event type!',
                    },
                    ]}
                >
                    <Select placeholder="Please select a type">
                        {types.map(item =>(
                             <Option value={item} key={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={["data", "status"]}
                    label="Status"
                    hasFeedback
                    rules={[
                    {
                        message: 'Please select event type!',
                    },
                    ]}
                >
                    <Select placeholder="Please select a stus">
                        {status.map(item =>(
                             <Option value={item} key={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>


                <Form.Item 
                    name={["data", "date"]} 
                    label="DatePicker"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                 >
                      <DatePicker showTime onChange={onChange}/>
                </Form.Item>

                <Form.Item name={['data', 'description']} label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'members']} label="Members" defaultValue='0'>
                    <Slider initialValues={0} disabled={false} />
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'age']} label="Age" defaultValue='0'>
                    <Slider initialValues={0} disabled={false} />
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'male']} label="Male" defaultValue='0'>
                    <Slider initialValues={0} disabled={false} />
                </Form.Item>

                <Form.Item name={['data', 'criteria', 'female']} label="Female" defaultValue='0'>
                    <Slider initialValues={0} disabled={false} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormComponent;