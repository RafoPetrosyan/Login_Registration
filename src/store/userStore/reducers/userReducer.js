import { SET_CURRENT_USER, SET_USER_LIST } from "../actions";

const initialState = {
    userList: [],
    currentUser: JSON.parse(localStorage?.getItem('current-user')) || null,
}

export const userReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_USER_LIST:
            return {
                ...state,
                userList: action.payload,
            }
        
        case SET_CURRENT_USER:
            console.log('vvvvvvvvvvvvvvvvvvvvvv');
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

