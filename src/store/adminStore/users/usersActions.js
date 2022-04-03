export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';


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