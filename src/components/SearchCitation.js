import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import { Input, Space,Card, Avatar, Col, Row,Button,Modal,Select,message,Spin } from 'antd';
import { tokenstore } from '../global/global';
import { createworkspaces,getCitaionsTagId,getCitaionsByTag,getCitaionsByAuthor,getCitaionsAuthorId,getCitaionsByTitle,getCitaionsByIsbn,getworkspaces,getPublishersByName,doLogout,getContributors,getContributorsByName,createCitations,createContributors,getPublishers,createPublisher } from './CommonHelper';
var myself,myform;

class SearchCitation extends React.Component {

  constructor() {
    super();
myself=this;
myform=createRef();
    // State of your application
    this.state = {
      //for db to save data
      modifiedData: {
        id:'',
        title: '',
        type: '',
        edition: '',
        publicationdate: '',
        doi: '',
        identifier: '',
        contributors: [],
        publishers: [],
        workspaces: [],
        year: '',
        codepages: '',
        city: '',
        legislativeBody: '',
        code: '',
        month: '',
        day: '',
        abstract: '',
        pages: '',
        volume: '',
        editors: '',
        book: '',
        chapter: '',
        version: '',
        proctitle: '',
        encyclopedia: '',
        country: '',
        journal: '',
        issue: '',
        issuer: '',
        institution: '',
        number: '',
        assignee: '',
        source: '',
        statutenumber: '',
        department: '',
        thesistype: '',
        typeofwork: '',
        series: '',
        distributor: '',
        publication: ''
      },
        error: null,
        contributorId:'',
        citationData:[],
        isSpinVisible:false,
    };
  }
  onSearchBook = async (value) =>{
     tokenstore.title=value;
     getCitaionsByTitle().then(async(response)=>{
       if(response && response.data)
       {
        await this.setState({citationData:response.data,isSpinVisible:false});
        console.log(this.state.citationData);
       }
     }).catch(async (error) => {
          console.log(error);
      });
   }
  //search by author
  onSearchAuthor = async (value) =>{
    tokenstore.contributorName=value;
    getCitaionsAuthorId().then(async(response)=>{
      if(response && response.data)
      {
      tokenstore.contributorid=response.data[0].id;
      getCitaionsByAuthor().then(async(response)=>{
        if(response && response.data)
        {
         await this.setState({citationData:response.data,isSpinVisible:false});
         console.log(this.state.citationData);
        }
      }).catch(async (error) => {
           console.log(error);
       });
      }
    }).catch(async (error) => {
         console.log(error);
     });
  }
  // serch by tags
  onSearchTags = async (value) =>{
    tokenstore.tagName=value;
    console.log(tokenstore.tagName);
    getCitaionsTagId().then(async(response)=>{
      if(response && response.data)
      {
      tokenstore.tagId=response.data[0].id;
      getCitaionsByTag().then(async(response)=>{
        if(response && response.data)
        {
         await this.setState({citationData:response.data,isSpinVisible:false});
         console.log(this.state.citationData);
        }
      }).catch(async (error) => {
           console.log(error);
       });
      }
    }).catch(async (error) => {
         console.log(error);
     });
  }
  render() {
     //this is set for translation
 const { t } = this.props;
    const { Meta } = Card;
    const { Search } = Input;
    const { error } = this.state;
    return (
      <div>
        <Spin size="large"  spinning={this.state.isSpinVisible} >
      <Space direction="vertical">
      <Search placeholder={t('searchCitation.enterIsbnOrBook')}  onSearch={this.onSearchBook} enterButton />
      <Search placeholder={t('searchCitation.enterAuthor')}  onSearch={this.onSearchAuthor} enterButton />
      <Search placeholder={t('searchCitation.enterTags')}  onSearch={this.onSearchTags} enterButton />
      {/* <Search placeholder="Enter ISBN Number"  onSearch={this.onSearchIsbn} enterButton /> */}
    </Space>
    <div className="site-card-wrapper">
    <Row gutter={16}>
    {this.state.citationData.map((citationdata,index) => (
       <Col span={8} key={index}>
       <Card key={index}
     style={{ width: 300 }}
     cover={
       <img
         alt="example"
         src={citationdata.type} style={{height:"300px"}}
       />
     }
     actions={[
     ]}
   >
     <Meta
       avatar={<Avatar src={citationdata.title} />}
       title={citationdata.title}
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
 export default withTranslation()(SearchCitation)