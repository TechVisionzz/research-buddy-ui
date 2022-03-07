import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Spin, message, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { isLoggedIn, logIn } from "./commonHelper";
import Language from "./Language";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
import { GlobalVars } from "../global/global";
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
        message.error(t("login.error"));
        this.setState({ isSpinVisible: false });
      });
  };
  render() {
    return (
      <>
        <Menu mode="horizontal">
          <Language />
        </Menu>
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
                  <Checkbox>{t("login.rememberme")}</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  {t("login.Forgotpassword")}
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {t("login.LogIn")}
                </Button>
                <Link to="/signup"> {t("login.registernow")}</Link>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </>
    );
  }
}
export default withTranslation()(withRouter(Login));
