import React,{createRef} from 'react';
import axios from 'axios';
import { Form, Input, Button,Select,DatePicker} from 'antd';
import { tokenstore } from '../global/global';
import moment from 'moment';
import { doLogout,getEditCitations,getContributors,getPublishers,editCitations,getworkspaces, getcitaions } from './CommonHelper';
var myself,myform;
myform=createRef();

class CitationEdit extends React.Component {

  constructor() {
    super();
    // myform1=createRef();
    myself=this;
    // State of your application
    this.state = {
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
      },
      workspacess: [],
      contributorss:[],
      publisherss:[],
      error: null,
      
    };
  }
  // setFieldsValue(v) {
  //   this.myform.current.setFieldsValue(v);
  // }
  componentDidMount = async () => {
   await  getEditCitations().then(async (response) => {
      // console.log('this is from citationedit'+response.data);
      if (response && response.data) {
         await this.setState({modifiedData: response.data });
          console.log(this.state.modifiedData.id);
      }
     
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
  });
  //set form values
 await myform.current.setFieldsValue({
    id: this.state.modifiedData.id,
    title: this.state.modifiedData.title,
    type: this.state.modifiedData.type,
    edition: this.state.modifiedData.edition,
//     set the value
// moment(citation.publication_date)
// during save, get the date value
// publication_date: fieldsValue.pubdate._i
    publicationdate: moment(this.state.modifiedData.publicationdate),
    doi: this.state.modifiedData.doi,
    identifier: this.state.modifiedData.identifier,
    contributors: this.state.modifiedData.contributors[0].id,
    publishers: this.state.modifiedData.publishers[0].id,
    workspaces: this.state.modifiedData.workspaces[0].id,
  });
    await getworkspaces().then( async (response) => {
      if (response && response.data) {
         await this.setState({workspacess: response.data });
      }
  },
  )
  .catch(async (error) => {
      console.log(error);
      await doLogout();
  });
  //fetch contributors from strapi db
  await getContributors().then(async(response) => {
    if (response && response.data) {
       await this.setState({contributorss: response.data });

    }
    // console.log(response.data);
    
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
    // this.props.checkLogin();
});
  //fetch publishers from strapi db
  await getPublishers().then(async(response) => {
    if (response && response.data) {
       await this.setState({publisherss: response.data });
    }
},
)
.catch(async (error) => {
    console.log(error);
    await doLogout();
    // this.props.checkLogin();
});
  };
  
  async handleSubmit () {

    console.log('date'+myform.current.getFieldValue('publicationdate'));
    //json object fetch the form value and assign it to database attribute
    var citation={
      id:myform.current.getFieldValue('id'),
      title:myform.current.getFieldValue('title'),
      type:myform.current.getFieldValue('type'),
      edition:myform.current.getFieldValue('edition'),
      // publication_date: fieldsValue.pubdate._i
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
    editCitations(citation).then(async (response) => {
      if (response && response.data) {
  myform.current.resetFields();
  alert(" Data Updated Successfully!");   
      }
  }).catch(async (error) => {
      console.log(error.response.data);
      alert(error.response.data);
  });
  // this.populateWorkspaces();
};
  render() {
    const { error, modifiedData } = this.state;
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
      console.log('aa'+modifiedData.type);
    return (
      
      <Form  ref={myform} name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16, }}  onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      
      <Form.Item label="id" name="id" hidden={true}  value={modifiedData.id}>
        <Input />
      </Form.Item>
      
      <Form.Item  label="Title" name="title" id="title"rules={[ { required: true, message: 'Please input your Type!'}]} value={modifiedData.title} >
        <Input/>
      </Form.Item>
      
      <Form.Item  label="Type" name="type" id="type"rules={[ { required: true, message: 'Please input your Type!',},]} value={modifiedData.type} >
        <Input/>
      </Form.Item>
      
      <Form.Item label="Edition" name="edition" id="edition"rules={[ { required: true, message: 'Please input your Edition!',},]} value={modifiedData.edition}>
        <Input />
      </Form.Item>
      
      <Form.Item label="DOI" name="doi" id="doi"rules={[ { required: false, message: 'Please input your Edition!',},]} value={modifiedData.doi}>
        <Input />
      </Form.Item>
      
      <Form.Item label="Identifier" name="identifier" id="identifier"rules={[ { required: false, message: 'Please input your Edition!',},]} value={modifiedData.identifier}>
        <Input />
      </Form.Item>
      
        <Form.Item label="Contributors" name="contributors" id="contributors" rules={[ { required: false, message: 'Please select date!',},]} value={modifiedData.contributors}>
          <Select>
          {this.state.contributorss.map(contributor => (
             <Select.Option key={contributor.id} value={contributor.id}>{contributor.firstname}</Select.Option>
          ))}
          </Select>
        </Form.Item>
      
        <Form.Item label="Publishers" name="publishers" id="publishers" rules={[ { required: false, message: 'Please select date!',},]} value={modifiedData.publishers}>
          <Select>
          {this.state.publisherss.map(publisher => (
             <Select.Option key={publisher.id} value={publisher.id}>{publisher.name}</Select.Option>
          ))}
          </Select>
        </Form.Item>
      
        <Form.Item label="Workspaces" name="workspaces" id="workspaces" rules={[ { required: true, message: 'Please select Workspace!',},]} value={modifiedData.workspaces}>
          <Select>
          {this.state.workspacess.map(workspace => (
             <Select.Option key={workspace.id} value={workspace.id}>{workspace.name}</Select.Option>
          ))}
           
          </Select>
        </Form.Item>
       
        <Form.Item label="Publication Date" name="publicationdate" id="publicationdate"rules={[ { required: false, message: 'Please select date!',},]} value={modifiedData.publicationdate}>
          <DatePicker className="datepickerstyle"/>
        </Form.Item>
      
      <Form.Item 
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button onClick={this.handleSubmit} type="primary" htmlType="submit" style={{float:"left"}}>
          Edit
        </Button>
      </Form.Item>
    </Form>
    );
  }
 }

export default CitationEdit


