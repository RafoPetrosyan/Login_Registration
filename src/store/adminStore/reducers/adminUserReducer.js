import { SET_USER, SET_USER_COUNT, SUCCES_USERS } from "../actions/actionType";


const initialState = {
    userList: null,
    userCount: 0,
    succes: false,
}

export const adminUserReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_USER:
            return {
                ...state,
                userList: action.payload
            }

        case SET_USER_COUNT:
            return {
                ...state,
                userCount: action.payload
            }
        
        case SUCCES_USERS:
            return {
                ...state,
                succes: action.payload
            }

        default:
            return state;
    }
}