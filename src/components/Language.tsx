import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { tokenstore } from "../global/global";
import i18n from "../i18n";
class Language extends Component<any, any> {
  changeLanguage = async (lng: any) => {
    if (lng == "ar") {
      tokenstore.i18nextLng = "ar";
      tokenstore.direction = "rtl";
    }
    if (lng == "ur") {
      tokenstore.i18nextLng = "ur";
      tokenstore.direction = "rtl";
    }
    if (lng == "en") {
      tokenstore.i18nextLng = "en";
      tokenstore.direction = "ltr";
    }
    i18n.changeLanguage(lng);
    window.location.reload();
  };
  render() {
    return (
      <SubMenu key="SubMenu" title="Language">
        <Menu.Item key="english" onClick={() => this.changeLanguage("en")}>
          English
        </Menu.Item>
        <Menu.Item key="urdu" onClick={() => this.changeLanguage("ur")}>
          Urdu
        </Menu.Item>
        <Menu.Item key="arabic" onClick={() => this.changeLanguage("ar")}>
          Arabic
        </Menu.Item>
      </SubMenu>
    );
  }
}
export default withRouter(Language);
