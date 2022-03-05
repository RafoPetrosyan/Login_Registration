import { call, put, takeEvery } from 'redux-saga/effects';
import { CONFIRM_LOGIN, setCurrentUser } from './actions';
import { getUserList, loopLogin } from './helpers';


function* workerConfirmLogin(action){
    const userList = yield call(getUserList);
    const response = yield call(loopLogin, userList, action.payload);
    if(response){
        yield put(setCurrentUser(response));
    }
}


export function* watcherData() {
    yield takeEvery(CONFIRM_LOGIN, workerConfirmLogin);
}