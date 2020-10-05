import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  LoadLocation: "[LoadLocation] Action",
};

const initialMapState = {
  location: {
    lat: 24.9298,
    lng: 67.1148
  }
};

export const reducer = persistReducer(
    { storage, key: "map", whitelist: ["location"] },
    (state = initialMapState, action) => {
      switch (action.type) {
        case actionTypes.LoadLocation: {
          const { location } = action.payload;
          console.log("Location: ", location);
          return { ...state, location };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  fulfillLocationDataAction: location => ({ type: actionTypes.LoadLocation, payload: { location } }),
};

export function* saga() {
//   yield takeLatest(actionTypes.LoadLocation, function* readSaga(fulfillLocationDataAction){
//       console.log("Location Data: ", fulfillLocationDataAction.payload.location);
//     //   yield put(actions.fulfillMedicinesData(fulfillLocationDataAction.payload));
//   })
}
