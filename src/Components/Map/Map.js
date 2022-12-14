import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux'
import { useState, useMemo, useCallback, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useGeolocated } from "react-geolocated";
import Geocode from "react-geocode";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer
} from "@react-google-maps/api";
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

const libraries = ['places']

const Map = ({servicelist}) => {
    const { auth } = useSelector(state => state);
    const { users } = useSelector(state=>state)
    const navigate = useNavigate()
    const [ownerposition, setOwnerPosition] = useState() //state to store the ownerposition
    const [walkers, setWalkers] = useState([]) //an empty list to store the walkers' positions
 
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
    Geocode.setApiKey(process.env.GOOGLE_MAPS_API_KEY);
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
        if(servicelist.length > 0){
            let walkerslist = [];
            const memo = new Set();
            if(users.length > 0){
                servicelist.forEach(
                    service => {
                        const walker = users.find(user => user.id === service.userId)
                        if(!memo.has(walker)){
                            walkerslist.push(walker);
                            memo.add(walker);
                        }
                    }
                )
            }
            if(walkerslist.length > 0){
                let walkerslocation = [];
                walkerslist.map(
                    walker => {
                        if(walker.latlng.length !== 0) {
                            walkerslocation.push({id: walker.id, address: {lat: walker.latlng[0]*1, lng: walker.latlng[1]*1}})
                        }
                        if(walker.address){
                            Geocode.fromAddress(walker.address).then(
                            (response) => {
                                const { lat, lng } = response.results[0].geometry.location;
                                walkerslocation.push({id: walker.id, address: {lat, lng}});
                            },
                            (error) => {
                                console.error(error);
                            }
                            );
                        }
                    }
                )
                setWalkers(walkerslocation)
            }
            
        }
    }, [servicelist, users])

    // console.log(walkers)

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

    const routeChange = (id) => {
        navigate(`/walker/${id}`)
    }

    const onLoad = useCallback(() => (mapRef.current = GoogleMap), []) //the Map here is referred to the Map Compnent

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        libraries
    })

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
                            walkers.map((walker, idx) => (
                                <Marker
                                    key = {idx}
                                    position = {walker.address}
                                    clusterer = {clusterer}
                                    icon = {
                                        {url: "../../static/images/googleicon.png",
                                        scaledSize: new google.maps.Size(50, 50)}
                                    } 
                                    onClick = {() => routeChange(walker.id)} 
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




