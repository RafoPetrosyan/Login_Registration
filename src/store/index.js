import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userStore/reducers/userReducer';
import { adminReducer } from './adminStore/reducers/adminReducer';
import { watcherAll } from './adminStore/sagas/watcherAll';



const rootReducer = combineReducers({
    userData: userReducer,
    adminData: adminReducer,
})

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        composeWithDevTools()
    )
)

sagaMiddleware.run(watcherAll);