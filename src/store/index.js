import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userStore/reducers/userReducer';
import { adminReducer } from './adminStore/reducers/adminReducer';
import { watcherAll } from './adminStore/sagas/watcherAll';
import { eventReducer } from './adminStore/reducers/eventReducer';
import { adminUserReducer } from './adminStore/reducers/adminUserReducer';
import { adminTypeReducer } from './adminStore/reducers/typeReducer';
import { adminReportReducer } from './adminStore/reducers/reportReducer';
import { adminReportEventReducer } from './adminStore/reducers/reportEventReducer';
import { adminReportCommentReducer } from './adminStore/reducers/reportCommentReducer';
import { socketReducer } from './adminStore/reducers/socketReducer';
import { chatReducer } from './adminStore/reducers/chatReducer';



const rootReducer = combineReducers({
    userData: userReducer,
    adminData: adminReducer,
    adminEvent: eventReducer,
    adminUser: adminUserReducer,
    adminTypes: adminTypeReducer,
    adminReport: adminReportReducer,
    adminReportEvent: adminReportEventReducer,
    adminReportComment: adminReportCommentReducer,
    adminNotification: socketReducer,
    chatList: chatReducer,
})

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware)
        // composeWithDevTools()
       
    ),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
)

sagaMiddleware.run(watcherAll);