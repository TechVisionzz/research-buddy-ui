import React, { Component } from "react";
import { Layout, Menu, Dropdown, Typography, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../css/common.css";
import AppMenu from "./AppMenu";
import { GlobalVars } from "../global/global";
import Reference from "./Reference";
import AllReferences from "./AllReferences";
import Collections from "./Collections";
import { deleteCollection, getCollections } from "./commonHelper";
var myself: any;
class DashBoard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      current: "1",
      open: false,
      openCollection: false,
      collections: [],
      check: " ",
      identifier: " ",
    };
    this.openCitation = this.openCitation.bind(this);
    this.openAddCollection = this.openAddCollection.bind(this);
    this.openEditCollection = this.openEditCollection.bind(this);
    this.closeReference = this.closeReference.bind(this);
    this.closeCollections = this.closeCollections.bind(this);
  }
  getCollections = async () => {
    this.setState({ isSpinVisible: true });
    await getCollections()
      .then((response: any) => {
        this.setState({ collections: response.data });
      })
      .catch(async (error) => {
        message.error(error.error.message);
        this.setState({ isSpinVisible: false });
      });
  };
  componentDidMount = async () => {
    this.getCollections();
  };
  handleMenuClick = async (e: any) => {};
  openCitation = async () => {
    this.setState({ open: true });
  };
  closeReference = async () => {
    await this.setState({ identifier: "all" });
    this.setState({ open: false, isSpinVisible: true });
  };
  openAddCollection = async () => {
    this.setState({ openCollection: true, check: "add" });
  };
  closeCollections = async () => {
    this.getCollections();
    this.setState({ openCollection: false, isSpinVisible: true });
  };
  citationChange = async (value: any) => {
    console.log(value);
    this.setState({ citationChange: value });
  };
  callReference = async (id: any) => {
    if (id === "trash") {
      await this.setState({ identifier: "trash" });
    }
    if (id === "all") {
      await this.setState({ identifier: "all" });
    }
    if (id !== "trash" && id !== "all") {
      GlobalVars.collectionId = id;
      await this.setState({ identifier: "collection" });
    }
  };
  openEditCollection = async () => {
    this.setState({ openCollection: true, check: "edit" });
  };
  deleteCollection = async () => {
    this.setState({ isSpinVisible: true });
    await deleteCollection()
      .then((response: any) => {
        message.success("Delete Successfully!");
        this.getCollections();
      })
      .catch(async (error: any) => {
        message.error(error);
        this.setState({ isSpinVisible: false });
      });
  };
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">File(s) from computer</Menu.Item>
        <Menu.Item onClick={this.openCitation} key="2">
          Add Entry manually
        </Menu.Item>
        <Menu.Item key="3">Import library</Menu.Item>
      </Menu>
    );
    const { Content, Sider } = Layout;
    const { Title } = Typography;
    const collectionMenu = (
      <Menu>
        <Menu.Item onClick={this.openEditCollection} key="1">
          Edit
        </Menu.Item>
        <Menu.Item onClick={this.deleteCollection} key="2">
          Delete
        </Menu.Item>
        {/* <Menu.Item onClick={this.openAddCollection} key="3">
          New Collection
        </Menu.Item> */}
      </Menu>
    );
    return (
      <Layout>
        <AppMenu />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu mode="inline" style={{ height: "100%", borderLeft: 0 }}>
              <Menu.Item key="1">
                <Dropdown.Button overlay={menu}>Add New</Dropdown.Button>
              </Menu.Item>
              <Menu.Item onClick={() => this.callReference("all")} key="2">
                <Link to="#">All References</Link>
              </Menu.Item>
              <Menu.Item onClick={() => this.callReference("trash")} key="3">
                <Link to="#">Trash</Link>
              </Menu.Item>
              <Menu.Item onClick={this.openAddCollection} key="4">
                <Link to="#">
                  <Title className="collectionsInline" level={5}>
                    Collections
                  </Title>
                  <PlusCircleOutlined />
                </Link>
              </Menu.Item>
              {this.state.collections.map((item: any) => {
                return (
                  <Menu.Item
                    onClick={() => this.callReference(item.id)}
                    key={item.id}
                  >
                    <Dropdown
                      key={item.id}
                      overlay={collectionMenu}
                      trigger={["contextMenu"]}
                    >
                      <span>{item.attributes.name}</span>
                    </Dropdown>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <AllReferences identifier={this.state.identifier} />
              <Reference
                open={this.state.open}
                closeReference={this.closeReference}
              />
              <Collections
                open={this.state.openCollection}
                check={this.state.check}
                closeCollection={this.closeCollections}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(DashBoard);
