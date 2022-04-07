import { SET_EDITE_EVENT, SET_EVENTS } from "../actions/eventActions";
import { SET_REPORTS_COMMENT } from "../actions/reportCommentActions";
import { SET_REPORT_EVENTS } from "../actions/reportEventActions";
import { SET_REPORTS, SET_REPORTS_BY_ID } from "../actions/reportActions";
import { SET_EDITE_TYPE, SET_TYPES } from "../actions/typesActions";
import { SET_USERS } from "../actions/usersActions";
import { SET_CURRENT_ADMIN, SET_TABLE_COUNT } from "../actions/mainActions";

const initialState = {

    currentAdmin: null,
    eventsList: null,
    editeEvent: null,
    userList: null,
    typeList: null,
    editeType: null,
    reportMessages: null,
    reportsById: null,
    reportUsers: null,
    reportEvents: null,
    reportComments: null,
    tableCount: 0,
      
}

export const adminReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_CURRENT_ADMIN:
            return {
                ...state,
                currentAdmin: action.payload
            }

        case SET_TABLE_COUNT:
            return {
                ...state,
                tableCount: action.payload
            }

        case SET_EVENTS:
            return {
                ...state,
                eventsList: action.payload,
            }
          
        case SET_EDITE_EVENT:
            return {
                ...state,
                editeEvent: action.payload
            }

        case SET_USERS:
            return {
                ...state,
                userList: action.payload,
            }

        case SET_TYPES:
            return {
                ...state,
                typeList: action.payload,
            }

        case SET_EDITE_TYPE:
            return {
                ...state,
                editeType: action.payload
            }   
            
        case SET_REPORTS:
            return {
                ...state,
                reportMessages: action.payload
            }

        case SET_REPORTS_BY_ID:
              return {
                ...state,
                reportsById: action.payload
            }

        case SET_REPORT_EVENTS:
              return {
                ...state,
                reportEvents: action.payload,
            }
        
        case SET_REPORTS_COMMENT:
              return {
                ...state,
                reportComments: action.payload,
            }

        default:
            return state;
    }
}

