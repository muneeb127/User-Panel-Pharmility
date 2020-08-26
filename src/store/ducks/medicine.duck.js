import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getMedicines } from "../../crud/medicine.crud";


export const actionTypes = {
  ReadMedicine: "[ReadMedicine] Action",
  LoadMedicine: "[LoadMedicines] Action"
};

const initialMedicineState = {
  medicines: []
};

export const reducer = persistReducer(
    { storage, key: "medicines", whitelist: ["medicines"] },
    (state = initialMedicineState, action) => {
      switch (action.type) {
        case actionTypes.LoadMedicine: {
          const { medicines } = action.payload;
          return { ...state, medicines };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  readMedicineAction: () => ({type: actionTypes.ReadMedicine}),
  fulfillMedicinesData: medicines => ({ type: actionTypes.LoadMedicine, payload: { medicines } })
};

export function* saga() {
  yield takeLatest(actionTypes.ReadMedicine, function* readSaga(){
      const medicines = yield getMedicines();
      console.log(medicines.data);
      yield put(actions.fulfillMedicinesData(medicines.data));
  })
}
