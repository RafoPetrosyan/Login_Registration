export const GET_REPORT_EVENTS = 'GET_REPORT_EVENTS';
export const SET_REPORT_EVENTS = 'SET_REPORT_EVENTS';
export const APPROVE_REPORT_EVENT = 'APPROVE_REPORT_EVENT';

export const getreportEvents = (payload) =>{
    return {
        type: GET_REPORT_EVENTS,
        payload
    }
}

export const setReportEvents = (payload) => {
    return {
        type: SET_REPORT_EVENTS,
        payload
    }
}

export const approveReportEvent = (payload) =>{
    return {
        type: APPROVE_REPORT_EVENT,
        payload
    }
}