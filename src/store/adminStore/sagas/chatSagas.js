import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "../actions/actions";
import { GET_CHATS, GET_MESSAGES, SEND_MESSAGE, SET_CHATS, SET_MESSAGES } from "../actions/actionType";
import { getChats, getMessages, sendMessage } from "../api/chatApi";


function* worketGetChats(action){
    try {
        const { chats } = yield call(getChats, action.payload);
        yield put(createAction(SET_CHATS, chats));
    } catch (error) {
        console.log(error);
    }
}

function* worketGetMessages(action){
    try {
        const { chat } = yield call(getMessages, action.payload);
        yield put(createAction(SET_MESSAGES, chat.messages));
    } catch (error) {
        console.log(error);
    }
}

function* workerSendMessage(action){
    try {
        yield call(sendMessage, action.payload);
        
    } catch (error) {
        console.log(error);
    }
}

export function* watcherChat(){
    yield takeEvery(GET_CHATS, worketGetChats)
    yield takeEvery(GET_MESSAGES, worketGetMessages)
    yield takeEvery(SEND_MESSAGE, workerSendMessage)
}