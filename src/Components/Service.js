import React from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Service = () => {
    const { services } = useSelector(state=>state);
    const serviceName = services.map(service => service.task)
                                .reduce((acc,value)=>{
                                    if(!acc.includes(value)){
                                        acc.push(value);
                                    }
                                    return acc;
                                }, []);

    console.log(serviceName)

    return (
        <>
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
                    <FormGroup>
                        {serviceName.map(name => {
                            return <FormControlLabel key={name} control={<Checkbox defaultChecked />} label={name} />;
                        })}
                    </FormGroup>

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