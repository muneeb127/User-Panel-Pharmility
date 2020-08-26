import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getSearchedMedicine } from "../../crud/medicine.crud";


export const actionTypes = {
  ReadSearchedMedicine: "[ReadSearchedMedicine] Action",
  LoadSearchedMedicine: "[LoadSearchedMedicines] Action"
};

const initialMedicineState = {
  searchMedicines: []
};

export const reducer = persistReducer(
    { storage, key: "SearchMedicine", whitelist: ["medicines"] },
    (state = initialMedicineState, action) => {
      switch (action.type) {
        case actionTypes.LoadSearchedMedicine: {
          const { medicines } = action.payload;
          return { ...state, searchMedicines: medicines };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  readMedicineAction: medicineData => ({type: actionTypes.ReadSearchedMedicine, payload: {medicineData}}),
  fulfillMedicinesData: medicines => ({ type: actionTypes.LoadSearchedMedicine, payload: { medicines } })
};

export function* saga() {
  yield takeLatest(actionTypes.ReadSearchedMedicine, function* readSaga(readMedicineAction){
      const medicines = yield getSearchedMedicine(readMedicineAction.payload.medicineData);
      console.log("Searched Medicine: ", medicines.data);
      yield put(actions.fulfillMedicinesData(medicines.data));
  })
}
