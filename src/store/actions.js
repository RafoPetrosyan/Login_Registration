export const SET_USER_LIST = 'SET_USER_LIST';
export const CONFIRMED_SIGN_IN = 'CONFIRMED_SIGN_IN';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const CONFIRMED_SIGN_UP_EMAIL = 'CONFIRMED_SIGN_UP_EMAIL';

export const setData = (payload) =>{
    return {
        type: SET_USER_LIST,
        payload,
    }
}

export const confirmedSignIn = (payload) =>{
    return {
        type: CONFIRMED_SIGN_IN,
        payload,
    }
}

export const updateCurrentUser = (payload) =>{
    return {
        type: UPDATE_CURRENT_USER,
        payload,
    }
}

export const confirmedEmail = (payload) =>{
    return {
        type: CONFIRMED_SIGN_UP_EMAIL,
        payload,
    }
}

