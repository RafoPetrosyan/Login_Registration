import { call, put, takeEvery } from 'redux-saga/effects';
import { 
        
        GET_EVENTS,
        GET_EDITE_EVENT,

        SET_EVENT,
        SET_EVENT_COUNT,
        SET_EDITE_EVENT,

        CREATE_EVENT, 
        UPDATE_EVENT,

        DELETE_EVENT,
        DELETE_SELECTED_EVENT,


} from '../actions/actionType';


import { 
        createEvent,
        updateEvent,

        dedleteSelectedEvents, 
        deleteEvent, 
        
        events, 
        getEditeEvent, 

} from '../api/eventsApi';

import { createAction } from '../actions/createAction';
import { Navigate } from 'react-router-dom';


function* workerGetEvents(action) {
    try {
        const { eventList, dataCount } = yield call(events, action.payload);
        yield put(createAction(SET_EVENT_COUNT, dataCount));
        yield put(createAction(SET_EVENT, eventList));

    } catch (error) {
        console.log(error);
    }
}

function* workerCreateEvent(action) {
    try {
        yield call(createEvent, action.payload);
    } catch (e) {
        console.log(e.response.data.message);
    }
}

function* workerGetEditeEvents(action){
    try {
        const { eventData } = yield call(getEditeEvent, action.payload);
        yield put(createAction(SET_EDITE_EVENT, eventData));
        
    } catch (error) {
        console.log(error);
    }
}

function* workerUpdateEvent(action){
    try {
        const data = yield call(updateEvent, action.payload)
    } catch (error) {
        console.log(error);
    }
}

function* workerDeleteEvent(action){
    try {
        yield call(deleteEvent, action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* workerDeleteSelectedEvent(action){
    console.log(action.payload);
    try {
        yield call(dedleteSelectedEvents(action.payload))
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminEvents() {
    yield takeEvery(GET_EVENTS, workerGetEvents)
    yield takeEvery(CREATE_EVENT, workerCreateEvent)
    yield takeEvery(GET_EDITE_EVENT, workerGetEditeEvents)
    yield takeEvery(UPDATE_EVENT, workerUpdateEvent)
    yield takeEvery(DELETE_EVENT, workerDeleteEvent)
    yield takeEvery(DELETE_SELECTED_EVENT, workerDeleteSelectedEvent)
}