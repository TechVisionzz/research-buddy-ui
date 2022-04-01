import React, { Component, createRef } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  Space,
  FormInstance,
  Table,
  message,
  Dropdown,
  Menu,
  Modal,
  Popconfirm,
} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  deleteReferencePermanently,
  deleteReferenceTemporarily,
  getAllReferences,
  getCollectionReferences,
  getCollections,
  getCollectionsForDropdown,
  getEditReference,
  getOneCollection,
  getTrashReferences,
  restoreReference,
  setReference,
} from "./commonHelper";
import { GlobalVars } from "../global/global";
import moment from "moment";
import { getTemplate } from "./csl";
import { Link, withRouter } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReferenceEdit from "./ReferenceEdit";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
const { Cite, plugins } = require("@citation-js/core");
require("@citation-js/plugin-csl");
var myself: any, type: any, myform: any;
let allRefereces: any;
myform = createRef();
var language = "en-US";
const headers = [
  { label: "Title", key: "attributes.title" },
  { label: "Type", key: "attributes.referenceType" },
  { label: "Edition", key: "attributes.edition" },
  { label: "Publisher", key: "attributes.publisher" },
  { label: "Year", key: "attributes.year" },
  { label: "Month", key: "attributes.month" },
  { label: "Day", key: "attributes.day" },
];
var data: any;
data = [];
class AllReferences extends Component<any, any> {
  searchInput: any;
  formRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      referenceData: [],
      identifier: " ",
      title: " ",
      collections: [],
      selectedKeys: [],
      selectedRowKeys: [],
      isModalVisible: false,
      isExportModalVisible: false,
      open: false,
      loading: false,
      reference: [],
      multipleExportModal: false,
      selectedExportModal: false,
      editIdentifier: " ",
    };
    this.closeReference = this.closeReference.bind(this);
  }
  getCollectionsForDropdown = async () => {
    this.setState({ isSpinVisible: true });
    await getCollectionsForDropdown()
      .then((response: any) => {
        this.setState({ collections: response.data });
      })
      .catch(async (error) => {
        message.error(error.error.message);
        this.setState({ isSpinVisible: false });
      });
  };
  componentDidMount = async () => {
    this.getAllReferences();
    this.getCollectionsForDropdown();
  };
  getAllReferences = async () => {
    this.setState({ isSpinVisible: true });
    await getAllReferences()
      .then(async (response: any) => {
        await this.setState({
          referenceData: response.data,
          title: "All References",
        });
      })
      .catch(async (error: any) => {
        message.error(error.error.message);
        this.setState({ isSpinVisible: false });
      });
  };
  getCollectionReferences = async () => {
    this.setState({ isSpinVisible: true });
    await getOneCollection()
      .then(async (response: any) => {
        await this.setState({
          title: response.data.attributes.name,
        });
      })
      .catch(async (error: any) => {
        message.error(error.error);
        this.setState({ isSpinVisible: false });
      });

    await getCollectionReferences(GlobalVars.collectionId)
      .then(async (response: any) => {
        await this.setState({
          referenceData: response.data,
        });
      })
      .catch(async (error: any) => {
        message.error(error.error);
        this.setState({ isSpinVisible: false });
      });
  };
  getTrashReferences = async () => {
    this.setState({ isSpinVisible: true });
    await getTrashReferences()
      .then(async (response: any) => {
        await this.setState({ referenceData: response.data, title: "Trash" });
      })
      .catch(async (error: any) => {
        message.error(error.error);
        this.setState({ isSpinVisible: false });
      });
  };
  componentWillReceiveProps = async (props: any) => {
    await this.setState({ identifier: props.identifier });
    if (this.state.identifier === "collection") {
      await this.getCollectionReferences();
    }
    if (this.state.identifier === "all") {
      await this.getAllReferences();
    }
    if (this.state.identifier === "trash") {
      await this.getTrashReferences();
    }
    this.getCollectionsForDropdown();
  };
  deleteReference = async (id: any) => {
    console.log(id);
    //delete permanently
    if (this.state.title === "Trash") {
      await deleteReferencePermanently(id)
        .then(async (response: any) => {
          message.success(t("deleteSuccess"));
          this.getTrashReferences();
        })
        .catch(async (error: any) => {
          message.error(error.error);
          this.setState({ isSpinVisible: false });
        });
    } else {
      // delete reference mean set trash to true
      await deleteReferenceTemporarily(id)
        .then(async (response: any) => {
          message.success(t("deleteSuccess"));
          this.getAllReferences();
        })
        .catch(async (error: any) => {
          message.error(error.error);
          this.setState({ isSpinVisible: false });
        });
    }
  };
  onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
  };
  handleReset = (clearFilters: any) => {
    this.setState({ searchText: "", selectedKeys: [] });
  };
  getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: (confirm: any, clearFilters: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={this.state.selectedKeys}
          onChange={(e: any) => this.setState({ selectedKeys: e.target.value })}
          onPressEnter={() =>
            this.handleSearch(this.state.selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              this.handleSearch(this.state.selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    console.log(selectedKeys);
    this.setState({
      searchText: selectedKeys,
      searchedColumn: dataIndex,
    });
  };
  setRecordId = async (id: any) => {
    GlobalVars.referenceId = id;
  };
  showCollections = async () => {
    this.setState({ isModalVisible: true });
  };
  onFinish = async (values: any) => {
    this.setState({ isModalVisible: false });
    await setReference(values)
      .then((response: any) => {
        console.log(response.data);
        message.success(t("addSuccess"));
      })
      .catch(async (error: any) => {
        message.error(error.error.message);
        this.setState({ isSpinVisible: false });
      });
  };
  exportSingleReference = async () => {
    if (type === "csv") {
      var selectedItem = this.state.referenceData.find(
        (item: any) => item.id === GlobalVars.referenceId
      );
      if (selectedItem) {
        console.log(selectedItem);
        var downloadObject = {
          attributes: {
            title: selectedItem.attributes.title,
            referenceType: selectedItem.attributes.referenceType,
            edition: selectedItem.attributes.edition,
            publisher: selectedItem.attributes.publisher,
            year: selectedItem.attributes.year,
            month: selectedItem.attributes.month,
            day: selectedItem.attributes.day,
          },
        };
        data.push(downloadObject);
        console.log(data);
        this.setState({ loading: true });
      }
    } else {
      var selectedItem = this.state.referenceData.find(
        (item: any) => item.id === GlobalVars.referenceId
      );
      if (selectedItem) {
        const dateFormatYear = "YYYY";
        const dateFormatMonth = "MM";
        const dateFormatYearDay = "DD";
        var dateYear = moment(selectedItem.attributes.publication).format(
          dateFormatYear
        );
        var dateMonth = moment(selectedItem.attributes.publication).format(
          dateFormatMonth
        );
        var dateDay = moment(selectedItem.attributes.publication).format(
          dateFormatYearDay
        );
        var payload = {
          id: selectedItem.id,
          title: selectedItem.attributes.title,
          type: selectedItem.attributes.type,
          edition: selectedItem.attributes.edition,
          publisher: selectedItem.attributes.publisher,
          doi: "123",
          author: [
            {
              family: "ali",
              given: "khan",
            },
          ],
          issued: [{ "date-parts": [dateYear, dateMonth, dateDay] }],
        };
        let config = plugins.config.get("@csl");
        config.templates.add(type, getTemplate(type));
        //passing payload to the site to make biblography
        var myCite = new Cite(payload);
        //create citation in html format
        let output = myCite.format("bibliography", {
          format: "html",
          template: type,
          lang: language,
        });
        //to make the link of out and download this file in html format
        const fileName = "file";
        const blob = new Blob([output], { type: "html" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  exportAllRefereces = () => {
    allRefereces = [];
    if (type === "csv") {
      this.state.referenceData.map((item: any) => {
        var downloadObject = {
          attributes: {
            title: item.attributes.title,
            referenceType: item.attributes.referenceType,
            edition: item.attributes.edition,
            publisher: item.attributes.publisher,
            year: item.attributes.year,
            month: item.attributes.month,
            day: item.attributes.day,
          },
        };
        data.push(downloadObject);
        console.log(data);
      });
      this.setState({ loading: true });
    } else {
      if (this.state.referenceData.length !== 0) {
        this.state.referenceData.map((item: any) => {
          const dateFormatYear = "YYYY";
          const dateFormatMonth = "MM";
          const dateFormatYearDay = "DD";
          var dateYear = moment(moment.now()).format(dateFormatYear);
          var dateMonth = moment(moment.now()).format(dateFormatMonth);
          var dateDay = moment(moment.now()).format(dateFormatYearDay);
          var payload = {
            id: item.id,
            title: item.attributes.title,
            type: item.attributes.type,
            edition: item.attributes.edition,
            publisher: item.attributes.publisher,
            doi: "123",
            author: [
              {
                family: "ali",
                given: "khan",
              },
            ],
            issued: [{ "date-parts": [dateYear, dateMonth, dateDay] }],
          };
          allRefereces.push(payload);
        });
        //fetch template
        let config = plugins.config.get("@csl");
        config.templates.add(language, getTemplate(type));
        //create citation in html format
        var myCite = new Cite(allRefereces);
        let output = myCite.format("bibliography", {
          format: "html",
          template: type,
          lang: language,
        });
        //to make the link of out and download this file in html format
        const fileName = "file";
        const blob = new Blob([output], { type: "html" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  closeReference = async () => {
    this.getAllReferences();
    this.setState({ open: false });
  };
  openExportModel = async (id: any) => {
    this.setState({ isExportModalVisible: true });
    GlobalVars.referenceId = id;
    console.log(GlobalVars.referenceId);
  };
  openSingleReferenceModel = async (values: any) => {
    type = values.referenceStyle;
    this.setState({ isExportModalVisible: false });
    this.exportSingleReference();
  };
  openMultipleReferenceModel = async (values: any) => {
    type = values.referenceStyle;
    this.setState({ multipleExportModal: false });
    this.exportAllRefereces();
  };
  restoreReference = async (id: any) => {
    console.log(id);
    await restoreReference(id)
      .then(async (response: any) => {
        message.success(t("restoreSuccess"));
        await this.setState({ identifier: "collection" });
        this.getTrashReferences();
      })
      .catch(async (error: any) => {
        message.error(error.error);
        this.setState({ isSpinVisible: false });
      });
  };
  editReference = async (id: any) => {
    GlobalVars.referenceId = id;
    console.log(GlobalVars.referenceId);
    await this.setState({ open: true, editIdentifier: "edit" });
  };
  exportAllReferences = async () => {
    this.setState({ multipleExportModal: true });
  };
  openExportSelectdModel = async () => {
    this.setState({ selectedExportModal: true });
  };
  selectedReferences = async (values: any) => {
    type = values.referenceStyle;
    this.setState({ selectedExportModal: false });
    this.exportSelectedRefereces();
  };
  exportSelectedRefereces = async () => {
    allRefereces = [];
    if (type === "csv") {
      this.state.selectedRowKeys.map((item: any) => {
        var selectedItem = this.state.referenceData.find(
          (item1: any) => item1.id === item
        );
        if (selectedItem) {
          var downloadObject = {
            attributes: {
              title: selectedItem.attributes.title,
              referenceType: selectedItem.attributes.referenceType,
              edition: selectedItem.attributes.edition,
              publisher: selectedItem.attributes.publisher,
              year: selectedItem.attributes.year,
              month: selectedItem.attributes.month,
              day: selectedItem.attributes.day,
            },
          };
          data.push(downloadObject);
          console.log(data);
        }
      });
      this.setState({ loading: true });
    } else {
      this.state.selectedRowKeys.map((item: any) => {
        var selectedItem = this.state.referenceData.find(
          (item1: any) => item1.id === item
        );
        console.log(selectedItem);
        if (selectedItem) {
          const dateFormatYear = "YYYY";
          const dateFormatMonth = "MM";
          const dateFormatYearDay = "DD";
          var dateYear = moment(selectedItem.attributes.publication).format(
            dateFormatYear
          );
          var dateMonth = moment(selectedItem.attributes.publication).format(
            dateFormatMonth
          );
          var dateDay = moment(selectedItem.attributes.publication).format(
            dateFormatYearDay
          );
          var payload = {
            id: selectedItem.id,
            title: selectedItem.attributes.title,
            type: selectedItem.attributes.type,
            edition: selectedItem.attributes.edition,
            publisher: selectedItem.attributes.publisher,
            doi: "123",
            author: [
              {
                family: "ali",
                given: "khan",
              },
            ],
            issued: [{ "date-parts": [dateYear, dateMonth, dateDay] }],
          };
          allRefereces.push(payload);
        }
      });
      let config = plugins.config.get("@csl");
      config.templates.add(type, getTemplate(type));
      console.log(allRefereces);
      //passing payload to the site to make biblography
      var myCite = new Cite(allRefereces);
      //create citation in html format
      let output = myCite.format("bibliography", {
        format: "html",
        template: type,
        lang: language,
      });
      //to make the link of out and download this file in html format
      const fileName = "file";
      const blob = new Blob([output], { type: "html" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName + ".html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  closeCollectionModel = async () => {
    this.setState({ isModalVisible: false });
  };
  closeExportModel = async () => {
    this.setState({ isExportModalVisible: false });
  };
  closeMultipleExportModal = async () => {
    this.setState({ multipleExportModal: false });
  };
  closeselectedExportModal = async () => {
    this.setState({ selectedExportModal: false });
  };
  closeDownloadModel = async () => {
    this.setState({ loading: false });
  };
  render() {
    const { Option } = Select;
    const organizeMenu = (
      <Menu>
        <Menu.Item
          onClick={(a) => {
            this.showCollections();
          }}
          key="1"
        >
          Add To Collection
        </Menu.Item>
      </Menu>
    );
    const { selectedRowKeys, referenceData, title, loading, reference } =
      this.state;
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    if (!referenceData) {
      return <div>Loading...</div>;
    }
    const columns: any = [
      {
        title: t("allReference.title"),
        dataIndex: ["attributes", "title"],
        key: "title",
        width: "40%",
        render: (text: any, record: any) => (
          <a onClick={() => this.editReference(record.id)}>{text}</a>
        ),
      },
      {
        title: t("allReference.type"),
        dataIndex: ["attributes", "type"],
        key: "type",
        width: "30%",
      },
      {
        title: t("allReference.actions"),
        key: "Actions",
        render: (text: any, record: any) => (
          <Space size="middle">
            {(() => {
              if (title !== "Trash") {
                return (
                  <>
                    <Dropdown overlay={organizeMenu} trigger={["click"]}>
                      <Button
                        onClick={(a) => {
                          this.setRecordId(record.id);
                        }}
                        size="small"
                      >
                        {t("allReference.organize")} <DownOutlined />
                      </Button>
                    </Dropdown>
                    <Button
                      onClick={(a) => {
                        this.openExportModel(record.id);
                      }}
                      size="small"
                    >
                      {t("allReference.Export")}
                    </Button>
                    <Popconfirm
                      onConfirm={(a: any) => {
                        this.deleteReference(record.id);
                      }}
                      title="Are You Sure"
                      okText="yes"
                      cancelText="no"
                    >
                      <Button danger size="small">
                        {t("allReference.Delete")}
                      </Button>
                    </Popconfirm>
                  </>
                );
              }
            })()}
            {(() => {
              if (title === "Trash") {
                return (
                  <>
                    <Button
                      onClick={(a) => {
                        this.restoreReference(record.id);
                      }}
                      size="small"
                    >
                      {t("allReference.Restore")}
                    </Button>
                    <Popconfirm
                      onConfirm={(a: any) => {
                        this.deleteReference(record.id);
                      }}
                      title="Are You Sure"
                      okText="yes"
                      cancelText="no"
                    >
                      <Button danger size="small">
                        {t("allReference.Delete")}
                      </Button>
                    </Popconfirm>
                  </>
                );
              }
            })()}
          </Space>
        ),
      },
    ];
    var tableTitle: any;
    if (title !== "Trash") {
      tableTitle = (
        <Space>
          {title}
          <Button
            type="primary"
            disabled={!hasSelected}
            onClick={() => this.openExportSelectdModel()}
            size="small"
          >
            {t("allReference.ExportSelected")}
          </Button>
          <Button
            onClick={this.exportAllReferences}
            size="small"
            type="primary"
          >
            {t("allReference.ExportAll")}
          </Button>
        </Space>
      );
    }
    if (title === "Trash") {
      tableTitle = <Space>{title}</Space>;
    }
    return (
      <>
        <ReferenceEdit
          open={this.state.open}
          closeReference={this.closeReference}
          editIdentifier={this.state.editIdentifier}
        />
        <Modal
          style={{ width: 300 }}
          footer={null}
          title={t("allReference.SelectCollection")}
          visible={this.state.isModalVisible}
          onCancel={this.closeCollectionModel}
        >
          <Form
            className="marginForm"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="collectionName"
              label={t("allReference.Collection")}
              rules={[{ required: true }]}
            >
              <Select placeholder="Please Select Collection">
                {this.state.collections.map((item: any) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.attributes.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("allReference.ok")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* export reference */}
        <Modal
          style={{ width: 300 }}
          footer={null}
          title={t("allReference.SelectStyle")}
          visible={this.state.isExportModalVisible}
          onCancel={this.closeExportModel}
        >
          <Form
            className="marginForm"
            initialValues={{ remember: true }}
            onFinish={this.openSingleReferenceModel}
            ref={myform}
          >
            <Form.Item
              name="referenceStyle"
              label={t("allReference.Style")}
              rules={[{ required: true }]}
            >
              <Select placeholder="Please Select Style">
                <Option value="Chicago">{t("allReference.Chicago")}</Option>
                <Option value="MLA">{t("allReference.MLA")}</Option>
                <Option value="APA">{t("allReference.APA")}</Option>
                <Option value="csv">{t("allReference.CSV")}</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("allReference.ok")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* export references */}
        <Modal
          style={{ width: 300 }}
          footer={null}
          title={t("allReference.SelectStyle")}
          visible={this.state.multipleExportModal}
          onCancel={this.closeMultipleExportModal}
        >
          <Form
            className="marginForm"
            initialValues={{ remember: true }}
            onFinish={this.openMultipleReferenceModel}
          >
            <Form.Item
              name="referenceStyle"
              label="Style"
              rules={[{ required: true }]}
            >
              <Select placeholder="Please Select Style">
                <Option value="Chicago">{t("allReference.Chicago")}</Option>
                <Option value="MLA">{t("allReference.MLA")}</Option>
                <Option value="APA">{t("allReference.APA")}</Option>
                <Option value="csv">{t("allReference.CSV")}</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("allReference.ok")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* export selected references */}
        <Modal
          style={{ width: 300 }}
          footer={null}
          title={t("allReference.SelectStyle")}
          visible={this.state.selectedExportModal}
          onCancel={this.closeselectedExportModal}
        >
          <Form
            className="marginForm"
            initialValues={{ remember: true }}
            onFinish={this.selectedReferences}
          >
            <Form.Item
              name="referenceStyle"
              label={t("allReference.Style")}
              rules={[{ required: true }]}
            >
              <Select placeholder="Please Select Style">
                <Option value="Chicago">{t("allReference.Chicago")}</Option>
                <Option value="MLA">{t("allReference.MLA")}</Option>
                <Option value="APA">{t("allReference.APA")}</Option>
                <Option value="csv">{t("allReference.CSV")}</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("allReference.ok")}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* download file model */}
        <Modal
          style={{ width: 100 }}
          footer={null}
          visible={this.state.loading}
          onCancel={this.closeDownloadModel}
        >
          <CSVLink data={data} headers={headers}>
            {!loading ? " " : "Download me"}
          </CSVLink>
        </Modal>
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          bordered
          title={() => tableTitle}
          columns={columns}
          dataSource={this.state.referenceData}
        />
      </>
    );
  }
}
export default withTranslation()(withRouter(AllReferences));
