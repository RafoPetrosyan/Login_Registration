import { all, fork } from "redux-saga/effects";
import { watcherAdminEvents } from "./adminStore/events/eventsSagas";
import { watcherAdminUsers } from "./adminStore/users/usersSagas";
import { watcherData } from "./userStore/sagas";

export function* watcherAll(){
   const sagas = [
       watcherData,
       watcherAdminEvents,
       watcherAdminUsers,
   ]
   yield all(sagas.map(fork))
}