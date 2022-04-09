import { SET_EDITE_EVENT, SET_EVENT, SET_EVENT_COUNT } from "../actions/actionType";


const initialState = {
    eventList: null,
    eventCount: 0,
    editeItem: null,
}

export const eventReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_EVENT:
            return {
                ...state,
                eventList: action.payload
            }

        case SET_EVENT_COUNT:
            return {
                ...state,
                eventCount: action.payload
            }

        case SET_EDITE_EVENT:
            return {
                ...state,
                editeItem: action.payload
            }

        default:
            return state;
    }
}