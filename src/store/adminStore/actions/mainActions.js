export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGAUTH_ADMIN = 'LOGIN_ADMIN';
export const GET_CURRENT_ADMIN = 'GET_CURRENT_ADMIN';
export const SET_CURRENT_ADMIN = 'SET_CURRENT_ADMIN';
export const SET_TABLE_COUNT = 'SET_TABLE_COUNT';
export const SET_TABLE_LIST = 'SET_TABLE_LIST';
export const SET_EDITE_ITEM = 'SET_EDITE_ITEM';


export const login = (payload) =>{
    return {
        type: LOGIN_ADMIN,
        payload
    }
}

export const logauth = () =>{
    return {
        type: LOGAUTH_ADMIN,
    }
}

export const getCurrent = () =>{
    return {
        type: GET_CURRENT_ADMIN
    }
}

export const setCurrent = (payload) =>{
    return {
        type: SET_CURRENT_ADMIN,
        payload
    }
}

export const setTableCount = (payload) =>{
    return {
        type: SET_TABLE_COUNT,
        payload
    }
}

export const setTableList = (payload) =>{
    return {
        type: SET_TABLE_LIST,
        payload
    }
}

export const setEditeItem = (payload) =>{
    return {
        type: SET_EDITE_ITEM,
        payload
    }
}