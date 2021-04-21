import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import './App.css';
import Home from "./components/home";
import Login from "./components/login";
import { createBrowserHistory } from "history";
import 'antd/dist/antd.css';
import RegisterUser from "./components/registration";
export const auth = {
    isLoggedIn : false,
    onAuthentication(){
       return  this.isLoggedIn = true;
    },
    getLoginStatus(){
        return this.isLoggedIn;
    }
}
 function SecureRoute(props: any){
    return(
        <Route path={props.path} render={data => auth.getLoginStatus() ?(<props.component {...data} />)
    :(<Redirect to ={{pathname :'/'}}/>)}/>
    );
}
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
                      <SecureRoute path="/home" exact component={Home}/>
                      <Route exact path="/" component={Login}/>
                      <Route exact path="/register" component={RegisterUser}/>
                      {/*<Route exact path="/home" component={Home}/>*/}
                  </Switch>
              </Router>
          </React.Fragment>
      );
  }
}

export default App
