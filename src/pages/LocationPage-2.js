import React, {useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import Container from '@material-ui/core/Container';
import {Row, Col} from 'react-bootstrap';
import { Card } from 'semantic-ui-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

import '../css/styles.css';
import queryString from 'query-string';

import * as medicine from "../store/ducks/medicine.duck";
import * as retailerInventory from "../store/ducks/retailerInventory.duck";

//Importing Components
import MapContainer from './components/LocationComponents/Map';
import AlternateMedicines from './components/LocationComponents/AlternateMedicines';
import Pharmacies from "./components/LocationComponents/Pharmacies";

function LocationPage(props){

    const [selectedMedicine, setSelectedMedicine] = useState([]);
    // const [alternateMedicines, setAlternateMedicines] = useState([]);

    //Fetching all medicines from redux store\
    let medicineData = [];
    medicineData = useSelector(state => state.medicine.medicines);

    // let alternateMedicinesList = [];
    // alternateMedicinesList = useSelector(state => state.medicine.alternateMedicines);

    let retailers = [];
    retailers = useSelector(state => state.retailer.list);

    useEffect(()=>{
        //Render the component again
        // setAlternateMedicines(alternateMedicinesList);
        setSelectedMedicine(selectedMedicine);

    // }, [medicineData, alternateMedicinesList, retailers]);
    }, [medicineData,  retailers]);

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
        // setAlternateMedicines(alternateMedicinesList);
    }, []);  

    // const {selectedMedicine} = this.state;
    return (
        <div className = "location-page">
            <div className = "main-div">
                <MapContainer retailers = {retailers}/>
            </div>
            <Container maxWidth = "lg" className = "med-section">
                <Row>
                    <Col className = "custom-card" xs={12} md={4} lg={4}>
                        <Card>
                            <Card.Content>
                                <FontAwesomeIcon className = "icon-right" size = "4x" icon={faPills} />
                                <Card.Header>{selectedMedicine.brandName}</Card.Header>
                                <Card.Meta>{selectedMedicine.manufacturerName}</Card.Meta>
                                <Card.Description  style = {{textTransform : "Capitalize"}}>
                                    Dosage Form: <strong>{selectedMedicine.dosageForm}</strong> <br></br>
                                    Packaging: <strong>{selectedMedicine.packing}</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Card.Description>
                                    Donot chew or crush, swollow whole<br></br>
                                    For external use only<br></br>
                                    For oral use only<br></br>
                                    Keep medicine out of children's reach<br></br>
                                    Call your doctor for medical advice about side effects
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Col>
                    <Col className = "custom-card" xs={12} md={4} lg={4}>
                        <AlternateMedicines />
                        {/* <AlternateMedicines alternateMedicines = {alternateMedicines}/> */}
                    </Col>
                    <Col className = "custom-card" xs={12} md={4} lg={4}>
                        <Pharmacies />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default connect(
    null,
    {...medicine.actions, ...retailerInventory.actions}
)(LocationPage);