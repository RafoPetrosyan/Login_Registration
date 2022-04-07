import { SET_EDITE_EVENT } from "../actions/eventActions";
import { SET_REPORTS_BY_ID } from "../actions/reportActions";
import { SET_EDITE_TYPE } from "../actions/typesActions";
import { SET_CURRENT_ADMIN, SET_TABLE_COUNT, SET_TABLE_LIST } from "../actions/mainActions";

const initialState = {

    currentAdmin: null,
    editeEvent: null,
    editeType: null,
    reportsById: null,
    reportUsers: null,
    tableCount: 0,
    tableList: null,
      
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
        
        case SET_TABLE_LIST:
            return {
                ...state,
                tableList: action.payload
            }

        case SET_EDITE_EVENT:
            return {
                ...state,
                editeEvent: action.payload
            }

        case SET_EDITE_TYPE:
            return {
                ...state,
                editeType: action.payload
            }   

        case SET_REPORTS_BY_ID:
              return {
                ...state,
                reportsById: action.payload
            }

        default:
            return state;
    }
}

