import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
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
          const { t } = myself.props;
      message.success(t('editSuccessMessage'));
      myself.props.updateText("updated state from child component");
          }
      }).catch(async (error) => {
          console.log(error);
          alert(error);
      });
  };
  render() {
     //this is set for translation
 const { t } = this.props;
    const { error, modifiedData } = this.state;
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    // Print errors if any
    if (error) {
      return <div>{t('workspace.error')}{error.message}</div>;
    }
    return (
      <Form ref={myform} name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16, }}initialValues={{remember: true, }}onFinish={onFinish}onFinishFailed={onFinishFailed}autoComplete="off">
      <Form.Item label="Name" name="name" id="name"rules={[ { required: true, message: t('workspace.namePlaceHolder')},]}value={modifiedData.name} >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('workspace.descriptionLabel')}
        name="description"
        rules={[
          {
            required: true,
            message: t('workspace.descriptionPlaceholder'),          },
        ]}
        value={modifiedData.description}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label={t('workspace.parentLabel')}
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
        {t('workspace.edit')}
        </Button>
      </Form.Item>
    </Form>
    );
  }
 }
 export default withTranslation()(WorkspaceEdit);