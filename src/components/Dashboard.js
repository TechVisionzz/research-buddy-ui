import React from 'react';
import "antd/dist/antd.css";
import { createBrowserHistory } from 'history'
import { Layout, Menu, Breadcrumb,Image } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import '../css/dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { tokenstore } from '../global/global';
import Workspace from './Workspace';
import Citation from './Citation';
import ShowCitation from './CitationShow';
import CitationEdit from './CitationEdit';
import DashBoardDefault from './DashBoardDefault';
import SearchCitation from './SearchCitation';
import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import { doLogin, getworkspacesonclick, doLogout, getworkspaces, getcitaions, createworkspaces } from './CommonHelper';
import WorkspaceEdit from './WorkspaceEdit';
import SearchBook from './SearchBook';
import TagsManagementEdit from './TagsManagementEdit';
import TagsManagement from './TagsManagement';
import Trash from './Trash';
import { Component, Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import TagsManagementShow from './TagsManagementShow';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
var myself;
class Dashboard extends React.Component {
  constructor(props)
  {
    super(props);
    this.handler = this.handler.bind(this);
    this.updatestate = this.updatestate.bind(this);
    myself=this;
    this.state = {
      workspaces: [],
      error: null,
      reload:false,
      selectedCitations:[]

    };
  }
 async getWorkspaces()
  {
    await getworkspaces().then((response) => {
      if (response && response.data) {
          this.setState({ workspaces: response.data });
      }
  }).catch(async (error) => {
      console.log(error);
      await doLogout();
  });
  }
  //set state for workspaces
   // Fetch your workspaces immediately after the component is mounted
   componentDidMount = async () => {
    this.getWorkspaces();
  };
async  logout(e) {
    tokenstore.clear();
    myself.props.history.push('/'); 
}
async getcitaionsdashboard(id){
  tokenstore.workspaceid=id;
 await  getcitaions(id).then(async (response)=>{
    if(response && response.data)
    {
     await this.setState({selectedCitations:response.data});
    console.log(this.state.selectedCitations);
    }
  } )

}
async getCitationNoWorkspace(){

}
async updatestate(data){
 await this.setState({
    reload: false
  });
  myself.props.history.push('/dashboard'); 
  myself.getWorkspaces();
};
handler=()=> {
  this.setState({
    reload: false
  })
}
  render() {
    //this is set for translation
   const { t } = this.props;
    // set state for workspace and if error the it is set
    const { error, workspace } = this.state;
    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
//this is for table
   
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const changeLanguage = lng => {
      if(lng=='ar'){
        tokenstore.direction="rtl"
      }
      if(lng=='ur'){
        tokenstore.direction="rtl"
      }
      if(lng=='en'){
        tokenstore.direction="ltr"
      }
      i18n.changeLanguage(lng);
      myself.props.history.push('/dashboard');
      window.location.reload(true);
      
    };
    return (
<Router>

      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to="/dashboard">{t('dashboard.menuItem.home')}</Link></Menu.Item>
        <Menu.Item  key="2"><Link to="/workspace">{t('dashboard.menuItem.addWorkspace')}</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/citation">{t('dashboard.menuItem.newCitation')}</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/searchBook">{t('dashboard.menuItem.searchBook')}</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/searchCitation">{t('dashboard.menuItem.searchCitation')}</Link></Menu.Item>
        <Menu.Item  key="10"><Link to="/tagsManagement">Add Tags</Link></Menu.Item>
        <Menu.Item  key="11"><Link to="/tagsShow">Tags Management</Link></Menu.Item>
        <Menu.Item  key="12"><Link to="/trash">Trash</Link></Menu.Item>
        <Menu.Item key="6"><img width={30} height={30} onClick={() => changeLanguage("ur")} src="../languageFlags/pakistan.png" alt="Urdu" /></Menu.Item>
        <Menu.Item key="7"><img width={30} height={30} onClick={() => changeLanguage("ar")} src="../languageFlags/saudiArabia.png" alt="Arabic" /></Menu.Item>
        <Menu.Item key="8"><img width={30} height={30} onClick={() => changeLanguage("en")} src="../languageFlags/unitedState.png" alt="English" /></Menu.Item>
        <Menu.Item onClick={this.logout} key="9">{t('dashboard.menuItem.logOut')}</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title={t('dashboard.sideBar.workspaceTitle')}>
          {this.state.workspaces.map(workspace => (
            <Menu.Item onClick={()=> this.getcitaionsdashboard(workspace.id)} key={workspace.id}><Link to="/citationShow">{workspace.name}</Link></Menu.Item>
          ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
                     <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
  <Switch>
  <Route path="/citationShow" render={(props)=> <ShowCitation updateText={this.updatestate} selectedCitations={this.state.selectedCitations} {...props} />} />
  <Route path="/tagsShow" render={(props)=> <TagsManagementShow selectedTags={this.state.selectedCitations} {...props} />} />
  <Route path="/trash" render={(props)=> <Trash />} />
 <Route path="/workspace" render={(props)=><Workspace updateText={this.updatestate} {...props}/>} />
 <Route path="/tagsManagement" render={()=><TagsManagement/>} />
 <Route path="/workspaceEdit" render={(props)=><WorkspaceEdit updateText={this.updatestate} {...props}/>}/>
 <Route path="/tagsEdit" component={TagsManagementEdit} />
 <Route path="/citation" component={Citation} />
 <Route path="/dashboard" component={DashBoardDefault} />
 <Route path="/citationEdit" component={CitationEdit} />
 <Route path="/searchBook" component={SearchBook} />
 <Route path="/searchCitation" component={SearchCitation} />
  </Switch>
        </div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</Router>
    );
  }
}
export default withTranslation()(Dashboard);