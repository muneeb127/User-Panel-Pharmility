import axios from "axios";

export function getRetailers(medicineId){
    // console.log(medicineId);
    return axios.get(`https://localhost:44319/api/inventory/medicine/${medicineId}`)
}