import React from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";


const Service = () => {
    const { services } = useSelector(state=>state);

    return (
        <>
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
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