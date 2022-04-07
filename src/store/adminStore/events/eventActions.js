export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGAUTH_ADMIN = 'LOGIN_ADMIN';
export const GET_CURRENT_ADMIN = 'GET_CURRENT_ADMIN';
export const SET_CURRENT_ADMIN = 'SET_CURRENT_ADMIN';
export const GET_EVENTS = 'GET_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const SET_EVENTS = 'SET_EVENTS';
export const GET_EDITE_EVENT = 'GET_EDITE_EVENT';
export const SET_EDITE_EVENT = 'SET_EDITE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_SELECTED_EVENT = 'DELETE_SELECTED_EVENT';



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

export const createEvent = (payload) =>{
    return {
        type: CREATE_EVENT,
        payload
    }
}

export const getEditeEvent = (payload) =>{
    return {
        type: GET_EDITE_EVENT,
        payload
    }
}

export const setEditeEvent = (payload) =>{
    return {
        type: SET_EDITE_EVENT,
        payload
    }
}

export const updateEvent = (payload) => {
    return {
        type: UPDATE_EVENT,
        payload
    }
}

export const deleteEvent = (payload) =>{
    return {
        type: DELETE_EVENT,
        payload
    }
}

export const deleteSelectedEvent = (payload) =>{
    return {
        type: DELETE_SELECTED_EVENT,
        payload
    }
}