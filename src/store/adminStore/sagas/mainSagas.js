import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    getCurrent,
    GET_CURRENT_ADMIN, 
    logauth,
    LOGAUTH_ADMIN,
    LOGIN_ADMIN, 
    setCurrent 
} from '../actions/mainActions';
import { currentAdmin, loginAdmin } from '../api/mainApi';


function* workerLogin(action) {
    try {
        const { token } = yield call(loginAdmin, action.payload)
        localStorage.setItem('accessToken', token)

        yield put(getCurrent())

    } catch (error) {
        console.log(error);
    }
}

function* workerLogauth() {
    localStorage.removeItem('accessToken');
    yield put(setCurrent(null))
}

function* workerGetCurrent(){
    try {
        const { user } = yield call(currentAdmin)
        yield put(setCurrent(user));

    } catch (error) {
        yield put(logauth())
    }
}

export function* watcherMain(){
    yield takeEvery(LOGIN_ADMIN, workerLogin)
    yield takeEvery(LOGAUTH_ADMIN, workerLogauth)
    yield takeEvery(GET_CURRENT_ADMIN, workerGetCurrent)
}