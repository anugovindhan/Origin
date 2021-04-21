import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import {LOGIN_REQUEST} from "../actions/actionTypes";
import {dataService} from "../services/shared-component";
import {auth} from "../App";
import * as types from "../actions/actionTypes";
import { takeLatest } from 'redux-saga/effects';
export function fakeAuthorize(username: any, password: any){
    let obj: any = {
        userEmail: username,
        password:password
    }
    return new Promise(async (resolve, reject) => {
        try {
            await fetch('http://localhost:8090/authenticate', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(obj)
            }).then(r => r.json()).then(res => {
                if (res.jwt) {
                    auth.onAuthentication();
                    resolve(res.jwt);
                }
                else{
                    dataService.setData({logout: true});
                    alert(res.message);
                }
            });

        } catch(error) {
            reject(error);
        }
    });
}
export function registerUserService  (request: any)  {
    let obj: any = {
        firstName: request.firstName,
        lastName: request.lastName,
        userEmail: request.userEmail,
        password:request.password,
        active: 1
    }
    const REGISTER_API_ENDPOINT = 'http://localhost:8090/register';

    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };

    return fetch(REGISTER_API_ENDPOINT, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};
export function* registerSaga(payload: any) : any{
    try {
        const response = yield call(registerUserService, payload);
        yield put({ type:'REGISTER_SUCCESS', response })
    } catch(error) {
        yield put({ type:'REGISTER_ERROR', error });
    }
}

export function* authorize(user:any, password:any): any {
    try {
        const token: any = yield call(fakeAuthorize, user, password)
        yield put({type: 'LOGIN_SUCCESS'})
        yield put({type: 'SAVE_TOKEN', token});
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error})
    }
    finally {
        if (yield cancelled()) {
            yield put({type: 'LOGIN_CANCELLED'})
        }
    }
}

export function* loginFlow(): any {
    while (true) {
        const {user, password} = yield take('LOGIN_REQUEST')
        const task = yield fork(authorize, user, password)
        const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
        if (action.type === 'LOGOUT') {
            yield cancel(task)
            yield put({type: 'DELETE_TOKEN'})
        }
    }
}
export default function* watchUserAuthentication() : any{
    while (true) {
        yield takeLatest(types.REGISTER_SUCCESS, registerSaga);
    }
}
export function* logActions(): any {
    while (true) {
        const action = yield take('*')
        console.log(action.type);
    }
}