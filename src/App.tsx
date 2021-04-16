import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN_REQUEST, LOGOUT } from './actions/actionTypes';
import './App.css';
import logo from './logo.svg';
import Login from "./Login/login";

class App extends Component<any,any> {
    render() {
        return (
            <div className="App">
                <Login/>
                <div>
                    <button onClick={this.props.login}>Login</button>
                    <button onClick={this.props.logout}>Logout</button>
                </div>
                <p>status: {this.props.status}</p>
                <p>token: {this.props.token || ''}</p>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        token: state.login.token,
        status: state.login.status,
    };
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        login: () => dispatch({type:LOGIN_REQUEST, user:'NoriSte', password:'password'}),
        logout: () => dispatch({type:LOGOUT}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);