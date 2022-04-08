// @ts-nocheck
import React, { Component, createRef } from "react";
import {
  Drawer,
  Form,
  Button,
  Input,
  Select,
  Space,
  message,
  Spin,
} from "antd";
import {
  createCollection,
  editCollection,
  getCollectionsForDropdown,
  getOneCollection,
} from "./commonHelper";
import { withRouter } from "react-router-dom";
import { GlobalVars } from "../global/global";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
var myself: any, myform: any;
myform = createRef();
class Collections extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      visible: false,
      check: "",
      collection: {},
      collections: [],
      parentIsAvailable: false,
    };
  }
  getCollectionsForDropdown = async () => {
    await getCollectionsForDropdown()
      .then(async (response: any) => {
        await this.setState({ collections: response.data });
        console.log(this.state.collections);
      })
      .catch(async (error: any) => {
        message.error(error.error);
        this.setState({ isSpinVisible: false });
      });
  };
  getOneCollection = async () => {
    await getOneCollection()
      .then(async (response: any) => {
        if (response.data.attributes.parent.data) {
          await this.setState({ parentIsAvailable: true });
        }
        await this.setState({ collection: response.data });
      })
      .catch(async (error: any) => {
        message.error(error.error.message);
        this.setState({ isSpinVisible: false });
      });
  };
  componentWillReceiveProps = async (props: any) => {
    await this.setState({ visible: props.open, check: props.check });
    if (this.state.check === "edit") {
      await this.getOneCollection();
    }
    await this.getCollectionsForDropdown();
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = async () => {
    await this.setState({ isSpinVisible: false, collection: "" });
    this.setState({
      visible: false,
    });
    myself.props.closeCollection();
  };
  onFinish = async (values: any) => {
    console.log(values);
    this.setState({ isSpinVisible: true });
    if (this.state.check === "add") {
      await createCollection(values)
        .then(async (response: any) => {
          if (response && response.data) {
            message.success(t("addSuccess"));
          }
        })
        .catch(async (error: any) => {
          console.log(error.error);
          // message.error(error.error);
          // this.setState({ isSpinVisible: false });
        });
      myform.current.resetFields();
      this.setState({
        visible: false,
      });
      myself.props.closeCollection();
      this.setState({ isSpinVisible: false });
    }
    if (this.state.check === "edit") {
      await editCollection(values)
        .then(async (response: any) => {
          if (response && response.data) {
            message.success(t("editSuccess"));
            myform.current.resetFields();
            await this.setState({ isSpinVisible: false, collection: "" });
            this.setState({
              visible: false,
            });
            myself.props.closeCollection();
          }
        })
        .catch(async (error: any) => {
          message.error(error);
          this.setState({ isSpinVisible: false });
        });
    }
  };
  onFinishFailed = async (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  onSearch = async (value: any) => {
    console.log(value);
  };
  render() {
    const { check, collection, parentIsAvailable } = this.state;
    let title;
    if (check === "edit") {
      if (!collection || !collection.attributes) {
        return <div>Loading...</div>;
      }
      title = t("collection.editTitle");
    }
    if (check === "add") {
      title = t("collection.addTitle");
    }

    const { Option } = Select;
    return (
      <Spin size="large" spinning={this.state.isSpinVisible}>
        <Drawer
          placement={"left"}
          title={title}
          width={620}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Spin size="large" spinning={this.state.isSpinVisible}>
            <Form
              ref={myform}
              layout="vertical"
              hideRequiredMark
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                remember: true,
                name: check === "edit" ? collection.attributes.name : " ",
                description:
                  check === "edit" ? collection.attributes.description : " ",
                parent:
                  check === "edit" && parentIsAvailable
                    ? collection.attributes.parent.data.attributes.name
                    : " ",
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={t("collection.CollectionName")}
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    min: 2,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label={t("collection.Description")}
                rules={[{ required: true, message: "description is Required" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="parent" label={t("collection.Parent")}>
                <Select placeholder="Select Parent" allowClear>
                  {this.state.collections.map((item: any) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.attributes.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {t("submit")}
                  </Button>
                  <Button onClick={this.onClose}>{t("Cancel")}</Button>
                </Space>
              </Form.Item>
            </Form>
          </Spin>
        </Drawer>
      </Spin>
    );
  }
}
export default withTranslation()(withRouter(Collections));
