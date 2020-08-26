import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as medicine from "../store/ducks/medicine.duck";


function HomePage(props) {

    useEffect(()=>{
        props.readMedicineAction();
    })    

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default connect(
    null,
    medicine.actions
)(HomePage);
