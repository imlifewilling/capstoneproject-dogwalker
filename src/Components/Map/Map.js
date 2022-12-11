import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer
} from "@react-google-maps/api";
import { Tune } from '@mui/icons-material';
import Searchbar from './Searchbar'
// import Places from "./places";
// import Distance from "./distance";

// let LatLngLiteral = google.maps.LatLngLiteral;
// let DirectionsResult = google.maps.DirectionsResult;
// let MapOptions = google.maps.MapOptions;

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
};

const generateHouses = ({position: LatLngLiteral}) => {
    const _houses = [];
    for (let i = 0; i < 100; i++) {
        const direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
        });
    }
    return _houses;
};

const Map = () => {
    const [position, setPosition] = useState(//set up the map center 
        {lat: 40.789142, lng: -73.13496099999999}
    ) 
    // console.log(position)
    const mapRef = useRef(GoogleMap);
    // const center = useMemo(()=>({lat: 40.789142, lng: -73.13496099999999}), []) // useMemo returns a memorized value, need to change to the position of login user here
    //setup the map options
    const options = useMemo(
        (GoogleMap) => ({
            disableDefaultUI: true,
            clickableIcons: false,
            styles: [ //turn off original markers
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                          { visibility: "off" }
                    ]
                }
            ]
        }), 
    [])

    const onLoad = useCallback(() => (mapRef.current = GoogleMap), []) //the Map here is referred to the Map Compnent

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCOsnnYOPmcaO-dAFsdqxofdQdUzp7JSiE',
        libraries: ['places']
    })

    if(!isLoaded) return <div>Loadingg...</div>

    return (
        <div className = 'container'>
            <div className = 'controls'>
                <Searchbar 
                    setPosition = {
                        (position) => {
                            setPosition(position);
                            mapRef.panTo(position);
                        }
                    }
                />
            </div>
            
            <div className = 'map'>
                <GoogleMap
                    zoom = {10}
                    center = {position}
                    options = {options}
                    onLoad = {onLoad}
                    mapContainerClassName = 'map-container'
                > 
                </GoogleMap>
            </div>
        </div>
    )
};

export default Map;




