import React,{createRef} from 'react';
import axios from 'axios';
import { Form, Input, Button,DatePicker,Select,message } from 'antd';
import { Alert } from 'antd';
import { tokenstore } from '../global/global';
import {getworkspaces,doLogout,createCitations,getContributors,getPublishers} from './CommonHelper';
import '../css/citation.css';
var myself,myform;

class Citation extends React.Component {

  constructor() {
    super();
myself=this;
myform=createRef();
    // State of your application
    this.state = {
      modifiedData: {
        title: '',
        type: '',
        edition: '',
        publicationdate: '',
        doi: '',
        identifier: '',
        contributors: '',
        publishers: '',
        workspaces: '',
      },
      workspacess: [],
      contributorss:[],
      publisherss:[],
      error: null,
    };
  }
  componentDidMount = async () => {
    await getworkspaces().then((response) => {
      if (response && response.data) {
          this.setState({workspacess: response.data });
      }
      console.log(response.data);
      
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
      // this.props.checkLogin();
  });
  //fetch contributors from strapi db
  await getContributors().then((response) => {
    if (response && response.data) {
        this.setState({contributorss: response.data });
    }
    console.log(response.data);
    
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
    // this.props.checkLogin();
});
  //fetch publishers from strapi db
  await getPublishers().then((response) => {
    if (response && response.data) {
        this.setState({publisherss: response.data });
    }
    console.log(response.data);
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
});
  };
  async handleSubmit () {
    //json object fetch the form value and assign it to database attribute
    var citation={
      title:myform.current.getFieldValue('title'),
      type:myform.current.getFieldValue('type'),
      edition:myform.current.getFieldValue('edition'),
      publicationdate:myform.current.getFieldValue('publicationdate'),
      doi:myform.current.getFieldValue('doi'),
      identifier:myform.current.getFieldValue('identifier'),
      contributors:[
        {
          id:myform.current.getFieldValue('contributors')
        }
      ],
      publishers:[
        {
          id:myform.current.getFieldValue('publishers')
        }
      ],
      workspaces:[
        {
          id:myform.current.getFieldValue('workspaces')
        }
      ],
    }
    createCitations(citation).then(async (response) => {
      if (response && response.data) {
  myform.current.resetFields();
  message.success('Citation Added Successfully!');
  myself.props.history.push('/dashboard');
      }
  }).catch(async (error) => {
      console.log(error.response.data);
      alert(error.response.data);
  });
};
  render() {
    const { error, modifiedData } = this.state;
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
    return (
      <Form ref={myform} name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16, }}initialValues={{remember: true, }}autoComplete="off">

      <Form.Item label="Title" name="title" id="title"rules={[ { required: true, message: 'Please input your Title!',},]}value={modifiedData.title} >
        <Input />
      </Form.Item>
      <Form.Item label="Type" name="type" id="type"rules={[ { required: true, message: 'Please input your Type!',},]}value={modifiedData.type} >
        <Input />
      </Form.Item>
      <Form.Item label="Edition" name="edition" id="edition"rules={[ { required: true, message: 'Please input your Edition!',},]}value={modifiedData.edition} >
        <Input />
      </Form.Item>
      <Form.Item label="DOI" name="doi" id="doi"rules={[ { required: false, message: 'Please input your Edition!',},]}value={modifiedData.doi} >
        <Input />
      </Form.Item>
      <Form.Item label="Identifier" name="identifier" id="identifier"rules={[ { required: false, message: 'Please input your Edition!',},]}value={modifiedData.identifier} >
        <Input />
      </Form.Item>
        <Form.Item label="Contributors" name="contributors" id="contributors" rules={[ { required: false, message: 'Please select date!',},]}value={modifiedData.contributors}>
          <Select>
          {this.state.contributorss.map(contributor => (
             <Select.Option value={contributor.id}>{contributor.firstname}</Select.Option>
          ))}
          </Select>
        </Form.Item>
        <Form.Item label="Publishers" name="publishers" id="publishers" rules={[ { required: false, message: 'Please select date!',},]}value={modifiedData.publishers}>
          <Select>
          {this.state.publisherss.map(publisher => (
             <Select.Option value={publisher.id}>{publisher.name}</Select.Option>
          ))}
          </Select>
        </Form.Item>
        <Form.Item label="Workspaces" name="workspaces" id="workspaces" rules={[ { required: true, message: 'Please select Workspace!',},]}value={modifiedData.workspaces}>
          <Select>
          {this.state.workspacess.map(workspace => (
             <Select.Option value={workspace.id}>{workspace.name}</Select.Option>
          ))}
           
          </Select>
        </Form.Item>
        <Form.Item label="Publication Date" name="publicationdate" id="publicationdate"rules={[ { required: true, message: 'Please select date!',},]}value={modifiedData.publicationdate}>
          <DatePicker className="datepickerstyle"/>
        </Form.Item>
      <Form.Item 
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button onClick={this.handleSubmit} type="primary" htmlType="submit" style={{float:"left"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    );
  }
 }

export default Citation


