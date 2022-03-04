import { SET_USER_LIST, UPDATE_CURRENT_USER } from "../actions";

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
    currentUser: {},
}

export const reducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_USER_LIST:
            return {
                ...state,
                state: action.payload
            }

        case UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

