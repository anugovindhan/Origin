import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN_REQUEST, LOGOUT } from './actions/actionTypes';
import './App.css';
import Login from "./Login/login";

class App extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        }
    }
    handleCallBack = (loginData: any) => {
        this.setState({data: loginData})
    }
    signIn = () => {
        const {data} = this.state;
        console.log('test', data);
        this.props.login(data);
    }
    render() {
        const {data} = this.state;
        console.log('data', data);
        return (

            <div className="App">
                <Login signIn={this.signIn} parentCallBack={this.handleCallBack}/>
                <div>
                    {/*<button onClick={this.signIn}>Login</button>*/}
                    <button onClick={this.props.logout}>Logout</button>
                    <button type="reset">Reset</button>
                    { console.log('test',this.props)}
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
        login: (form: any) => dispatch(
            {type:LOGIN_REQUEST, user: form.username, password: form.password}),
        logout: () => dispatch({type:LOGOUT}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);