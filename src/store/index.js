import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducers/reducer';
import { watcherData } from './sagas';



const rootReducer = combineReducers({
    userList: reducer,
})

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        composeWithDevTools()
    )
)

sagaMiddleware.run(watcherData);