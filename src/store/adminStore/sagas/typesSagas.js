import { call, put, takeEvery } from 'redux-saga/effects';
import history from '../../../views/router/browserHistory';
import { 
    GET_TYPES,
    GET_TYPE_BY_ID, 

    CREATE_TYPE,
    UPDATE_TYPE,

    DELETE_SELECTED_TYPE,
    DELETE_TYPE,
    
    SET_TYPE_COUNT,
    SET_TYPES,
    SET_EDITE_TYPE,
    SET_ERROR_MESSAGE_TYPE

} from '../actions/actionType';

import { createType, deleteSelectedType, deleteType, getTypeById, getTypes, updateType } from '../api/typesApi';
import { createAction } from '../actions/actions';


function* workerGetTypes(action){
    try {
        const { dataCount, types } = yield call(getTypes, action.payload);
        yield put(createAction(SET_TYPE_COUNT, dataCount));
        yield put(createAction(SET_TYPES, types));
        
    } catch (error) {
        console.log(error);
    }
}

function* workerGetTypeById(action){
    try {
        const { type } = yield call(getTypeById, action.payload)
        yield put(createAction(SET_EDITE_TYPE, type))
    } catch (error) {
        console.log(error);
    }
}

function* workerUpdateType(action){
    try {
        // yield call(updateType, action.payload)
        history.push('/admin/types');
        
    } catch (e) {
        yield put(createAction(SET_ERROR_MESSAGE_TYPE, e.response.data.message));
    }
}

function* workerCreateType(action){
    try {
        yield call(createType, action.payload);
        history.push('/admin/types');

    } catch (e) {
        yield put(createAction(SET_ERROR_MESSAGE_TYPE, e.response.data.message));
    }
}


function* workerDeleteType(action){
    yield call(deleteType, action.payload)
}

function* workerDeleteSelected(action){
    // yield call(deleteSelectedType, action.payload)
}

export function* watcherAdminTypes(){
    yield takeEvery(GET_TYPES, workerGetTypes)
    yield takeEvery(GET_TYPE_BY_ID, workerGetTypeById)
    yield takeEvery(UPDATE_TYPE, workerUpdateType)
    yield takeEvery(CREATE_TYPE, workerCreateType)
    yield takeEvery(DELETE_TYPE, workerDeleteType)
    yield takeEvery(DELETE_SELECTED_TYPE, workerDeleteSelected)
}