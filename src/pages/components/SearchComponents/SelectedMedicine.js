//To render each medicines further types
import React, {useEffect} from 'react';
import { Divider } from '@material-ui/core';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto auto',
    }
}));

function SelectedMedicine(props){
    const classes = useStyles();

    useEffect(()=>{
       console.log("Selected: ", props.selectedMedicine); 
    },[]);
    
    const {selectedMedicine} = props;
    //Selecting the unique dosage form
    let dosageFormList = [...new Set(selectedMedicine.map(item => item.dosageFormName))];
    console.log("Dosage Form: ", dosageFormList);
    let description;
    description = dosageFormList.map((form, i) =>{
        //Segments for different dosage forms
        return (
            <div key = {i}>
                <h3>{form}</h3>
                <Divider />
                {selectedMedicine.map((medicine, j)=>{
                    if(medicine.dosageFormName === form){
                        return(
                            <a key = {medicine.id} href = {`location?id=${medicine.id}`}>
                                <Row className = "dosage-form-segment">
                                    <Col  lg = {6}  md = {6} xs = {2}>
                                        <p>{medicine.packing}</p>
                                    </Col>
                                    <Col lg = {6} md = {6} xs={10}>
                                    {medicine.medicineGenerics.map((item, k)=>{
                                        return (
                                            <p>{item.name} : {item.strength}</p>
                                        );
                                    })}
                                    </Col>
                                </Row>
                            </a>
                        );
                    }
                })}
            </div>
        )
    });

    return(
        <div className = {classes.root}>
            {description}
        </div>
    );    
}

export default SelectedMedicine;

