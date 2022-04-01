import React, { Component } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Typography,
  message,
  notification,
  Tree,
  Button,
  Upload,
} from "antd";
import { PlusCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../css/common.css";
import AppMenu from "./AppMenu";
import { GlobalVars } from "../global/global";
import Reference from "./Reference";
import AllReferences from "./AllReferences";
import Collections from "./Collections";
import { deleteCollection, getCollections } from "./commonHelper";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
import SubMenu from "antd/lib/menu/SubMenu";
import ReferenceAutomatically from "./ReferenceAutomatically";
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
      openReferenceAutomatically: false,
      collections: [],
      check: " ",
      identifier: " ",
    };
    this.openCitation = this.openCitation.bind(this);
    this.openReferenceAutomatically =
      this.openReferenceAutomatically.bind(this);
    this.openAddCollection = this.openAddCollection.bind(this);
    this.openEditCollection = this.openEditCollection.bind(this);
    this.closeReference = this.closeReference.bind(this);
    this.closeReferenceAutomatically =
      this.closeReferenceAutomatically.bind(this);
    this.closeCollections = this.closeCollections.bind(this);
    this.parentMenu = this.parentMenu.bind(this);
  }
  getCollections = async () => {
    this.setState({ isSpinVisible: true });
    await getCollections()
      .then(async (response: any) => {
        if (response && response.data) {
          console.log(response.data);
          await this.setState({ collections: response.data });
        }
      })
      .catch(async (error: any) => {
        message.error(error.error);
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

  openReferenceAutomatically = async () => {
    this.setState({ openReferenceAutomatically: true });
  };
  closeReference = async () => {
    await this.setState({ identifier: "all" });
    this.setState({ open: false, isSpinVisible: true });
  };
  closeReferenceAutomatically = async () => {
    await this.setState({ identifier: "all" });
    this.setState({ openReferenceAutomatically: false, isSpinVisible: true });
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
        if (response && response.data) {
          console.log(response.data);
          var arrayLength;
          if (response.data.attributes.collections.data.length >= 1) {
            response.data.attributes.collections.data.map((item: any) => {
              GlobalVars.collectionId = item.id;
              this.deleteCollection();
            });
          }
          message.success(t("deleteSuccess"));
          this.getCollections();
          this.openNotification(response.data.attributes.name);
        }
      })
      .catch(async (error: any) => {
        message.error(error);
        this.setState({ isSpinVisible: false });
      });
  };
  openNotification = (name: any) => {
    const args = {
      message: "Note",
      description:
        " References under " + name + " collection is move to All Refereces!",
      duration: 0,
    };
    notification.open(args);
  };
  onSelect = (selectedKeys: any, info: any) => {
    console.log("selected", selectedKeys, info);
  };
  getMenu = (text: any, id: any) => {
    return (
      <Dropdown
        key={id}
        overlay={this.collectionMenu}
        trigger={["contextMenu"]}
      >
        <span onClick={() => this.callReference(id)} style={{ float: "left" }}>
          {text}
        </span>
      </Dropdown>
    );
  };
  parentMenu = (item: any) => {
    return (
      <>
        <SubMenu
          key={item.id}
          title={this.getMenu(item.attributes.name, item.id)}
        >
          {item.attributes.collections.data.map((item2: any) => {
            var a = this.state.collections.find(
              (collection: any) => collection.id === item2.id
            );
            if (a) {
              if (a.attributes.collections.data[0]) {
                return this.parentMenu(a);
              }
            }

            if (item2.attributes.trash === false) {
              return (
                <Menu.Item
                  onClick={() => this.callReference(item2.id)}
                  key={item2.id}
                >
                  <Dropdown
                    key={item2.id}
                    overlay={this.collectionMenu}
                    trigger={["contextMenu"]}
                  >
                    <span>{item2.attributes.name}</span>
                  </Dropdown>
                </Menu.Item>
              );
            }
          })}
        </SubMenu>
      </>
    );
  };
  collectionMenu = (
    <Menu>
      <Menu.Item onClick={this.openEditCollection} key="1">
        {t("edit")}
      </Menu.Item>
      <Menu.Item onClick={this.deleteCollection} key="2">
        {t("delete")}
      </Menu.Item>
    </Menu>
  );
  render() {
    const { SubMenu } = Menu;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item onClick={this.openCitation} key="2">
          {t("dashboard.AddEntrymanually")}
        </Menu.Item>
        <Menu.Item onClick={this.openReferenceAutomatically} key="3">
          {t("dashboard.CSVFromComputer")}
        </Menu.Item>
      </Menu>
    );
    const { Content, Sider } = Layout;
    const { Title } = Typography;
    return (
      <Layout>
        <AppMenu />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu mode="inline" style={{ height: "100%", borderLeft: 0 }}>
              <Menu.Item key="1">
                <Dropdown.Button overlay={menu}>
                  {t("dashboard.AddNew")}
                </Dropdown.Button>
              </Menu.Item>
              <Menu.Item onClick={() => this.callReference("all")} key="2">
                <Link to="#">{t("dashboard.AllReferences")}</Link>
              </Menu.Item>
              <Menu.Item onClick={() => this.callReference("trash")} key="3">
                <Link to="#">{t("Trash")}</Link>
              </Menu.Item>
              <Menu.Item onClick={this.openAddCollection} key="4">
                <Link to="#">
                  <Title className="collectionsInline" level={5}>
                    {t("Collections")}
                  </Title>
                  <PlusCircleOutlined />
                </Link>
              </Menu.Item>
              {this.state.collections.map((item: any) => {
                if (
                  item.attributes.parent.data === null &&
                  !item.attributes.collections.data[0]
                ) {
                  console.log(item);
                }
                if (
                  item.attributes.parent.data === null &&
                  !item.attributes.collections.data[0]
                ) {
                  return (
                    <Menu.Item
                      onClick={() => this.callReference(item.id)}
                      key={item.id}
                    >
                      <Dropdown
                        key={item.id}
                        overlay={this.collectionMenu}
                        trigger={["contextMenu"]}
                      >
                        <span>{item.attributes.name}</span>
                      </Dropdown>
                    </Menu.Item>
                  );
                }
                if (
                  item.attributes.parent.data === null &&
                  item.attributes.collections.data[0]
                ) {
                  return this.parentMenu(item);
                }
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
              <ReferenceAutomatically
                open={this.state.openReferenceAutomatically}
                closeReferenceAutomatically={this.closeReferenceAutomatically}
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
export default withTranslation()(withRouter(DashBoard));
