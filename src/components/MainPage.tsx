// @ts-nocheck
import React, { Component } from "react";
import { Layout } from "antd";
import "../css/common.css";
import AppMenu from "./AppMenu";
import SeacrchBook from "./SeacrchBook";
import { withRouter } from "react-router-dom";
var myself: any;
class MainPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      current: "1",
    };
  }
  componentDidMount = async () => {};
  async logout(e: any) {
    myself.props.history.push("/");
  }
  render() {
    return (
      <Layout>
        <AppMenu />
        <Layout className="layoutColor">
          <SeacrchBook />
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(MainPage);
