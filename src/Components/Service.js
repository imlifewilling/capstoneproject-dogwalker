import React, { useEffect, useState } from "react";
import { Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Typography} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Map from './Map/Map'

const Service = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { services } = useSelector(state=>state);

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

    const [checked, setChecked] = useState(id || {
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
        navigate(`/services/filter/${JSON.stringify(checked)}`);
    }, [checked])

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

    const filterInPlace = filterExtractor(JSON.parse(id || '{}'));

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

    // console.log(filterInPlace)
    const [idx, setIdx] = useState(4);
    const _filteredServices = filteredServices.slice(0,idx);

    console.log(_filteredServices)
    
    const handleScroll = (ev) => {
        // console.log(ev.currentTarget.scrollTop);
        // console.log(window.innerHeight)
        // console.log(ev.currentTarget.scrollHeight);
        const scrollBottom = ev.currentTarget.scrollTop + window.innerHeight;
        // console.log(`${scrollBottom}/${ev.currentTarget.scrollHeight*0.9}`)
        if(scrollBottom >= (ev.currentTarget.scrollHeight)){
            console.log('At the Bottom of the List')
            setIdx(idx+4);
        };
    };

    // useEffect(()=>{
    //     _filteredServices = filteredServices.slice(0,idx);
    // }, [idx]);

    return (
        <>
            <nav>
                <Typography gutterBottom variant="h2" component="div" sx={{textAlign:'center', fontWeight: 'bold'}}>
                    Service Page
                </Typography>
            </nav>
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{display: { xs: 'none', md: 'grid' }, maxHeight: '100vh', overflow: 'auto', padding: '0 0 0 10px'}}>
                    <FormControl>
                        <h2>Service Type:</h2>
                        {Object.keys(checked).slice(0,3).map((taskCheck, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={serviceName[idx]}
                                sx={{margin:'0'}}
                                control={
                                    <Checkbox
                                        checked={services[taskCheck]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={taskCheck}
                                    />
                                }
                            />
                            )
                        })}
                        <Divider />

                        <h2>Availability:</h2>
                        {Object.keys(checked).slice(3,8).map((timeCheck, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={availabilityName[idx]}
                                sx={{margin:'0'}}
                                control={
                                    <Checkbox
                                        checked={services[timeCheck]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={timeCheck}
                                    />
                                }
                            />
                            )
                        })}  
                        <Divider />

                        <h2>Dog Size:</h2>
                        {Object.keys(checked).slice(8,13).map((sizeCheck, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={sizeName[idx]}
                                sx={{margin:'0'}}
                                control={
                                    <Checkbox
                                        checked={services[sizeCheck]}
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
                <Grid item md={7} key={'service list'} sx={{ maxHeight: '100vh', overflow: 'auto'}} onScroll={handleScroll}>
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
                    <Map servicelist = { _filteredServices }/>
                </Grid>
            </Grid>
        </>
    );
};

export default Service;