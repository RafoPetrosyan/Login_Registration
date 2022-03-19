import { all, fork } from "redux-saga/effects";
import { watcherAdmin } from "./adminStore/sagas";
import { watcherData } from "./userStore/sagas";

export function* watcherAll(){
   const sagas = [
       watcherData,
       watcherAdmin,
   ]
   yield all(sagas.map(fork))
}