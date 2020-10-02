import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getMedicines, getAlternateMedicines } from "../../crud/medicine.crud";


export const actionTypes = {
  ReadMedicine: "[ReadMedicine] Action",
  ReadAlternateMedicine: "[ReadAlternateMedicine] Action",
  LoadMedicine: "[LoadMedicines] Action",
  LoadAlternateMedicine: "[LoadAlternateMedicines] Action",
};

const initialMedicineState = {
  medicines: [],
  alternateMedicines: [],
};

export const reducer = persistReducer(
    { storage, key: "medicines", whitelist: ["medicines"] },
    (state = initialMedicineState, action) => {
      switch (action.type) {
        case actionTypes.LoadMedicine: {
          const { medicines } = action.payload;
          return { ...state, medicines };
        }

        case actionTypes.LoadAlternateMedicine: {
          const { alternateMedicines } = action.payload;
          return { ...state, alternateMedicines };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  readMedicineAction: () => ({type: actionTypes.ReadMedicine}),
  readAlternateMedicineAction: (medicineId) => ({type: actionTypes.ReadAlternateMedicine, payload: {medicineId}}),
  fulfillMedicinesData: medicines => ({ type: actionTypes.LoadMedicine, payload: { medicines } }),
  fulfillAlternateMedicinesData: alternateMedicines => ({ type: actionTypes.LoadAlternateMedicine, payload: { alternateMedicines } })
};

export function* saga() {
  yield takeLatest(actionTypes.ReadMedicine, function* readSaga(){
      const medicines = yield getMedicines();
      // console.log(medicines.data);
      yield put(actions.fulfillMedicinesData(medicines.data));
  })

  yield takeLatest(actionTypes.ReadAlternateMedicine, function* readAlternateSaga(readAlternateMedicineAction){
    console.log(readAlternateMedicineAction.payload.medicineId);
    const alternateMedicines = yield getAlternateMedicines(readAlternateMedicineAction.payload.medicineId);
    // console.log(alternateMedicines.data);
    yield put(actions.fulfillAlternateMedicinesData(alternateMedicines.data));
})
}
