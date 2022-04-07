import { call, put, takeEvery } from 'redux-saga/effects';
import { Navigate } from 'react-router-dom';
import { 
    ADD_USER,
    DELETE_SELECTED,
    DELETE_USER,
    EDITE_USER,
    GET_USERS, 
} from '../actions/usersActions';
import { addUser, deleteSelected, deleteUser, editeUser, getUsers } from '../api/usersApi';
import { setTableCount, setTableList } from '../actions/mainActions';


function* workerGetUsers(action){
    try {
        const { list, dataCount } = yield call(getUsers, action.payload);
        yield put(setTableCount(dataCount));
        yield put(setTableList(list));

        
    } catch (error) {
        console.log(error);
    }
}

function* workerAddUser(action){
    try {
        yield call(addUser, action.payload)
        yield <Navigate to='/admin/users' replace/>
    } catch (error) {
        console.log(error);
    }
}

function* workerDeleteUser(action){
   yield call(deleteUser, action.payload);
}

function* workerDeleteSelected(action){
    // yield call(deleteSelected, action.payload)
    console.log(action.payload);
}

function* workerEditeUser(action){
    try {
        yield call(editeUser, action.payload)
    } catch (error) {
        console.log(error);
    }
}

export function* watcherAdminUsers(){
    yield takeEvery(GET_USERS, workerGetUsers)
    yield takeEvery(ADD_USER, workerAddUser)
    yield takeEvery(DELETE_USER, workerDeleteUser)
    yield takeEvery(EDITE_USER, workerEditeUser)
    yield takeEvery(DELETE_SELECTED, workerDeleteSelected)
}