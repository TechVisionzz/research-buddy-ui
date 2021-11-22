import React,{createRef} from 'react';
import {getcitaions,deleteWorkspace,getCitationsBiblography,editWorkspace} from './CommonHelper';
import { Table, Tag, Space,Tooltip,Popconfirm,message, Form,Button,Modal,Select  } from 'antd';
import { DeleteOutlined,EditOutlined, ExportOutlined, StarTwoTone } from '@ant-design/icons';
import {deleteCitations} from './CommonHelper';
import { tokenstore } from '../global/global';
import moment from 'moment';
import {getTemplate} from './csl/index.js'
const {Cite, plugins} = require('@citation-js/core')
const { csl } = require('@citation-js/plugin-csl');
var books = require('google-books-search');
var myself,type;
let language = 'en-US';
class CitationShow extends React.Component {
  constructor()
  {
    super();
    this.exportSingleCitation = this.exportSingleCitation.bind(this);
    myself=this;
    this.state = {
      citations: [],
      error: null,
      isModalVisible:false
    };
  }
  componentDidMount= () => {
    // this.setState({ citations: this.props.selectedCitations});
  //  console.log(this.state.citations);
  //   await getcitaions().then((response) => {
  //     if (response && response.data) {
  //       console.log('workspaceshow');
  //         this.setState({ citations: response.data });
  //     }
  // }).catch(async (error) => {
  //     console.log(error);
  //     await doLogout();
  //     // this.props.checkLogin();
  // });
  };
 async confirmdelete(citationid) {
  await  deleteCitations(citationid);
    message.success('Data Delete Successfully!');
     myself.props.history.push('/dashboard'); 
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
    async deleteWorkspace() {
        await  deleteWorkspace();
        message.success('Data Delete Successfully!');
        myself.props.history.push('/dashboard'); 
      }
      async editWorkspace()
       {
        //  console.log("gscjhcvuxvhcjhs");
        // await editWorkspace();
        // message.success('Data Edit Successfully!');
        myself.props.history.push('/WorkspaceEdit'); 
      }
       showModal = () => {
        this.setState({isModalVisible:true});
      };
    async citationEdit(citationid) {
      tokenstore.citationEdit=citationid;
      // console.log('citationEdit'+tokenstore.citationEdit);
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
    console.log('rendermethod'); 
    const { Option } = Select;
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        responsive: ['md'],
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Tooltip placement="top" title='Export'><a> <ExportOutlined onClick={()=>this.showStyleModel(record.id)} style={{ fontSize: '16px' }}/> </a> </Tooltip>
            <Tooltip placement="top" title='Edit'><a> <EditOutlined onClick={()=>this.citationEdit(record.id)} style={{ fontSize: '16px',color: '#4f4fff' }}/> </a> </Tooltip>
            <Tooltip placement="top" title='Delete'><Popconfirm onConfirm={()=> this.confirmdelete(record.id)} title="Are you sure？" okText="Yes" cancelText="No"><a><DeleteOutlined style={{ fontSize: '16px',color: '#ff3a3a' }}/> </a> </Popconfirm></Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <>
      <Modal footer={null} title="Select Citation Style" visible={this.state.isModalVisible} >
      <Select
    labelInValue
    style={{ width: 200,textAlign:"left" }}
    onChange={this.handleChange} 
  >
    <Option value="Chicago">Chicago</Option>
    <Option value="MLA">MLA</Option>
    <Option value="APA">APA</Option>
  </Select>
      </Modal>
      <Button onClick={()=>this.deleteWorkspace()} style={{float:"right",margin:"2px"}} danger>Delete Selected Workspace</Button>
      <Button onClick={()=>this.editWorkspace()} style={{float:"right",margin:"2px"}} type="primary">Edit Selected Workspace</Button>
      <Table rowKey={'id'}
      columns={columns} dataSource={this.props.selectedCitations}/>
       </>
    );
  }
 }

export default CitationShow






