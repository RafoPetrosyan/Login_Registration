import { SET_EDITE_USER, SET_ERROR_MESSAGE_USERS, SET_USER, SET_USER_COUNT } from "../actions/actionType";


const initialState = {
    userList: null,
    editeUser: null,
    userCount: 0,
    errorMessege: '',
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

        case SET_EDITE_USER:
            return {
                ...state,
                editeUser: action.payload
            }

        case SET_ERROR_MESSAGE_USERS:
            return {
                ...state,
                errorMessege: action.payload
            }

        default:
            return state;
    }
}

// edite

// data: {"name":"Rafo","nickname":"rafo_21","phone":"093112094",
// "aboutMe":"asd","gender":"","links":{"facebook":"","vkontakte":"","instagram":""},"role":"user"}

