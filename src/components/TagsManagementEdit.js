import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import {  Input, Button,DatePicker,Select,message } from 'antd';
import { Alert } from 'antd';
import { tokenstore } from '../global/global';
import Form from "@rjsf/core";
import '../css/general.css';
import {getTagsForEdit,doLogout,editTags,getParentTags,createCitations,getTags,getContributors,getPublishers} from './CommonHelper';
import '../css/citation.css';

// import { version } from 'typescript';
var myself,myform;

class TagsManagementEdit extends React.Component {
  constructor(props) {
    super(props);
myself=this;
myform=createRef();
    // State of your application
    this.state = {
      modifiedData:[],
      tagName: [],
      tagId: [],
      defaultParentId:'',
      error: null,
    };
  }

   onError = (errors) => console.log("I have", errors.length, "errors to fix");
  componentDidMount = async () => {
      //fetch all tags from db
      await getParentTags().then(async(response) => {
        if (response && response.data) {
         await   this.setState({tagName: response.data.map(item=>item.name) });
         await this.setState({tagId: response.data.map(item=>item.id.toString())});
         console.log(this.state.tagName);
         console.log(this.state.tagId);
        }
    },
    )
    .catch(async (error) => {
        console.log(error);
        var a= await doLogout();
        if(a){
          myself.props.history.push('/');
        }
    });
    //fetch data from db for edit on the base of id
    await getTagsForEdit().then(async(response) => {
      if (response && response.data) {
         await this.setState({modifiedData: response.data});
         console.log(this.state.modifiedData);
         await this.setState({defaultParentId:response.data.parentTag[0].id.toString()});
         console.log(this.state.defaultParentId);
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
  });
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
   editTags(tags).then(async (response) => {
     if (response && response.data) {
      const { t } = this.props;
      message.success(t('editSuccessMessage'));
 myself.props.history.push('/dashboard');
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
      "required": [
        "tagName","parentId"
      ],
      "properties": {
        "parentId": {
          "type": "string",
          "title": t('tagsManagement.parent'),
          "enum":this.state.tagId,
          "enumNames":this.state.tagName,
          "uniqueItems": true,
          "default":this.state.defaultParentId
          },
        "tagName":{
          "type": "string",
          "title":t('tagsManagement.tagname'),
          "default":this.state.modifiedData.name
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

export default withTranslation()(TagsManagementEdit)


