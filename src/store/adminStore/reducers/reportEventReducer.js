import { SET_REPORT_EVENTS, SET_REPORT_EVENT_COUNT } from "../actions/actionType";

const initialState = {
    reportEventList: null,
    reportEventCount: 0,
}

export const adminReportEventReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_REPORT_EVENTS:
            return {
                ...state,
                reportEventList: action.payload
            }

        case SET_REPORT_EVENT_COUNT:
            return {
                ...state,
                reportEventCount: action.payload
            }

        default:
            return state;
    }
}