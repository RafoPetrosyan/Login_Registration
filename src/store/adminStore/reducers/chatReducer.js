import { SET_CHATS, SET_MESSAGES, SET_SOCKET_MESSGES } from "../actions/actionType";

const initialState = {
    chats: null,
    messages: null,
    socketMessages: [], 
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

        case SET_SOCKET_MESSGES:
            return {
                ...state,
                socketMessages: [...state.socketMessages, action.payload]
            }

        default:
            return state;
    }
}