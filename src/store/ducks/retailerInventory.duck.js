import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getRetailers } from "../../crud/retailerInventory.crud";


export const actionTypes = {
  ReadRetailers: "[ReadRetailers] Action",
  LoadRetailers: "[LoadRetailers] Action"
};

const initialRetailerState = {
  list: []
};

export const reducer = persistReducer(
    { storage, key: "retailers", whitelist: ["retailers"] },
    (state = initialRetailerState, action) => {
      switch (action.type) {
        case actionTypes.LoadRetailers: {
          const { retailers } = action.payload;
          return { ...state, list: retailers };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  readRetailerAction: medicineId => ({type: actionTypes.ReadRetailers, payload: {medicineId}}),
  fulfillRetailerData: retailers => ({ type: actionTypes.LoadRetailers, payload: { retailers } })
};

export function* saga() {
  yield takeLatest(actionTypes.ReadRetailers, function* readSaga(readRetailerAction){
      // console.log("Search Medicine Data: ", readRetailersAction.payload.medicineData);
      const retailer = yield getRetailers(readRetailerAction.payload.medicineId);
      // console.log("Searched Medicine: ", medicines.data);
      yield put(actions.fulfillRetailerData(retailer.data));
  })
}
