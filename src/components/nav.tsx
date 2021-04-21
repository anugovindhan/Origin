import React from 'react';
import {Button} from "react-bootstrap";

export class Nav extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
    }
    render(){
        return(
            <div>
                <nav>

                        <ul className="nav-links">
                            <h3>Redux React Login - Home </h3>
                        </ul>
                </nav>

            </div>
        );
    }
}
export default Nav