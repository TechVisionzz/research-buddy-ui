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
import "../css/LogIn.css";
import {
  createCollection,
  editCollection,
  getOneCollection,
} from "./commonHelper";
import { withRouter } from "react-router-dom";
import { GlobalVars } from "../global/global";
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
      collectionData: {},
    };
  }
  getOneCollection = async () => {
    await getOneCollection()
      .then(async (response: any) => {
        await this.setState({ collectionData: response.data });
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
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = async () => {
    await this.setState({ isSpinVisible: false, collectionData: "" });
    this.setState({
      visible: false,
    });
    myself.props.closeCollection();
  };
  onFinish = async (values: any) => {
    this.setState({ isSpinVisible: true });
    if (this.state.check === "add") {
      await createCollection(values)
        .then(async (response: any) => {
          if (response && response.data) {
            message.success("Success");
            myform.current.resetFields();
            this.setState({
              visible: false,
            });
            myself.props.closeCollection();
            this.setState({ isSpinVisible: false });
          }
        })
        .catch(async (error: any) => {
          message.error(error);
          this.setState({ isSpinVisible: false });
        });
    }
    if (this.state.check === "edit") {
      await editCollection(values)
        .then(async (response: any) => {
          if (response && response.data) {
            message.success(" edit Success ");
            myform.current.resetFields();
            await this.setState({ isSpinVisible: false, collectionData: "" });
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
    const { check, collectionData } = this.state;
    let title;
    if (check === "edit") {
      if (!collectionData || !collectionData.attributes) {
        return <div>Loading...</div>;
      }
      title = "Edit entry";
    }
    if (check === "add") {
      title = "Add entry manually";
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
          <Form
            ref={myform}
            layout="vertical"
            hideRequiredMark
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              remember: true,
              name: check === "edit" ? collectionData.attributes.name : " ",
              description:
                check === "edit" ? collectionData.attributes.description : " ",
              parent: check === "edit" ? collectionData.attributes.parent : " ",
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Collection Name"
              name="name"
              rules={[
                { required: true, message: "Please input your Identifiers!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="parent"
              label="Parent"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Parent" allowClear>
                <Option value="bill">Bill</Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={this.onClose}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Drawer>
      </Spin>
    );
  }
}
export default withRouter(Collections);
