import axios from "axios";

const ORDER_API = "https://localhost:44319/api/reserveorder";

export function getOrdersByUserId(userId) {
    return axios.get(`https://localhost:44319/api/reserveorder/user/${userId}`);
}

export function createOrder(orderData){
    console.log("OrderData: ", orderData);
    return axios.post(ORDER_API, {
        InventoryId: orderData.inventoryId,
        StatusId: orderData.statusId,
        OrderDate: orderData.date,
        Quantity: orderData.quantity,
        UserId: orderData.userId
      });
}


