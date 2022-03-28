export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGAUTH_ADMIN = 'LOGIN_ADMIN';
export const GET_CURRENT_ADMIN = 'GET_CURRENT_ADMIN';
export const SET_CURRENT_ADMIN = 'SET_CURRENT_ADMIN';
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const SET_EVENTS = 'SET_EVENTS';



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

export const getEvents = (payload) =>{
    return {
        type: GET_EVENTS,
        payload
    }
}

export const setEvents = (payload) =>{
    return {
        type: SET_EVENTS,
        payload
    }
}

export const addEvent = (payload) =>{
    return {
        type: ADD_EVENT,
        payload
    }
}