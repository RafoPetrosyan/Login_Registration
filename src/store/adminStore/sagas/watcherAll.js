import { all, fork } from "redux-saga/effects";
import { watcherAdminEvents } from "./eventsSagas";
import { watcherAdminReportComments } from "./reportcommentSagas";
import { watcherAdminReportEvents } from "./reportEventSagas";
import { watcherAdminReports } from "./reportSagas";
import { watcherAdminTypes } from "./typesSagas";
import { watcherAdminUsers } from "./usersSagas";
import { watcherData } from "../../userStore/sagas";
import { watcherMain } from "./mainSagas";
import { watcherChat } from "./chatSagas";


export function* watcherAll(){
   const sagas = [
       watcherMain,
       watcherData,
       watcherChat,
       watcherAdminTypes,
       watcherAdminUsers,
       watcherAdminEvents,
       watcherAdminReports,
       watcherAdminReportEvents,
       watcherAdminReportComments,
   ]
   yield all(sagas.map(fork))
}