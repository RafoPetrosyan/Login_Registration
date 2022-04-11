import { call, put, takeEvery } from 'redux-saga/effects';
import {
    GET_REPORTS_COMMENT,
    
    SET_REPORT_COMMENTS,
    SET_REPORT_COMMENT_COUNT,
   
} from '../actions/actionType';
import { getReportComments } from '../api/reportCommentsApi';
import { createAction } from '../actions/actions';


function* worketGetReportComments(action){
    try {
        const { dataCount, reportComments } = yield call(getReportComments, action.payload);
        yield put(createAction(SET_REPORT_COMMENT_COUNT, dataCount));
        yield put(createAction(SET_REPORT_COMMENTS, reportComments));
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminReportComments(){
    yield takeEvery(GET_REPORTS_COMMENT, worketGetReportComments)
}