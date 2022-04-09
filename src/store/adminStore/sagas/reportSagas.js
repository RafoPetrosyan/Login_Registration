import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    GET_REPORTS,
    GET_REPORTS_BY_ID, 

    SET_REPORTS,
    SET_EDITE_REPORT, 

    DELETE_REPORT,
    EDITE_REPORTS,
   
} from '../actions/actionType';

import { deleteReport, editeReports, getReports, getReportsById } from '../api/reportApi';
import { createAction } from '../actions/createAction';

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
    } catch (error) {
        console.log(error);
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