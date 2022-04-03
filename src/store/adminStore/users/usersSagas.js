import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    GET_USERS, setUsers 
} from './usersActions';
import { getUsers } from './usersApi';


function* workerGetUsers(action){
    try {
        const { list, dataCount } = yield call(getUsers, action.payload);
        yield put(setUsers({list, dataCount}))
        
    } catch (error) {
        console.log(error);
    }
}

export function* watcherAdminUsers(){
    yield takeEvery(GET_USERS, workerGetUsers)
}