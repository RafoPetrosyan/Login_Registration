import { call, put, takeEvery } from 'redux-saga/effects';
import { CONFIRM_LOGIN, CONFIRM_REGISTRATION, setCurrentUser, setUserList } from './actions';
import { getUserList, loopLogin, loopRegistration, setData } from './helpers';
import { axios } from 'axios';

function* workerConfirmLogin(action){
    const userList = yield call(getUserList);
    const response = yield call(loopLogin, userList, action.payload);
    if(response){
        yield put(setCurrentUser(response));
    }
}

function* workerConfirmRegistration(action){
    const userList = yield call(getUserList);
    const response = yield call(loopRegistration, userList, action.payload);
    if(response){
        yield put(setCurrentUser(action.payload));
        const result = yield call(setData, userList, action.payload);
        yield put(setUserList(result));
    }
}


export function* watcherData() {
    yield takeEvery(CONFIRM_LOGIN, workerConfirmLogin)
    yield takeEvery(CONFIRM_REGISTRATION, workerConfirmRegistration)
}