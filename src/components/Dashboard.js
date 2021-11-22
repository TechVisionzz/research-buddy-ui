import React from 'react';
import "antd/dist/antd.css";
import { createBrowserHistory } from 'history'
import { Layout, Menu, Breadcrumb } from 'antd';
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
import CitationShow from './CitationShow';
import CitationEdit from './CitationEdit';
import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import { doLogin, getworkspacesonclick, doLogout, getworkspaces, getcitaions, createworkspaces } from './CommonHelper';
import WorkspaceEdit from './WorkspaceEdit';
import SearchBook from './SearchBook';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
var myself;
class Dashboard extends React.Component {
  constructor(props)
  {
    super(props);
    this.handler = this.handler.bind(this);
    myself=this;
    this.state = {
      workspaces: [],
      error: null,
      reload:false,
      selectedCitations:[]

    };

  }

 
  //set state for workspaces
  
   // Fetch your workspaces immediately after the component is mounted
   componentDidMount = async () => {
    await getworkspaces().then((response) => {
      if (response && response.data) {
          this.setState({ workspaces: response.data });
      }
  }).catch(async (error) => {
      console.log(error);
      await doLogout();
      // this.props.checkLogin();
  });
  };
async  logout(e) {
    tokenstore.clear();
    // window.location.href = '/';
    myself.props.history.push('/'); 
}
async getcitaionsdashboard(id){
  tokenstore.workspaceid=id;
 await  getcitaions(id).then(async (response)=>{
    if(response && response.data)
    {
     await this.setState({selectedCitations:response.data});
      // this.forceUpdate();
    // console.log(response.data);
    }
  } )

}
handler=()=> {
  this.setState({
    reload: false
  })
}
  render() {
    
    // set state for workspace and if error the it is set
    const { error, workspace } = this.state;
    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
//this is for table
   
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return (
<Router>

      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to="/dashboard">Home</Link></Menu.Item>
        <Menu.Item  key="2"><Link to="/workspace">Add Workspace</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/citation">New Citation</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/searchBook">Search Books</Link></Menu.Item>
        <Menu.Item onClick={this.logout} key="5">Logout</Menu.Item>
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
          <SubMenu key="sub1" icon={<UserOutlined />} title="Workspaces">
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
  <Route path="/citationShow" render={(props)=> <CitationShow selectedCitations={this.state.selectedCitations} {...props} />} />
 <Route path="/workspace" render={(props)=><Workspace updatestate={this.handler}/>} />
 <Route path="/workspaceEdit" component={WorkspaceEdit} />
 <Route path="/citation" component={Citation} />
 <Route path="/citationEdit" component={CitationEdit} />
 <Route path="/searchBook" component={SearchBook} />
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
export default Dashboard