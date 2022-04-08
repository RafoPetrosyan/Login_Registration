export const GET_TYPES = 'GET_TYPES';
export const GET_TYPE_BY_ID = 'GET_TYPE_BY_ID';
export const UPDATE_TYPE = 'UPDATE_TYPE';
export const CREATE_TYPE = 'CREATE_TYPE';
export const DELETE_TYPE = 'DELETE_TYPE';
export const DELETE_SELECTED_TYPE = 'DELETE_SELECTED_TYPE';


export const getTypes = (payload) =>{
    return {
        type: GET_TYPES,
        payload
    }
}

export const getTypeById = (payload) =>{
    return {
        type: GET_TYPE_BY_ID,
        payload
    }
}

export const updateType = (payload) =>{
    return {
        type: UPDATE_TYPE,
        payload
    }
}

export const createType = (payload) =>{
    return {
        type: CREATE_TYPE,
        payload
    }
}

export const deleteType = (payload) =>{
    return {
        type: DELETE_TYPE,
        payload
    }
}

export const deleteSelectedType = (payload) =>{
    return {
        type: DELETE_SELECTED_TYPE,
        payload
    }
}