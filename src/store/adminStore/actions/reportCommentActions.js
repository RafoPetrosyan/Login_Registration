export const GET_REPORTS_COMMENT = 'GET_REPORTS_COMMENT';
export const SET_REPORTS_COMMENT = 'SET_REPORTS_COMMENT';


export const getReportsComment = (payload) =>{
    return {
        type: GET_REPORTS_COMMENT,
        payload
    }
}

export const setReportsComment = (payload) =>{
    return {
        type: SET_REPORTS_COMMENT,
        payload
    }
}