import { SET_REPORT_COMMENTS, SET_REPORT_COMMENT_COUNT } from "../actions/actionType";

const initialState = {
    reportCommentList: null,
    reportCommentCount: 0,
}

export const adminReportCommentReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_REPORT_COMMENTS:
            return {
                ...state,
                reportCommentList: action.payload
            }

        case SET_REPORT_COMMENT_COUNT:
            return {
                ...state,
                reportCommentCount: action.payload
            }

        default:
            return state;
    }
}