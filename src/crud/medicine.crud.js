import axios from "axios";

const GET_MEDICINES = "https://localhost:44319/api/medicine";

export function getMedicines() {
    return axios.get(GET_MEDICINES);
}

export function getSearchedMedicine(medicineData){
    // console.log(medicineData);
    if(medicineData.type === "generic"){
        const data = axios.get(`https://localhost:44319/api/medicine/searchbygeneric/${medicineData.name.name}`);
        // console.log(data);
        return data;
    }
    else{
        const data = axios.get(`https://localhost:44319/api/medicine/searchbybrand/${medicineData.name.name}`);
        // console.log(data);
        return data;
    }
}

export function getAlternateMedicines(medicineId){
    // console.log(medicineId);
    return axios.get(`https://localhost:44319/api/medicine/alternateId/${medicineId}`)
}