 // @ts-nocheck
import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./css/login.css";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Main from "./components/MainPage";
import DashBoard from "./components/DashBoard";
import { isLoggedIn } from "./components/commonHelper";
import ReferenceEdit from "./components/ReferenceEdit";
import SeacrchBook from "./components/SeacrchBook";
function SecureRoute(props: any) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        isLoggedIn() ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route exact path="/" component={LogIn} />
          <SecureRoute path="/main" component={Main} />
          <SecureRoute path="/dashBoard" component={DashBoard} />
          <SecureRoute path="/editReference" component={ReferenceEdit} />
          <SecureRoute path="*" component={() => "404 Not found."} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
