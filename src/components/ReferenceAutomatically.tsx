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
  Upload,
  Table,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { createReference } from "./commonHelper";
import { withRouter } from "react-router-dom";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
import { idText } from "typescript";
var myself: any, myform: any;
myform = createRef();
class ReferenceAutomatically extends Component<any, any> {
  formRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      visible: false,
      selectedRowKeys: [],
      author: [],
      selectedKeys: [],
      CsvFile: {},
      CsvArray: [],
      CsvArrayModified: [],
      available: false,
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
    myself.props.closeReferenceAutomatically();
  };
  processCSV = async (str: any, delim = ",") => {
    await this.setState({
      CsvArrayModified: [],
      author: [],
    });
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    console.log(headers);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row: any) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj: any, header: any, i: any) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });
    await this.setState({ CsvArray: newArray, available: true });
    await this.state.CsvArray.splice(-1);
    console.log(this.state.CsvArray);
    var id = 1;
    this.state.CsvArray.map(async (item: any) => {
      var scvArray = {
        id: id,
        title: item.Title,
        referenceType: item.Type,
        edition: item.Edition,
        publisher: item.Publisher,
        Author: item.Author,
        year: item.Year,
        month: item.Month,
        day: item.Day,
      };
      id++;
      await this.setState({
        CsvArrayModified: [...this.state.CsvArrayModified, scvArray],
      });
    });
    console.log(this.state.author);
  };
  submit = async () => {
    console.log(this.state.CsvFile);
    const file = this.state.CsvFile;
    const reader = new FileReader();

    reader.onload = function (e: any) {
      const text = e.target.result;
      console.log(text);
      myself.processCSV(text);
    };
    reader.readAsText(file);
  };
  changeHandler = async (event: any) => {
    await this.setState({ CsvFile: event.target.files[0] });
  };
  onFinishFailed = async (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  onSearch = async (value: any) => {
    console.log(value);
  };
  onSelectChange = async (selectedRowKeys: any) => {
    await this.setState({ selectedRowKeys });
  };
  addSelectedReferences = async () => {
    this.setState({ isSpinVisible: true });
    this.state.selectedRowKeys.map(async (id: any) => {
      console.log(id);
      var selectedItem = this.state.CsvArrayModified.find(
        (item: any) => item.id === id
      );
      if (selectedItem) {
        await createReference(selectedItem, [selectedItem.Author])
          .then((response: any) => {
            if (response && response.data) {
              message.success(t("addSuccess"));
              this.setState({
                visible: false,
              });
              myself.props.closeReferenceAutomatically();

              this.setState({ isSpinVisible: false, CsvArrayModified: [] });
            }
          })
          .catch(async (error: any) => {
            message.error(error);
            this.setState({ isSpinVisible: false });
          });
      }
    });
  };
  render() {
    const { title, available, CsvArrayModified, CsvArray, selectedRowKeys } =
      this.state;

    const { Option } = Select;
    const columns: any = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "40%",
      },
      {
        title: "Type",
        dataIndex: "referenceType",
        key: "referenceType",
        width: "30%",
      },
      {
        title: "Edition",
        dataIndex: "edition",
        key: "edition",
        width: "30%",
      },
      {
        title: "Publisher",
        dataIndex: "publisher",
        key: "publisher",
        width: "30%",
      },
      {
        title: "Author",
        dataIndex: "Author",
        key: "Author",
        width: "30%",
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
        width: "30%",
      },
      {
        title: "Month",
        dataIndex: "month",
        key: "month",
        width: "30%",
      },
      {
        title: "Day",
        dataIndex: "day",
        key: "day",
        width: "30%",
      },
    ];
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Spin size="large" spinning={this.state.isSpinVisible}>
        <Drawer
          placement={"left"}
          title={t("reference.AddEntryManually")}
          width={920}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Spin size="large" spinning={this.state.isSpinVisible}>
            <Form.Item
              label={t("ReferenceAutomatically.SelectCSVFile")}
              name="csvFile"
            >
              <Input
                type="file"
                name="file"
                onChange={this.changeHandler}
                accept=".csv"
              />
            </Form.Item>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (this.state.CsvFile) this.submit();
              }}
            >
              {t("ReferenceAutomatically.DisplayData")}
            </Button>
            {(() => {
              if (available && CsvArrayModified.length >= 1) {
                return (
                  <div>
                    <Button
                      type="primary"
                      disabled={!hasSelected}
                      onClick={() => this.addSelectedReferences()}
                    >
                      {t("ReferenceAutomatically.AddSelectedReferences")}
                    </Button>
                    <Table
                      rowSelection={rowSelection}
                      rowKey="id"
                      bordered
                      columns={columns}
                      dataSource={this.state.CsvArrayModified}
                    />
                  </div>
                );
              } else {
                return <div>{t("ReferenceAutomatically.error")}</div>;
              }
            })()}
          </Spin>
        </Drawer>
      </Spin>
    );
  }
}
export default withTranslation()(withRouter(ReferenceAutomatically));
