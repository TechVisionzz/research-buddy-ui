import React, { Component } from "react";
import { Layout, Menu, Avatar, Row, Col, message, notification } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import "../css/common.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { logOut } from "./commonHelper";
import i18n from "../i18n";
import { GlobalVars, tokenstore } from "../global/global";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
import Language from "./Language";
import { count } from "console";
var myself: any, words: any;
class AppMenu extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      current: "1",
    };
  }
  openNotification = () => {
    const args = {
      message: "Note",
      description: "Language Changed Please Login Again!",
      duration: 0,
    };
    notification.open(args);
  };
  logout = async () => {
    this.setState({ isSpinVisible: true });
    await logOut();
    myself.props.history.push("/");
    this.setState({ isSpinVisible: false });
  };
  render() {
    var name: any;
    words = GlobalVars.userName.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    words.join(" ");
    var counter = 0;
    words.map((item: any) => {
      if (counter === 0) {
        name = item;
        counter++;
      } else {
        name = name + " " + item;
      }
    });
    if (!name) {
      return <div>Loading...</div>;
    }
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
                <Link to="/main">{t("appmenu.home")}</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Menu theme="dark" onClick={handleClick} mode="horizontal">
              <Menu.Item key="3">
                <Link to="/main">{t("appmenu.search")}</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/dashBoard">{t("appmenu.library")}</Link>
              </Menu.Item>
              <Language />
              <SubMenu
                key="SubMenu"
                icon={
                  <Avatar
                    size={25}
                    style={{ backgroundColor: "#87d068", margin: "2px" }}
                    icon={<UserOutlined />}
                  />
                }
                title={name}
              >
                <Menu.Item onClick={this.logout} key="5">
                  {t("appmenu.SignOut")}
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </Header>
    );
  }
}
export default withTranslation()(withRouter(AppMenu));
