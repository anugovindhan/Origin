import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import {LOGIN_REQUEST} from "../actions/actionTypes";

export function fakeAuthorize(username: any, password: any){
    let obj: any = {
        username: username,
        password:password
    }
    return new Promise(async (resolve, reject) => {
        try {
            await fetch('http://localhost:5000/authenticate', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(obj)
            }).then(r => r.json()).then(res => {
                if (res) {
                    resolve(res.id_token);
                }
                else{
                    alert('Error in Login');
                }
            });

        } catch(error) {
            reject(error);
        }
    });
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

export function* logActions(): any {
    while (true) {
        const action = yield take('*')
        console.log(action.type);
    }
}