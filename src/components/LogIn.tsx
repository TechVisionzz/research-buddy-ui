import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../css/LogIn.css";
import { isLoggedIn, logIn } from "./commonHelper";
var myself: any;
class Login extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
    };
  }
  onFinish = async (values: any) => {
    this.setState({ isSpinVisible: true });
    await logIn(values)
      .then((response: any) => {
        if (isLoggedIn()) {
          this.setState({ isSpinVisible: false });
          myself.props.history.push("/main");
        }
      })
      .catch(async (error) => {
        message.error("userName or Password is Incorrect");
        this.setState({ isSpinVisible: false });
      });
  };
  render() {
    return (
      <div className="logIn">
        <Spin size="large" spinning={this.state.isSpinVisible}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <Link to="/signup"> register now!</Link>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}
export default withRouter(Login);
