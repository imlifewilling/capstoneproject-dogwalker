import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, Link, useParams } from "react-router-dom";

const Service = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { services } = useSelector(state=>state);


    const serviceName = services.map(service => service.task)
                                .reduce((acc,value)=>{
                                    if(!acc.includes(value)){
                                        acc.push(value);
                                    }
                                    return acc;
                                }, []
    );

    const [checked, setChecked] = useState(id || {
        dogWalking: false,
        houseSitting: false,
        dogDaycare: false
    })

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
    };

    useEffect(()=>{
        navigate(`/services/filter/${JSON.stringify(checked)}`);
    }, [checked])

    console.log(checked)


    return (
        <>
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
                    <FormControl>
                        <h2>Service Type:</h2>
                        {Object.keys(checked).map((taskName, idx) => {
                            return (
                                <FormControlLabel
                                label={serviceName[idx]}
                                control={
                                    <Checkbox
                                        checked={services[taskName]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={taskName}
                                    />
                                }
                            />
                            )
                        })}
                    </FormControl>
                </Grid>
                <Grid item md={7} key={'service list'} sx={{border: 'black solid 1px'}}>
                    {
                        services.map((service, idx) => {
                            return <ServiceCard key={service.id} service={service} count={idx+1}/>
                        })
                    }
                </Grid>
                <Grid item md={3} key={'map'} sx={{border: 'black solid 1px'}}>
                    <h1>Map</h1>
                </Grid>
            </Grid>
        </>
    );
};

export default Service;