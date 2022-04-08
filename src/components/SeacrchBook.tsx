// @ts-nocheck
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
  Radio,
  Tooltip,
  Popover,
} from "antd";
import Search from "antd/lib/input/Search";
import {
  addToCollectionCreateReference,
  getSearchReferences,
} from "./commonHelper";
import { withRouter } from "react-router-dom";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
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
      source: "local",
    };
  }
  onSearch = async (value: any) => {
    await this.setState({ bookDetail: [] });
    if (value.length !== 0) {
      await this.setState({ searchTerm: value, isSpinVisible: true });
      // openLibrary search
      if (this.state.source === "openlibrary") {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${this.state.searchTerm}&limit=10`
        );
        if (response.data.docs.length >= 1) {
          // console.log(response.data);
          response.data.docs.map(async (item: any) => {
            var identifier;
            if (item.isbn) {
              identifier = item.isbn[0];
            }
            var data = {
              attributes: {
                source: "open Library",
                title: item.title,
                referenceType: "book",
                author: item.author_name,
                identifier: identifier,
              },
            };
            this.state.bookDetail.push(data);
          });
          console.log(this.state.bookDetail);
        }
      }
      //  google search
      if (this.state.source === "google") {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`
        );
        // Books result
        if (response.data.items.length >= 1) {
          console.log(response.data);
          response.data.items.map(async (item: any) => {
            var referenceType = item.kind;
            const type1 = referenceType.split("#");
            referenceType =
              type1 && type1.length > 0 ? type1[0] : referenceType;
            if (referenceType === "books") {
              referenceType = "book";
            }
            var identifier;
            if (item.volumeInfo.industryIdentifiers) {
              identifier = item.volumeInfo.industryIdentifiers[0].identifier;
            }
            var picture;
            if (item.volumeInfo.imageLinks) {
              picture = item.volumeInfo.imageLinks.thumbnail;
            }
            var data = {
              attributes: {
                source: "google",
                title: item.volumeInfo.title,
                referenceType: referenceType,
                author: item.volumeInfo.authors,
                identifier: identifier,
                picture: picture,
              },
            };
            this.state.bookDetail.push(data);
          });
          console.log(this.state.bookDetail);
        }
      }
      //local search
      if (this.state.source === "local") {
        await getSearchReferences(value)
          .then(async (response: any) => {
            if (response && response.data) {
              if (response.data.length >= 1) {
                await this.setState({ isSpinVisible: false });
                console.log(response.data);
                var data;
                response.data.map(async (item: any) => {
                  console.log(item.attributes);
                  data = {
                    attributes: {
                      source: "local",
                      title: item.attributes.title,
                      referenceType: item.attributes.referenceType,
                      author: item.attributes.authors,
                      identifier: item.attributes.identifier,
                      picture: item.attributes.picture,
                    },
                  };
                  await this.setState({
                    bookDetail: [...this.state.bookDetail, data],
                  });
                  console.log(this.state.bookDetail);
                });
              }
            }
          })
          .catch(async (error: any) => {
            message.error(error.error);
            this.setState({ isSpinVisible: false });
          });
      }
    }
    await this.setState({
      isSpinVisible: false,
      searched: true,
    });
  };
  addToCollection = async (bookDetailId: any) => {
    this.setState({ isSpinVisible: true });
    var selectedItem = this.state.bookDetail.find(
      (item: any) => item.id === bookDetailId
    );
    console.log(selectedItem);
    // check author is already available in db  or not
    if (
      selectedItem.attributes.author &&
      selectedItem.attributes.author.length > 0
    ) {
      Promise.all(
        await selectedItem.attributes.author.map(async (item: any) => {
          await this.setState({ author: [...this.state.author, item] });
          console.log(this.state.author);
        })
      );
    }
    await addToCollectionCreateReference(selectedItem, this.state.author)
      .then((response: any) => {
        if (response && response.data) {
          message.success(t("addSuccess"));
          this.setState({ isSpinVisible: false });
        }
      })
      .catch(async (error: any) => {
        message.error(error);
        this.setState({ isSpinVisible: false });
      });
  };
  onChange = async (e: any) => {
    await this.setState({ bookDetail: [], source: e.target.value });
  };
  getDetail = (bookDetail: any) => {
    return (
      <div>
        <p>Reference Type : {bookDetail.attributes.referenceType}</p>
        <p>Identifier : {bookDetail.attributes.identifier}</p>
        {(() => {
          if (this.state.source === "local") {
            return bookDetail.attributes.author.data.map((item: any) => {
              return <p>Auther : {item.attributes.name}</p>;
            });
          }
          if (
            this.state.source === "google" ||
            this.state.source === "openlibrary"
          ) {
            return bookDetail.attributes.author.map((item: any) => {
              return <p>Auther : {item}</p>;
            });
          }
        })()}
      </div>
    );
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
                  {t("searchBook.title")}
                </Title>
              </Descriptions.Item>
              <Descriptions.Item>
                <Title className="searchAlign" level={5}>
                  {t("searchBook.subTitle")}
                </Title>
              </Descriptions.Item>
              <Descriptions.Item>
                <Title className="searchAlign" level={5}>
                  <Search
                    placeholder={t("searchBook.placeholder")}
                    allowClear
                    enterButton={t("searchBook.search")}
                    size="large"
                    onSearch={this.onSearch}
                    minLength={3}
                  />
                </Title>
              </Descriptions.Item>
              <Descriptions.Item>
                <Title className="searchAlign" level={5}>
                  {t("searchBook.source")}
                  <Radio.Group defaultValue={"local"} onChange={this.onChange}>
                    <Radio checked value="local">
                      {t("searchBook.local")}
                    </Radio>
                    <Radio value="google">{t("searchBook.google")} </Radio>
                    <Radio value="openlibrary">
                      {t("searchBook.openlibrary")}
                    </Radio>
                  </Radio.Group>
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
              return bookDetail.map((bookDetail: any, index: any) => {
                return (
                  <Col className="gutter-row" key={index}>
                    <Popover
                      // key={index}
                      content={this.getDetail(bookDetail)}
                      title="Detail"
                    >
                      <Card
                        hoverable
                        style={{ width: 280 }}
                        cover={
                          <img
                            alt="example"
                            src={
                              bookDetail.attributes.picture
                                ? bookDetail.attributes.picture
                                : "book.jpg"
                            }
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
                            {t("searchBook.AddToCollection")}
                          </Button>,
                        ]}
                      >
                        <Meta
                          avatar={
                            <Avatar
                              src={
                                bookDetail.attributes.picture
                                  ? bookDetail.attributes.picture
                                  : "book.jpg"
                              }
                            />
                          }
                          description={
                            "Source : " + bookDetail.attributes.source
                          }
                          title={bookDetail.attributes.title}
                        />
                      </Card>
                    </Popover>
                  </Col>
                );
              });
            }
          })()}
        </Row>
      </Spin>
    );
  }
}
export default withTranslation()(withRouter(SeacrchBook));
