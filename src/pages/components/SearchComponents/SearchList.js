//To render the list of medicines(which has been searched) 
//using the brandList array on clicking the submit button

import React, { useState, useEffect } from 'react';
import SelectedMedicine from './SelectedMedicine';
import {useSelector} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            margin: 'auto auto',
        },
    }));

function SearchList(props){
    const classes = useStyles();

    const [selectedMedicine, setSelectedMedicine] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    let searchedMedicine = [];
    searchedMedicine = useSelector(state => state.searchedMedicine.searchMedicines);

    let brandNames = searchedMedicine.map(function(item){
        return item['brandName'];
    });
    brandNames =  [...new Set(brandNames)];

    useEffect(()=>{
        console.log("Brand Names: ", brandNames);
    }, [brandNames])

    useEffect(() => {
        console.log("Searched Medicine: ", searchedMedicine);
    },[searchedMedicine])

    const onClickHandler = (event,item) => {
        console.log(event,item);

        let result = searchedMedicine.filter(medicine => {
            return medicine.brandName === item ;
        });

        console.log("Result: ", result);
        setSelectedMedicine(result);
    }    

    let list;;
    list = brandNames.map((item , i) => {
        //Mapping each list item in Brand Names as a different medicine
        return (     
                <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} key = {i}>
                    {console.log("item: ", i)}
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick = {(e)=> {onClickHandler(e,item)}}
                    >
                        <h3>{item}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SelectedMedicine selectedMedicine = {selectedMedicine}/>
                    </AccordionDetails>
                </Accordion>
        );
    });

    return (
        <div className={classes.root}>
            {list}
        </div>
    );
}

export default SearchList ;
