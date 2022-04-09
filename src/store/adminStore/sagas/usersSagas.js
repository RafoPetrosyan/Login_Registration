import { call, put, takeEvery } from 'redux-saga/effects';
import { Navigate } from 'react-router-dom';
import { 
    GET_USERS,

    SET_USER,
    SET_USER_COUNT,

    ADD_USER,
    EDITE_USER,

    DELETE_SELECTED_USERS,
    DELETE_USER,
    
} from '../actions/actionType';

import { addUser, deleteSelected, deleteUser, editeUser, getUsers } from '../api/usersApi';
import { createAction } from '../actions/createAction';


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
    try {
        yield call(addUser, action.payload)
        yield <Navigate to='/admin/users' replace/>
    } catch (error) {
        console.log(error);
    }
}

function* workerDeleteUser(action){
   yield call(deleteUser, action.payload);
}

function* workerDeleteSelected(action){
    // yield call(deleteSelected, action.payload)
    console.log(action.payload);
}

function* workerEditeUser(action){
    try {
        yield call(editeUser, action.payload)
    } catch (error) {
        console.log(error);
    }
}

export function* watcherAdminUsers(){
    yield takeEvery(GET_USERS, workerGetUsers)
    yield takeEvery(ADD_USER, workerAddUser)
    yield takeEvery(DELETE_USER, workerDeleteUser)
    yield takeEvery(EDITE_USER, workerEditeUser)
    yield takeEvery(DELETE_SELECTED_USERS, workerDeleteSelected)
}