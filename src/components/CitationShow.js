import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';
import {getcitaions,deleteWorkspace,getCitationsBiblography,editWorkspace} from './CommonHelper';
import { Table, Tag, Space,Tooltip,Popconfirm,message, Form,Button,Modal,Select  } from 'antd';
import { ConsoleSqlOutlined, DeleteOutlined,EditOutlined, ExportOutlined, StarTwoTone } from '@ant-design/icons';
import {deleteCitations,doLogout,getSelectedWorkspace,getSelectedCitation,getCitationAgainstWorkspace} from './CommonHelper';
import { tokenstore } from '../global/global';
import moment from 'moment';
import {getTemplate} from './csl/index.js'
const {Cite, plugins} = require('@citation-js/core')
const { csl } = require('@citation-js/plugin-csl');
var books = require('google-books-search');
var myself,type;
let language = 'en-US';
var t;
class CitationShow extends React.Component {
  constructor()
  {
    super();
    this.exportSingleCitation = this.exportSingleCitation.bind(this);
    myself=this;
    t  = this.props;
    this.state = {
      modifiedData: {
        name: '',
        description: '',
        parent: '',
        user:[],
        citations:[],
        trash:false
      },
      citationData:[],
      // citationData: {
      //   id:'',
      //   title: '',
      //   type: '',
      //   edition: '',
      //   publicationdate: '',
      //   doi: '',
      //   identifier: '',
      //   contributors: [],
      //   publishers: [],
      //   workspaces: [],
      //   year: '',
      //   codepages: '',
      //   city: '',
      //   legislativeBody: '',
      //   trash:false,
      //   code: '',
      //   month: '',
      //   day: '',
      //   abstract: '',
      //   pages: '',
      //   volume: '',
      //   editors: '',
      //   book: '',
      //   chapter: '',
      //   version: '',
      //   proctitle: '',
      //   encyclopedia: '',
      //   country: '',
      //   journal: '',
      //   issue: '',
      //   issuer: '',
      //   institution: '',
      //   number: '',
      //   assignee: '',
      //   source: '',
      //   statutenumber: '',
      //   department: '',
      //   thesistype: '',
      //   typeofwork: '',
      //   series: '',
      //   distributor: '',
      //   publication: '',
      // },
      citations: [],
      error: null,
      isModalVisible:false
    };
  }

