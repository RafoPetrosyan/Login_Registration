import { SET_CURRENT_USER, SET_USER_LIST } from "../actions";

const initialState = {
    userList: [
        {
            id: 1,
            name: 'Rafo',
            surname: 'Petrosyan',
            email: 'petrosyanrafo0@gmail.com',
            password: 'rafo21',
        },
        {
            id: 2,
            name: 'Poxos',
            surname: 'Poxosyan',
            email: 'poxosyan@gmail.com',
            password: 'poxos',  
        }
    ],
    currentUser: null,
}

export const userReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_USER_LIST:
            return {
                ...state,
                state: action.payload
            }
        
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

