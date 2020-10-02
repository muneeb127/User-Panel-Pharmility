import {all} from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import * as medicine from "./ducks/medicine.duck";
import * as searchMedicine from "./ducks/searchMedicine.duck";
import * as retailerInventory from "./ducks/retailerInventory.duck";
import * as order from "./ducks/order.duck";


export const rootReducer = combineReducers({
    auth: auth.reducer,
    medicine: medicine.reducer,
    searchedMedicine: searchMedicine.reducer,
    retailer: retailerInventory.reducer,
    order: order.reducer
}); 


export function* rootSaga(){
    yield all([auth.saga(), medicine.saga(), searchMedicine.saga(), retailerInventory.saga(), order.saga()]);
}