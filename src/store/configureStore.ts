import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import watchUserAuthentication, {logActions, loginFlow, registerSaga} from './../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore(): any {
    const sagaMiddleware = createSagaMiddleware()
    const composeArgs: any = [
        applyMiddleware(sagaMiddleware),
    ];

    const store: any = createStore(rootReducer,  composeWithDevTools(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(loginFlow);
    sagaMiddleware.run(logActions);
    sagaMiddleware.run(watchUserAuthentication);
    return store;
}