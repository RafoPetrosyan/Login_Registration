import { Navigate } from 'react-router-dom';
import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    GET_CURRENT_ADMIN, 
    SET_CURRENT_ADMIN,
    LOGAUTH_ADMIN,
    LOGIN_ADMIN, 

} from '../actions/actionType';
import { createAction } from '../actions/actions';
import { currentAdmin, loginAdmin } from '../api/mainApi';


function* workerGetCurrent(){
    try {
        const { user } = yield call(currentAdmin)
        yield put(createAction(SET_CURRENT_ADMIN, user));

    } catch (error) {
        yield <Navigate to='/admin/login' replace/>
        yield put(createAction(SET_CURRENT_ADMIN, null));
    }
}

function* workerLogin(action) {
    try {
        const { token } = yield call(loginAdmin, action.payload)
        localStorage.setItem('accessToken', token)

        yield put(createAction(GET_CURRENT_ADMIN))
        // yield <Navigate to='/admin/events' replace/>

    } catch (error) {
        console.log(error);
    }
}

function* workerLogauth() {
    localStorage.removeItem('accessToken');
    yield <Navigate to='/admin/login' replace/>
    yield put(createAction(SET_CURRENT_ADMIN, null));
}


export function* watcherMain(){
    yield takeEvery(LOGIN_ADMIN, workerLogin)
    yield takeEvery(LOGAUTH_ADMIN, workerLogauth)
    yield takeEvery(GET_CURRENT_ADMIN, workerGetCurrent)
}