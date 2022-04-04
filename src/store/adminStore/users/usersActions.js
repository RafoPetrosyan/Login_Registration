export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const EDITE_USER = 'EDITE_USER';
export const DELETE_SELECTED = 'DELETE_SELECTED';


export const getUsers = (payload) =>{
    return {
        type: GET_USERS,
        payload
    }
}

export const setUsers = (payload) =>{
    return {
        type: SET_USERS,
        payload
    }
}

export const addUser = (payload) =>{
    return {
        type: ADD_USER,
        payload
    }
}

export const deleteUser = (payload) =>{
    return {
        type: DELETE_USER,
        payload
    }
}

export const deleteSelectedUsers = (payload) =>{
    return {
        type: DELETE_SELECTED,
        payload
    }
}

export const editeUser = (payload) =>{
    return {
        type: EDITE_USER,
        payload
    }
}