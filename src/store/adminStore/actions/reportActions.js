export const GET_REPORTS = 'GET_REPORTS';
export const GET_REPORTS_BY_ID = 'GET_REPORTS_BY_ID';
export const EDITE_REPORTS = 'EDITE_REPORTS';
export const DELETE_REPORT = 'DELETE_REPORT';



export const getReports = (payload) =>{
    return {
        type: GET_REPORTS,
        payload
    }
}

export const getReportsById = (payload) =>{
    return {
        type: GET_REPORTS_BY_ID,
        payload
    }
}

export const edteReports = (payload) =>{
    return {
        type: EDITE_REPORTS,
        payload
    }
}

export const deleteReport = (payload) =>{
    return {
        type: DELETE_REPORT,
        payload
    }
}
