import { call, put, takeEvery } from 'redux-saga/effects';
import history from '../../../views/router/browserHistory';
import { 
    APPROVE_REPORT_EVENT, 
    GET_REPORT_EVENTS,

    SET_REPORT_EVENTS,
    SET_REPORT_EVENT_COUNT,
    
} from '../actions/actionType';
import { approveReportEvent, getReportsEvents } from '../api/reportEventApi';
import { createAction } from '../actions/actions';


function* workerGetReportEvents(action){
    try {
      const { dataCount, reportEvents } = yield call(getReportsEvents, action.payload);
      yield put(createAction(SET_REPORT_EVENT_COUNT, dataCount));
      yield put(createAction(SET_REPORT_EVENTS, reportEvents));
    } catch (error) {
        console.log(error);
    }
}

function* worketApproveReportEvent(action){
    try {
        yield call(approveReportEvent, action.payload);
        history.push('/admin/reports/events');
    } catch (error) {
        console.log(error);
    }
}

export function* watcherAdminReportEvents() {
    yield takeEvery(GET_REPORT_EVENTS, workerGetReportEvents)
    yield takeEvery(APPROVE_REPORT_EVENT, worketApproveReportEvent)
}