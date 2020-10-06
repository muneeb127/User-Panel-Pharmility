import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getOrdersByUserId, createOrder } from "../../crud/order.crud";


export const actionTypes = {
  ReadOrders: "[ReadOrders] Action",
  CreateOrder: "[CreateOrder] Action",
  LoadOrders: "[LoadOrders] Action"
};

const initialOrderState = {
  list: []
};

export const reducer = persistReducer(
    { storage, key: "orders", whitelist: ["orders"] },
    (state = initialOrderState, action) => {
      switch (action.type) {
        case actionTypes.LoadOrders: {
          const { orders } = action.payload;
          return { ...state, list: orders };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  readOrderAction: (userId) => ({type: actionTypes.ReadOrders, payload : {userId}}),
  createOrderAction: orderData => ({type: actionTypes.CreateOrder, payload: {orderData}}),
  fulfillOrderData: orders => ({ type: actionTypes.LoadOrders, payload: { orders } })
};

export function* saga() {
  yield takeLatest(actionTypes.ReadOrders, function* readSaga(readOrderAction){
      // console.log("Search Medicine Data: ", readOrdersAction.payload.medicineData);
      const orders = yield getOrdersByUserId(readOrderAction.payload.userId);
      console.log("Orders: ", orders.data);
      yield put(actions.fulfillOrderData(orders.data));
  });

  yield takeLatest(actionTypes.CreateOrder, function* createSaga(createOrderAction){
    // console.log("Search Medicine Data: ", readOrdersAction.payload.medicineData);
    yield createOrder(createOrderAction.payload.orderData);

    const orders = yield getOrdersByUserId(createOrderAction.payload.orderData.userId);
    console.log("Orders: ", orders.data);
    yield put(actions.fulfillOrderData(orders.data));
    
})
}
