import React, {useState, useEffect} from 'react';
import { Container, Radio, Form, Icon } from 'semantic-ui-react';
import {connect, useSelector} from "react-redux";
import axios from 'axios';
// import Autocomplete from 'react-autocomplete';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import * as searchMedicine from "../store/ducks/searchMedicine.duck";
import * as medicine from "../store/ducks/medicine.duck";
import medicineList from '../data/medicineList';
import brandList from '../data/brandList';
import SearchList from './components/SearchComponents/SearchList';
import '../css/styles.css';

function Search(props){

    const [name, setName] = useState("");
    const [type, setType] = useState('brand');
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('api/search/brand');
    const [list, setList] = useState([]);
    const [fetchedData, setFetchedData] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [genericList, setGenericList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    let medicineData = [];
    medicineData = useSelector(state => state.medicine.medicines);

    useEffect(()=> {
        console.log("Medicine Data: ", medicineData);
        console.log("Brand List: ", brandList);
        console.log("Generic List: ", genericList);
    }, [medicineData,brandList, genericList])

    useEffect(()=> {
        axios.get('https://localhost:44319/api/brand')
        .then(res => res.data)
        .then(data => {
            console.log("Brands: ", data);
            setBrandList(data);
        });
   
        axios.get('https://localhost:44319/api/generic')
        .then(res => res.data)
        .then(data => {
            console.log("Generics: ", data);
            setGenericList(data);
        });
    },[]);

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

    // const myChangeHandler = (event) => {
    //     let name = event.target.name;
    //     let value = event.target.value;
    //     setName(value);
    // }

    const onRadioButtonChangeHandler = (event, v) => {
        console.log(v);
        let value = v.value;
        setType(value);
        setName("");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Final Name Value: ", name);
        console.log("Type: ", type);
        const submittedData = {
            name: name,
            type: type
        };
        console.log("Submitted Data: ", submittedData);
       setIsSubmitted(true);
    }
    
    return (
        <div className = "search-page">
            <Container>
                <div className = "form">
                    <Form onSubmit={onSubmit}>
                        <Form.Field>
                            <div className ="ui action input">
                                {/* <input 
                                    type="text"
                                    id="searchDrug"
                                    name= "name"
                                    placeholder='Search Medicine'
                                    list="drugNameSuggestions"
                                    autoComplete="off"
                                    // onChange={myChangeHandler}
                                    // onKeyUp={onKeyUpHandler}
                                    value={name}
                                /> */}
                                <Autocomplete
                                    className = "search-autocomplete"
                                    id="combo-box-demo"
                                    value={name}
                                    onChange={(event, newValue) => {
                                        setName(newValue);
                                    }}
                                    options={type === 'brand'? brandList : genericList}                                
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Search Medicine" variant="outlined" />}
                                />
                                <button className ="ui button" type='submit'>
                                    <Icon name="search" size="large"></Icon>
                                </button>
                                {/* <Button variant="contained" type = "submit">
                                    <Icon name="search" size="large"></Icon>
                                    Search
                                </Button> */}
                            </div>
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
                {/* {this.state.isSubmitted && <SearchList medicineList = {medicineList} brandList= {brandList}/>} */}
                {/* {this.state.isSubmitted && <SearchList medicineList = {this.state.fetchedData} brandList= {this.state.brandList}/>} */}
            </Container>
        </div>
    )
}

export default connect(
    null,
    {...searchMedicine.actions, ...medicine.actions}
)(Search) ;