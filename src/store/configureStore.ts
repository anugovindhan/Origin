import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { logActions, loginFlow } from './../sagas';


export default function configureStore(): any {
    const sagaMiddleware = createSagaMiddleware()
    const composeArgs: any = [
        applyMiddleware(sagaMiddleware),
        applyMiddleware(thunk),
    ];

    const store: any = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(loginFlow);
    sagaMiddleware.run(logActions);

    return store;
}