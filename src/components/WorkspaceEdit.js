import React,{createRef} from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { tokenstore } from '../global/global';
import { createworkspaces, editWorkspace,doLogout } from './CommonHelper';
var myself,myform;
myform=createRef();
class WorkspaceEdit extends React.Component {

  constructor() {
    super();
myself=this;
    // State of your application
    this.state = {
      modifiedData: {
        name: '',
        description: '',
        parent: '',
        user:[],
        citations:[]
      },
      error: null,
    };
  }
   componentDidMount=async()=> {
     await editWorkspace().then(async (response)=>{
       if(response && response.data)
       {
         await this.setState({modifiedData:response.data});
       }
     console.log(this.modifiedData);

     })
     .catch(async(error)=>{
      console.log(error);
      await doLogout();
     });

    await myform.current.setFieldsValue({
      name: this.state.modifiedData.name,
      description:this.state.modifiedData.description,
      parent: this.state.modifiedData.parent,
    }); 

   };
  async handleSubmit () {
    var workspace={
      name:myform.current.getFieldValue('name'),
      description:myform.current.getFieldValue('description'),
      parent:myform.current.getFieldValue('parent'),
      user:tokenstore.userid,

    }
    editWorkspace(workspace).then(async (response) => {
          if (response && response.data) {
          myform.current.resetFields();
          message.success('Workspace Edit Successfully!');
          myself.props.history.push('/dashboard');
          }
      }).catch(async (error) => {
          console.log(error);
          alert(error);
      });
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
    return (
      
      <Form ref={myform} name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16, }}initialValues={{remember: true, }}onFinish={onFinish}onFinishFailed={onFinishFailed}autoComplete="off">
      <Form.Item label="Name" name="name" id="name"rules={[ { required: true, message: 'Please input your Name!',},]}value={modifiedData.name} >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your Description!',
          },
        ]}
        value={modifiedData.description}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Parent"
        name="parent"
        rules={[
          {
            required: false,
            message: 'Please input your parent!',
          },
        ]}
        value={modifiedData.parent}
      >
        <Input />
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

export default WorkspaceEdit


