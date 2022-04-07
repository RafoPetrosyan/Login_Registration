import { call, put, takeEvery } from 'redux-saga/effects';
import { setTableCount } from '../actions/mainActions';
import { 
    APPROVE_REPORT_EVENT, 
    GET_REPORT_EVENTS, 
    setReportEvents 
} from '../actions/reportEventActions';
import { approveReportEvent, getReportsEvents } from '../api/reportEventApi';


function* workerGetReportEvents(action){
    try {
      const { dataCount, reportEvents } = yield call(getReportsEvents, action.payload);
      yield put(setTableCount(dataCount));
      yield put(setReportEvents(reportEvents));
    } catch (error) {
        console.log(error);
    }
}

function* worketApproveReportEvent(action){
   
    try {
        // yield call(approveReportEvent, action.payload)
    } catch (error) {
        console.log(error);
    }
}

export function* watcherAdminReportEvents() {
    yield takeEvery(GET_REPORT_EVENTS, workerGetReportEvents)
    yield takeEvery(APPROVE_REPORT_EVENT, worketApproveReportEvent)
}