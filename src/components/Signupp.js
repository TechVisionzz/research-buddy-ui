import React, { Component,createRef } from "react";
import { Form, Input, Button, Checkbox,Row,Col,message } from 'antd';
import '../css/login.css';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {dosignup} from './CommonHelper';
import Login from "./Login";
import axios from "axios";
var myself,myform;


 class Signupp extends Component {
     
  constructor() {
    super();
myself=this;
myform=createRef();
    // State of your application
    this.state = {
      modifiedData: {
        name: '',
        username: '',
        password: '',
        phone: '',
        email: '',
      },
      error: null,
    };
  }

  // async handleSubmit () {
  //   // var workspace={
  //   //   name:myform.current.getFieldValue('name'),
  //   //   username:myform.current.getFieldValue('username'),
  //   //   password:myform.current.getFieldValue('password'),
  //   //   phone:myform.current.getFieldValue('phone'),
  //   //   email:myform.current.getFieldValue('email'),

  //   // }
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:1337/auth/local/register', {
  //         username: myform.current.getFieldValue('username'),
  //         phone:myform.current.getFieldValue('phone'),
  //         name:myform.current.getFieldValue('name'),
  //         email:myform.current.getFieldValue('email'),
  //         password: myform.current.getFieldValue('password'),
  //       })
  //     if(response)
  //     {
  //     // <Alert message="Data Save Successfully!" type="success" showIcon closable />
  //     myform.current.resetFields();
  //     alert(" Sign Up Successfull!");
  //     myself.props.history.push('/');  
  //   }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  async handleSubmit () {
    var workspace={
      username: myform.current.getFieldValue('username'),
      phone:myform.current.getFieldValue('phone'),
      name:myform.current.getFieldValue('name'),
      email:myform.current.getFieldValue('email'),
      password: myform.current.getFieldValue('password'),

    }
      
  
    dosignup(workspace).then(async (response) => {
          if (response && response.data) {
      myform.current.resetFields();
      message.success('Signup  Successfull!');
      myself.props.history.push('/dashboard');
          }
      }).catch(async (error) => {
          console.log(error);
          alert(error);
      });
  };
    render() {
        const { error, modifiedData } = this.state;
        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
    
        // Print errors if any
        if (error) {
          return <div>An error occured: {error.message}</div>;
        }
    
        return (
                <Row justify="center" gutter={{ xs: 0, sm:0, md:0, lg:8 }}>
            <Col className="gutter-row" span={12}>
                <div className="backgroundsetting">
                    <Form ref={myform} name="basic" labelCol={{span:8,}}wrapperCol={{span:16,}}initialValues={{remember:true,}} autoComplete="off" >
                        {/* <div style={{textAlign:"center"}}>Log In</div> */}
                        <Form.Item  wrapperCol={{offset: 8, span: 16,}}>
                            <span className="login" >Sign Up</span>
                        </Form.Item>
                        <Form.Item label="Name"  name="name" rules={[{required: true, message: 'Please input your Name!',},]} value={modifiedData.name}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email"  name="email" rules={[{type: 'email',message: 'The input is not valid E-mail!',},{required: true, message: 'Please input your Email!',},]} value={modifiedData.email}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Phone"  name="phone" rules={[{required: true, message: 'Please input your Number!',},]} value={modifiedData.phone}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="UserName"  name="username" rules={[{required: true, message: 'Please input your username!',},]} value={modifiedData.username}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!',},]} value={modifiedData.Password}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item style={{textAlign:"left"}} wrapperCol={{offset: 8,span: 16,}}>
                            <Button onClick={this.handleSubmit} type="primary" htmlType="submit">Register</Button>
                            or 
                        <Link to="/">Login</Link>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
           
        </Row>
        
        );
    }
}
export default Signupp
