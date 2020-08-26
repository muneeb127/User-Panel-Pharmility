import {all} from "redux-saga/effects";
import { combineReducers } from "redux";

import * as medicine from "./ducks/medicine.duck";
import * as searchMedicine from "./ducks/searchMedicine.duck";


export const rootReducer = combineReducers({
    medicine: medicine.reducer,
    searchedMedicine: searchMedicine.reducer
}); 


export function* rootSaga(){
    yield all([medicine.saga(), searchMedicine.saga()]);
}