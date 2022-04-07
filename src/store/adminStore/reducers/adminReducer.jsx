import { SET_CURRENT_ADMIN, SET_EDITE_EVENT, SET_EVENTS } from "../events/eventActions";
import { SET_REPORTS_COMMENT } from "../reportComments/reportCommentActions";
import { SET_REPORT_EVENTS } from "../reportEvents/reportEventActions";
import { SET_REPORTS, SET_REPORTS_BY_ID } from "../reports/reportActions";
import { SET_EDITE_TYPE, SET_TYPES } from "../types/typesActions";
import { SET_USERS } from "../users/usersActions";

const initialState = {

    currentAdmin: null,
    eventsList: null,
    eventsListCount: 0,
    editeEvent: null,
    userList: null,
    usersListCount: 0,
    typeList: null,
    typeListCount: 0,
    editeType: null,
    reportMessages: null,
    reportsById: null,
    reportUsers: null,
    reportEvents: null,
    reportEventsCount: 0,
    reportComments: null,
    reportCommentsCount: 0
      
}

export const adminReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_CURRENT_ADMIN:
            return {
                ...state,
                currentAdmin: action.payload
            }

        case SET_EVENTS:
            return {
                ...state,
                eventsList: action.payload.eventList,
                eventsListCount: action.payload.dataCount
            }
          
        case SET_EDITE_EVENT:
            return {
                ...state,
                editeEvent: action.payload
            }

        case SET_USERS:
            return {
                ...state,
                userList: action.payload.list,
                usersListCount: action.payload.dataCount
            }

        case SET_TYPES:
            return {
                ...state,
                typeList: action.payload.types,
                typeListCount: action.payload.dataCount
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
                reportEvents: action.payload.reportEvents,
                reportEventsCount: action.payload.dataCount
            }
        
        case SET_REPORTS_COMMENT:
              return {
                ...state,
                reportComments: action.payload.reportComments,
                reportCommentsCount: action.payload.dataCount
            }

        default:
            return state;
    }
}