  async getCitations()
  {
  console.log("hasgjhs");
    getcitaions().then(async(response) => {
      if (response && response.data) {
        // console.log('workspaceshow');
       await   this.setState({ citations: response.data });
console.log(this.state.citations);
      }
  }).catch(async (error) => {
      console.log(error);
  });
  }
  componentDidMount= async() => {
this.getCitations();
  };
 async confirmdelete(citationid) {
         //fetch citation from db for delete 
         tokenstore.citationId=citationid;
  await getSelectedCitation(citationid).then(async (response)=>{
    if(response && response.data)
    {
      response.data.trash=true;
      await this.setState({citationData:response.data});
    }
  })
  .catch(async(error)=>{
   console.log(error);
   await doLogout();
  });
  await  deleteCitations(this.state.citationData);
  const { t } = this.props;
  message.success(t('deleteSuccessMessage'));
  console.log("hasgjhs");
  this.getCitations();
  }
  //this is used to export citation in different formats like mla ,chicago etc.
   exportSingleCitation=()=> {
    console.log('exportSingleCitation');
    getCitationsBiblography().then((response)=>{
      if(response && response.data)
      {
        //set date format
        const dateFormatYear = 'YYYY';const dateFormatMonth = 'MM';const dateFormatYearDay = 'DD';
        var dateYear= moment(response.data.publicationdate).format(dateFormatYear); 
        var dateMonth= moment(response.data.publicationdate).format(dateFormatMonth); 
        var dateDay= moment(response.data.publicationdate).format(dateFormatYearDay); 
        var payload = {
          "id": response.data.id,
          "title": response.data.title,
          "type": response.data.type,
          "edition": response.data.edition,
          "publishers": response.data.publishers[0].name,
          "doi": response.data.publishers.doi,
          "author": [
              { "family": response.data.contributors ? response.data.contributors[0].lastname : "",
                "given": response.data.contributors ? response.data.contributors[0].firstname : "" }
          ],
          "issued":[ 
            { "date-parts":[dateYear,dateMonth,dateDay] }
        ]
      }
      //passing payload to the site to make biblography
      var myCite = new Cite(payload);
      // selecting the biblography style 
      // var  type='vencouver';
      let config = plugins.config.get('@csl');
      config.templates.add(type, getTemplate(type));
      //create citation in html format
      let output = myCite.format('bibliography', {
        format: 'html',
        template: type,
        lang:language
    });
    //to make the link of out and download this file in html format
        const fileName = "file";
        const blob = new Blob([output], { type: 'application/html' });
        const href =  URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } )
    }
    //delete only workSpace
    async deleteWorkspace() {
      //fetch workspace from db for delete 
  await getSelectedWorkspace().then(async (response)=>{
    if(response && response.data)
    {
      if(response.data.name==="Default Workspace"){
        console.log("delete workspace if condition")
        message.warning("You cannot Delete Default Workspace!");
      }
      else{
        response.data.trash=true;
        await this.setState({modifiedData:response.data});
        console.log(this.state.modifiedData);
        await  deleteWorkspace(this.state.modifiedData);
        message.success("Workspace Deleted Successfully");
      }
       
    }
  

  })
  .catch(async(error)=>{
   console.log(error);
   await doLogout();
  });
        myself.props.history.push('/dashboard'); 
        myself.props.updateText("updated state from child component");
      }
       //delete workSpace with Citations
    async deleteWorkspaceWithCitations() {
      //fetch workspace from db for delete 
  await getSelectedWorkspace().then(async (response)=>{
    if(response && response.data)
    {
      if(response.data.name==="Default Workspace"){
        message.warning("You cannot Delete Default Workspace!");
        myself.props.history.push('/dashboard'); 
        myself.props.updateText("updated state from child component");
      }
      else{
        response.data.trash=true;
        await this.setState({modifiedData:response.data});
        console.log(this.state.modifiedData);
        await  deleteWorkspace(this.state.modifiedData);
                
//fetch citations from db against workspaces for delete 
await getCitationAgainstWorkspace().then(async (response)=>{
  if(response && response.data)
  {
    console.log(response.data);
//set trash values to true using loop in state because one workspace has multiple citations
    await this.setState({citationData:response.data});
    if(this.state.citationData.length>0){
      this.state.citationData.map((item)=>{
        item.trash=true;
        console.log(item);
      });
    }
  }
})
.catch(async(error)=>{
 console.log(error);
 await doLogout();
});
//update trash values in citation table using loop
if(this.state.citationData.length>0){
  this.state.citationData.map(async(item)=>{
    // 
    tokenstore.citationId=item.id;
    await  deleteCitations(item).then(async (response)=>{
      if(response && response.data)
      {
        console.log(response.data);
      }
    })
    .catch(async(error)=>{
     console.log(error);
     await doLogout();
    });
  });
  const {t}=myself.props;
  message.success(t('deleteSuccessMessage'));
  myself.props.updateText("updated state from child component");
}
//delete citation end here
      }
     
    }
  })
  .catch(async(error)=>{
   console.log(error);
   await doLogout();
  });
      }
      async editWorkspace()
       {
        await editWorkspace().then(async (response)=>{
          if(response && response.data)
          {
           if(response.data.name==="Default Workspace"){
             message.warning("You cannot Edit Default Workspace!");
             myself.props.history.push('/dashboard'); 
             myself.props.updateText("updated state from child component");
           }
           else{
            myself.props.history.push('/WorkspaceEdit'); 
           }
          }
        })
        .catch(async(error)=>{
         console.log(error);
         await doLogout();
        });
      }
       showModal = () => {
        this.setState({isModalVisible:true});
      };
    async citationEdit(citationid) {
      tokenstore.citationEdit=citationid;
        myself.props.history.push('/citationEdit'); 
      }
      showStyleModel=(citationid)=>
      {
        tokenstore.exportCitation=citationid;
        this.setState({isModalVisible:true});
        
      }
       handleChange=(value)=> {
        type=value.value;
        console.log(type); 
       this.exportSingleCitation();
       this.setState({isModalVisible:false});
      }
  render() {
     //this is set for translation
 const { t } = this.props;
    console.log('rendermethod'); 
    const { Option } = Select;
    const columns = [
      {
        title: t('citationShow.title'),
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: t('citationShow.type'),
        dataIndex: 'type',
        key: 'type',
        responsive: ['md'],
      },
      {
        title: t('citationShow.action'),
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Tooltip placement="top" title={t('citationShow.export')}><a> <ExportOutlined onClick={()=>this.showStyleModel(record.id)} style={{ fontSize: '16px' }}/> </a> </Tooltip>
            <Tooltip placement="top" title={t('citationShow.edit')}><a> <EditOutlined onClick={()=>this.citationEdit(record.id)} style={{ fontSize: '16px',color: '#4f4fff' }}/> </a> </Tooltip>
            <Tooltip placement="top" title={t('citationShow.delete')}><Popconfirm onConfirm={()=> this.confirmdelete(record.id)} title={t('citationShow.areyousure')} okText={t('citationShow.yes')} cancelText={t('citationShow.no')}><a><DeleteOutlined style={{ fontSize: '16px',color: '#ff3a3a' }}/> </a> </Popconfirm></Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <>
      <Modal footer={null} title={t('citationShow.citationStyle')} visible={this.state.isModalVisible} >
      <Select
    labelInValue
    style={{ width: 200,textAlign:"left" }}
    onChange={this.handleChange} 
  >
    <Option value="Chicago">{t('citationShow.chicago')}</Option>
    <Option value="MLA">{t('citationShow.mLA')}</Option>
    <Option value="APA">{t('citationShow.aPA')}</Option>
  </Select>
      </Modal>
      <Button onClick={()=>this.deleteWorkspace()} style={{float:"right",margin:"2px"}} danger>{t('citationShow.deleteWorkspace')}</Button>
      <Button onClick={()=>this.deleteWorkspaceWithCitations()} style={{float:"right",margin:"2px"}} danger>{t('citationShow.deleteWorkspacewithcitation')}</Button>
      <Button onClick={()=>this.editWorkspace()} style={{float:"right",margin:"2px"}} type="primary">{t('citationShow.editWorkspace')}</Button>
      <Table rowKey={'id'}
      columns={columns} dataSource={this.props.selectedCitations}/>
       </>
    );
  }
 }
export default withTranslation() (CitationShow)




