import React, { Component } from "react";
import { Form, Input, Button, Spin } from "antd";
import "../css/login.css";
import { message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signUp } from "./commonHelper";
var myself: any;
class SignUp extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
    };
  }
  render() {
    const onFinish = async (values: any) => {
      this.setState({ isSpinVisible: true });
      await signUp(values)
        .then((response) => {
          this.setState({ isSpinVisible: false });
          message.success("SignUp SuccessFully!");
          myself.props.history.push("/");
        })
        .catch(async (error) => {
          message.error(error.error.message);
          this.setState({ isSpinVisible: false });
        });
    };
    return (
      <div className="logIn">
        <Spin size="large" spinning={this.state.isSpinVisible}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
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
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm your Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              <Link to="/"> Login now!</Link>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}
export default withRouter(SignUp);
