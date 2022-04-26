import { SET_CHATS, SET_MESSAGES } from "../actions/actionType";

const initialState = {
    chats: null,
    messages: null,
}

export const chatReducer = (state = initialState, action) =>{

    switch(action.type){

        case SET_CHATS:
            return {
                ...state,
                chats: action.payload
            }

        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state;
    }
}