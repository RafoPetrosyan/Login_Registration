import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    GET_USERS,
    GET_EDITE_USER,

    SET_USER,
    SET_USER_COUNT,
    SET_ERROR_MESSAGE_USERS,
    SET_EDITE_USER,

    ADD_USER,
    EDITE_USER,

    DELETE_SELECTED_USERS,
    DELETE_USER,
    
} from '../actions/actionType';

import { addUser, deleteSelected, deleteUser, editeUser, getEditeUser, getUsers } from '../api/usersApi';
import { createAction } from '../actions/actions';
import history from '../../../views/router/browserHistory';


function* workerGetUsers(action){
    try {
        const { list, dataCount } = yield call(getUsers, action.payload);
        yield put(createAction(SET_USER_COUNT, dataCount));
        yield put(createAction(SET_USER, list));

    } catch (error) {
        console.log(error);
    }
}

function* workerAddUser(action){
    console.log(action.payload);
    try {
        yield call(addUser, action.payload);
        history.push('/admin/users');
        
    } catch (e) {
        yield put(createAction(SET_ERROR_MESSAGE_USERS, e.response.data.message));
    }
}

function* workerDeleteUser(action){
   yield call(deleteUser, action.payload);
}

function* workerDeleteSelected(action){
    yield call(deleteSelected, action.payload);
    console.log(action.payload);
}

function* workerGetEditeUser(action){
    try {
        const { user } = yield call(getEditeUser, action.payload);
        yield put(createAction(SET_EDITE_USER, user));
    } catch (error) {
        console.log(error);
    }
}

function* workerEditeUser(action){
    try {
        yield call(editeUser, action.payload);
        history.push('/admin/users');
    } catch (e) {
        yield put(createAction(SET_ERROR_MESSAGE_USERS, e.response.data.message));
    }
}

export function* watcherAdminUsers(){
    yield takeEvery(GET_USERS, workerGetUsers)
    yield takeEvery(GET_EDITE_USER, workerGetEditeUser)
    yield takeEvery(ADD_USER, workerAddUser)
    yield takeEvery(DELETE_USER, workerDeleteUser)
    yield takeEvery(EDITE_USER, workerEditeUser)
    yield takeEvery(DELETE_SELECTED_USERS, workerDeleteSelected)
}