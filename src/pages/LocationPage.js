import React, {Component} from 'react';
import { Container, List } from 'semantic-ui-react';
import {Row, Col} from 'react-bootstrap';
import '../css/styles.css';
import queryString from 'query-string';

//Importing Components
import MapContainer from './components/LocationComponents/Map';
import AlternateMedicines from './components/LocationComponents/AlternateMedicines';

//Importing data
import medicineList from '../data/medicineList';
import pharmacyList from '../data/pharmacyList';
import alternateMedicine from '../data/alternateMedicine';


class LocationPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedMedicine: {},
            alternateMedicines: [],
            pharmacies: [],
        }
    }

    componentDidMount(){
        //Fetching medicine Id from URL and using it to find the medicine
        let params = queryString.parse(this.props.location.search)
        // console.log("Param: ", params);
        const id = params.id;
        // console.log("ID: ", id);
        let selectedMedicine;
        selectedMedicine = medicineList.find(medicine => medicine.id == id);
        this.setState({selectedMedicine: selectedMedicine});

        //Fetching alternate medicines from backend using the id
        this.setState({alternateMedicines: alternateMedicine});

        //Fetching Pharmacies where medicine is available
        this.setState({pharmacies: pharmacyList});
    }   

    
    render(){
        const {selectedMedicine} = this.state;
        return (
            <div className = "location-page">
                <Container>
                    <Row className = "first-row">
                        <Col className = "selected-med" lg = {8} md = {8} sm={12}>
                                <h1>{selectedMedicine.name}</h1>
                                <h3 style = {{marginTop:0}}>{selectedMedicine.manufacturer}</h3>
                                <h3 style = {{textTransform : "Capitalize"}}>Dosage: {selectedMedicine.dosage}</h3>
                                <h3 style = {{textTransform : "Capitalize"}}>Packaging: {selectedMedicine.packaging}</h3>
                                <h3 style = {{textTransform : "Capitalize"}}>Price: {selectedMedicine.price}</h3>
                        </Col>

                        <Col className = "alternate-med" lg = {4} md = {4} sm={12}>
                            <AlternateMedicines alternateMedicines = {this.state.alternateMedicines}/>
                        </Col>
                    </Row>
                    <MapContainer/>
                </Container>
            </div>
        );
    }
}

export default LocationPage;