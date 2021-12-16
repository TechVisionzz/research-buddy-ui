import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import {getcitaions,deleteWorkspace,getCitationsBiblography,getSelectedTags} from './CommonHelper';
import { Table, Tag, Space,Tooltip,Popconfirm,message, Form,Button,Modal,Select  } from 'antd';
import { DeleteOutlined,EditOutlined, ExportOutlined, StarTwoTone } from '@ant-design/icons';
import {deleteTags,getTags,doLogout} from './CommonHelper';
import { tokenstore } from '../global/global';
import moment from 'moment';
import {getTemplate} from './csl/index.js'
const {Cite, plugins} = require('@citation-js/core')
const { csl } = require('@citation-js/plugin-csl');
var books = require('google-books-search');
var myself,type;
let language = 'en-US';
var t;
class TagsManagementShow extends React.Component {
  constructor()
  {
    super();
    myself=this;
    t  = this.props;
    this.state = {
      tags: [],
      tagData:[],
      error: null,
      isModalVisible:false
    };
  }
  getTags(){
    getTags().then(async(response) => {
      if (response && response.data) {

       await   this.setState({ tags: response.data });
       console.log(this.state.tags);
      }
  }).catch(async (error) => {
      console.log(error);
  });
  }
  componentDidMount= async() => {
    this.getTags();
  };
 async confirmdelete(tagId) {
    //fetch citation from db for delete 
    tokenstore.tagId=tagId;
    await getSelectedTags(tokenstore.tagId).then(async (response)=>{
      if(response && response.data)
      {
        response.data.trash=true;
        await this.setState({tagData:response.data});
        console.log(this.state.tagData);

      }
  
    })
    .catch(async(error)=>{
     console.log(error);
     await doLogout();
    });
  await  deleteTags(this.state.tagData);
  const { t } = this.props;
  message.success(t('deleteSuccessMessage'));
    myself.getTags();
  }
    async tagEdit(tagId) {
      tokenstore.tagId=tagId;
        myself.props.history.push('/tagsEdit'); 
      }
  render() {
     //this is set for translation
 const { t } = this.props;
    const { Option } = Select;
    const columns = [
      {
        // title: t('citationShow.title'),
        title: t('tagsManagement.tagname'),
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: t('tagsManagement.parent'),
        dataIndex: ['parentTag','name'],
        key: ['parentTag','name'],
        responsive: ['md'],
      },
      {
        title: "Action",
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Tooltip placement="top" title={t('edit')}><a> <EditOutlined onClick={()=>this.tagEdit(record.id)} style={{ fontSize: '16px',color: '#4f4fff' }}/> </a> </Tooltip>
            <Tooltip placement="top" title={t('delete')}><Popconfirm onConfirm={()=> this.confirmdelete(record.id)} title={t('citationShow.areyousure')} okText={t('citationShow.yes')} cancelText={t('citationShow.no')}><a><DeleteOutlined style={{ fontSize: '16px',color: '#ff3a3a' }}/> </a> </Popconfirm></Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <>
      <Table rowKey={'id'}
      columns={columns} dataSource={this.state.tags}/>
       </>
    );
  }
 }
export default withTranslation()(TagsManagementShow)




