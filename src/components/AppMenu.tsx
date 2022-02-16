import React, { Component } from "react";
import { Layout, Menu, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../css/common.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { logOut } from "./commonHelper";
var myself: any;
class AppMenu extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      current: "1",
    };
  }
  logout = async () => {
    this.setState({ isSpinVisible: true });
    await logOut();
    // <Redirect to="/" />;
    myself.props.history.push("/");
    // this.props.history.push("/");
    this.setState({ isSpinVisible: false });
  };
  render() {
    const { Header } = Layout;
    const handleClick = (e: any) => {
      this.setState({ current: e.key });
    };
    return (
      <Header className="header">
        <Row justify="space-between">
          <Col>
            <Menu theme="dark" onClick={handleClick} mode="horizontal">
              <Menu.Item style={{ marginRight: "0px" }} key="1">
                <Link to="/main">Home</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Menu theme="dark" onClick={handleClick} mode="horizontal">
              <Menu.Item key="3">
                <Link to="/main">Search</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/dashBoard">Library</Link>
              </Menu.Item>
              <SubMenu
                key="SubMenu"
                icon={
                  <Avatar
                    size={25}
                    style={{ backgroundColor: "#87d068", margin: "2px" }}
                    icon={<UserOutlined />}
                  />
                }
                title="Ahtasham Naeem"
              >
                <Menu.Item key="settings">Settings</Menu.Item>
                <Menu.Item key="privacyCenter">Privacy Center</Menu.Item>
                <Menu.Item key="helpGuides">Help Guides</Menu.Item>
                <Menu.Item key="supportCenter">Support Center</Menu.Item>
                {/* <Divider /> */}
                <Menu.Item onClick={this.logout} key="5">
                  Sign Out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </Header>
    );
  }
}
export default withRouter(AppMenu);
