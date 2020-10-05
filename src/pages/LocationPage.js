import React, {useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import { Container} from 'semantic-ui-react';
import {Row, Col} from 'react-bootstrap';
import '../css/styles.css';
import queryString from 'query-string';

import * as medicine from "../store/ducks/medicine.duck";
import * as retailerInventory from "../store/ducks/retailerInventory.duck";

//Importing Components
import MapContainer from './components/LocationComponents/Map';
import AlternateMedicines from './components/LocationComponents/AlternateMedicines';

function LocationPage(props){

    const [selectedMedicine, setSelectedMedicine] = useState([]);
    const [alternateMedicines, setAlternateMedicines] = useState([]);

    //Fetching all medicines from redux store\
    let medicineData = [];
    medicineData = useSelector(state => state.medicine.medicines);

    let alternateMedicinesList = [];
    alternateMedicinesList = useSelector(state => state.medicine.alternateMedicines);

    let retailers = [];
    retailers = useSelector(state => state.retailer.list);

    useEffect(()=>{
        //Render the component again
        setAlternateMedicines(alternateMedicinesList);
        setSelectedMedicine(selectedMedicine);
        // console.log("Retailers: ", retailers);

    }, [medicineData, alternateMedicinesList, retailers]);

    useEffect(()=>{
        //Fetching medicine Id from URL and using it to find the medicine
        let params = queryString.parse(props.location.search);
        // console.log("Param: ", params);
        const id = params.id;
        console.log("ID: ", id);

        props.readAlternateMedicineAction(id);
        props.readRetailerAction(id);

        let selectedMedicine;
        selectedMedicine = medicineData.find(medicine => medicine.id == id);
        setSelectedMedicine(selectedMedicine);
        // console.log(selectedMedicine);
        setAlternateMedicines(alternateMedicinesList);
    }, []);  

    // const {selectedMedicine} = this.state;
    return (
        <div className = "location-page">
            <h1>Location Page</h1>
            <Container>
                <Row className = "first-row">
                    <Col className = "selected-med" lg = {8} md = {8} sm={12}>
                            <h1>{selectedMedicine.brandName}</h1>
                            <h3 style = {{marginTop:0}}>{selectedMedicine.manufacturerName}</h3>
                            <h3 style = {{textTransform : "Capitalize"}}>Dosage: {selectedMedicine.dosageForm}</h3>
                            <h3 style = {{textTransform : "Capitalize"}}>Packaging: {selectedMedicine.packing}</h3>
                            {/* <h3 style = {{textTransform : "Capitalize"}}>Price: {selectedMedicine.price}</h3> */}
                    </Col>

                    <Col className = "alternate-med" lg = {4} md = {4} sm={12}>
                        <AlternateMedicines alternateMedicines = {alternateMedicines}/>
                    </Col>
                </Row>
                <MapContainer retailers = {retailers}/>
            </Container>
        </div>
    );
}

export default connect(
    null,
    {...medicine.actions, ...retailerInventory.actions}
)(LocationPage);