export const SET_USER_LIST = 'SET_USER_LIST';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';


export const setUserList = (payload) => {
    return {
        type: SET_USER_LIST,
        payload
    }
}

export const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload
    }
}

export const confirmLogin = (payload) => {
    return {
        type: CONFIRM_LOGIN,
        payload
    }
}

