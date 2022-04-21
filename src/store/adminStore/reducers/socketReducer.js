import { SET_NOTIFICATION_INFO } from "../actions/actionType"

const initialState = {
    notificationInfo: [{}, {}],
}

export const socketReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_NOTIFICATION_INFO:
            return {
                ...state,
                notificationInfo: [...state.notificationInfo, action.payload]
            }
        
        default:
            return state;
    }
}