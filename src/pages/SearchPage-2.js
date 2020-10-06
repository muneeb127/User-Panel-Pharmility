import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { Radio, Form, Icon} from 'semantic-ui-react';
import {connect, useSelector} from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

// import Autocomplete from 'react-autocomplete';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClinicMedical} from '@fortawesome/free-solid-svg-icons';
import { faSearchPlus} from '@fortawesome/free-solid-svg-icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

import * as searchMedicine from "../store/ducks/searchMedicine.duck";
import * as medicine from "../store/ducks/medicine.duck";
import SearchList from './components/SearchComponents/SearchList';
import '../css/styles.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    media: {
        height: 140,
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
        props.readMedicineAction();
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
            <Container className = "medicine-badges" maxWidth = "lg">
                <Row>
                    <Col className = "custom-card" xs={12} md={4} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia>
                                    <FontAwesomeIcon size = "6x" icon={faSearchPlus} />
                                </CardMedia>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Search Medicines
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    You can now search for any kind of medicine without having to go through the hectic
                                    process of finding it across different stores
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Col>
                    <Col className = "custom-card" xs={12} md={4} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia>
                                    <FontAwesomeIcon size = "6x" icon={faClinicMedical} />
                                </CardMedia>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Locate Pharmacies
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Locate the nearest pharmacy where your needed medicine is available, reserve it and pick it
                                    at your own ease
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Col>
                    <Col className = "custom-card" xs={12} md={4} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia>
                                    <FontAwesomeIcon size = "6x" icon={faQrcode} />
                                </CardMedia>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Validate Supply Chain
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Authenticate your medicine by scanning the qr-code on the packaging to validate the complete 
                                    supply-chain through which the medicine reached you
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default connect(
    null,
    {...searchMedicine.actions, ...medicine.actions}
)(Search) ;