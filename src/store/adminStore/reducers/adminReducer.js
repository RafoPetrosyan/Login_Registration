import { SET_CURRENT_ADMIN, SET_ERROR_MESSAGE_LOGIN } from "../actions/actionType";

const initialState = {
    currentAdmin: null,
    errorMessage: '',
}

export const adminReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_CURRENT_ADMIN:
            return {
                ...state,
                currentAdmin: action.payload
            }
        
        case SET_ERROR_MESSAGE_LOGIN:
            return {
                ...state,
                errorMessage: action.payload
            }
            
        default:
            return state;
    }
}

