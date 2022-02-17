import React, { Component } from "react";
import axios from "axios";
import {
  Avatar,
  Spin,
  Card,
  Row,
  Col,
  PageHeader,
  Descriptions,
  Typography,
  Button,
  message,
} from "antd";
import "../css/login.css";
import Search from "antd/lib/input/Search";
import { addToCollectionCreateReference } from "./commonHelper";
import { withRouter } from "react-router-dom";
var myself: any;
class SeacrchBook extends Component<any, any> {
  constructor(props: any) {
    super(props);
    myself = this;
    this.state = {
      isSpinVisible: false,
      searchTerm: "",
      bookDetail: [],
      searched: false,
      author: [],
    };
  }
  onSearch = async (value: any) => {
    await this.setState({ searchTerm: value, isSpinVisible: true });
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`
    );
    // Books result
    if (response.data.items.length >= 1) {
      await this.setState({
        bookDetail: response.data.items,
        isSpinVisible: false,
        searched: true,
      });
      console.log(this.state.bookDetail);
    }
  };
  addToCollection = async (bookDetailId: any) => {
    var selectedItem = this.state.bookDetail.find(
      (item: any) => item.id === bookDetailId
    );
    console.log(selectedItem);
    // set type for citation mean it is a book or article etc
    var referenceType = selectedItem.kind;
    const type1 = referenceType.split("#");
    referenceType = type1 && type1.length > 0 ? type1[0] : referenceType;
    if (referenceType === "books") {
      referenceType = "book";
    }
    //set book title
    var title = selectedItem.volumeInfo.title;
    var description = selectedItem.volumeInfo.description;
    // check author is already available in db  or not
    if (
      selectedItem.volumeInfo.authors &&
      selectedItem.volumeInfo.authors.length > 0
    ) {
      Promise.all(
        await selectedItem.volumeInfo.authors.map(async (item: any) => {
          console.log(item);
          await this.setState({ author: [...this.state.author, item] });
          console.log(this.state.author);
        })
      );
    }
    await addToCollectionCreateReference(
      referenceType,
      title,
      description,
      this.state.author
    )
      .then((response: any) => {
        if (response && response.data) {
          message.success("Success");
          // myform.current.resetFields();
          this.setState({
            visible: false,
          });
          myself.props.closeCollection();
          // myself.props.history.push("/dashBoard");
          this.setState({ isSpinVisible: false });
        }
      })
      .catch(async (error: any) => {
        message.error(error);
        this.setState({ isSpinVisible: false });
      });
  };
  render() {
    const { Title } = Typography;
    const { Meta } = Card;
    const { bookDetail, searched } = this.state;
    return (
      <Spin size="large" spinning={this.state.isSpinVisible}>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader ghost={false}>
            <Descriptions column={1}>
              <Descriptions.Item>
                <Title className="searchAlign" level={2}>
                  Welcome to Research Buddy
                </Title>
              </Descriptions.Item>
              <Descriptions.Item>
                <Title className="searchAlign" level={5}>
                  Search for and add articles to your library
                </Title>
              </Descriptions.Item>
              <Descriptions.Item>
                <Title className="searchAlign" level={5}>
                  <Search
                    placeholder=" search Book"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={this.onSearch}
                  />
                </Title>
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
        <Row
          style={{ marginTop: "10px" }}
          gutter={[
            { xs: 8, sm: 8, md: 16, lg: 32 },
            { xs: 8, sm: 8, md: 16, lg: 32 },
          ]}
        >
          {(() => {
            if (searched && bookDetail.length >= 1) {
              return this.state.bookDetail.map(
                (bookDetail: any, index: any) => {
                  return (
                    <Col className="gutter-row" key={index}>
                      <Card
                        hoverable
                        key={index}
                        style={{ width: 280 }}
                        cover={
                          <img
                            alt="example"
                            src={bookDetail.volumeInfo.imageLinks.thumbnail}
                            style={{ height: "300px" }}
                          />
                        }
                        actions={[
                          <Button
                            id={bookDetail.id}
                            onClick={() => this.addToCollection(bookDetail.id)}
                            type="primary"
                            size={"small"}
                          >
                            Add To Collection
                          </Button>,
                        ]}
                      >
                        <Meta
                          avatar={
                            <Avatar
                              src={bookDetail.volumeInfo.imageLinks.thumbnail}
                            />
                          }
                          title={bookDetail.volumeInfo.title}
                        />
                      </Card>
                    </Col>
                  );
                }
              );
            }
          })()}
        </Row>
      </Spin>
    );
  }
}
export default withRouter(SeacrchBook);
