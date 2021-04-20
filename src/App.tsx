import React from 'react';
import { Router, Route, Switch } from 'react-router';
import './App.css';
import Home from "./components/home";
import Login from "./components/login";
import { createBrowserHistory } from "history";
import 'antd/dist/antd.css';

class App extends React.Component<any,any> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        }
    }
    customHistory = createBrowserHistory();
  render() {
      return (
          <React.Fragment>
              <Router history={this.customHistory}>
                  <Switch>
                      <Route path="/home" exact component={Home}/>
                      <Route exact path="/" component={Login}/>
                  </Switch>
              </Router>
          </React.Fragment>
      );
  }
}

export default App
