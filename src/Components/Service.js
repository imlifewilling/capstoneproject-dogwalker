import React, { useEffect, useState } from "react";
import { Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Typography} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Map from './Map/Map';

function Obj2URI(obj) {
    return Object.keys(obj).map( key => {
        return `${key}=${encodeURIComponent(obj[key])}`})
        .join('&')
};

function URI2Obj(str){
    if(!str){
        return '';
    }
    else{
        const result = JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        const resultBoolean = Object.keys(result).reduce((acc, key)=>{
            acc[key] = (result[key]==="true")
            return acc
        }, {});
        return resultBoolean
    }
};

const Service = ({services}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    let converted = URI2Obj(id);

    const serviceName = [
        'Dog Walking', 
        'House Sitting', 
        'Dog Day Care',
    ];

    const availabilityName = [
        'Any Time',
        'Before Dark',
        'Morning',
        'Afternoon',
        'Evening',
    ];

    const sizeName = [
        'Any Size',
        'Small',
        'Medium',
        'Large',
        'Giant'
    ];

    const [checked, setChecked] = useState(converted || {
        dogWalking: false,
        houseSitting: false,
        dogDaycare: false,
        anyTime: false,
        beforeDark: false,
        morning: false,
        afternoon: false,
        evening: false,
        anySize: false,
        small: false,
        medium: false,
        large: false,
        giant: false,
    });

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
    };

    useEffect(()=>{
        // console.log(Obj2URI(checked));
        // console.log(URI2Obj(Obj2URI(checked)));
        // navigate(`/services/filter/${JSON.stringify(checked)}`);
        navigate(`/services/filter/${Obj2URI(checked)}`);
    }, [checked])

    // console.log(converted)

    const filterExtractor = (obj) => {
        const result=[];
        for (let key in obj){
            if(obj[key]){
                if(key === 'dogWalking'){
                    result.push('Dog Walking');
                }
                else if (key==='houseSitting'){
                    result.push('House Sitting');
                }
                else if (key === 'dogDaycare'){
                    result.push('Dog Day Care');
                }
                else if (key === 'anyTime'){
                    result.push('Any Time');
                    result.push('Morning');
                    result.push('Afternoon');
                    result.push('Evening');
                }
                else if (key === 'beforeDark'){
                    result.push('Before Dark');
                    result.push('Morning');
                    result.push('Afternoon');
                }
                else if (key === 'morning'){
                    result.push('Morning');
                }
                else if (key === 'afternoon'){
                    result.push('Afternoon');
                }
                else if (key === 'evening'){
                    result.push('Evening');
                }
                else if (key === 'anySize'){
                    result.push('Any Size');
                    result.push('Small');
                    result.push('Medium');
                    result.push('Large');
                    result.push('Giant');
                }
                else if (key === 'small'){
                    result.push('Small');
                }
                else if (key === 'medium'){
                    result.push('Medium');
                }
                else if (key === 'large'){
                    result.push('Large');
                }
                else if (key === 'giant'){
                    result.push('Giant');
                }
            };
        };
        return result;
    };

    // const filterInPlace = filterExtractor(JSON.parse(converted || '{}'));

    const filterInPlace = filterExtractor(converted);

    const filteredServices = services.filter(ele => {
        const taskPresent = ele.task.reduce((acc,val) => {
                            if(filterInPlace.includes(val)){
                                acc=true;
                            }
                            return acc
                            },false
        );

        const availabilityPresent = ele.availability.reduce((acc,val) => {
            if(filterInPlace.includes(val)){
                acc=true;
            }
            return acc
            },false
        );
                        

        if(filterInPlace.length === 0){
            return ele;
        }
        else if(taskPresent
                || availabilityPresent
                || filterInPlace.includes(ele.serviceDogsize)){
            return ele ;
        }
    });
    // console.log(filteredServices)

    // console.log(filterInPlace)
    const [idx, setIdx] = useState(5);
    const _filteredServices = filteredServices.slice(0,idx);

    // console.log(_filteredServices)
    
    const handleScroll = (ev) => {
        // console.log(ev.currentTarget.scrollTop);
        // console.log(window.innerHeight)
        // console.log(ev.currentTarget.scrollHeight);
        const scrollBottom = ev.currentTarget.scrollTop + window.innerHeight;
        // console.log(`${scrollBottom}/${ev.currentTarget.scrollHeight*0.9}`)
        if(scrollBottom >= (ev.currentTarget.scrollHeight)){
            console.log('At the Bottom of the List')
            setIdx(idx+5);
        };
    };

    // useEffect(()=>{
    //     _filteredServices = filteredServices.slice(0,idx);
    // }, [idx]);

    return (
        <>
            {/* <nav>
                <Typography gutterBottom variant="h2" component="div" sx={{textAlign:'center', fontWeight: 'bold'}}>
                    Service Page
                </Typography>
            </nav> */}
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{display: { xs: 'none', md: 'grid' }, maxHeight: '100vh', overflow: 'auto', padding: '0 0 0 10px'}}>
                    <FormControl>
                        <h4>Service Type:</h4>
                        {Object.keys(checked).slice(0,3).map((taskCheck, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={serviceName[idx]}
                                sx={{margin:'0'}}
                                control={
                                    <Checkbox
                                        checked={checked[taskCheck]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={taskCheck}
                                    />
                                }
                            />
                            )
                        })}
                        <Divider />

                        <h4>Availability:</h4>
                        {Object.keys(checked).slice(3,8).map((timeCheck, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={availabilityName[idx]}
                                sx={{margin:'0'}}
                                control={
                                    <Checkbox
                                        checked={checked[timeCheck]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={timeCheck}
                                    />
                                }
                            />
                            )
                        })}  
                        <Divider />

                        <h4>Dog Size:</h4>
                        {Object.keys(checked).slice(8,13).map((sizeCheck, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={sizeName[idx]}
                                sx={{margin:'0'}}
                                control={
                                    <Checkbox
                                        checked={checked[sizeCheck]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={sizeCheck}
                                    />
                                }
                            />
                            )
                        })}                        
                    </FormControl>
                </Grid>
                <Grid item md={7} key={'service list'} sx={{ maxHeight: '90vh', overflow: 'auto'}} onScroll={handleScroll}>
                    {
                        _filteredServices.map((service, idx) => {
                            return <ServiceCard key={service.id} service={service} count={idx+1}/>
                        })
                    }
                    {idx>filteredServices.length ? 
                        <Typography gutterBottom variant="h6" component="div" sx={{textAlign:'center', fontWeight: 'bold'}}>
                            You Reach The End
                        </Typography>
                    :''}
                </Grid>
                <Grid item md={3} key={'map'} sx={{ maxHeight: '100vh'}}>
                    <Map servicelist = { filteredServices } />
                </Grid>
            </Grid>
        </>
    );
};

export default Service;