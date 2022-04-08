import { call, put, takeEvery } from 'redux-saga/effects';
import {
    GET_REPORTS_COMMENT,
    SET_TABLE_COUNT, 
    SET_TABLE_LIST,
} from '../actions/actionType';
import { getReportComments } from '../api/reportCommentsApi';
import { createAction } from '../actions/createAction';


function* worketGetReportComments(action){
    try {
        const { dataCount, reportComments } = yield call(getReportComments, action.payload);
        yield put(createAction(SET_TABLE_COUNT, dataCount));
        yield put(createAction(SET_TABLE_LIST, reportComments));
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminReportComments(){
    yield takeEvery(GET_REPORTS_COMMENT, worketGetReportComments)
}