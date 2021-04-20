import React from "react";
import {Button} from "react-bootstrap";
import { dataService} from "../services/shared-component";

export class Home extends React.Component<any, any> {
     handleClick = () => {
        this.props.history.push('/');
         dataService.setData({logout: true});
    }
    render() {
        return (
            <React.Fragment>
            <h1>Home</h1>
            <Button variant="primary" onClick={this.handleClick}>Logout</Button>
            </React.Fragment>
        )
    }
}
export default Home