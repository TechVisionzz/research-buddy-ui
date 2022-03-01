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
  // changeLanguage = async (lng: any) => {
  //   if (lng == "ar") {
  //     tokenstore.i18nextLng = "ar";
  //     tokenstore.direction = "rtl";
  //   }
  //   if (lng == "ur") {
  //     tokenstore.i18nextLng = "ur";
  //     tokenstore.direction = "rtl";
  //   }
  //   if (lng == "en") {
  //     tokenstore.i18nextLng = "en";
  //     tokenstore.direction = "ltr";
  //   }
  //   i18n.changeLanguage(lng);
  //   this.openNotification();
  //   setTimeout(() => {
  //     myself.props.history.push("/dashboard");
  //     window.location.reload();
  //   }, 1200);
  // };
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
              {/* <SubMenu
                key="language"
                icon={<SettingOutlined />}
                title="Language"
              >
                <Menu.Item
                  key="english"
                  onClick={() => this.changeLanguage("en")}
                >
                  English
                </Menu.Item>
                <Menu.Item key="urdu" onClick={() => this.changeLanguage("ur")}>
                  Urdu
                </Menu.Item>
                <Menu.Item
                  key="arabic"
                  onClick={() => this.changeLanguage("ar")}
                >
                  Arabic
                </Menu.Item>
              </SubMenu> */}
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
                {/* <Menu.Item key="settings">Settings</Menu.Item>
                <Menu.Item key="privacyCenter">Privacy Center</Menu.Item>
                <Menu.Item key="helpGuides">Help Guides</Menu.Item>
                <Menu.Item key="supportCenter">Support Center</Menu.Item> */}
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
