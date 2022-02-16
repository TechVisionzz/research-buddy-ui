import React, { Component, createRef } from "react";
import {
  Drawer,
  Form,
  Button,
  Input,
  Select,
  Space,
  FormInstance,
  message,
  Spin,
} from "antd";
import "../css/LogIn.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { createReference } from "./commonHelper";
import { withRouter } from "react-router-dom";
var myself: any, myform: any;
myform = createRef();
class Reference extends Component<any, any> {
  formRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      visible: false,
      author: [],
    };
  }
  componentWillReceiveProps = async (props: any) => {
    await this.setState({ visible: props.open });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    myself.props.closeReference();
  };
  onFinish = async (values: any) => {
    this.setState({ isSpinVisible: true });
    // start set  author values in one array
    if (values.authorsArray) {
      values.authorsArray.map(async (item: any) => {
        await this.setState({
          author: [...this.state.author, item.author],
        });
      });
    }
    await this.setState({ author: [...this.state.author, values.authors] });
    // console.log(this.state.author);
    //end set  author values in one array
    console.log(values);
    await createReference(values, this.state.author)
      .then((response: any) => {
        if (response && response.data) {
          message.success("Success");
          myform.current.resetFields();
          this.setState({
            visible: false,
          });
          myself.props.closeReference();
          this.setState({ isSpinVisible: false });
        }
      })
      .catch(async (error: any) => {
        message.error(error);
        this.setState({ isSpinVisible: false });
      });
  };

  onFinishFailed = async (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  onSearch = async (value: any) => {
    console.log(value);
  };
  render() {
    const { title } = this.state;
    const { Option } = Select;
    var volume = (
      <Form.Item name="volume" label="Volume" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    var year = (
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true }]}
        // style={{
        //   display: "inline-block",
        // }}
      >
        <Input />
      </Form.Item>
    );
    var city = (
      <Form.Item name="city" label="City" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    var code = (
      <Form.Item name="code" label="Code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    var pages = (
      <Form.Item
        label="Pages"
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="from"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50%)",
          }}
        >
          <Input placeholder="From" />
        </Form.Item>
        <Form.Item
          name="to"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50%)",
          }}
        >
          <Input placeholder="to" />
        </Form.Item>
      </Form.Item>
    );
    var edition = (
      <Form.Item name="edition" label="Edition" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    var editors = (
      <Form.Item name="editors" label="Editors" rules={[{ required: true }]}>
        <Select
          mode="tags"
          placeholder="Please select"
          // defaultValue={["a10", "c12"]}
        ></Select>
      </Form.Item>
    );
    var publisher = (
      <Form.Item
        name="publisher"
        label="Publisher"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    );
    var distributor = (
      <Form.Item
        name="distributor"
        label="Distributor"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    );
    var country = (
      <Form.Item name="country" label="Country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    var publication = (
      <Form.Item
        name="publication"
        label="Publication"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    );
    var institution = (
      <Form.Item
        name="institution"
        label="Institution"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    );
    var number = (
      <Form.Item name="number" label="Number" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    var issue = (
      <Form.Item name="issue" label="Issue" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    );
    return (
      <Spin size="large" spinning={this.state.isSpinVisible}>
        <Drawer
          placement={"left"}
          title="Add Entry Manually"
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
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Identifiers (ArXivID, DOI or PMID)"
              name="identifiers"
            >
              <Search
                placeholder=" search Book"
                allowClear
                enterButton="Search"
                onSearch={this.onSearch}
              />
            </Form.Item>
            <Form.Item
              name="referenceType"
              label="Reference Type"
              // rules={[{ required: true }]}
            >
              <Select placeholder="Select Reference Type" allowClear>
                <Option value="bill">Bill</Option>
                <Option value="book">Book</Option>
                <Option value="bookSection">Book Section</Option>
                <Option value="case">Case</Option>
                <Option value="computerProgram">Computer Program</Option>
                <Option value="conferenceProceedings">
                  Conference Proceedings
                </Option>
                <Option value="encyclopediaArticle">
                  Encyclopedia Article
                </Option>
                <Option value="film">Film</Option>
                <Option value="hearing">Hearing</Option>
                <Option value="journalArticle">Journal Article</Option>
                <Option value="magazineArticle">Magazine Article</Option>
                <Option value="newspaperArticle">Newspaper Article</Option>
                <Option value="patent">Patent</Option>
                <Option value="report">Report</Option>
                <Option value="statute">Statute</Option>
                <Option value="televisionBroadcast">
                  Television Broadcast
                </Option>
                <Option value="thesis">Thesis</Option>
                <Option value="unspacified">Unspacified</Option>
                <Option value="webPage">Web Page</Option>
                <Option value="workingPaper">Working Paper</Option>
              </Select>
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Form.Item
              name="authors"
              label="Authors"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.List name="authorsArray">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Form.Item
                        style={{
                          display: "inline-block",
                          marginBottom: 0,
                          width: "96%",
                        }}
                        {...restField}
                        name={[name, "author"]}
                        rules={[
                          { required: true, message: "Missing Author Name" },
                        ]}
                      >
                        <Input placeholder="Author Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Author
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            {/* this is for Bill */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "bill" ? (
                  <>
                    {year}
                    <Form.Item
                      label="Code Pages"
                      style={{
                        display: "inline-block",
                        marginBottom: 0,
                      }}
                    >
                      <Form.Item
                        name="codePagesFrom"
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "calc(50%)",
                        }}
                      >
                        <Input placeholder="From" />
                      </Form.Item>
                      <Form.Item
                        name="codePagesTo"
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "calc(50%)",
                        }}
                      >
                        <Input placeholder="to" />
                      </Form.Item>
                    </Form.Item>
                    {city}
                    <Form.Item
                      name="legislativeBody"
                      label="Legislative Body"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {code}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for Book */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "book" ? (
                  <>
                    {year}
                    {pages}
                    {volume}
                    {edition}
                    {editors}
                    {city}
                    {publisher}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for bookSection */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "bookSection" ? (
                  <>
                    <Form.Item
                      name="book"
                      label="Book"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {year}
                    {pages}
                    {volume}
                    {edition}
                    {editors}
                    {city}
                    {publisher}
                    <Form.Item
                      name="chapter"
                      label="Chapter"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for bookSection */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "case" ? (
                  <>
                    {year}
                    {pages}
                    {volume}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for computerProgram */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "computerProgram" ? (
                  <>
                    {year}
                    {pages}
                    {city}
                    {publisher}
                    <Form.Item
                      name="version"
                      label="Version"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for conferenceProceedings */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "conferenceProceedings" ? (
                  <>
                    <Form.Item
                      name="procTitle"
                      label="Proc.Title"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {year}
                    {pages}
                    {city}
                    {publisher}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for encyclopediaArticle */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "encyclopediaArticle" ? (
                  <>
                    <Form.Item
                      name="encyclopedia"
                      label="Encyclopedia"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {year}
                    {pages}
                    {volume}
                    {edition}
                    {editors}
                    {city}
                    {publisher}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for film */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "film" ? (
                  <>
                    {year}
                    {pages}
                    {distributor}
                    {country}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for hearing */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "hearing" ? (
                  <>
                    {year}
                    {pages}
                    {city}
                    {publisher}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for journalArticle */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "journalArticle" ? (
                  <>
                    <Form.Item
                      name="journal"
                      label="journal"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {year}
                    {pages}
                    {volume}
                    {issue}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for magazineArticle */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "magazineArticle" ? (
                  <>
                    {publication}
                    {year}
                    {pages}
                    {city}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for newspaperArticle */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "newspaperArticle" ? (
                  <>
                    {publication}
                    {year}
                    {pages}
                    {city}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for patent */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "patent" ? (
                  <>
                    {year}
                    {pages}
                    <Form.Item
                      name="issuer"
                      label="Issuer"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {institution}
                    {country}
                    {number}
                    <Form.Item
                      name="assignee"
                      label="Assignee"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for report */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "report" ? (
                  <>
                    {year}
                    {pages}
                    {city}
                    {institution}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for statute */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "statute" ? (
                  <>
                    {publication}
                    {year}
                    {pages}
                    <Form.Item
                      name="source"
                      label="Source"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {country}
                    <Form.Item
                      name="statuteNumber"
                      label="Statute Number"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    {code}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for televisionBroadcast */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "televisionBroadcast" ? (
                  <>
                    {year}
                    {pages}
                    {distributor}
                    {country}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for thesis */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "thesis" ? (
                  <>
                    {year}
                    {pages}
                    {city}
                    {institution}
                    <Form.Item
                      name="department"
                      label="Department"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="type"
                      label="Type"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for unspacified */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "unspacified" ? (
                  <>
                    {publication}
                    {year}
                    {pages}
                    {volume}
                    {issue}
                    {city}
                    {publisher}
                    <Form.Item
                      name="typeOfwork"
                      label="Type of work"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for webPage */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "webPage" ? (
                  <>
                    {publication}
                    {year}
                    {pages}
                  </>
                ) : null
              }
            </Form.Item>
            {/* this is for workingPaper */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.referenceType !== currentValues.referenceType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("referenceType") === "workingPaper" ? (
                  <>
                    {year}
                    {pages}
                    {city}
                    {institution}
                    {number}
                    <Form.Item
                      name="series"
                      label="Series"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : null
              }
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Select
                mode="tags"
                placeholder="Please select"
                // defaultValue={["a10", "c12"]}
              ></Select>
            </Form.Item>
            <Form.Item name="month" label="Month">
              <Input />
            </Form.Item>
            <Form.Item name="day" label="Day">
              <Input />
            </Form.Item>
            <Form.Item name="abstract" label="Abstract">
              <Input.TextArea />
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
export default withRouter(Reference);
