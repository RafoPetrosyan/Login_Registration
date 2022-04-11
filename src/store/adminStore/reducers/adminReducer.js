import { SET_CURRENT_ADMIN } from "../actions/actionType";

const initialState = {
    currentAdmin: null,
   
}

export const adminReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_CURRENT_ADMIN:
            return {
                ...state,
                currentAdmin: action.payload
            }
            
        default:
            return state;
    }
}

