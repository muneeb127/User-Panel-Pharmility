import React from 'react';
import {connect} from 'react-redux';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';

import {Row, Col} from 'react-bootstrap';
import Pharmacies from '../LocationComponents/Pharmacies';

import * as map from "../../../store/ducks/map.duck";


class MapContainer extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            center: {
                lat: 24.9298,
                lng: 67.1148
            },
            address: '',
            place: '',
        } 
    }

    componentDidMount(){
        console.log("Map Props: ", this.props);
    }

    onPlaceSelected = ( place ) => {
        const address = place.formatted_address,
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        this.setState({
            address: ( address ) ? address : '',
            center: {
                lat: latValue,
                lng: lngValue
            }
        })

        this.props.fulfillLocationDataAction({
            lat: latValue,
            lng: lngValue
        });
    }  

    render(){
        const {center} = this.state;
        const {retailers} = this.props;

        let map;
        map = (
            <>
                {/* For Auto complete Search Box */}
                <Autocomplete
                    className = "autocomplete"
                    onPlaceSelected={ this.onPlaceSelected }
                    types={['establishment']}
                    componentRestrictions={{country: "pk"}}
                />

                <Map 
                    google = {this.props.google}
                    style = {{height: "70%"}}
                    initialCenter = {this.state.center}
                    center = {this.state.center}
                    zoom = {12}
                    className = "map"
                >
                {/* Displaying the pharmacies */}
                {
                    retailers.map((item)=> {
                        return(
                            <Marker
                                key = {item.retailerId}
                                position={{lat: item.latitude, lng: item.longitude}}
                                // icon={icon} 
                                icon = {{
                                    url: "https://library.kissclipart.com/20180829/se/kissclipart-pharmacy-shop-vector-transpirant-clipart-pharmacy-0789296e6bec205b.png",
                                    anchor: new window.google.maps.Point(32,32),
                                    scaledSize: new window.google.maps.Size(50,50)
                                }}
                            />
                        )
                    })
                }
                <Marker 
                    onClick={this.onMarkerClick}
                    position = {{lat: center.lat, lng: center.lng}}
                    name={'Current location'} 
                />
                </Map>
            </>
        )
        return(
            <div className = "map-container">
                {map}
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyC-0ff6dw9PJbMb-28OlWi5Oz9igGeATcM"
    // apiKey: "AIzaSyDUtGLl70yxAlVHl08pOvTeTRyF5_vrglc"
})(connect(
    null,
    map.actions
)(MapContainer));