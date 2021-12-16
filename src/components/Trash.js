import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import {restoreSelectedWorkspace,restoreSelectedTags,deleteTagsPermanently
  ,deleteCitationsPermanently,getSelectedTags,getSelectedWorkspaceRestore,deleteWorkspacePermanently,
  restoreSelectedCitation,getSelectedCitation} from './CommonHelper';
import { Table, Tag, Space,Tooltip,Popconfirm,message, Form,Button,Modal,Select,Typography  } from 'antd';
import { ConsoleSqlOutlined, DeleteOutlined,EditOutlined, ExportOutlined, SmallDashOutlined, StarTwoTone } from '@ant-design/icons';
import {deleteTags,getTrashTags,getTrashCitations,getTrashWorkspaces} from './CommonHelper';
import { tokenstore } from '../global/global';
import moment from 'moment';
import {getTemplate} from './csl/index.js'
const {Cite, plugins} = require('@citation-js/core')
const { csl } = require('@citation-js/plugin-csl');
var books = require('google-books-search');
var myself,type;
let language = 'en-US';
var t;
class Trash extends React.Component {
  constructor()
  {
    super();
    myself=this;
    t  = this.props;
    this.state = {
      tags: [],
      citations: [],
      workspaces: [],
      error: null,
      isModalVisible:false
    };
  }
//fetch trashed tags from db
getTrashedTags()
{
  getTrashTags().then(async(response) => {
    if (response && response.data) {
     await   this.setState({ tags: response.data });
    }
}).catch(async (error) => {
    console.log(error);
});
}
//get trash Workspaces
getTrashedWorkspaces()
{
  getTrashWorkspaces().then(async(response) => {
    if (response && response.data) {
     await   this.setState({ workspaces: response.data });
    }
}).catch(async (error) => {
    console.log(error);
});
}
//get trash Workspaces
getTrashedCitations(){
  getTrashCitations().then(async(response) => {
    if (response && response.data) {
     await   this.setState({ citations: response.data });
    }
}).catch(async (error) => {
    console.log(error);
});
}
  componentDidMount= async() => {
//call function
this.getTrashedTags();
this.getTrashedWorkspaces();
this.getTrashedCitations();
  };
 async deleteCitation(tagId) {
  await  deleteCitationsPermanently(tagId);
  const { t } = this.props;
          message.success(t('deleteSuccessMessage'));
          this.getTrashedCitations();
  }
  async deleteWorkspaces(tagId) {
    await  deleteWorkspacePermanently(tagId);
    const { t } = this.props;
    message.success(t('deleteSuccessMessage'));
    this.getTrashedWorkspaces();
    }
    async deleteTags(tagId) {
      await  deleteTagsPermanently(tagId);
      const { t } = this.props;
      message.success(t('deleteSuccessMessage'));
      this.getTrashedTags(); 
      }
//function for restoreCitation
async restoreCitation(citationId) {
      //restore citation 
      getSelectedCitation(citationId).then(async(response) => {
        if (response && response.data) {
          response.data.trash=false;
          tokenstore.restoreCitationId=response.data.id;
          // restore citation
          restoreSelectedCitation(response.data).then(async(response) => {
    if (response && response.data) {
      const { t } = this.props;
          message.success(t('restoreSuccessMessage'));
          this.getTrashedCitations();
    }
}).catch(async (error) => {
    console.log(error);
});
}
    }).catch(async (error) => {
        console.log(error);
    });
}
//function for restoreCitation
async restoreWorkspace(workspaceId) {
        //restore citation 
        getSelectedWorkspaceRestore(workspaceId).then(async(response) => {
          if (response && response.data) {
      // console.log(response.data);
            response.data.trash=false;
            tokenstore.restoreWorkspaceId=response.data.id;
            // restore citation
            restoreSelectedWorkspace(response.data).then(async(response) => {
      if (response && response.data) {
        const { t } = this.props;
        message.success(t('restoreSuccessMessage'));
            this.getTrashedWorkspaces();
      }
  }).catch(async (error) => {
      console.log(error);
  });
  }
      }).catch(async (error) => {
          console.log(error);
      });
}
//function for restoreTags
async restoreTag(tagId) {
  console.log(tagId);
        //restore citation 
        tokenstore.tagId=tagId;
        getSelectedTags(tagId).then(async(response) => {
          if (response && response.data) {
            response.data.trash=false;
            tokenstore.restoreTagId=response.data.id;
            // restore citation
            restoreSelectedTags(response.data).then(async(response) => {
      if (response && response.data) {
        const { t } = this.props;
        message.success(t('restoreSuccessMessage'));
            this.getTrashedTags();
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
    //this is for table heading
const { Title } = Typography;

     //this is set for translation
 const { t } = this.props;
    const { Option } = Select;
    //this is for citations restore
    const restoreCitations = [
      {
        title: t('trash.title'),
        // title: "Title",
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: t('trash.type'),
        dataIndex: 'type',
        key: 'type',
        responsive: ['md'],
      },
      {
        title: t('trash.action'),
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={()=>this.restoreCitation(record.id)} size={SmallDashOutlined} type="dashed">{t('trash.restore')}</Button>
            <Button onClick={()=>this.deleteCitation(record.id)} size={SmallDashOutlined} type="dashed" danger>{t('trash.deletepermanentaly')}</Button>
          </Space>
        ),
      },
    ];
    //this is for Workspaces restore
    const restoreWorkspaces = [
      {
        title: t('trash.workspacename'),
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: t('trash.description'),
        dataIndex: 'description',
        key: 'description',
        responsive: ['md'],
      },
      {
        title: t('trash.action'),
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
             <Button onClick={()=>this.restoreWorkspace(record.id)} size={SmallDashOutlined} type="dashed">{t('trash.restore')}</Button>
             <Button onClick={()=>this.deleteWorkspaces(record.id)} size={SmallDashOutlined} type="dashed" danger>{t('trash.deletepermanentaly')}</Button>
          </Space>
        ),
      },
    ];
    //this is for restore Tags
    const restoreTags = [
      {
        // title: t('citationShow.title'),
        title: t('trash.tagname'),
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: t('trash.parent'),
        dataIndex: ["tableId","name"],
        key: ["tableId","id"],
        responsive: ['md'],
      },
      {
        title: t('trash.action'),
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={()=>this.restoreTag(record.id)} size={SmallDashOutlined} type="dashed">{t('trash.restore')}</Button>
            <Button onClick={()=>this.deleteTags(record.id)} size={SmallDashOutlined} type="dashed" danger>{t('trash.deletepermanentaly')}</Button>
          </Space>
        ),
      },
    ];
    return (
      <>
      <Title level={2}>{t('trash.citations')}</Title>
      <Table rowKey={'id'}
      columns={restoreCitations} dataSource={this.state.citations}/>
      <Title level={2}>{t('trash.workspaces')}</Title>
      <Table rowKey={'id'}
      columns={restoreWorkspaces} dataSource={this.state.workspaces}/>
      <Title level={2}>{t('trash.tags')}</Title>
      <Table rowKey={'id'}
      columns={restoreTags} dataSource={this.state.tags}/>
       </>
    );
  }
 }
export default withTranslation()(Trash)




