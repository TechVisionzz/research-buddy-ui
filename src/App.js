import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Signupp from './components/Signupp';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';
import Citation from './components/Citation';
import Login from './components/Login';
import { tokenstore } from './global/global';
import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import {isLoggedIn} from './components/CommonHelper';
// fuction is checked if the user is login then show dashboard page else redirect to login
function SecureRoute(props){
  return(
    <Route path={props.path} render={data=>isLoggedIn()?(
      <props.component {...data}></props.component>):
    (<Redirect to={{pathname:'/'}}></Redirect>)}></Route>
  )
}
function App() {
  return (

    <div className="App">
    <Router>
        <Switch>
          <Route path="/signup" component={Signupp} />
          <Route exact path="/" component={Login} />
          <SecureRoute  path="/dashboard" component={Dashboard} />
        </Switch>
    </Router>
    </div>
  )
  
   
}

export default App;
