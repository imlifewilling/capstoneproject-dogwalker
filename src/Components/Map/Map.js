import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux'
import { useState, useMemo, useCallback, useRef } from "react";
import { Link } from 'react-router-dom';
import { useGeolocated } from "react-geolocated";
import Geocode from "react-geocode";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer
} from "@react-google-maps/api";
import { Tune } from '@mui/icons-material';
import Searchbar from './Searchbar'

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
    fillOpacity: 0.1,
    strokeColor: "#495579",
    fillColor: "#495579",
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.1,
    strokeColor: "#5F8D4E",
    fillColor: "#5F8D4E",
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.1,
    strokeColor: "#DC3535",
    fillColor: "#DC3535",
};

const Map = ({servicelist}) => {
    const { auth } = useSelector(state => state);
    const { users } = useSelector(state=>state)
    const [ownerposition, setOwnerPosition] = useState() //state to store the ownerposition
    const [walkerpositions, setWalkerPositions] = useState([]) //an empty list to store the walkers' positions
 
    const { coords } = //get the address from the IP
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    //set the center position as IP location if no user login
    useEffect(() => {
        if(!auth.address && coords){
            setOwnerPosition({
                lat: coords.latitude,
                lng: coords.longitude
            })
        }
    }, [coords, auth]) 

    //if owner login, set the center to owner position
    Geocode.setApiKey("AIzaSyCOsnnYOPmcaO-dAFsdqxofdQdUzp7JSiE");
    useEffect(() => {
        if(auth.address){//get the lat and lng of login user
            Geocode.fromAddress(auth.address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setOwnerPosition({lat, lng});
            },
            (error) => {
              console.error(error);
            }
          );
        }   
    }, [auth])

    //get the walkers' position around ownerposition
    useEffect(() => {
        const memo = new Set()
        servicelist.filter(
            service => {
                if(!memo.has(service.userId)){
                    memo.add(service.userId)
                    return service
                }
            }
        ).map(
            service => {
                let walker = users.find(
                    user => user.id === service.userId
                )
                return walker.address
            }
        ).map(
            walkerposition => {
                Geocode.fromAddress(walkerposition).then(
                    (response) => {
                        const { lat, lng } = response.results[0].geometry.location;
                        setWalkerPositions(walkerpositions => [...walkerpositions, {lat, lng}]);
                    },
                    (error) => {
                        console.error(error);
                    }
                    );
            }
        )
        
    }, [ownerposition])

    console.log(walkerpositions)

    const mapRef = useRef(GoogleMap);
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

    // const routeChange = () => {

    // }

    if(!isLoaded) return <div>Loadingg...</div>

    return (
        <div className = 'container'>
            <div className = 'controls'>
                <Searchbar 
                    setPosition = {
                        (position) => {
                            setOwnerPosition(position);
                        }
                    }
                />
            </div>
            
            <div className = 'map'>
                <GoogleMap
                    zoom = {10}
                    center = {ownerposition}
                    options = {options}
                    onLoad = {onLoad}
                    mapContainerClassName = 'map-container'
                > 
                    {ownerposition && 
                    <>
                        <Marker 
                            position = {ownerposition} 
                        />

                        <MarkerClusterer
                            averageCenter 
                            enableRetinaIcons 
                        >
                            {(clusterer) =>
                            walkerpositions.map((walkerposition, idx) => (
                                <Marker
                                    key = {idx}
                                    enableRetinaIcons
                                    position = {walkerposition}
                                    clusterer = {clusterer}
                                    icon = {
                                        {url: "../../static/images/googleicon.png",
                                        scaledSize: new google.maps.Size(50, 50)}
                                    } 
                                    // onClick = {routeChange}
                                />
                            ))
                            }
                        </MarkerClusterer>

                        <Circle 
                            center = {ownerposition}
                            radius = {10000}
                            options = {closeOptions}
                        />
                        <Circle 
                            center = {ownerposition}
                            radius = {20000}
                            options = {middleOptions}
                        />
                        <Circle 
                            center = {ownerposition}
                            radius = {30000}
                            options = {farOptions}
                        />
                    </>
                    }
                </GoogleMap>
            </div>
        </div>
    )
};

export default Map;




