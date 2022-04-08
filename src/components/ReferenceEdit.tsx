// @ts-nocheck
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
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import {
  createReference,
  getEditReference,
  updateReference,
} from "./commonHelper";
import { GlobalVars } from "../global/global";
import { withRouter } from "react-router-dom";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
var myself: any,
  from: any,
  to: any,
  codePagesTo: any,
  codePagesFrom: any,
  author1: any,
  myform: any;
myform = createRef();
class ReferenceEdit extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      visible: false,
      author: [],
      editReference: {},
      available: false,
      authors: [],
      editorsValues: [],
      tags: [],
      identifier: {},
    };
  }
  getEditReference = async () => {
    await this.setState({ editReference: {} });
    console.log(this.state.editReference);
    //get edit reference data from db
    await getEditReference()
      .then(async (response: any) => {
        if (response && response.data) {
          //set pages and codepages
          if (response.data.attributes.pages) {
            var pages = response.data.attributes.pages.split("-");
            if (pages[0] !== "undefined") {
              from = pages[0];
            }
            if (pages[1] !== "undefined") {
              to = pages[1];
            }
          }
          if (response.data.attributes.codePages) {
            var codePages = response.data.attributes.codePages.split("-");
            if (codePages[0] !== "undefined") {
              codePagesFrom = codePages[0];
            }
            if (codePages[1] !== "undefined") {
              codePagesTo = codePages[1];
            }
          }
          //end set pages here
          // set authors if present
          if (response.data.attributes.authors.data.length >= 1) {
            //first set authors to null make sure no previous author is present in array
            await this.setState({
              authors: [],
            });
            var counter = 0;
            response.data.attributes.authors.data.map(async (author: any) => {
              if (counter == 0) {
                author1 = author.attributes.name;
                counter++;
              } else {
                var authorobject = {
                  author: author.attributes.name,
                };
                await this.setState({
                  authors: [...this.state.authors, authorobject],
                });
                const onlyUnique = (value: any, index: any, self: any) => {
                  return self.indexOf(value) === index;
                };
                await this.setState({
                  authors: this.state.authors.filter(onlyUnique),
                });
              }
            });
          } else {
            await this.setState({
              authors: [],
            });
            author1 = " ";
          }
          //end author
          //set editor id
          if (response.data.attributes.editors.data.length >= 1) {
            //first set editors to null make sure no previous editors is present in array
            await this.setState({
              editorsValues: [],
            });
            response.data.attributes.editors.data.map(async (editor: any) => {
              await this.setState({
                editorsValues: [
                  ...this.state.editorsValues,
                  editor.attributes.name,
                ],
              });
              const onlyUnique = (value: any, index: any, self: any) => {
                return self.indexOf(value) === index;
              };
              await this.setState({
                editorsValues: this.state.editorsValues.filter(onlyUnique),
              });
            });
          } else {
            await this.setState({
              editorsValues: [],
            });
          }
          //end editor id
          //set tag id
          if (response.data.attributes.tags.data.length >= 1) {
            //first set tags to null make sure no previous tags is present in array
            await this.setState({
              tags: [],
            });
            response.data.attributes.tags.data.map(async (tag: any) => {
              await this.setState({
                tags: [...this.state.tags, tag.attributes.name],
              });
              const onlyUnique = (value: any, index: any, self: any) => {
                return self.indexOf(value) === index;
              };
              await this.setState({ tags: this.state.tags.filter(onlyUnique) });
            });
          } else {
            await this.setState({
              tags: [],
            });
          }
          //end tag id
          await this.setState({
            editReference: response.data,
            available: true,
          });
        }
      })
      .catch(async (error: any) => {
        console.log(error);
        this.setState({ isSpinVisible: false });
      });
  };
  componentWillReceiveProps = async (props: any) => {
    await this.setState({
      visible: props.open,
      identifier: props.editIdentifier,
    });
    if (this.state.identifier === "edit") {
      this.getEditReference();
    }
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = async () => {
    author1 = " ";
    await this.setState({
      isSpinVisible: false,
      visible: false,
      author: [],
      editReference: {},
      available: false,
      authors: [],
      editorsValues: [],
      tags: [],
      identifier: {},
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
    //end set  author values in one array
    await updateReference(values, this.state.author)
      .then(async (response: any) => {
        if (response && response.data) {
          message.success(t("editSuccess"));
          myform.current.resetFields();
          await this.setState({
            author: [],
            editReference: {},
            authors: [],
            editorsValues: [],
            tags: [],
            identifier: {},
          });
          this.setState({
            visible: false,
            isSpinVisible: false,
          });
          myself.props.closeReference();
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
    const {
      title,
      editReference,
      available,
      authors,
      tags,
      identifier,
      editorsValues,
    } = this.state;
    if (identifier === "edit") {
      if (!editReference.attributes) {
        return <div>Loading...</div>;
      }
    } else {
      return <div></div>;
    }
    const { Option } = Select;
    var volume = (
      <Form.Item name="volume" label={t("reference.Volume")}>
        <Input />
      </Form.Item>
    );
    var year = (
      <Form.Item
        name="year"
        label={t("reference.Year")}
        style={{
          display: "inline-block",
        }}
      >
        <Input />
      </Form.Item>
    );
    var city = (
      <Form.Item name="city" label={t("reference.City")}>
        <Input />
      </Form.Item>
    );
    var code = (
      <Form.Item name="code" label={t("reference.Code")}>
        <Input />
      </Form.Item>
    );
    var pages = (
      <Form.Item
        label={t("reference.Pages")}
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="from"
          style={{
            display: "inline-block",
            width: "calc(50%)",
          }}
        >
          <Input placeholder="From" />
        </Form.Item>
        <Form.Item
          name="to"
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
      <Form.Item name="edition" label={t("reference.Edition")}>
        <Input />
      </Form.Item>
    );
    var editors = (
      <Form.Item name="editors" label={t("reference.Editors")}>
        <Select mode="tags" placeholder="Please select"></Select>
      </Form.Item>
    );
    var publisher = (
      <Form.Item name="publisher" label={t("reference.Publisher")}>
        <Input />
      </Form.Item>
    );
    var distributor = (
      <Form.Item name="distributor" label={t("reference.Distributor")}>
        <Input />
      </Form.Item>
    );
    var country = (
      <Form.Item name="country" label={t("reference.Country")}>
        <Input />
      </Form.Item>
    );
    var publication = (
      <Form.Item name="publication" label={t("reference.Publication")}>
        <Input />
      </Form.Item>
    );
    var institution = (
      <Form.Item name="institution" label={t("reference.Institution")}>
        <Input />
      </Form.Item>
    );
    var number = (
      <Form.Item name="number" label={t("reference.Number")}>
        <Input />
      </Form.Item>
    );
    var issue = (
      <Form.Item name="issue" label={t("reference.Issue")}>
        <Input />
      </Form.Item>
    );
    return (
      <Spin size="large" spinning={this.state.isSpinVisible}>
        <Drawer
          placement={"left"}
          title={t("reference.EditReference")}
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
              scrollToFirstError={true}
              wrapperCol={{ span: 24 }}
              initialValues={{
                remember: true,
                volume: available ? editReference.attributes.volume : " ",
                year: available ? editReference.attributes.year : " ",
                city: available ? editReference.attributes.city : " ",
                code: available ? editReference.attributes.code : " ",
                from: available ? from : " ",
                to: available ? to : " ",
                edition: available ? editReference.attributes.edition : " ",
                editors: available ? editorsValues : " ",
                publisher: available ? editReference.attributes.publisher : " ",
                distributor: available
                  ? editReference.attributes.distributor
                  : " ",
                country: available ? editReference.attributes.country : " ",
                publication: title ? editReference.attributes.publication : " ",
                institution: available
                  ? editReference.attributes.institution
                  : " ",
                number: available ? editReference.attributes.number : " ",
                issue: available ? editReference.attributes.issue : " ",
                identifiers: available
                  ? editReference.attributes.identifiers
                  : " ",
                referenceType: available
                  ? editReference.attributes.referenceType
                  : " ",
                title: available ? editReference.attributes.title : " ",
                authors: available ? author1 : " ",
                authorsArray: available ? authors : " ",
                tags: available ? tags : " ",
                codePagesFrom: available ? codePagesFrom : " ",
                codePagesTo: available ? codePagesTo : " ",
                legislativeBody: available
                  ? editReference.attributes.legislativeBody
                  : " ",
                book: available ? editReference.attributes.book : " ",
                chapter: available ? editReference.attributes.chapter : " ",
                version: available ? editReference.attributes.version : " ",
                procTitle: available ? editReference.attributes.procTitle : " ",
                encyclopedia: available
                  ? editReference.attributes.encyclopedia
                  : " ",
                journal: available ? editReference.attributes.journal : " ",
                issuer: available ? editReference.attributes.issuer : " ",
                assignee: available ? editReference.attributes.assignee : " ",
                source: available ? editReference.attributes.source : " ",
                statuteNumber: available
                  ? editReference.attributes.statuteNumber
                  : " ",
                department: available
                  ? editReference.attributes.department
                  : " ",
                type: available ? editReference.attributes.type : " ",
                typeOfwork: available
                  ? editReference.attributes.typeOfwork
                  : " ",
                series: available ? editReference.attributes.series : " ",
                tagId: available ? editReference.attributes.tagId : " ",
                month: available ? editReference.attributes.month : " ",
                day: available ? editReference.attributes.day : " ",
                abstract: available ? editReference.attributes.abstract : " ",
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label={t("reference.Identifiers")} name="identifiers">
                <Search
                  placeholder=" search Book"
                  allowClear
                  enterButton="Search"
                  onSearch={this.onSearch}
                />
              </Form.Item>
              <Form.Item
                name="referenceType"
                label={t("reference.ReferenceType")}
              >
                <Select placeholder="Select Reference Type" allowClear>
                  <Option value="bill">{t("reference.Bill")}</Option>
                  <Option value="book">{t("reference.Book")}</Option>
                  <Option value="bookSection">
                    {t("reference.BookSection")}
                  </Option>
                  <Option value="case">{t("reference.Case")}</Option>
                  <Option value="computerProgram">
                    {t("reference.ComputerProgram")}
                  </Option>
                  <Option value="conferenceProceedings">
                    {t("reference.ConferenceProceedings")}
                  </Option>
                  <Option value="encyclopediaArticle">
                    {t("reference.EncyclopediaArticle")}
                  </Option>
                  <Option value="film">{t("reference.Film")}</Option>
                  <Option value="hearing">{t("reference.Hearing")}</Option>
                  <Option value="journalArticle">
                    {t("reference.JournalArticle")}
                  </Option>
                  <Option value="magazineArticle">
                    {t("reference.MagazineArticle")}
                  </Option>
                  <Option value="newspaperArticle">
                    {t("reference.NewspaperArticle")}
                  </Option>
                  <Option value="patent">{t("reference.Patent")}</Option>
                  <Option value="report">{t("reference.Report")}</Option>
                  <Option value="statute">{t("reference.Statute")}</Option>
                  <Option value="televisionBroadcast">
                    {t("reference.TelevisionBroadcast")}
                  </Option>
                  <Option value="thesis">{t("reference.Thesis")}</Option>
                  <Option value="unspacified">
                    {t("reference.Unspacified")}
                  </Option>
                  <Option value="webPage">{t("reference.WebPage")}</Option>
                  <Option value="workingPaper">
                    {t("reference.WorkingPaper")}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item name="title" label={t("reference.Title")}>
                <Input />
              </Form.Item>
              <Form.Item
                name="authors"
                label={t("reference.Authors")}
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
                          key={key}
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
                        {t("reference.AddAuthor")}
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
                        label={t("reference.CodePages")}
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
                        label={t("reference.LegislativeBody")}
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
                        label={t("reference.BookItem")}
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
                        label={t("reference.Chapter")}
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
                        label={t("reference.Version")}
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
                        label={t("reference.Proc.Title")}
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
                        label={t("reference.Encyclopedia")}
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
                        label={t("reference.journal")}
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
                        label={t("reference.Issuer")}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      {institution}
                      {country}
                      {number}
                      <Form.Item
                        name="assignee"
                        label={t("reference.Assignee")}
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
                        label={t("reference.Source")}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      {country}
                      <Form.Item
                        name="statuteNumber"
                        label={t("reference.StatuteNumber")}
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
                        label={t("reference.Department")}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="type"
                        label={t("reference.Type")}
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
                        label={t("reference.Typeofwork")}
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
                        label={t("reference.Series")}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </>
                  ) : null
                }
              </Form.Item>
              <Form.Item name="tags" label={t("reference.Tags")}>
                <Select mode="tags" placeholder="Please select"></Select>
              </Form.Item>
              <Form.Item name="month" label={t("reference.Month")}>
                <Input />
              </Form.Item>
              <Form.Item name="day" label={t("reference.Day")}>
                <Input />
              </Form.Item>
              <Form.Item name="abstract" label={t("reference.Abstract")}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {t("edit")}
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
export default withTranslation()(withRouter(ReferenceEdit));
