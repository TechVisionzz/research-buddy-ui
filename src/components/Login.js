import React, { Component,createRef,Suspense } from "react";
import { Form, Input, Button, Checkbox,Row,Col,Spin } from 'antd';
import '../css/login.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";
import { tokenstore } from "../global/global";
import { Redirect ,useHistory} from "react-router";
import Dashboard from "./Dashboard";
import { doLogin, isLoggedIn } from "./CommonHelper";
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
var myself,myform;

const Link = require("react-router-dom").Link;
 class Login extends Component {
    constructor() {
        super();
    myself=this;
    myform=createRef();
        // State of your application
        this.state = {
          modifiedData: {
            email: '',
            password: '',
          },
          error: null,
          isSpinVisible:false
        };
      }
      componentDidMount=async()=>{
        this.setState({isSpinVisible:false});
      }
      //  handleSubmit= async(e)=> {

      // };
    render() {
        const { error, modifiedData } = this.state;
        const { t } = this.props;

        const onFinish = async(values) => {
          this.setState({isSpinVisible:true});
          var result=  await doLogin(myform.current.getFieldValue('email'),myform.current.getFieldValue('password'));
          
          console.log(isLoggedIn());
             if(isLoggedIn())
             { this.setState({isSpinVisible:false});
              myself.props.history.push('/dashboard'); 
            
             }
             else{
               alert(tokenstore.errormessage);
             }
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
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
                    <Form ref={myform} onFinish={onFinish} name="basic" labelCol={{span:8,}}wrapperCol={{span:16,}}initialValues={{remember:true,}} autoComplete="off" >
                        {/* <div style={{textAlign:"center"}}>Log In</div> */}
                        <Form.Item  wrapperCol={{offset: 8, span: 16,}}>
                            <span className="login" >Log In</span>
                        </Form.Item>
                        <Form.Item label="Email"  name="email" rules={[{required: true, message: 'Please input your Email!',},]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!',},]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item style={{textAlign:"left"}} name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16,}}>
                            <Checkbox >Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item style={{textAlign:"left"}} wrapperCol={{offset: 8,span: 16,}}>
                            <Button onClick={this.handleSubmit} type="primary" htmlType="submit">Submit</Button>
                            Or  <Link to="/signup">signup</Link>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
        </Spin>
        );
    }
}
export default Login
