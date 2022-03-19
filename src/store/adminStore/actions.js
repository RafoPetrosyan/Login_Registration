export const SET_CURRENT_ADMIN = 'SET_CURRENT_ADMIN';
export const CONFIRM_LOGIN_ADMIN = 'CONFIRM_LOGIN_ADMIN';

export const confirmCurrentAdmin = (payload) =>{
    return {
        type: CONFIRM_LOGIN_ADMIN,
        payload
    }
}

export const setCurrentAdmin = (payload) =>{
    return {
        type: SET_CURRENT_ADMIN,
        payload
    }
}

