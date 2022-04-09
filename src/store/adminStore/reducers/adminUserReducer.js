import { SET_USER, SET_USER_COUNT } from "../actions/actionType";


const initialState = {
    userList: null,
    userCount: 0,
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

        default:
            return state;
    }
}