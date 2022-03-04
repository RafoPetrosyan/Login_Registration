import { call, put, takeEvery } from 'redux-saga/effects';
import { CONFIRMED_SIGN_IN, CONFIRMED_SIGN_UP_EMAIL, setData, updateCurrentUser } from './actions';
import { emailConfirme, getServerData, getSignInUser } from './helpers';


function* workerConfirmedLogin(action){

    const data = yield call(getServerData);
    console.log(data);
    const currentUser = yield call(getSignInUser, data, action.payload);
    yield put(updateCurrentUser(currentUser));
}

function* workerConfirmedEmail(action){
    const data = yield call(getServerData);
    const result = yield call(emailConfirme, data, action.payload);
    if(result) {
        yield put(setData(action.payload));
        yield put(updateCurrentUser(action.payload));
    }
}

export function* watcherData(){
    yield takeEvery(CONFIRMED_SIGN_IN, workerConfirmedLogin);
    yield takeEvery(CONFIRMED_SIGN_UP_EMAIL, workerConfirmedEmail);
    
}