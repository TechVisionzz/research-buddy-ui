import React, { Component,createRef } from "react";
import { Form, Input, Button, Checkbox,Row,Col,message,Spin } from 'antd';
import '../css/login.css';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {dosignup,doLogin,isLoggedIn,doLogout,createworkspaces,createTags} from './CommonHelper';
import Login from "./Login";
import axios from "axios";
import { tokenstore } from "../global/global";
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
        isSpinVisible:false
      },
      error: null,
    };
  }
  componentDidMount=async()=>{
    this.setState({isSpinVisible:false});
  }
    render() {
        const { error, modifiedData } = this.state;
        const onFinish = (values) => {
          console.log('Success:', values.email);
          this.setState({isSpinVisible:true});
    
    var workspace={
      username: myform.current.getFieldValue('username'),
      phone:myform.current.getFieldValue('phone'),
      name:myform.current.getFieldValue('name'),
      email:myform.current.getFieldValue('email'),
      password: myform.current.getFieldValue('password'),
    }
    if(workspace.username==null){
      this.setState({isSpinVisible:false});
    }
    dosignup(workspace).then(async (response) => {
          if (response && response.data) {
              console.log(myform.current.getFieldValue('email'));
      // login after succesfull signup
      await doLogin(myform.current.getFieldValue('email'),myform.current.getFieldValue('password'));
     console.log(isLoggedIn());
        if(isLoggedIn())
        {
            myform.current.resetFields();
        //add default workspace
        var defaultWorkspace={
            name: "Default Workspace",
            description:"Default Description",
            parent:"Default",
            user:tokenstore.userid,
          }
          createworkspaces(defaultWorkspace).then((response)=>{if(response && response.data){
            //create tag
            var tags={
              parentTag:['Default Parent'],
          tags:'Default Parent',
          name:'Default Parent',
          user:tokenstore.userid
            }
            //  console.log(tags);
             createTags(tags).then(async (response) => {
               if (response && response.data) {
                this.setState({isSpinVisible:false});
              message.success('Signup  Successfull!');
              myself.props.history.push('/'); 
              doLogout();
               }
           }).catch(async (error) => {
               console.log(error);
           });
          }});
         

        }
        //end
          }
      }).catch(async (error) => {
          console.log(error);
          // alert(error);
      });
        };
      
        const onFinishFailed = (errorInfo) => {
          message.info('Signup  Successfull!');
        };
    
        // Print errors if any
        if (error) {
          return <div>An error occured: {error.message}</div>;
        }
        return (
          <Spin size="large"  spinning={this.state.isSpinVisible} >
                <Row justify="center" gutter={{ xs: 0, sm:0, md:0, lg:8 }}>
            <Col className="gutter-row" span={12}>
                <div className="backgroundsetting">
                    <Form ref={myform} onFinish={onFinish} onFinishFailed={onFinishFailed} name="basic" labelCol={{span:8,}}wrapperCol={{span:16,}}initialValues={{remember:true,}} autoComplete="off" >
                        <Form.Item  wrapperCol={{offset: 8, span: 16,}}>
                            <span className="login" >Sign Up</span>
                        </Form.Item>
                        <Form.Item label="Name"  name="name" rules={[{required: true, message: 'Please input your Name!'}]} value={modifiedData.name}>
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
                            <Button  type="primary" htmlType="submit">Register</Button>
                            or 
                        <Link to="/">Login</Link>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
           
        </Row>
        </Spin>
        );
    }
}
export default Signupp
