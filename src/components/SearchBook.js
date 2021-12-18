import React, { createRef, Component, Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import { Input, Space, Card, Avatar, Col, Row, Button, Modal, Select, message, Spin } from 'antd';
import { tokenstore } from '../global/global';
import { createworkspaces, getworkspaces, getPublishersByName, doLogout, getContributors, getContributorsByName, createCitations, createContributors, getPublishers, createPublisher } from './CommonHelper';
var myself, myform, t;

class SearchBook extends React.Component {

  constructor() {
    super();
    myself = this;
    t = this.props;
    myform = createRef();
    // State of your application
    this.state = {
      //for db to save data
      title: '', type: '', edition: '', publicationdate: '', doi: '', identifier: '', workspaces: [], contributors: [], publishers: [],
      //this is for get datafrom db
      workspacess: [],
      contributorss: [],
      publisherss: [],
      //end here
      searchTerm: '',
      bookDetail: [],
      error: null,
      isModalVisible: false,
      isSpinVisible: false,
      contributerByName: [],
      publisherByName: [],
      selected: []
    };
  }
  componentDidMount = async () => {
    await getworkspaces().then(async (response) => {
      if (response && response.data) {
        await this.setState({ workspacess: response.data });
      }
    }).catch(async (error) => {
      console.log(error);
      await doLogout();
    });
    await getContributors().then(async (response) => {
      if (response && response.data) {
        this.setState({ contributorss: response.data });
        // console.log("contributorss"+this.state.contributorss);
      }
    }).catch(async (error) => {
      console.log(error);
      await doLogout();
    });
    await getPublishers().then(async (response) => {
      if (response && response.data) {
        await this.setState({ publisherss: response.data });
        // console.log("publisherss"+this.state.publisherss);

      }
    }).catch(async (error) => {
      console.log(error);
      await doLogout();
    });
  };

  showStyleModel = (bookDetailId) => {
    tokenstore.bookDetailId = bookDetailId;
    this.setState({ isModalVisible: true });

  }
  async handleSubmit() {
    var workspace = {
      name: myform.current.getFieldValue('name'),
      description: myform.current.getFieldValue('description'),
      parent: myform.current.getFieldValue('parent'),
      user: tokenstore.userid,
    }
    createworkspaces(workspace).then(async (response) => {
      if (response && response.data) {
        myform.current.resetFields();
        const { t } = this.props;
        message.success(t('addSuccessMessage'));

      }
    }).catch(async (error) => {
      console.log(error);
      // await MySelf.setState({ showSuccess: false, showError: true, rsMessage: t('error_while_creating_service') });
      alert(error);
    });
  };
  onSearch = async value => {
    await this.setState({ searchTerm: value, isSpinVisible: true });
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`);
    // Books resultw
    await this.setState({ bookDetail: result.data.items, isSpinVisible: false });
    // console.log(JSON.stringify(result.data.items[0]));
  }
  addToCollection = async (workspaceid) => {
    tokenstore.addToCollectionId = workspaceid;
    var selectedItem = this.state.bookDetail.find((item) => item.id === tokenstore.bookDetailId);
    // set type for citation mean it is a book or article etc
    var bookType = selectedItem.kind;
    const type1 = bookType.split('#');
    bookType = (type1 && type1.length > 0) ? type1[0] : bookType;
    //check author is already available in db  or not
    if (selectedItem.volumeInfo.authors && selectedItem.volumeInfo.authors.length > 0) {
      var firstname, lastname, thirdname;
      await selectedItem.volumeInfo.authors.map(async (item) => {
        const names = item.split(" ");
        firstname = names && names.length > 0 ? names[0] : item;
        lastname = names && names.length >= 1 ? names[1] : null;
        thirdname = names && names.length >= 2 ? names[2] : null;
        //check the author is already in db or not 
        if (!this.state.contributorss.find((item) => item.firstname === firstname && item.lastname === lastname)) {
          var contributor = {
            firstname: firstname,
            lastname: lastname,
          }
          await createContributors(contributor).then(async (response) => {
            if (response && response.data) {
              const { t } = myself.props;
              message.success(t('addSuccessMessage'));
            }
          })
        }
      });
      await getContributorsByName(firstname, lastname).then(async (response) => {
        if (response && response.data) {
          console.log(response.data);
          // var joined = this.state.contributerByName.concat('1');
          // {publisherByName: [...this.state.publisherByName,...[response.data] ]}
          await this.setState({ contributerByName: [...this.state.contributerByName, response.data[0].id] });
          //  console.log(this.state.contributerByName);
          // { contributerByName:response.data[0].id }
        }
      }).catch(async (error) => {
        console.log(error);
        await doLogout();
      });
    }
    // check publisher is already available in db  or not
    if (selectedItem.volumeInfo.publisher && selectedItem.volumeInfo.publisher.length > 0) {
      //if not present then create publisher
      if (!this.state.publisherss.find((item) => item.name === selectedItem.volumeInfo.publisher)) {
        var publisher = {
          name: selectedItem.volumeInfo.publisher
        }
        await createPublisher(publisher).then(async (response) => {
          if (response && response.data) {
            const { t } = myself.props;
            message.success(t('addSuccessMessage'));
          }
        })
      }
      //get publisher from db
      await getPublishersByName(selectedItem.volumeInfo.publisher).then(async (response) => {
        if (response && response.data) {
          await this.setState({ publisherByName: [...this.state.publisherByName, ...[response.data[0].id]] });
        }
      }).catch(async (error) => {
        console.log(error);
        await doLogout();
      });
    }

    var citation = {
      identifier: selectedItem.volumeInfo.industryIdentifiers[0].type,
      title: selectedItem.volumeInfo.title,
      type: bookType,
      publicationdate: selectedItem.volumeInfo.publishedDate,
      workspaces: {
        id: tokenstore.addToCollectionId
      },
      publishers: this.state.publisherByName,
      contributors: this.state.contributerByName
    }
    console.log(citation);
    await createCitations(citation).then(async (response) => {
      if (response && response.data) {
        const { t } = myself.props;
        message.success(t('addSuccessMessage'));
      }
    })

  }
  handleChange = (value) => {
    // console.log('onchange',value.value); 
    this.addToCollection(value.value);
    this.setState({ isModalVisible: false });
    this.setState({ selected: [] });

  }
  render() {
    //this is set for translation
    const { t } = this.props;
    const { Option } = Select;
    const { Meta } = Card;
    const { Search } = Input;
    const { error } = this.state;
    return (
      <div>
        <Spin size="large" spinning={this.state.isSpinVisible} >
          <Modal onCancel={() => this.setState({ isModalVisible: false })} footer={null} title={t('searchBook.selectWorkspace')} visible={this.state.isModalVisible} >
            <Select
              labelInValue
              style={{ width: 200, textAlign: "left" }}
              onChange={this.handleChange} value={this.state.selected}
            >
              {this.state.workspacess.map(workspace => (
                <Option key={workspace.id} value={workspace.id}>{workspace.name}</Option>
              ))}

            </Select>
          </Modal>
          <Space direction="vertical">
            <Search placeholder={t('searchBook.inputBookName')} onSearch={this.onSearch} enterButton />
          </Space>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              {this.state.bookDetail.map((bookDetail, index) => (
                <Col span={8} key={index}>
                  <Card key={index}
                    style={{ width: 300 }}
                    cover={
                      <img
                        alt="example"
                        src={bookDetail.volumeInfo.imageLinks.thumbnail} style={{ height: "300px" }}
                      />
                    }
                    actions={[
                      <Button id={bookDetail.id} onClick={() => this.showStyleModel(bookDetail.id)} type="primary" size={"small"}>{t('searchBook.addcollection')}</Button>
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src={bookDetail.volumeInfo.imageLinks.thumbnail} />}
                      title={bookDetail.volumeInfo.title}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Spin>
      </div>
    );
  }
}

export default withTranslation()(SearchBook)