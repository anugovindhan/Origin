import React from "react";
import {Button} from "react-bootstrap";
import { dataService} from "../services/shared-component";
import Nav from "./nav";

export class Home extends React.Component<any, any> {
     handleClick = () => {
        this.props.history.push('/');
         dataService.setData({logout: true});
    }
    render() {
        return (
            <React.Fragment>
                <Nav/>
            <Button variant="primary" onClick={this.handleClick}>Logout</Button>
            </React.Fragment>
        )
    }
}
export default Home