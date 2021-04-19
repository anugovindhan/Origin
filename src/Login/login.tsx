import React from 'react';
import {useForm} from "react-hook-form";
import {fakeAuthorize} from "../sagas";
import {Button, Card} from "react-bootstrap";
type login=
    {
        username: string;
        password: string;
    }

function Login (props:any, state: any): any {

    const { register, handleSubmit,errors} = useForm<login>()

    const onSubmit = handleSubmit((data:any) => {
        props.parentCallBack(data);
        props.signIn();
        fakeAuthorize(data.username, data.password);
        });
    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <Card className="text-center">
                    <Card.Header>LOGIN</Card.Header>
                <div >
                    <label htmlFor="username">User Name:</label>
                    <input ref={register({required : true})} id="username" name="username" type="text"
                           placeholder="Enter username" />
                    {
                        errors.username && <div className="error"> Enter Your User Name</div>
                    }
                </div>
                <div >
                    <label htmlFor="password">Password:</label>
                    <input className="text-muted" type="password" ref={register ({required : true})} id="password" name="password"
                           placeholder="Enter Password"/>
                    {
                        errors.password && <div className="error"> Enter Your Password</div>
                    }
                </div>
                <div>
                    <Button variant="primary" className="mt-auto" type="submit"> Login</Button>
                    <Button variant="secondary" type="reset">Reset</Button>{' '}
                </div>
                </Card>
            </form>
        </React.Fragment>
    );
}

export default Login;