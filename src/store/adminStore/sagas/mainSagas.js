import history from '../../../views/router/browserHistory';
import { call, put, takeEvery } from 'redux-saga/effects';
import { 

    LOGIN_ADMIN, 
    LOGAUTH_ADMIN,

    GET_CURRENT_ADMIN, 

    SET_CURRENT_ADMIN,
    SET_ERROR_MESSAGE_LOGIN

} from '../actions/actionType';
import { createAction } from '../actions/actions';
import { currentAdmin, loginAdmin } from '../api/mainApi';


function* workerGetCurrent(){
    try {
        const { user } = yield call(currentAdmin);
        yield put(createAction(SET_CURRENT_ADMIN, user));

    } catch (error) {
        yield put(createAction(LOGAUTH_ADMIN));
    }
}

function* workerLogin(action) {
    console.log(222);
    try {
        const { token } = yield call(loginAdmin, action.payload)
        yield put(createAction(GET_CURRENT_ADMIN));

        localStorage.setItem('accessToken', token);
        history.push('/admin/events');

    } catch (e) {
        yield put(createAction(SET_ERROR_MESSAGE_LOGIN, e.response.data.message));
    }
}

function* workerLogauth() {
    localStorage.removeItem('accessToken');
    yield put(createAction(SET_CURRENT_ADMIN, null));
    yield put(createAction(SET_ERROR_MESSAGE_LOGIN, null));
    history.push('/admin/login');
}


export function* watcherMain(){
    yield takeEvery(LOGIN_ADMIN, workerLogin)
    yield takeEvery(LOGAUTH_ADMIN, workerLogauth)
    yield takeEvery(GET_CURRENT_ADMIN, workerGetCurrent)
}