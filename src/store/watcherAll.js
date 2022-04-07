import { all, fork } from "redux-saga/effects";
import { watcherAdminEvents } from "./adminStore/events/eventsSagas";
import { watcherAdminReportComments } from "./adminStore/reportComments/reportcommentSagas";
import { watcherAdminReportEvents } from "./adminStore/reportEvents/reportEventSagas";
import { watcherAdminReports } from "./adminStore/reports/reportSagas";
import { watcherAdminTypes } from "./adminStore/types/typesSagas";
import { watcherAdminUsers } from "./adminStore/users/usersSagas";
import { watcherData } from "./userStore/sagas";

export function* watcherAll(){
   const sagas = [
       watcherData,
       watcherAdminEvents,
       watcherAdminUsers,
       watcherAdminTypes,
       watcherAdminReports,
       watcherAdminReportEvents,
       watcherAdminReportComments,
   ]
   yield all(sagas.map(fork))
}