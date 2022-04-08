import { SET_CURRENT_ADMIN, SET_EDITE_ITEM, SET_TABLE_COUNT, SET_TABLE_LIST } from "../actions/mainActions";

const initialState = {
    currentAdmin: null,
    tableCount: 0,
    tableList: null,
    editeItem: null, 
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
        
        case SET_EDITE_ITEM:
            return {
                ...state,
                editeItem: action.payload
            }

        default:
            return state;
    }
}

