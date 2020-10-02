//Displaying the list of pharmacies on the location page
import React, {useState, useEffect} from 'react';
import { List, Loader } from 'semantic-ui-react';
import {connect, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import * as retailerInventory from "../../../store/ducks/retailerInventory.duck";
import CheckOutModal from '../Checkout/CheckOutModal';

function Pharmacies(props){    
    let history = useHistory();

    const [loading, setLoading] = useState(true);
    const [retailersList, setRetailersList] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState({});
    
    // const [currentLocation, setCurrentLocation] = useState(props.currentLocation); 

    // useEffect(()=>{
    //     calculateDistances();
    //     // console.log(props);
    //     // console.log("Retailers: ", retailers);
    // }, [])

    let retailers = [];
    retailers = useSelector(state => state.retailer.list);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(()=> {
        calculateDistances();
        console.log("Retailers: ", retailers);
        console.log("isAuthenticated: ", isAuthenticated);
    }, [retailers]);

    // componentDidUpdate(prevProps) {
    //     if(!(this.props.currentLocation == prevProps.currentLocation)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    //     {
    //       this.calculateDistances();
    //     }
    // }

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
        const {currentLocation, google} = props;

        let latlngs = retailers.map((item)=>{
            return {lat: item.latitude, lng: item.longitude}; 
        }); 

        let destinations = latlngs.map((item)=>{
            return new google.maps.LatLng(item.lat, item.lng);
        });

        // console.log("destinations ", destinations);

        let origin = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);
        let service = new google.maps.DistanceMatrixService();

        // console.log("service ", service);
        // console.log("Origin: ", origin);

        service.getDistanceMatrix({
            origins: [origin],
            destinations: destinations,
            travelMode: 'DRIVING'
        }, (res) => {
            // console.log("response ", res);
            let list = retailers.map((item, index)=>{
                // console.log(item);
                // return(
                //     <List.Item key = {item.RetailerId}>
                //         <List.Icon name='marker' size='large' verticalAlign='middle' />
                //         <List.Content>
                //             <List.Header as='a'>{item.retailerName}</List.Header>
                //             {/* <List.Description as='a'>{res.rows[0].elements[index].distance.text}</List.Description>
                //             <List.Description as='a'>{res.rows[0].elements[index].duration.text}</List.Description> */}
                //         </List.Content>
                //     </List.Item>
                // )
                if(item.quantity > 0 ){ 
                    return (
                        <List.Item key = {index}>
                            <List.Icon name='marker' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' onClick = {() => onPharmacyClick(item)}>{item.retailerName}</List.Header>
                                <List.Description>Medicine In Stock</List.Description>
                                {/* <List.Description as='a'>{res.rows[0].elements[index].distance.text}</List.Description>
                                <List.Description as='a'>{res.rows[0].elements[index].duration.text}</List.Description> */}
                            </List.Content>
                        </List.Item>
                    );
                }
                else{
                    return (
                        <List.Item key = {index}>
                            <List.Icon name='marker' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>{item.retailerName}</List.Header>
                                <List.Description>Medicine Out of Stock</List.Description>
                                {/* <List.Description as='a'>{res.rows[0].elements[index].distance.text}</List.Description>
                                <List.Description as='a'>{res.rows[0].elements[index].duration.text}</List.Description> */}
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
            <List divided relaxed>
                <h1>Pharmacies</h1>
                {/* {this.state.list} */}
                {loading ? <Loader size='massive' active inline='centered' /> : retailersList}
            </List>
            {isSelected && <CheckOutModal inventoryData = {selectedPharmacy} disableModal = {disableModal}/>}
            {/* {isSelected && isAuthenticated ? <CheckOutModal data = {selectedPharmacy} disableModal = {disableModal}/> : history.push('/login') */}
        </>
    )
}

export default connect(
    null,
    retailerInventory.actions
)(Pharmacies);

