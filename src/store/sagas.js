import { call, put, takeEvery } from 'redux-saga/effects';
import { confirmedEmail, CONFIRMED_SIGN_IN, CONFIRMED_SIGN_UP_EMAIL, setData, updateCurrentUser } from './actions';
import { getServerData, getSignInUser } from './helpers';


function* workerConfirmedLogin(action){

    const data = yield call(getServerData);
    const currentUser = yield call(getSignInUser, data[0], action.payload);
    yield put(updateCurrentUser(currentUser));
}

function* workerConfirmedEmail(action){
    const data = yield call(getServerData);
    const result = yield call(confirmedEmail, data[0], action.payload);
    if(result) {
        yield put(setData(action.payload));
        yield put(updateCurrentUser(action.payload));
    }
}

export function* watcherData(){
    yield takeEvery(CONFIRMED_SIGN_IN, workerConfirmedLogin);
    yield takeEvery(CONFIRMED_SIGN_UP_EMAIL, workerConfirmedEmail);
    
}