import { call, put, takeEvery } from 'redux-saga/effects';
import history from '../../../views/router/browserHistory';
import {
    APPROVE_REPORT_COMMENT,
    GET_REPORTS_COMMENT,
    
    SET_REPORT_COMMENTS,
    SET_REPORT_COMMENT_COUNT,
   
} from '../actions/actionType';
import { approveReportComment, getReportComments } from '../api/reportCommentsApi';
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

function* workerApproveReportComment(action){
    try {
        yield call(approveReportComment, action.payload)
        history.push('/admin/reports/comments')
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminReportComments(){
    yield takeEvery(GET_REPORTS_COMMENT, worketGetReportComments)
    yield takeEvery(APPROVE_REPORT_COMMENT, workerApproveReportComment)
}