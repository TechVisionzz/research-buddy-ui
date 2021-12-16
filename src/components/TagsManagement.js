import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import {  Input, Button,DatePicker,Select,message } from 'antd';
import { Alert } from 'antd';
import { tokenstore } from '../global/global';
import Form from "@rjsf/core";
import '../css/general.css';
import {getworkspaces,doLogout,createTags,getParentTags,createCitations,getTags,getContributors,getPublishers} from './CommonHelper';
import '../css/citation.css';

import { version } from 'typescript';
var myself,myform;

class TagsManagement extends React.Component {
  constructor(props) {
    super(props);
myself=this;
myform=createRef();
    // State of your application
    this.state = {
      modifiedData: {
        name: ''
      },
      tagName: [],
      tagId: [],
      error: null,
    };
  }

   onError = (errors) => console.log("I have", errors.length, "errors to fix");
//fetch tags from db
async getTags(){
  await getParentTags().then(async(response) => {
    if (response && response.data) {
       await this.setState({tagName: response.data.map(item=>item.name) });
       await this.setState({tagId: response.data.map(item=>item.id.toString())});
        console.log(this.state.tagName);
        console.log(this.state.tagId);
    }
},
).catch(async (error) => {
    console.log(error);
    await doLogout();
});
}   
  componentDidMount = async () => {
      //call function
      this.getTags();
  };
  onSubmit = ({formData}, e) => 
  {
    console.log(formData);
  var tags={
    parentTag:[formData.parentId],
tags:formData.parentId,
name:formData.tagName,
user:tokenstore.userid
  }
   console.log(tags);
   createTags(tags).then(async (response) => {
     if (response && response.data) {
      const { t } = this.props;
      message.success(t('addSuccessMessage'));
 this.getTags();
     }
 }).catch(async (error) => {
     console.log(error);
 });
  };
  render() {
        //this is set for translation
        const { t } = this.props;
 var   schema ={
      "type": "object",
      "properties": {
        "parentId": {
          "type": "string",
          "title": t('tagsManagement.parent'),
          "enum":this.state.tagId,
          "enumNames":this.state.tagName,
          "uniqueItems": true
          },
        "tagName":{
          "type": "string",
          "title":t('tagsManagement.tagname')
        }
      }
    };
  var   uiSchema = {
    };
    //apply ui schema in future for responsiveness and grid system
  return (
      <Form schema={schema}  uiSchema={uiSchema}  onError={this.onError} onSubmit={this.onSubmit}/>
    );
  }
 }
export default withTranslation()(TagsManagement)


