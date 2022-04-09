import { SET_EDITE_TYPE, SET_TYPES, SET_TYPE_COUNT } from "../actions/actionType";


const initialState = {
    typeList: null,
    typeCount: 0,
    editeItem: null,
}

export const adminTypeReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_TYPES:
            return {
                ...state,
                typeList: action.payload
            }

        case SET_TYPE_COUNT:
            return {
                ...state,
                typeCount: action.payload
            }

        case SET_EDITE_TYPE:
            return {
                ...state,
                editeItem: action.payload
            }

        default:
            return state;
    }
}