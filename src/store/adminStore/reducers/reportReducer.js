import { SET_EDITE_REPORT, SET_ERROR_MESSAGE_REPORT, SET_REPORTS } from "../actions/actionType";


const initialState = {
    reportList: null,
    editeReport: null,
    errorMessage: '',
}

export const adminReportReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_REPORTS:
            return {
                ...state,
                reportList: action.payload
            }

        case SET_EDITE_REPORT:
            return {
                ...state,
                editeReport: action.payload
            }

        case SET_ERROR_MESSAGE_REPORT:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;
    }
}