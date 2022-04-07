import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_REPORTS_COMMENT, setReportsComment } from '../actions/reportCommentActions';
import { getReportComments } from '../api/reportCommentsApi';


function* worketGetReportComments(action){
    try {
        const { dataCount, reportComments } = yield call(getReportComments, action.payload);
        yield put(setReportsComment({dataCount, reportComments}))
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminReportComments(){
    yield takeEvery(GET_REPORTS_COMMENT, worketGetReportComments)
}