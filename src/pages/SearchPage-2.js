import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { Radio, Form, Icon } from 'semantic-ui-react';
import {connect, useSelector} from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

// import Autocomplete from 'react-autocomplete';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import * as searchMedicine from "../store/ducks/searchMedicine.duck";
import * as medicine from "../store/ducks/medicine.duck";
import SearchList from './components/SearchComponents/SearchList';
import '../css/styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

}));

function Search(props){

    const methods = useForm({
        validateCriteriaMode: "all"
    });
    const { handleSubmit, control, errors } = methods;

    const [name, setName] = useState("");
    const [type, setType] = useState('brand');
    // const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [genericList, setGenericList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const classes = useStyles();


    let searchedMedicine;
    searchedMedicine = useSelector(state => state.searchedMedicine.searchMedicines);

    useEffect(()=> {
        console.log("Searched Medicine: ", searchedMedicine);
        
        if(searchedMedicine.length > 0){
            setSearchList(searchedMedicine);
            setIsSubmitted(true);
        }

    }, [searchedMedicine]);

    useEffect(()=> {
        console.log(props);
        axios.get('https://localhost:44319/api/brand')
        .then(res => res.data)
        .then(data => {
            setBrandList(data);
        });
   
        axios.get('https://localhost:44319/api/generic')
        .then(res => res.data)
        .then(data => {
            setGenericList(data);
        });

        setIsSubmitted(false);
        setSearchList([]);
    },[]);


    const onRadioButtonChangeHandler = (event, v) => {
        console.log(v);
        let value = v.value;
        setType(value);
        setName("");
        setIsSubmitted(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const submittedData = {
            name: name,
            type: type
        };
        props.readSearchedMedicineAction(submittedData);
        console.log("Submitted Data: ", submittedData);
        setIsSubmitted(false);
    }
    
    return (
        <div className = "search-page">
            <div className = "search-layout">
                <Container component="main" maxWidth="xs" className = "search-container">
                    <div className = {classes.paper}>
                        <h1>Pharmility</h1>
                        <h4>Find Medicines Nearby</h4>
                        {/* <Form onSubmit = {handleSubmit(onSubmit)}> */}
                        <Form onSubmit={onSubmit} >
                            <Form.Field>
                                <div className ="ui action input error">
                                    <Autocomplete
                                        className = "search-autocomplete"
                                        id="combo-box-demo"
                                        value={name}
                                        onChange={(event, newValue) => {
                                            setName(newValue);
                                        }}
                                        options={type === 'brand'? brandList : genericList}                                
                                        getOptionLabel={(option) => option.name}
                                        style={{ width: 500 }}
                                        renderInput={(params) => <TextField {...params} label="Search Medicine" variant="outlined" />}
                                    />
                                    <button className ="ui button" type='submit'>
                                        <Icon name="search" size="large"></Icon>
                                    </button>

                                    {/* <Controller 
                                        as={<Autocomplete
                                            className = "search-autocomplete"
                                            id="combo-box-demo"
                                            value={name}
                                            onChange={(event, newValue) => {
                                                setName(newValue);
                                            }}
                                            required
                                            options={type === 'brand'? brandList : genericList}                                
                                            getOptionLabel={(option) => option.name}
                                            style={{ width: 500 }}
                                            renderInput={(params) => <TextField {...params} label="Search Medicine" variant="outlined" />}
                                            error={errors.email}
                                            
                                        />} 
                                        name="search" 
                                        control={control} 
                                        rules={{required: 'Search is required'}}
                                    />
                                    <button className ="ui button" type='submit'>
                                        <Icon name="search" size="large"></Icon>
                                    </button> */}
                                </div>
                                {/* <p>
                                    <ErrorMessage errors={errors} name="search">
                                        {({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <p key={type}>{message}</p>
                                        ))
                                        }
                                    </ErrorMessage>
                                </p> */}
                            </Form.Field>
                            
                            <Form.Field>
                                <Radio
                                    label='Brand'
                                    name='type'
                                    value='brand'
                                    checked={type === 'brand'}
                                    onChange={onRadioButtonChangeHandler}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Generic'
                                    name='type'
                                    value='generic'
                                    checked={type === 'generic'}
                                    onChange={onRadioButtonChangeHandler}

                                />
                            </Form.Field>
                        </Form>
                    </div>
                </Container>
            </div>
            <Container className = "medicine-list" maxWidth="sm">
                {isSubmitted && <SearchList/>}
            </Container>
        </div>
    )
}

export default connect(
    null,
    {...searchMedicine.actions, ...medicine.actions}
)(Search) ;