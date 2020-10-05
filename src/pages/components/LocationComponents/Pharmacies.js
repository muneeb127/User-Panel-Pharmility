//Displaying the list of pharmacies on the location page
import React, {useState, useEffect} from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import {connect, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import * as retailerInventory from "../../../store/ducks/retailerInventory.duck";
import CheckOutModal from '../Checkout/CheckOutModal';

import { Loader, Card, List } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import Chip from '@material-ui/core/Chip';


function Pharmacies(props){    
    let history = useHistory();

    const [loading, setLoading] = useState(true);
    const [retailersList, setRetailersList] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState({});
    

    useEffect(()=>{
        // calculateDistances();
        console.log("Pharmacy Props: ", props);
        console.log("Retailers: ", retailers);
    }, [])

    let retailers = [];
    retailers = useSelector(state => state.retailer.list);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    let currentLocation = {};
    currentLocation = useSelector(state => state.map.location);
    // console.log("Current Location: ", currentLocation);

    useEffect(()=> {
        calculateDistances();
        // console.log("Retailers: ", retailers);
        // console.log("isAuthenticated: ", isAuthenticated);
        // console.log("Current Location: ", currentLocation);
    }, [retailers, currentLocation]);

    const enableModal = () => {
        setIsSelected(true);
    }

    const disableModal = () => {
        setIsSelected(false);
    }

    const onPharmacyClick = (target) => {
        console.log("Item: ", target );
        setSelectedPharmacy(target);

        if (isAuthenticated == false){
            history.push('/login');
        }
        enableModal();
    }

    const calculateDistances = () => {
        const {google} = props;

        let latlngs = retailers.map((item)=>{
            return {lat: item.latitude, lng: item.longitude}; 
        }); 

        let destinations = latlngs.map((item)=>{
            return new google.maps.LatLng(item.lat, item.lng);
        });

        console.log("destinations ", destinations);

        let origin = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);
        let service = new google.maps.DistanceMatrixService();

        console.log("service ", service);
        console.log("Origin: ", origin);

        service.getDistanceMatrix({
            origins: [origin],
            destinations: destinations,
            travelMode: 'DRIVING'
        }, (res) => {
            let list = retailers.map((item, index)=>{
                if(item.quantity > 0 ){ 
                    return (
                        <List.Item key = {index}>
                            <List.Content floated='right'>
                                <Chip
                                    label="In Stock"
                                    color="primary"
                                    variant="outlined"
                                />
                            </List.Content>
                            <List.Icon name='marker' size='big' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' onClick = {() => onPharmacyClick(item)}>{item.retailerName}</List.Header>
                                <List.Description as='a'>{res.rows[0].elements[index].distance.text}</List.Description>
                                <List.Description as='a'>{res.rows[0].elements[index].duration.text}</List.Description>
                            </List.Content>
                        </List.Item>
                    );
                }
                else{
                    return (
                        <List.Item key = {index}>
                            <List.Content floated='right'>
                                <Chip
                                    label="Our of Stock"
                                    color="secondary"
                                    variant="outlined"
                                />
                            </List.Content>
                            <List.Icon name='marker' size='big' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>{item.retailerName}</List.Header>
                                <List.Description as='a'>{res.rows[0].elements[index].distance.text}</List.Description>
                                <List.Description as='a'>{res.rows[0].elements[index].duration.text}</List.Description>
                            </List.Content>
                        </List.Item>
                    );
                }
            });
            // console.log("List: ", list);
            setRetailersList(list);
            setLoading(false);
            // this.setState({list: list, loading: false});
        });
    }
    
    return(
        <>
            <Card>
                <Card.Content>
                    <FontAwesomeIcon className = "icon-right" size = "4x" icon={faHospital} />
                    <Card.Header>Pharmacies</Card.Header>
                </Card.Content>
                <Card.Content extra className = "overflow-list">
                    <List divided relaxed>
                        {loading ? <Loader size='massive' active inline='centered' /> : retailersList}
                    </List>
                </Card.Content>
            </Card>
            {isSelected && <CheckOutModal inventoryData = {selectedPharmacy} disableModal = {disableModal}/>}
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyC-0ff6dw9PJbMb-28OlWi5Oz9igGeATcM"
})(connect(
    null,
    retailerInventory.actions
)(Pharmacies));
