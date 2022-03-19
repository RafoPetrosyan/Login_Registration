import { call, put, takeEvery } from 'redux-saga/effects';
import { CONFIRM_LOGIN_ADMIN, setCurrentAdmin } from './actions';
import { getAdminList, loopAdminList } from './helpers';

function* workerConfirmLogin(action){
    const adminData = yield call(getAdminList);
    const response = yield call(loopAdminList, adminData, action.payload);
    if(response) {
        yield put(setCurrentAdmin(response));
    }
}

export function* watcherAdmin(){
    yield takeEvery(CONFIRM_LOGIN_ADMIN, workerConfirmLogin)
}