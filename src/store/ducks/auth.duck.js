import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { select, put, takeLatest } from "redux-saga/effects";
import { getUserByToken, registerUser, logoutUser } from "../../crud/auth.crud";
// import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: {},
  authToken: undefined,
  isAuthenticated: false
};

export const reducer = persistReducer(
    { storage, key: "auth", whitelist: ["user", "authToken", "isAuthenticated"] },
    (state = initialAuthState, action) => {
      switch (action.type) {
        case actionTypes.Login: {
          const { authToken } = action.payload;
          return {
            authToken,
          };

        }

        // case actionTypes.Register: {
        //   const { authToken } = action.payload;

        //   return { authToken, user: undefined };
        // }

        case actionTypes.Logout: {
          // routerHelpers.forgotLastLocation();
          return initialAuthState;
        }

        case actionTypes.UserLoaded: {
          const { user } = action.payload;
          console.log("UseR: ", user);
          return { ...state, user, isAuthenticated: true };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  loginAction: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  registerAction: user => ({ type: actionTypes.Register, payload: { user } }),
  logoutAction: () => ({ type: actionTypes.Logout }),
  requestUserAction: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUserAction: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    const store = yield select();
    console.log(store);
    const {authToken} = store.auth;
    //Pass token to get the user
    const user = yield getUserByToken(authToken);
    console.log(user);
    //Dispath the action fulfilluser
    yield put(actions.fulfillUserAction(user));
    // console.log(yield put(actions.requestUser(authToken)));
  });

  yield takeLatest(actionTypes.Register, function* registerSaga(registerAction) {
    // console.log(registerAction.payload.user);
    yield registerUser(registerAction.payload.user);
  });

  yield takeLatest(actionTypes.Logout, function* logoutSaga(){
    yield logoutUser();
  })
}
