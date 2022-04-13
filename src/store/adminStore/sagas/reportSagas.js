import { call, put, takeEvery } from 'redux-saga/effects';
import history from '../../../views/router/browserHistory';
import { 
    GET_REPORTS,
    GET_REPORTS_BY_ID, 

    SET_REPORTS,
    SET_EDITE_REPORT, 

    DELETE_REPORT,
    EDITE_REPORTS,
    SET_ERROR_MESSAGE_REPORT,
   
} from '../actions/actionType';

import { deleteReport, editeReports, getReports, getReportsById } from '../api/reportApi';
import { createAction } from '../actions/actions';

function* workerGetReports(){
    try {
        const { reportMessages } = yield call(getReports)
        yield put(createAction(SET_REPORTS, reportMessages))
    } catch (error) {
        console.log(error);
    }
}

function* workerGetReportsById(action){
    try {
        const { reportMessages } = yield call(getReportsById, action.payload)
        yield put(createAction(SET_EDITE_REPORT, reportMessages))
    } catch (error) {
        console.log(error);
    }
}

function* workerEditeReports(action){
    console.log(action.payload.id, action.payload.messages);
    try { 
        // yield call(editeReports, action.payload);
        history.push('/admin/reports');
    } catch (e) {
        yield put(createAction(SET_ERROR_MESSAGE_REPORT, e.response.data.message));
    }
}

function* workerDeleteReport(action) {
    try {
        // yield call(deleteReport, action.payload)
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminReports(){
    yield takeEvery(GET_REPORTS, workerGetReports)
    yield takeEvery(GET_REPORTS_BY_ID, workerGetReportsById)
    yield takeEvery(EDITE_REPORTS, workerEditeReports)
    yield takeEvery(DELETE_REPORT, workerDeleteReport)
    
}